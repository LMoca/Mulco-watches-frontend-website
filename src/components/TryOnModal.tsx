import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Download, CheckCircle } from 'lucide-react';
import type { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import type { Product } from '../data/products';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useHandTracking, type HandTrackingStatus } from '../hooks/useHandTracking';
import { computeWristTransform, getWatchCutout, DEFAULT_FOV_Y_RADIANS } from '../utils/watchOverlay';
import {
  buildWatchModel,
  disposeWatchModel,
  updateDialTexture,
  applyCaseMaterialColor,
  sampleAverageColor,
  type WatchModel,
} from '../utils/watchModel';

interface Props {
  product: Product | null;
  onClose: () => void;
}

interface Scene3D {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  watch: WatchModel;
}

const STATUS_MESSAGE: Partial<Record<HandTrackingStatus, string>> = {
  'requesting-permission': 'Requesting camera access…',
  'loading-model': 'Loading hand tracking…',
  'permission-denied': 'Camera access was denied. Enable it in your browser’s site settings and try again.',
  'no-camera': 'No camera was found on this device.',
  'unsupported-error': 'Try-on isn’t supported in this browser.',
  'hand-lost': 'Point your camera at your wrist',
};

// Exponential smoothing factors applied to the raw per-frame tracking result before
// it's applied to the model — MediaPipe's landmarks are noticeably jittery frame to
// frame, especially the depth-derived position. Lower = smoother but laggier.
const POSITION_SMOOTHING = 0.25;
const ROTATION_SMOOTHING = 0.25;

export default function TryOnModal({ product, onClose }: Props) {
  const open = product !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene3D | null>(null);
  const cutoutTokenRef = useRef(0);
  const smoothedPosition = useRef<THREE.Vector3 | null>(null);
  const smoothedQuaternion = useRef<THREE.Quaternion | null>(null);

  const [selectedColor, setSelectedColor] = useState<{ name: string; image: string } | null>(null);
  const [fitBox, setFitBox] = useState<{ width: number; height: number } | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [cutoutError, setCutoutError] = useState(false);
  const [captured, setCaptured] = useState(false);

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

  // Build the three.js scene + procedural watch model once the canvas exists, dispose on close.
  useEffect(() => {
    if (!open || !canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.PerspectiveCamera((DEFAULT_FOV_Y_RADIANS * 180) / Math.PI, 1, 0.01, 10);
    const scene = new THREE.Scene();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x3a3a3a, 1.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(0.4, 0.6, 1);
    scene.add(keyLight);

    const watch = buildWatchModel();
    watch.group.visible = false;
    scene.add(watch.group);

    sceneRef.current = { renderer, camera, scene, watch };
    smoothedPosition.current = null;
    smoothedQuaternion.current = null;

    return () => {
      disposeWatchModel(watch);
      renderer.dispose();
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

  // Load the background-removed cutout for the selected color and apply it to the dial +
  // case + band, so the model reflects the color/material actually chosen on the product page.
  useEffect(() => {
    if (!open || !selectedColor || !product) return;
    const token = ++cutoutTokenRef.current;
    setCutoutError(false);

    getWatchCutout(selectedColor.image)
      .then((bitmap) => {
        if (token !== cutoutTokenRef.current || !sceneRef.current) return;
        const { watch } = sceneRef.current;
        updateDialTexture(watch, bitmap);
        applyCaseMaterialColor(watch, product.specs.caseMaterial);
        watch.strapMaterial.color.copy(sampleAverageColor(bitmap));
        watch.strapMaterial.needsUpdate = true;
      })
      .catch(() => {
        if (token === cutoutTokenRef.current) setCutoutError(true);
      });
  }, [open, selectedColor, product]);

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
      if (!smoothedPosition.current || !smoothedQuaternion.current) {
        smoothedPosition.current = transform.position.clone();
        smoothedQuaternion.current = transform.quaternion.clone();
      } else {
        smoothedPosition.current.lerp(transform.position, POSITION_SMOOTHING);
        smoothedQuaternion.current.slerp(transform.quaternion, ROTATION_SMOOTHING);
      }
      s.watch.group.position.copy(smoothedPosition.current);
      s.watch.group.quaternion.copy(smoothedQuaternion.current);
      s.watch.group.visible = true;
    } else {
      s.watch.group.visible = false;
    }
    s.renderer.render(s.scene, s.camera);
  }, []);

  const { status, facingMode } = useHandTracking(open, videoRef, handleFrame, retryKey);
  const mirror = facingMode === 'user';

  // Hide the model while the hand is temporarily lost, so the scene doesn't freeze on a
  // stale position, but keep the smoothed transform intact so tracking resumes smoothly.
  useEffect(() => {
    if (status !== 'hand-lost' || !sceneRef.current) return;
    sceneRef.current.watch.group.visible = false;
    sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
  }, [status]);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const s = sceneRef.current;
    if (!video || !s || !video.videoWidth || !video.videoHeight) return;

    // WebGL canvases don't preserve their drawing buffer by default, so re-render
    // synchronously right before reading pixels — otherwise the buffer may already
    // have been cleared for compositing by the time this click handler runs.
    s.renderer.render(s.scene, s.camera);

    const w = video.videoWidth;
    const h = video.videoHeight;
    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = w;
    captureCanvas.height = h;
    const ctx = captureCanvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    if (mirror) {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    ctx.drawImage(s.renderer.domElement, 0, 0, w, h);
    ctx.restore();

    captureCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product?.id ?? 'watch'}-try-on.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, 'image/png');

    setCaptured(true);
    setTimeout(() => setCaptured(false), 1200);
  }, [mirror, product]);

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

      {fitBox && status !== 'permission-denied' && status !== 'no-camera' && status !== 'unsupported-error' && (
        <button
          onClick={handleCapture}
          aria-label="Save photo"
          title="Save photo"
          className="absolute bottom-8 right-6 w-12 h-12 flex items-center justify-center border border-brand-gold/40 hover:border-brand-gold bg-black/40 transition-colors duration-300"
          style={{ zIndex: 901 }}
        >
          {captured ? (
            <CheckCircle size={18} strokeWidth={1.5} className="text-brand-gold" />
          ) : (
            <Download size={18} strokeWidth={1.5} className="text-brand-gold" />
          )}
        </button>
      )}

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

      {cutoutError && (
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 text-center"
          style={{ zIndex: 901, background: 'rgba(0,0,0,0.6)' }}
        >
          <p className="font-sans text-[11px] tracking-[0.1em] uppercase text-brand-white/90">
            Couldn’t load this watch’s image — try a different color.
          </p>
        </div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 px-4 max-w-[65vw]"
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
