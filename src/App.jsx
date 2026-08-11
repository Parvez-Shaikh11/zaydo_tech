import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton, { ScrollReset } from './components/ScrollToTop';
import { AmbientBackdrop } from './components/ui/Ambient';
import { ScrollProgress } from './components/ui/Motion';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Solutions from './pages/Solutions';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

/** Route-level transition. Kept short so navigation never feels laggy. */
function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
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
