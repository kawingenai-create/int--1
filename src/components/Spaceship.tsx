import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const DESKTOP_MIN = 1024;
const TABLET_MIN = 768;

const useViewport = () => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle, { passive: true } as any);
    return () => window.removeEventListener('resize', handle as any);
  }, []);

  return {
    width,
    isDesktop: width >= DESKTOP_MIN,
    isTabletOnly: width >= TABLET_MIN && width < DESKTOP_MIN,
  };
};

const Spaceship: React.FC = () => {
  const { isDark } = useTheme();
  const { isDesktop, isTabletOnly } = useViewport();

  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [dockY, setDockY] = useState<number | null>(null);

  const rafIdRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafIdRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        tickingRef.current = false;
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove as any, { passive: true } as any);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove as any);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isDesktop]);

  // Hide when footer is visible
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight || 0;
          const isVisible = entry.isIntersecting;
          setIsFooterVisible(isVisible);
          if (isVisible) {
            const targetY = Math.max(40, viewportHeight - rect.height - 80);
            setDockY(targetY);
          } else {
            setDockY(null);
          }
        }
      },
      { root: null, threshold: 0.01 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const { spaceshipX, spaceshipY, rotation } = useMemo(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const baseX = 100 + ((scrollY * 0.06) % Math.max(200, width - 200));
    const baseY = 200 + Math.sin(scrollY * 0.006) * 30;
    const mouseY = isDesktop ? mousePosition.y * 0.015 : 0;
    const mouseRot = isDesktop ? mousePosition.x * 0.008 : 0;
    return {
      spaceshipX: baseX,
      spaceshipY: baseY + mouseY,
      rotation: Math.sin(scrollY * 0.008) * 6 + mouseRot,
    };
  }, [scrollY, mousePosition.x, mousePosition.y, isDesktop]);

  if (!isDesktop && !isTabletOnly) return null;

  if (isTabletOnly) {
    const leftOffset = 0;
    const topOffset = 150 + Math.sin(scrollY * 0.004) * 20;
    return (
      <motion.div
        className="fixed pointer-events-none z-10 hidden md:block"
        style={{ left: leftOffset, top: topOffset }}
        animate={{ y: [0, 8, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          <motion.div
            className="absolute -left-10 top-1/2 -translate-y-1/2"
            animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.6, 0.9, 0.6] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={`w-16 h-3 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent via-blue-400 to-violet-500' : 'bg-gradient-to-r from-transparent via-violet-500 to-blue-600'}`} />
          </motion.div>
          <div className={`w-20 h-20 rounded-full blur-2xl opacity-30 ${isDark ? 'bg-blue-400' : 'bg-violet-500'}`} />
        </div>
      </motion.div>
    );
  }

  // Desktop: Original Structure Restored with Enhancements
  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{ left: spaceshipX, top: dockY ?? spaceshipY }}
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 15, damping: 40, mass: 1 }}
      >
        {/* Container for Rocket + Rings */}
        <div className="relative opacity-60">
          {/* Flame Trails */}
          <motion.div
            className="absolute -left-28 top-1/2 transform -translate-y-1/2"
            animate={{ opacity: [0.25, 0.7, 0.25], scaleX: [0.6, 1.1, 0.6], scaleY: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={`w-24 h-5 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent via-blue-400 to-violet-500' : 'bg-gradient-to-r from-transparent via-violet-500 to-blue-600'}`} />
          </motion.div>

          <motion.div
            className="absolute -left-20 top-1/2 transform -translate-y-1/2"
            animate={{ opacity: [0.15, 0.5, 0.15], scaleX: [0.5, 0.9, 0.5] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          >
            <div className={`w-14 h-3 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent via-emerald-400 to-blue-500' : 'bg-gradient-to-r from-transparent via-violet-400 to-blue-500'}`} />
          </motion.div>

          <motion.div
            className="absolute -left-12 top-1/2 transform -translate-y-1/2"
            animate={{ opacity: [0.08, 0.3, 0.08], scaleX: [0.4, 0.7, 0.4] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <div className={`w-10 h-2 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent via-violet-400 to-blue-500' : 'bg-gradient-to-r from-transparent via-violet-500 to-blue-500'}`} />
          </motion.div>

          {/* Rocket SVG - Scaled Up 20% (96px width vs original 80px) */}
          <motion.svg
            width="96"
            height="48"
            viewBox="0 0 80 40"
            className="drop-shadow-2xl"
            animate={{
              filter: [
                'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))',
                'drop-shadow(0 0 25px rgba(16, 185, 129, 0.7))',
                'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <defs>
              <linearGradient id="spaceshipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isDark ? '#1e293b' : '#e2e8f0'} />
                <stop offset="30%" stopColor={isDark ? '#334155' : '#cbd5e1'} />
                <stop offset="70%" stopColor={isDark ? '#475569' : '#94a3b8'} />
                <stop offset="100%" stopColor={isDark ? '#64748b' : '#64748b'} />
              </linearGradient>
              <linearGradient id="cockpitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? '#06b6d4' : '#3b82f6'} />
                <stop offset="50%" stopColor={isDark ? '#0891b2' : '#2563eb'} />
                <stop offset="100%" stopColor={isDark ? '#0e7490' : '#1d4ed8'} />
              </linearGradient>
              <radialGradient id="engineGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={isDark ? '#fbbf24' : '#f59e0b'} />
                <stop offset="50%" stopColor={isDark ? '#ef4444' : '#dc2626'} />
                <stop offset="100%" stopColor={isDark ? '#991b1b' : '#7f1d1d'} />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <ellipse cx="40" cy="20" rx="35" ry="12" fill="url(#spaceshipGradient)" filter="url(#glow)" />
            <ellipse cx="40" cy="20" rx="30" ry="8" fill={isDark ? '#475569' : '#94a3b8'} opacity="0.7" />
            <ellipse cx="40" cy="20" rx="25" ry="6" fill={isDark ? '#64748b' : '#6b7280'} opacity="0.5" />

            <ellipse cx="55" cy="20" rx="12" ry="8" fill="url(#cockpitGradient)" opacity="0.9" />
            <ellipse cx="55" cy="20" rx="8" ry="5" fill={isDark ? '#0ea5e9' : '#0284c7'} opacity="0.6" />

            <polygon points="15,14 8,8 22,16" fill={isDark ? '#64748b' : '#6b7280'} />
            <polygon points="15,26 8,32 22,24" fill={isDark ? '#64748b' : '#6b7280'} />
            <polygon points="17,15 12,10 20,17" fill={isDark ? '#94a3b8' : '#9ca3af'} opacity="0.7" />
            <polygon points="17,25 12,30 20,23" fill={isDark ? '#94a3b8' : '#9ca3af'} opacity="0.7" />

            <circle cx="12" cy="20" r="5" fill="url(#engineGradient)" filter="url(#glow)" />
            <circle cx="12" cy="20" r="3" fill={isDark ? '#fbbf24' : '#f59e0b'} />
            <circle cx="12" cy="20" r="1.5" fill={isDark ? '#fef3c7' : '#fef3c7'} />

            <line x1="28" y1="20" x2="48" y2="20" stroke={isDark ? '#94a3b8' : '#64748b'} strokeWidth="2" />
            <line x1="30" y1="16" x2="46" y2="16" stroke={isDark ? '#cbd5e1' : '#9ca3af'} strokeWidth="1" />
            <line x1="30" y1="24" x2="46" y2="24" stroke={isDark ? '#cbd5e1' : '#9ca3af'} strokeWidth="1" />

            <motion.circle cx="60" cy="16" r="2" fill={isDark ? '#10b981' : '#059669'} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.circle cx="60" cy="24" r="2" fill={isDark ? '#ef4444' : '#dc2626'} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} />

            <rect x="25" y="18" width="12" height="4" rx="2" fill={isDark ? '#6366f1' : '#4f46e5'} opacity="0.8" />
            <rect x="27" y="19" width="8" height="2" rx="1" fill={isDark ? '#8b5cf6' : '#7c3aed'} opacity="0.6" />
          </motion.svg>

          {/* Random Particles */}
          <motion.div className="absolute -left-30 top-1/2 transform -translate-y-1/2">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? (isDark ? 'bg-blue-400' : 'bg-violet-500') : i % 3 === 1 ? (isDark ? 'bg-emerald-400' : 'bg-blue-500') : isDark ? 'bg-violet-400' : 'bg-blue-500'
                  }`}
                style={{ left: -i * 3, top: (Math.random() - 0.5) * 20 }}
                animate={{ opacity: [1, 0], scale: [1, 0], x: [-5, -20] }}
                transition={{ duration: 0.6, delay: i * 0.05, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
          </motion.div>

        </div>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-0"
        style={{ left: spaceshipX - 25, top: (dockY ?? spaceshipY) + 70 }}
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={`w-32 h-16 rounded-full blur-xl ${isDark ? 'bg-blue-400' : 'bg-violet-500'}`} />
      </motion.div>
    </>
  );
};

export default Spaceship;
