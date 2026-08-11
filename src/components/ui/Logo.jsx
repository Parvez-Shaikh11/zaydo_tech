import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeProvider';

/**
 * Renders the official Zaydo Tech lockup — never a recreation.
 *
 * The source brand files ship with a baked-in solid matte; `scripts/prep-logo.mjs`
 * converts that matte to real alpha and trims the padding, producing the four
 * assets used here. The correct variant is picked from the active theme so the
 * wordmark keeps its contrast in both palettes.
 */
export default function Logo({ variant = 'full', className = '', to = '/', onClick }) {
  const { isDark } = useTheme();

  const src =
    variant === 'mark'
      ? isDark
        ? '/photos/mark-dark.png'
        : '/photos/mark-light.png'
      : isDark
        ? '/photos/logo-dark.png'
        : '/photos/logo-light.png';

  const image = (
    <img
      src={src}
      alt="Zaydo Tech"
      width={variant === 'mark' ? 679 : 1543}
      height={343}
      className={`w-auto select-none object-contain ${className}`}
      draggable={false}
    />
  );

  if (!to) return image;

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label="Zaydo Tech — home"
      className="group inline-flex items-center transition-transform duration-300 hover:scale-[1.03] active:scale-95"
    >
      {image}
    </Link>
  );
}
