/**
 * Client testimonials.
 *
 * ⚠️  INTENTIONALLY EMPTY — do not fill this with placeholder copy.
 *
 * zaydo_info.md is explicit: "NEVER INVENT: Clients, Testimonials, Awards…"
 * and the site's own copy leans on that promise (see About.jsx and the
 * "How to read this portfolio" panel on Work.jsx). Every section that renders
 * this array is guarded by `testimonials.length > 0`, so the block stays
 * invisible until real quotes exist — no fake social proof can ship by
 * accident.
 *
 * TO ENABLE: add real entries below. The section appears automatically.
 *
 * Shape:
 *   {
 *     id:        'acme-ops',              // stable key for AnimatePresence
 *     quote:     '…',                     // 40–70 words reads best in the card
 *     rating:    5,                       // 0–5, halves allowed (4.5)
 *     author:    'Full Name',
 *     role:      'Operations Director',
 *     company:   'Company Ltd',
 *     avatar:    '/photos/testimonials/acme.webp',  // 160×160; omit for initials
 *     serviceId: 'automation',            // optional — matches servicesData[].id
 *   }
 */
export const testimonials = [];
