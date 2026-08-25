import * as THREE from 'three';

/**
 * Procedural 3D watch model builder for the Virtual Try-On feature.
 *
 * The product catalog only has flat studio photography, not 3D scans, so this
 * constructs a genuine volumetric watch (case cylinder, bezel ring, crown, and a
 * band that wraps the wrist) from primitives sized off typical watch proportions,
 * and maps the existing product photo onto the dial face as a texture. This reads
 * as a real 3D object from any viewing angle, unlike a flat billboard plane.
 *
 * All geometry is built in a local frame matching computeWristTransform's basis:
 * local +X = across the wrist ("right"), local +Y = along the forearm ("forward"),
 * local +Z = away from the wrist, dial-facing ("normal"). The wrist quaternion from
 * watchOverlay.ts maps this frame directly onto the tracked wrist, so no separate
 * calibration offset is needed for gross orientation.
 */

export const CASE_RADIUS_M = 0.021;
export const CASE_THICKNESS_M = 0.009;
export const CROWN_RADIUS_M = 0.0025;
export const CROWN_LENGTH_M = 0.004;
export const WRIST_RADIUS_M = 0.028;
export const STRAP_WIDTH_M = CASE_RADIUS_M * 1.15;
export const STRAP_THICKNESS_M = 0.0035;
export const STRAP_SEGMENT_COUNT = 20;
export const STRAP_ARC_DEGREES = 300; // full loop minus a gap at the underside for the clasp
/** Fraction of the square product photo treated as "the case face" when texturing the dial — the studio photos include strap above/below the case, so we sample only the central region. */
const DIAL_CROP_RATIO = 0.6;

const CASE_METAL_COLORS: Array<[RegExp, number]> = [
  [/rose\s*gold/i, 0xb98466],
  [/gold/i, 0xd4af37],
  [/black|pvd/i, 0x2b2b2e],
  [/silver|steel|stainless/i, 0xc4c4cc],
];
const DEFAULT_CASE_COLOR = 0xc4c4cc;

export interface WatchModel {
  group: THREE.Group;
  dialMesh: THREE.Mesh;
  dialMaterial: THREE.MeshBasicMaterial;
  strapMaterial: THREE.MeshStandardMaterial;
  caseMaterial: THREE.MeshStandardMaterial;
  /** Every geometry created for this model, kept so dispose() can free them all. */
  geometries: THREE.BufferGeometry[];
}

export function buildWatchModel(): WatchModel {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];

  const caseMaterial = new THREE.MeshStandardMaterial({ color: DEFAULT_CASE_COLOR, metalness: 0.85, roughness: 0.3 });
  const dialMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide });
  const strapMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.1, roughness: 0.65 });

  // Case sits on top of the wrist surface (radius WRIST_RADIUS_M from the tracked
  // wrist axis), extending outward along local +Z.
  const caseGroup = new THREE.Group();
  caseGroup.position.set(0, 0, WRIST_RADIUS_M + CASE_THICKNESS_M / 2);
  group.add(caseGroup);

  const caseGeometry = new THREE.CylinderGeometry(CASE_RADIUS_M, CASE_RADIUS_M, CASE_THICKNESS_M, 48);
  geometries.push(caseGeometry);
  const caseMesh = new THREE.Mesh(caseGeometry, caseMaterial);
  caseMesh.rotation.x = Math.PI / 2; // cylinder axis (default +Y) -> local +Z
  caseGroup.add(caseMesh);

  const bezelGeometry = new THREE.TorusGeometry(CASE_RADIUS_M * 0.94, CASE_RADIUS_M * 0.07, 12, 48);
  geometries.push(bezelGeometry);
  const bezelMesh = new THREE.Mesh(bezelGeometry, caseMaterial);
  bezelMesh.position.z = CASE_THICKNESS_M / 2;
  caseGroup.add(bezelMesh);

  const dialGeometry = new THREE.CircleGeometry(CASE_RADIUS_M * 0.9, 48);
  geometries.push(dialGeometry);
  const dialMesh = new THREE.Mesh(dialGeometry, dialMaterial);
  dialMesh.position.z = CASE_THICKNESS_M / 2 + 0.0003;
  caseGroup.add(dialMesh);

  const crownGeometry = new THREE.CylinderGeometry(CROWN_RADIUS_M, CROWN_RADIUS_M, CROWN_LENGTH_M, 12);
  geometries.push(crownGeometry);
  const crownMesh = new THREE.Mesh(crownGeometry, caseMaterial);
  crownMesh.rotation.z = -Math.PI / 2; // cylinder axis (default +Y) -> local +X
  crownMesh.position.x = CASE_RADIUS_M + CROWN_LENGTH_M / 2;
  caseGroup.add(crownMesh);

  // Band: a ring of short straight segments around the wrist (radius WRIST_RADIUS_M,
  // in the local X-Z plane), covering STRAP_ARC_DEGREES centered on the case and
  // leaving a gap at the underside for the clasp.
  const halfArc = (STRAP_ARC_DEGREES * Math.PI) / 180 / 2;
  const angleStep = (2 * halfArc) / STRAP_SEGMENT_COUNT;
  const segmentLength = WRIST_RADIUS_M * angleStep * 1.15; // slight overlap hides seams between flat segments
  const strapGeometry = new THREE.BoxGeometry(segmentLength, STRAP_WIDTH_M, STRAP_THICKNESS_M);
  geometries.push(strapGeometry);

  for (let i = 0; i < STRAP_SEGMENT_COUNT; i++) {
    const angle = -halfArc + (i + 0.5) * angleStep;
    const segment = new THREE.Mesh(strapGeometry, strapMaterial);
    segment.position.set(Math.sin(angle) * WRIST_RADIUS_M, 0, Math.cos(angle) * WRIST_RADIUS_M);
    segment.rotation.y = angle;
    group.add(segment);
  }

  return { group, dialMesh, dialMaterial, strapMaterial, caseMaterial, geometries };
}

export function disposeWatchModel(model: WatchModel) {
  model.geometries.forEach((g) => g.dispose());
  model.caseMaterial.dispose();
  model.strapMaterial.dispose();
  model.dialMaterial.map?.dispose();
  model.dialMaterial.dispose();
}

/** Maps the given product photo onto the dial, cropped to its central region. */
export function updateDialTexture(model: WatchModel, bitmap: ImageBitmap) {
  model.dialMaterial.map?.dispose();
  const texture = new THREE.CanvasTexture(bitmap);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.repeat.set(DIAL_CROP_RATIO, DIAL_CROP_RATIO);
  texture.offset.set((1 - DIAL_CROP_RATIO) / 2, (1 - DIAL_CROP_RATIO) / 2);
  model.dialMaterial.map = texture;
  model.dialMaterial.opacity = 1;
  model.dialMaterial.needsUpdate = true;
}

export function applyCaseMaterialColor(model: WatchModel, caseMaterialLabel?: string) {
  const match = caseMaterialLabel && CASE_METAL_COLORS.find(([re]) => re.test(caseMaterialLabel));
  model.caseMaterial.color.setHex(match ? match[1] : DEFAULT_CASE_COLOR);
}

/** Average color of the opaque (non-background) pixels of a cutout image, used to tint the band since the catalog has no separate strap-material asset. */
export function sampleAverageColor(bitmap: ImageBitmap): THREE.Color {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Color(0x2a2a2a);

  ctx.drawImage(bitmap, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 16) continue;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  if (count === 0) return new THREE.Color(0x2a2a2a);
  return new THREE.Color(r / count / 255, g / count / 255, b / count / 255);
}
