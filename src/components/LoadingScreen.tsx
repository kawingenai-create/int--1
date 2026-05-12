import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SpaceBackground from './SpaceBackground';
import SaturnPlanet from './JupiterPlanet';
import logo from '../assets/company_logo/half_logo.webp';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Optimized for faster loading
    const isMobile = window.innerWidth < 768;
    const updateInterval = isMobile ? 40 : 30; // Faster interval
    const progressIncrement = isMobile ? 3 : 2.5; // Larger increments

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Ensure we don't get stuck at 99.x
        const increment = prev > 90 ? 5 : progressIncrement;
        const newProgress = Math.min(prev + increment, 100);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoading(false);
            setTimeout(onComplete, 100);
          }, 150);
          return 100;
        }

        return newProgress;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }} // Added scale for smoother exit
          transition={{ duration: 0.4, ease: 'easeInOut' }} // Smoother transition
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Use Same Background Components as Website */}
          <SpaceBackground />
          <SaturnPlanet />

          {/* Main Loading Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
            {/* Logo Section with Small to Big Animation */}
            <motion.div
              className="mb-12"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
                type: 'spring',
                stiffness: 120,
                damping: 18,
              }}
            >
              <motion.img
                src={logo}
                alt="Integer.IO"
                className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 object-contain"
                initial={{ scale: 0.3, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                }}
              />

              <motion.h1
                className={`text-4xl md:text-5xl font-bold text-center mb-8 py-4 leading-none bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm ${
                  isDark
                    ? 'from-emerald-300 via-violet-300 to-blue-300'
                    : 'from-violet-900 via-blue-800 to-emerald-800'
                }`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Integer.IO Tech
                </motion.span>
              </motion.h1>

              <motion.p
                className={`text-lg font-light text-center ${isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Professional Technology Solutions
              </motion.p>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              className="w-full max-w-md space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {/* Percentage Display */}
              <motion.div
                className="text-6xl font-bold text-center mb-8"
                style={{
                  background: 'linear-gradient(90deg, #10b981, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {Math.round(progress)}%
              </motion.div>

              {/* Corporate Progress Bar */}
              <div className="relative">
                <div
                  className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800/50' : 'bg-slate-300/50'
                    }`}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #10b981, #8b5cf6)',
                      width: `${progress}%`,
                    }}
                    transition={{
                      width: { duration: 0.3, ease: 'easeOut' },
                    }}
                  />
                </div>

                {/* Removed the duplicate motion.div with conflicting properties */}
              </div>

              {/* Professional Status Text */}
              <motion.div
                className="space-y-2"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 h-1 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'
                        }`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <p
                className={`text-xs font-light tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
              >
                © 2025 Integer.IO Tech - Professional Technology Solutions
              </p>
            </motion.div>
          </div>

          {/* Minimal Professional Accent Lines */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background:
                'linear-gradient(90deg, transparent, #10b981, #8b5cf6, transparent)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background:
                'linear-gradient(90deg, transparent, #8b5cf6, #10b981, transparent)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.2,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
