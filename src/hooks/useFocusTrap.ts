import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean
) {
  const previousFocus = useRef<Element | null>(null);

  useEffect(() => {
    if (!active) return;

    previousFocus.current = document.activeElement;

    const firstFocusable = containerRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    firstFocusable?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !containerRef.current) return;
      const focusables = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus();
      }
    };
  }, [active, containerRef]);
}
