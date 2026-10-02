import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton, { ScrollReset } from './components/ScrollToTop';
import { AmbientBackdrop } from './components/ui/Ambient';
import { ScrollProgress } from './components/ui/Motion';

// Eagerly load Home page for instant initial paint
import Home from './pages/Home';

// Lazy load non-Home pages to minimize initial mobile bundle size
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Work = lazy(() => import('./pages/Work'));
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Route-level transition. Kept short so navigation never feels laggy. */
function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/services" element={<Page><Services /></Page>} />
          <Route path="/services/:serviceId" element={<Page><ServiceDetail /></Page>} />
          <Route path="/solutions" element={<Page><Solutions /></Page>} />
          <Route path="/work" element={<Page><Work /></Page>} />
          <Route path="/work/:slug" element={<Page><WorkDetail /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/privacy" element={<Page><Legal kind="privacy" /></Page>} />
          <Route path="/terms" element={<Page><Legal kind="terms" /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollReset />
        <div className="noise-layer relative flex min-h-screen flex-col bg-canvas text-ink">
          <AmbientBackdrop />
          <ScrollProgress />
          <Navbar />

          <main className="relative z-10 flex-grow">
            <AnimatedRoutes />
          </main>

          <div className="relative z-10">
            <Footer />
          </div>

          <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
