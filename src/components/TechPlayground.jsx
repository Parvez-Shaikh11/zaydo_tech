import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import TechIcon, { techColor } from './ui/TechIcon';

/**
 * Draggable technology capsules with light collision physics.
 *
 * Drag one capsule into another and the other gets pushed away, settles, and
 * drifts back — the whole field stays live rather than being a static chip row.
 *
 * Implementation notes
 * - Hand-rolled rather than a physics library: the whole simulation is one
 *   rAF loop over ~24 axis-aligned boxes, which is far cheaper than pulling in
 *   matter.js for what is decorative.
 * - Positions live in a ref, not state. Writing 24 positions to React state at
 *   60fps would re-render the tree every frame; instead the loop writes
 *   `transform` straight onto the DOM nodes.
 * - The loop is paused when the section is off-screen (IntersectionObserver)
 *   and when the user prefers reduced motion, in which case capsules simply
 *   sit in their laid-out grid and stay draggable.
 */

const DAMPING = 0.86;
const RETURN_FORCE = 0.012; // pull back toward the home slot
const PUSH = 0.34; // how hard a collision separates two capsules
const SLEEP = 0.02; // below this speed a capsule is considered at rest

/** `items`: [{ name, dimmed }] — every technology is on the field at once.
 *  The layer tabs mark their own members with an accent ring rather than fading
 *  the rest out; every capsule stays legible, and hovering one floods it blue.
 *  Showing only four at a time left most of the band empty. */
