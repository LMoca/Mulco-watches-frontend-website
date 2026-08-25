import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import type { Product } from '../data/products';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useHandTracking, type HandTrackingStatus } from '../hooks/useHandTracking';
import {
  computeWristTransform,
  getWatchCutout,
  DEFAULT_FOV_Y_RADIANS,
  WATCH_IMAGE_WIDTH_M,
} from '../utils/watchOverlay';

interface Props {
  product: Product | null;
  onClose: () => void;
}

interface Scene3D {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  mesh: THREE.Mesh;
}

const STATUS_MESSAGE: Partial<Record<HandTrackingStatus, string>> = {
  'requesting-permission': 'Requesting camera access…',
  'loading-model': 'Loading hand tracking…',
  'permission-denied': 'Camera access was denied. Enable it in your browser’s site settings and try again.',
  'no-camera': 'No camera was found on this device.',
  'unsupported-error': 'Try-on isn’t supported in this browser.',
  'hand-lost': 'Point your camera at your wrist',
};

export default function TryOnModal({ product, onClose }: Props) {
  const open = product !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene3D | null>(null);
  const cutoutTokenRef = useRef(0);

  const [selectedColor, setSelectedColor] = useState<{ name: string; image: string } | null>(null);
  const [fitBox, setFitBox] = useState<{ width: number; height: number } | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (product) setSelectedColor(product.colors?.[0] ?? null);
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Build the three.js scene once the canvas exists, dispose it on close.
  useEffect(() => {
    if (!open || !canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.PerspectiveCamera(
      (DEFAULT_FOV_Y_RADIANS * 180) / Math.PI,
      1,
      0.01,
      10
    );
    const scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(WATCH_IMAGE_WIDTH_M, WATCH_IMAGE_WIDTH_M);
    const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.visible = false;
    scene.add(mesh);

    sceneRef.current = { renderer, camera, scene, mesh };

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      material.map?.dispose();
      sceneRef.current = null;
    };
  }, [open]);

  // Letterbox the video/canvas to the stream's native aspect ratio so the wrist-position
  // math (which is derived from the video's own pixel dimensions) lines up exactly with
  // what's on screen — an object-fit:cover crop would otherwise desync the two.
  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;

    function recomputeFitBox() {
      if (!video || !video.videoWidth || !video.videoHeight) return;
      const videoAspect = video.videoWidth / video.videoHeight;
      const viewportAspect = window.innerWidth / window.innerHeight;
      if (videoAspect > viewportAspect) {
        setFitBox({ width: window.innerWidth, height: window.innerWidth / videoAspect });
      } else {
        setFitBox({ width: window.innerHeight * videoAspect, height: window.innerHeight });
      }
      if (sceneRef.current) {
        sceneRef.current.camera.aspect = videoAspect;
        sceneRef.current.camera.updateProjectionMatrix();
      }
    }

    video.addEventListener('loadedmetadata', recomputeFitBox);
    window.addEventListener('resize', recomputeFitBox);
    recomputeFitBox();
    return () => {
      video.removeEventListener('loadedmetadata', recomputeFitBox);
      window.removeEventListener('resize', recomputeFitBox);
    };
  }, [open]);

  // Size the renderer's draw buffer to the current fit box.
  useEffect(() => {
    if (!fitBox || !sceneRef.current) return;
    sceneRef.current.renderer.setSize(fitBox.width, fitBox.height, false);
  }, [fitBox]);

  // Load the background-removed cutout for the selected color and apply it to the mesh.
  useEffect(() => {
    if (!open || !selectedColor) return;
    const token = ++cutoutTokenRef.current;

    getWatchCutout(selectedColor.image).then((bitmap) => {
      if (token !== cutoutTokenRef.current || !sceneRef.current) return;
      const { mesh } = sceneRef.current;
      const material = mesh.material as THREE.MeshBasicMaterial;

      material.map?.dispose();
      const texture = new THREE.CanvasTexture(bitmap);
      texture.colorSpace = THREE.SRGBColorSpace;
      material.map = texture;
      material.opacity = 1;
      material.needsUpdate = true;

      const aspect = bitmap.width / bitmap.height;
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(WATCH_IMAGE_WIDTH_M, WATCH_IMAGE_WIDTH_M / aspect);
    });
  }, [open, selectedColor]);

  const handleFrame = useCallback((result: HandLandmarkerResult, video: HTMLVideoElement) => {
    const s = sceneRef.current;
    if (!s) return;

    const transform = computeWristTransform(
      result.landmarks[0],
      result.worldLandmarks[0],
      video.videoWidth,
      video.videoHeight
    );

    if (transform) {
      s.mesh.position.copy(transform.position);
      s.mesh.quaternion.copy(transform.quaternion);
      s.mesh.visible = true;
    } else {
      s.mesh.visible = false;
    }
    s.renderer.render(s.scene, s.camera);
  }, []);

  const { status, facingMode } = useHandTracking(open, videoRef, handleFrame, retryKey);
  const mirror = facingMode === 'user';

  // Keep the last frame rendered (mesh hidden) while the hand is temporarily lost, so the
  // scene doesn't freeze on a stale watch position.
  useEffect(() => {
    if (status !== 'hand-lost' || !sceneRef.current) return;
    sceneRef.current.mesh.visible = false;
    sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
  }, [status]);

  if (!open || !product) return null;

  const message = STATUS_MESSAGE[status];
  const showRetry = status === 'permission-denied' || status === 'no-camera';

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Try on ${product.name}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        background: 'rgb(var(--brand-black))',
        opacity: open ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      className="flex items-center justify-center"
    >
      <div className="relative" style={{ width: fitBox?.width, height: fitBox?.height }}>
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute inset-0 w-full h-full"
          style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}
        />
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-6 z-10 font-serif text-3xl leading-none text-brand-gold/80 hover:text-brand-gold transition-colors duration-300"
        style={{ zIndex: 901 }}
      >
        ×
      </button>

      {message && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 text-center px-8"
          style={{ zIndex: 901 }}
        >
          <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-brand-white max-w-xs leading-relaxed">
            {message}
          </p>
          {showRetry && (
            <button
              onClick={() => setRetryKey((k) => k + 1)}
              className="text-[11px] font-sans tracking-widest uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 px-4"
          style={{ zIndex: 901 }}
        >
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c)}
              title={c.name}
              aria-label={`Select ${c.name}`}
              className="relative w-10 h-10 overflow-hidden transition-all duration-200"
              style={{
                outline: selectedColor?.name === c.name ? '1px solid #C9A84C' : '1px solid transparent',
                outlineOffset: '3px',
              }}
            >
              <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
