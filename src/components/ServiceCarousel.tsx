import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ServiceCarousel.css';

// Import local images
import webdevImg from '../assets/serivice caosel/webdev_services.webp';
import aiImg from '../assets/serivice caosel/ai_services.webp';
import softwareImg from '../assets/serivice caosel/software_services.webp';
import finalyrImg from '../assets/serivice caosel/finalyr_services.webp';
import digitalMarketingImg from '../assets/serivice caosel/digital marketing_services.webp';

const ServiceCarousel = () => {
  const { isDark } = useTheme();
  const [rotation, setRotation] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const services = [
    {
      title: 'Web Application Development',
      description: 'We design and develop secure, scalable web solutions for businesses and startups.',
      image: webdevImg,
    },
    {
      title: 'AI Product & Automation Services',
      description: 'We build intelligent AI solutions to automate workflows and improve business efficiency.',
      image: aiImg,
    },
    {
      title: 'Custom Software & SaaS Product Development',
      description: 'We create custom software and SaaS platforms tailored to real business needs.',
      image: softwareImg,
    },
    {
      title: 'Digital Marketing & Branding Services',
      description: 'We help brands grow their online presence and generate high-quality leads.',
      image: digitalMarketingImg,
    },
    {
      title: 'Education & Student Services',
      description: 'We support students and working professionals with industry-ready solutions.',
      image: finalyrImg,
    },
  ];

  // Intersection Observer to optimize performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const deltaX = e.clientX - lastMouseXRef.current;
    rotationRef.current = (rotationRef.current + deltaX * 0.3) % 360;
    (carouselRef.current as HTMLDivElement).style.transform = `rotateY(${rotationRef.current}deg)`;
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setTimeout(() => setIsPaused(false), 200); // Resume quickly after drag
    }
  };

  // Touch interaction handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.touches[0].clientX;
    setIsPaused(true);
    // Do NOT preventDefault – allows vertical page scroll to propagate
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMouseXRef.current;
    rotationRef.current = (rotationRef.current + deltaX * 0.45) % 360;
    (carouselRef.current as HTMLDivElement).style.transform = `rotateY(${rotationRef.current}deg)`;
    lastMouseXRef.current = touch.clientX;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => setIsPaused(false), 300);
  };
  // Optimised animation loop – 30 fps cap on mobile to reduce scroll jank
  useEffect(() => {
    if (!isIntersecting || !carouselRef.current || isPaused) return;

    let lastTime = performance.now();
    const speed = isMobile ? 0.3 : 0.25;
    const frameLimit = isMobile ? 33 : 16; // 30 fps on mobile, 60 fps on desktop

    const step = (now: number) => {
      if (document.hidden || isPaused) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const delta = now - lastTime;
      if (delta >= frameLimit) {
        rotationRef.current = (rotationRef.current - speed) % 360;
        if (carouselRef.current) {
          (carouselRef.current as HTMLDivElement).style.transform = `rotateY(${rotationRef.current}deg)`;
        }
        lastTime = now;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isIntersecting, isPaused, isMobile]);

  // Keep rotation state in sync for initial render and when ref resets
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  return (
    <div
      ref={sectionRef}
      className={`service-section ${isDark ? 'dark-theme' : 'light-theme'}`}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <div
        className="carousel-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Handle leaving window while dragging
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
      >
        <div
          className="carousel"
          ref={carouselRef}
          style={{
            transform: `rotateY(${rotation}deg)`,
            willChange: isIntersecting && !isMobile ? 'transform' : 'auto',
          }}
        >
          {services.map((service, index) => {
            const theta = (360 / services.length) * index;

            return (
              <div
                key={index}
                className="carousel__face"
                style={{
                  transform: `rotateY(${theta}deg) translateZ(var(--translateZ))`,
                  '--theta': `${theta}deg`,
                } as React.CSSProperties}
              >
                <div className="carousel-content">
                  <div className="service-image-container">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-image"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;