export default function TechPlayground({ items = [] }) {
  const wrapRef = useRef(null);
  const nodeRefs = useRef([]);
  const bodies = useRef([]);
  const frame = useRef(0);
  const dragging = useRef(-1);
  const [ready, setReady] = useState(false);

  /* ---------------------------------------------------------- measure ---- */
  /* Home slots come from the browser's own flex-wrap layout, so the resting
     arrangement is always sensible at any width. We measure once, then switch
     the capsules to absolute positioning at those coordinates. */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wrapBox = wrap.getBoundingClientRect();

    bodies.current = nodeRefs.current.map((node) => {
      if (!node) return null;
      const b = node.getBoundingClientRect();
      const homeX = b.left - wrapBox.left;
      const homeY = b.top - wrapBox.top;
      return {
        homeX,
        homeY,
        x: homeX,
        y: homeY,
        vx: 0,
        vy: 0,
        w: b.width,
        h: b.height,
      };
    });
    setReady(true);
  }, []);

  /* Measure only while `ready` is false — that is exactly when the capsules are
     back in normal flow. Doing it on a rAF after setReady(false) would race the
     re-render and measure the still-absolute layout. */
  useLayoutEffect(() => {
    if (!ready) measure();
  }, [ready, measure, items]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    let last = wrap.clientWidth;
    const ro = new ResizeObserver(() => {
      // width-only: a height change is usually our own doing, and reacting to
      // it would loop
      if (wrap.clientWidth === last) return;
      last = wrap.clientWidth;
      setReady(false);
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  /* ------------------------------------------------------------ loop ----- */
  useEffect(() => {
    if (!ready) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const wrap = wrapRef.current;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    if (wrap) io.observe(wrap);

    const step = () => {
      frame.current = requestAnimationFrame(step);
      if (!visible) return;

      const list = bodies.current;
      const width = wrap?.clientWidth ?? 0;
      const height = wrap?.clientHeight ?? 0;

      for (let i = 0; i < list.length; i += 1) {
        const a = list[i];
        if (!a || i === dragging.current) continue;

        // spring home
        a.vx += (a.homeX - a.x) * RETURN_FORCE;
        a.vy += (a.homeY - a.y) * RETURN_FORCE;
      }

      // pairwise separation (axis-aligned, resolve along the shallower overlap)
      for (let i = 0; i < list.length; i += 1) {
        const a = list[i];
        if (!a) continue;
        for (let j = i + 1; j < list.length; j += 1) {
          const b = list[j];
          if (!b) continue;

          const dx = a.x + a.w / 2 - (b.x + b.w / 2);
          const dy = a.y + a.h / 2 - (b.y + b.h / 2);
          const ox = (a.w + b.w) / 2 - Math.abs(dx);
          const oy = (a.h + b.h) / 2 - Math.abs(dy);
          if (ox <= 0 || oy <= 0) continue;

          if (ox < oy) {
            const push = (dx < 0 ? -1 : 1) * ox * PUSH;
            if (i !== dragging.current) a.vx += push;
            if (j !== dragging.current) b.vx -= push;
          } else {
            const push = (dy < 0 ? -1 : 1) * oy * PUSH;
            if (i !== dragging.current) a.vy += push;
            if (j !== dragging.current) b.vy -= push;
          }
        }
      }

      for (let i = 0; i < list.length; i += 1) {
        const a = list[i];
        if (!a) continue;
        const node = nodeRefs.current[i];
        if (!node) continue;

        if (i !== dragging.current) {
          a.vx *= DAMPING;
          a.vy *= DAMPING;
          if (Math.abs(a.vx) < SLEEP) a.vx = 0;
          if (Math.abs(a.vy) < SLEEP) a.vy = 0;
          a.x += a.vx;
          a.y += a.vy;

          // keep everything inside the field
          a.x = Math.max(0, Math.min(width - a.w, a.x));
          a.y = Math.max(0, Math.min(height - a.h, a.y));
        }

        node.style.transform = `translate3d(${a.x}px, ${a.y}px, 0)`;
      }
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame.current);
      io.disconnect();
    };
  }, [ready]);

  /* ---------------------------------------------------------- pointer ---- */
  const onPointerDown = (i) => (e) => {
    const body = bodies.current[i];
    if (!body) return;
    dragging.current = i;
    const wrapBox = wrapRef.current.getBoundingClientRect();
    body.grabX = e.clientX - wrapBox.left - body.x;
    body.grabY = e.clientY - wrapBox.top - body.y;
    body.vx = 0;
    body.vy = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (i) => (e) => {
    if (dragging.current !== i) return;
    const body = bodies.current[i];
    const wrap = wrapRef.current;
    if (!body || !wrap) return;
    const wrapBox = wrap.getBoundingClientRect();
    const nx = e.clientX - wrapBox.left - body.grabX;
    const ny = e.clientY - wrapBox.top - body.grabY;
    body.x = Math.max(0, Math.min(wrap.clientWidth - body.w, nx));
    body.y = Math.max(0, Math.min(wrap.clientHeight - body.h, ny));
  };

  const endDrag = (i) => (e) => {
    if (dragging.current !== i) return;
    dragging.current = -1;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto flex min-h-[15rem] max-w-4xl flex-wrap items-start justify-center gap-3"
    >
      {items.map((item, i) => (
        <button
          key={item.name}
          type="button"
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          onPointerDown={onPointerDown(i)}
          onPointerMove={onPointerMove(i)}
          onPointerUp={endDrag(i)}
          onPointerCancel={endDrag(i)}
          aria-label={`${item.name} — drag to move`}
          /* Colours live in `.tech-capsule` in index.css, not here: the hover
             fill has to override a per-capsule accent, and an inline style
             outranks every class it would need to beat. */
          data-layer={item.dimmed ? 'off' : 'on'}
          className={`tech-capsule inline-flex touch-none select-none items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-[0.82rem] font-semibold backdrop-blur-sm active:cursor-grabbing ${
            ready ? 'absolute left-0 top-0 cursor-grab' : 'cursor-grab'
          }`}
          style={{ '--cap-icon': techColor(item.name) }}
        >
          <span
            aria-hidden
            className="tech-capsule__icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          >
            <TechIcon name={item.name} className="h-4 w-4" />
          </span>
          {item.name}
        </button>
      ))}
    </div>
  );
}
