import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The auto-running rail engine shared by `ServiceCarousel` and `ProjectRail`.
 *
 * It steps one whole card at a time and always shows a WHOLE number of cards,
 * so the row lines up with the container gutters instead of leaving a card
 * permanently sliced by each edge — which is what a continuous marquee does.
 *
 * The loop is seamless because the caller renders its list TWICE: advancing
 * past the last real card lands on its duplicate, and the index is then
 * snapped back to zero on a frame with transitions disabled, so nothing is
 * visible.
 *
 * `breakpoints` must be a module-scope constant in the caller — a fresh array
 * literal on every render would re-run the resize effect on every render.
 * Widest first; the first match wins.
 */
export default function useSteppedRail({
  count,
  breakpoints,
  stepMs = 3400,
  glideMs = 700,
}) {
  const perViewFor = useCallback(
    (width) => breakpoints.find((b) => width >= b.min).perView,
    [breakpoints],
  );

  const [perView, setPerView] = useState(() =>
    perViewFor(typeof window === 'undefined' ? 1280 : window.innerWidth),
  );
  const [index, setIndex] = useState(0);
  const [gliding, setGliding] = useState(true);
  const [paused, setPaused] = useState(false);
  const snapTimer = useRef(null);

  useEffect(() => {
    const onResize = () => setPerView(perViewFor(window.innerWidth));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [perViewFor]);

  const next = useCallback(() => setIndex((i) => i + 1), []);

  const prev = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
      return;
    }
    /* Nothing to move back to at zero, so teleport onto the duplicate set with
       transitions off — visually identical — and let the effect below play the
       real step one frame later. */
    setGliding(false);
    setIndex(count);
  }, [index, count]);

  /* Jumping straight to a card, for dot controls. Clamped into the real set so
     it can never land on the duplicate half and strand the snap effect. */
  const goTo = useCallback((i) => setIndex(Math.max(0, Math.min(i, count - 1))), [count]);

  /* Re-enable the transition (and step back) one frame after a teleport.
     Two rAFs: the first lands in the frame that commits `gliding: false`, the
     second is the earliest frame where the un-transitioned position is live. */
  useEffect(() => {
    if (gliding) return undefined;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setGliding(true);
        setIndex((i) => (i === count ? count - 1 : i));
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [gliding, count]);

  /* Once the step onto the duplicate has finished playing, snap the index home
     with transitions off. Visually identical, so the jump is invisible.
     Guarded on `gliding` so it never fires for the teleport `prev` performs. */
  useEffect(() => {
    if (index !== count || !gliding) return undefined;
    snapTimer.current = setTimeout(() => {
      setGliding(false);
      setIndex(0);
    }, glideMs + 40);
    return () => clearTimeout(snapTimer.current);
  }, [index, count, gliding, glideMs]);

  useEffect(() => {
    if (paused || !gliding) return undefined;
    const t = setTimeout(next, stepMs);
    return () => clearTimeout(t);
  }, [index, paused, gliding, next, stepMs]);

  const slideWidth = 100 / perView;

  return {
    index,
    /* The real card the rail is parked on, for dot indicators. */
    active: count ? index % count : 0,
    perView,
    slideWidth,
    next,
    prev,
    goTo,
    paused,
    setPaused,
    /* Spread onto the element that wraps the track. Focus is covered as well
       as hover so keyboard users are not dragged along mid-tab. */
    pauseHandlers: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocusCapture: () => setPaused(true),
      onBlurCapture: () => setPaused(false),
    },
    /* Spread onto the flex track itself. */
    trackStyle: {
      transform: `translateX(-${index * slideWidth}%)`,
      transition: gliding ? `transform ${glideMs}ms cubic-bezier(0.22,1,0.36,1)` : 'none',
    },
  };
}
