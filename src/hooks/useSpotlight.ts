import { useRef, type MouseEvent } from "react";

/**
 * Tracks pointer position over an element and writes it to CSS custom
 * properties (--spot-x / --spot-y) so a radial-gradient in CSS can follow
 * the cursor. Pair with the `.spotlight` utility class in index.css.
 * Uses direct DOM writes instead of React state to stay smooth at 60fps.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  function onMouseMove(e: MouseEvent<T>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return { ref, onMouseMove };
}
