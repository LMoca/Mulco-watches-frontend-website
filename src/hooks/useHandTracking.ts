import { useEffect, useRef, useState } from 'react';
import type { HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';

export type HandTrackingStatus =
  | 'idle'
  | 'requesting-permission'
  | 'permission-denied'
  | 'no-camera'
  | 'unsupported-error'
  | 'loading-model'
  | 'tracking'
  | 'hand-lost';

// Pinned to the installed @mediapipe/tasks-vision version so the CDN assets match the JS API.
const WASM_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task';
const HAND_LOST_FRAME_THRESHOLD = 15;

/**
 * Owns the getUserMedia stream + MediaPipe HandLandmarker lifecycle for the try-on
 * camera view. `onFrame` is invoked imperatively on every detected frame (not via
 * React state) so the 3D scene can update at full frame rate without re-rendering
 * this component tree.
 */
export function useHandTracking(
  active: boolean,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onFrame: (result: HandLandmarkerResult, video: HTMLVideoElement) => void,
  retryKey = 0
): { status: HandTrackingStatus; facingMode: 'user' | 'environment' } {
  const [status, setStatus] = useState<HandTrackingStatus>('idle');
  // Mirroring only makes sense for a front-facing ("selfie") camera — a rear camera
  // pointed at your own wrist should render un-mirrored. Most devices report which
  // one getUserMedia actually resolved to; desktop webcams often don't, so default
  // to 'user' (the common laptop-webcam case) when unreported.
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const onFrameRef = useRef(onFrame);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    if (!active) {
      setStatus('idle');
      return;
    }

    let cancelled = false;
    let stream: MediaStream | null = null;
    let handLandmarker: HandLandmarker | null = null;
    let attachedVideo: HTMLVideoElement | null = null;
    let rafId = 0;
    let missedFrames = 0;

    async function requestCamera(): Promise<MediaStream> {
      try {
        return await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
      } catch {
        return navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
      }
    }

    async function start() {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
        setStatus('unsupported-error');
        return;
      }

      setStatus('requesting-permission');
      try {
        stream = await requestCamera();
      } catch (err) {
        if (cancelled) return;
        const name = err instanceof DOMException ? err.name : '';
        setStatus(name === 'NotAllowedError' || name === 'SecurityError' ? 'permission-denied' : 'no-camera');
        return;
      }

      if (cancelled) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      const resolvedFacingMode = stream.getVideoTracks()[0]?.getSettings().facingMode;
      setFacingMode(resolvedFacingMode === 'environment' ? 'environment' : 'user');

      const video = videoRef.current;
      if (!video) return;
      attachedVideo = video;
      video.srcObject = stream;
      await video.play();
      if (cancelled) return;

      setStatus('loading-model');
      const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision');
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE_URL);
      const landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        numHands: 1,
      });

      if (cancelled) {
        landmarker.close();
        return;
      }
      handLandmarker = landmarker;
      setStatus('tracking');

      const loop = () => {
        if (cancelled || !handLandmarker) return;
        const v = videoRef.current;
        if (v && v.readyState >= 2) {
          const result = handLandmarker.detectForVideo(v, performance.now());
          if (result.landmarks.length > 0) {
            missedFrames = 0;
            setStatus('tracking');
            onFrameRef.current(result, v);
          } else {
            missedFrames++;
            if (missedFrames >= HAND_LOST_FRAME_THRESHOLD) {
              setStatus('hand-lost');
            }
          }
        }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      handLandmarker?.close();
      stream?.getTracks().forEach((t) => t.stop());
      if (attachedVideo) attachedVideo.srcObject = null;
    };
    // retryKey deliberately re-triggers this setup on demand (e.g. after a permission
    // denial) without the caller having to close/reopen the whole modal.
  }, [active, videoRef, retryKey]);

  return { status, facingMode };
}
