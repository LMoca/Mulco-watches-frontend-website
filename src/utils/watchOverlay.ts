import * as THREE from 'three';

/**
 * Background removal + 3D wrist-orientation math for the Virtual Try-On feature.
 * Framework-free (no React) — consumed by useHandTracking.ts and TryOnModal.tsx.
 */

// ─── Background-removal cutout cache ────────────────────────────────────────

/** Pixels lighter than this on every channel are treated as "background white". */
const WHITE_THRESHOLD = 235;
/** Flood fill never crosses into this central fraction of the image, even if contiguous — protects a watch face that touches this region from accidental leaks through open bracelet links. */
const PROTECTED_CORE_RATIO = 0.7;

const cutoutCache = new Map<string, Promise<ImageBitmap>>();

/**
 * Returns a cached, background-removed cutout of the given (flat, white-background)
 * product photo. Computed once per URL and memoized in-memory for the session.
 */
export function getWatchCutout(imageUrl: string): Promise<ImageBitmap> {
  let cached = cutoutCache.get(imageUrl);
  if (!cached) {
    cached = buildCutout(imageUrl);
    cutoutCache.set(imageUrl, cached);
  }
  return cached;
}

async function buildCutout(imageUrl: string): Promise<ImageBitmap> {
  const blob = await fetch(imageUrl).then((r) => r.blob());
  const source = await createImageBitmap(blob);

  const canvas = document.createElement('canvas');
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas context unavailable');

  ctx.drawImage(source, 0, 0);
  source.close();

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  floodFillTransparent(imageData, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);

  return createImageBitmap(canvas);
}

/**
 * Border-seeded 4-connected flood fill: only near-white pixels reachable from the
 * image border are made transparent. A watch's interior white dial/hands/numerals
 * survive because they're enclosed by non-white bezel/case/strap pixels and are
 * therefore never reached from the border — unlike a plain "make all white pixels
 * transparent" pass, which would eat them.
 */
function floodFillTransparent(imageData: ImageData, width: number, height: number) {
  const { data } = imageData;
  const visited = new Uint8Array(width * height);
  const queue: number[] = [];

  const coreX0 = Math.round((width * (1 - PROTECTED_CORE_RATIO)) / 2);
  const coreY0 = Math.round((height * (1 - PROTECTED_CORE_RATIO)) / 2);
  const coreX1 = width - coreX0;
  const coreY1 = height - coreY0;

  const isNearWhite = (idx: number) => {
    const o = idx * 4;
    return data[o] > WHITE_THRESHOLD && data[o + 1] > WHITE_THRESHOLD && data[o + 2] > WHITE_THRESHOLD;
  };
  const inProtectedCore = (x: number, y: number) => x >= coreX0 && x < coreX1 && y >= coreY0 && y < coreY1;

  const trySeed = (x: number, y: number) => {
    const idx = y * width + x;
    if (!visited[idx] && isNearWhite(idx)) {
      visited[idx] = 1;
      queue.push(idx);
    }
  };

  for (let x = 0; x < width; x++) {
    trySeed(x, 0);
    trySeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    trySeed(0, y);
    trySeed(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    data[idx * 4 + 3] = 0;

    const x = idx % width;
    const y = (idx / width) | 0;
    const neighbors: Array<[number, number]> = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      if (inProtectedCore(nx, ny)) continue;
      const nIdx = ny * width + nx;
      if (visited[nIdx] || !isNearWhite(nIdx)) continue;
      visited[nIdx] = 1;
      queue.push(nIdx);
    }
  }
}

// ─── Wrist orientation + position ───────────────────────────────────────────

/** Plain {x,y,z} shape shared by mediapipe's NormalizedLandmark and Landmark types. */
export interface Point3 {
  x: number;
  y: number;
  z: number;
}

const WRIST = 0;
const INDEX_MCP = 5;
const MIDDLE_MCP = 9;
const PINKY_MCP = 17;

