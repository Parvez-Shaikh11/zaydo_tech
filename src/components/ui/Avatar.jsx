import React from 'react';
import { Star } from 'lucide-react';

/**
 * Avatar with an initials fallback, so a testimonial or team card is complete
 * without a photograph. Avoids shipping stock headshots as stand-ins for real
 * people — see the content-trust rules in zaydo_info.md.
 */
export function Avatar({ src, name = '', size = 80, className = '' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={`rounded-full object-cover ring-4 ring-panel ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden={!name}
      className={`flex items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-white ring-4 ring-panel ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials || '—'}
    </span>
  );
}

/** Star rating. Supports halves via a clipped overlay. */
export function StarRating({ value = 5, size = 14, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${value} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star className="absolute inset-0 text-amber-400/30" style={{ width: size, height: size }} />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className="text-amber-400"
                  fill="currentColor"
                  style={{ width: size, height: size }}
                />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
