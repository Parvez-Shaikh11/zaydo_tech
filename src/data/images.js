/**
 * Every image the site ships — one registry, one place to change.
 *
 * Rules:
 *   • No component may hard-code a `/photos/...` string. Import from here.
 *   • Files themselves all live in `public/photos/`. Nothing is imported
 *     through the bundler, so paths stay absolute and cache-friendly.
 *   • Intrinsic `width`/`height` travel with each entry so every `<img>` can
 *     reserve its box and avoid layout shift. Update them if a file is
 *     replaced — `node scripts/prep-photos.mjs` prints the new numbers.
 *
 * To swap a photo: drop the replacement into `photos/website_images/`, point
 * the matching JOBS entry in `scripts/prep-photos.mjs` at it, re-run the
 * script, then update the size here. Nothing else in the codebase changes.
 */

const BASE = '/photos';

/* ------------------------------------------------------------------ brand */
export const brand = {
  logoLight: `${BASE}/logo-light.png`,
  logoDark: `${BASE}/logo-dark.png`,
  markLight: `${BASE}/mark-light.png`,
  markDark: `${BASE}/mark-dark.png`,
};

/* ------------------------------------------------------------ photography */
/**
 * Branded office photography. The originals arrived as flat RGB with a white
 * background baked in; `scripts/prep-photos.mjs` keys that background out to
 * real alpha, so these are CUT-OUTS — they must never be dropped into a
 * clipped frame (`.shape-blob`, `.shape-arch`) or given a scrim overlay. They
 * carry their own organic silhouette and are meant to sit directly on the page
 * with animated shapes showing through behind them. `PhotoStage` does exactly
 * that; use it rather than a bare `<img>`.
 */
export const photos = {
  heroDesk: {
    src: `${BASE}/team-hero.png`,
    width: 1160,
    height: 691,
    alt: 'Zaydo Tech engineer working at a laptop in the studio',
  },
  planning: {
    src: `${BASE}/team-planning.png`,
    width: 940,
    height: 729,
    alt: 'The Zaydo Tech team reviewing a system design together',
  },
  client: {
    src: `${BASE}/team-client.png`,
    width: 940,
    height: 736,
    alt: 'A Zaydo Tech engineer walking a client through their build',
  },
  servicesHero: {
    src: `${BASE}/services-hero.png`,
    width: 980,
    height: 896,
    alt: 'A Zaydo Tech dashboard on laptop and phone, beside the plan-design-develop-deploy-grow delivery track',
  },
  contactCall: {
    src: `${BASE}/contact-call.png`,
    width: 1040,
    height: 697,
    alt: 'A Zaydo Tech engineer taking a call at their desk',
  },
};

/* --------------------------------------------------------------- renders */
/** Abstract 3D renders. Unlike `photos`, these are opaque and are framed. */
export const renders = {
  hero: `${BASE}/hero_3d.png`,
  software: `${BASE}/software_3d.png`,
  automation: `${BASE}/automation_3d.png`,
  ai: `${BASE}/ai_3d.png`,
};

/**
 * Branded scene artwork for the capability blocks. Opaque like `renders` — the
 * backdrop is a designed colour, not a white matte, so it is resized only and
 * never keyed. Being purpose-made it also needs no `grade` filter or accent
 * tint over it; the entry in `servicesData` sets `grade: ''` to say so.
 *
 * One per capability. `renders` is now only used by the case studies.
 */
export const artwork = {
  customSoftware: `${BASE}/service-custom-software.png`,
  webApplications: `${BASE}/service-web-applications.png`,
  automation: `${BASE}/service-automation.png`,
  aiSystems: `${BASE}/service-ai-systems.png`,
  digitalPlatforms: `${BASE}/service-digital-platforms.png`,
};