/** Assumed real-world width across the index/pinky knuckles, in meters — no per-user calibration in MVP. */
export const REAL_HAND_WIDTH_M = 0.08;
/** Distance to shift the watch anchor along the forearm axis, away from the raw wrist landmark toward where a watch actually sits — this becomes the origin the 3D watch model (watchModel.ts) is built around. */
export const WRIST_OFFSET_M = 0.035;
/** No device camera intrinsics are available from getUserMedia, so a fixed vertical FOV is assumed — the single largest source of scale error across devices. */
export const DEFAULT_FOV_Y_RADIANS = (50 * Math.PI) / 180;

export interface WristTransform {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
}

/**
 * Computes where and how to orient the watch plane from a single frame of hand
 * landmarks. Rotation comes from the 3D (metric-ish, hand-relative) worldLandmarks;
 * position comes from a monocular pinhole unprojection of the 2D image-space
 * landmark using an assumed real-world hand width. Returns null when the required
 * landmarks aren't available (no hand detected, or a degenerate frame).
 */
export function computeWristTransform(
  landmarks: Point3[] | undefined,
  worldLandmarks: Point3[] | undefined,
  videoWidth: number,
  videoHeight: number,
  cameraFovYRadians: number = DEFAULT_FOV_Y_RADIANS
): WristTransform | null {
  if (!landmarks?.[PINKY_MCP] || !worldLandmarks?.[PINKY_MCP] || videoWidth <= 0 || videoHeight <= 0) {
    return null;
  }

  const wl = worldLandmarks;
  const right = new THREE.Vector3(
    wl[PINKY_MCP].x - wl[INDEX_MCP].x,
    wl[PINKY_MCP].y - wl[INDEX_MCP].y,
    wl[PINKY_MCP].z - wl[INDEX_MCP].z
  ).normalize();
  let forward = new THREE.Vector3(
    wl[MIDDLE_MCP].x - wl[WRIST].x,
    wl[MIDDLE_MCP].y - wl[WRIST].y,
    wl[MIDDLE_MCP].z - wl[WRIST].z
  ).normalize();
  const normal = new THREE.Vector3().crossVectors(right, forward).normalize();
  if (normal.lengthSq() === 0) return null;
  forward = new THREE.Vector3().crossVectors(normal, right).normalize();

  // The 3D watch model (watchModel.ts) is built in this exact local frame — local +X
  // along `right`, +Y along `forward`, +Z along `normal` — so the raw basis quaternion
  // maps it directly onto the tracked wrist with no extra calibration offset needed
  // (unlike a flat photo, a rotationally-built case has no "up" to misalign).
  const basis = new THREE.Matrix4().makeBasis(right, forward, normal);
  const quaternion = new THREE.Quaternion().setFromRotationMatrix(basis);

  const pxWidth = Math.hypot(
    (landmarks[PINKY_MCP].x - landmarks[INDEX_MCP].x) * videoWidth,
    (landmarks[PINKY_MCP].y - landmarks[INDEX_MCP].y) * videoHeight
  );
  if (pxWidth < 1) return null;

  const focalLengthPx = videoHeight / (2 * Math.tan(cameraFovYRadians / 2));
  const depth = (REAL_HAND_WIDTH_M * focalLengthPx) / pxWidth;

  const fovX = 2 * Math.atan(Math.tan(cameraFovYRadians / 2) * (videoWidth / videoHeight));
  const ndcX = landmarks[WRIST].x * 2 - 1;
  const ndcY = -(landmarks[WRIST].y * 2 - 1);

  const worldX = ndcX * depth * Math.tan(fovX / 2);
  const worldY = ndcY * depth * Math.tan(cameraFovYRadians / 2);
  const worldZ = -depth;

  const position = new THREE.Vector3(worldX, worldY, worldZ).addScaledVector(forward, WRIST_OFFSET_M);

  return { position, quaternion };
}
