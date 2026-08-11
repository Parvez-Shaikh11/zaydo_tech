import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import Logo from './ui/Logo';
import { Magnetic } from './ui/Motion';
import { navLinks } from '../data/site';
import { servicesData } from '../data/servicesData';
import { useTheme } from '../theme/ThemeProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef(null);
  const { pathname } = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation closes every overlay.
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMobileOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Small grace period so the pointer can cross the gap into the dropdown.
  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

  const isActive = (path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-5 sm:pt-5">
        <motion.header
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-6 ${
            scrolled
              ? 'glass-nav h-16 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.85)]'
              : 'h-[4.5rem] border border-transparent bg-transparent'
          }`}
        >
          {/* --- brand ------------------------------------------------- */}
          <Logo variant="full" className="h-7 sm:h-8 lg:h-9" />

          {/* --- desktop nav ------------------------------------------- */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={link.hasMenu ? openMenu : undefined}
                  onMouseLeave={link.hasMenu ? scheduleClose : undefined}
                >
                  <NavLink
                    to={link.path}
                    className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                      active ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full border border-brand-500/30 bg-brand-500/12"
                      />
                    )}
                    {link.name}
                    {link.hasMenu && (
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                  </NavLink>

                  {/* services mega menu */}
                  {link.hasMenu && (
                    <AnimatePresence>
                      {menuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-4"
                        >
                          {/* Opaque, not glass: a backdrop-filter nested inside the
                              header's own backdrop-filter is ignored by browsers,
                              which made this panel see-through. */}
                          <div className="menu-panel overflow-hidden rounded-3xl p-2">
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                              {servicesData.map((service) => (
                                <Link
                                  key={service.id}
                                  to={`/services/${service.id}`}
                                  className="group flex items-start gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-line/[0.06]"
                                >
                                  <span
                                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                      borderColor: `${service.accent}40`,
                                      background: `${service.accent}1a`,
                                      color: service.accent,
                                    }}
                                  >
                                    <service.icon className="h-4 w-4" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[0.8rem] font-bold text-ink">
                                      {service.short}
                                    </span>
                                    <span className="mt-0.5 block truncate text-[0.7rem] text-faint">
                                      {service.tagline}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                            <Link
                              to="/services"
                              className="mt-1 flex items-center justify-between rounded-2xl bg-line/[0.04] px-4 py-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyanic-400 transition-colors hover:bg-line/[0.08]"
                            >
                              View all capabilities
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* --- actions ------------------------------------------------ */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line/10 bg-line/[0.04] text-muted transition-all duration-300 hover:border-brand-500/40 hover:text-ink"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
                  transition={{ duration: 0.28 }}
                >
                  {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Magnetic className="hidden sm:block">
              <Link to="/contact" className="btn btn-primary !px-5 !py-2.5 !text-[0.68rem]">
                Start Project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line/10 bg-line/[0.04] text-ink lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </motion.header>
      </div>

      {/* --- mobile drawer ------------------------------------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-line/10 bg-canvas"
            >
              <div className="flex items-center justify-between border-b border-line/10 px-5 py-4">
                <Logo variant="mark" className="h-7" onClick={() => setMobileOpen(false)} />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line/10 text-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6">
                <nav className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.05 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
                          isActive(link.path)
                            ? 'bg-brand-500/12 text-cyanic-400'
                            : 'text-muted hover:bg-line/[0.05] hover:text-ink'
                        }`}
                      >
                        {link.name}
                        <ArrowRight className="h-4 w-4 opacity-40" />
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                <p className="eyebrow mt-8 mb-3 px-4 text-faint">Capabilities</p>
                <div className="space-y-1">
                  {servicesData.map((service, i) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.045 }}
                    >
                      <Link
                        to={`/services/${service.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.82rem] text-muted transition-colors hover:bg-line/[0.05] hover:text-ink"
                      >
                        <service.icon className="h-4 w-4" style={{ color: service.accent }} />
                        {service.short}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-line/10 p-5">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
