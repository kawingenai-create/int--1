import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, FileText, ExternalLink, CheckCircle2 } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import ModernProjectCarousel from '../components/ModernProjectCarousel';
import { useTheme } from '../contexts/ThemeContext';
import SEO from '../components/SEO';

// Import project images from assets/services
import acImg from '../assets/services/ac.webp';
import sasImg from '../assets/services/sas.webp';
import floqImg from '../assets/services/floq.webp';
import karpagamImg from '../assets/services/karpagam.webp';
import busImg from '../assets/services/bus.webp';

// Import FYP images
import fyp1 from '../assets/fyp_img/fyp_1.webp';
import fyp2 from '../assets/fyp_img/fyp_2.webp';
import fyp3 from '../assets/fyp_img/fyp_3.webp';
import fyp4 from '../assets/fyp_img/fyp_4.webp';
import fyp5 from '../assets/fyp_img/fyp_5.webp';
import fyp6 from '../assets/fyp_img/fyp_6.webp';
import fyp7 from '../assets/fyp_img/fyp_7.webp';
import fyp8 from '../assets/fyp_img/fyp_8.webp';
import fyp9 from '../assets/fyp_img/fyp_9.webp';
import fyp10 from '../assets/fyp_img/fyp_10.webp';
import fyp11 from '../assets/fyp_img/fyp_11.webp';
import fyp12 from '../assets/fyp_img/fyp_12.webp';
import fyp13 from '../assets/fyp_img/fyp_13.webp';
import fyp14 from '../assets/fyp_img/fyp_14.webp';
import fyp15 from '../assets/fyp_img/fyp_15.webp';
import fyp16 from '../assets/fyp_img/fyp_16.webp';
import fyp18 from '../assets/fyp_img/fyp_18.webp';
import fyp19 from '../assets/fyp_img/fyp_19.webp';
import fyp20 from '../assets/fyp_img/fyp_20.webp';
import fyp21 from '../assets/fyp_img/fyp_21.webp';

const portfolioProjects = [
  {
    id: 1,
    title: 'SAS Impex Services',
    description:
      'Professional business website for SAS Impex featuring comprehensive services, detailed contact information, and integrated Google Maps for easy location access. Built with modern web technologies to ensure optimal performance and user experience.',
    image: sasImg,
    link: 'https://sas-impex.netlify.app/',
    category: 'Web Development',
    technologies: ['React', 'Tailwind CSS', 'JSX', 'Responsive Design'],
  },
  {
    id: 2,
    title: 'Cooling Services',
    description:
      'Responsive service website for multi-brand washing machine repairs and installations. Features service booking, technician locator, and comprehensive repair guides with real-time availability checking.',
    image: acImg,
    link: 'https://multibrandwashingmachineservice.in/',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
  },
  {
    id: 3,
    title: 'floq pump',
    description:
      'Professional informational consulting website for bus operators featuring clean HTML design, service details, and consultation booking system with integrated contact forms and business analytics.',
    image: floqImg,
    link: 'https://demo.floqpumps.com/',
    category: 'Web Development',
    technologies: ['JavaScript', 'Bootstrap', 'react', 'tailwindcss'],
  },
  {
    id: 4,
    title: 'Sri Karpagam Brand',
    description:
      "Modern React website showcasing Sri Karpagam's premium product highlights and brand story. Features interactive product galleries, brand heritage sections, and customer testimonials with smooth animations.",
    image: karpagamImg,
    link: 'https://srikarpagambrand.in/',
    category: 'Web Development',
    technologies: ['React', 'Tailwind CSS', 'JSX', 'Framer Motion'],
  },
  {
    id: 5,
    title: 'Bus Consulting Services',
    description:
      'Professional informational consulting website for bus operators featuring clean HTML design, service details, and consultation booking system with integrated contact forms and business analytics.',
    image: busImg,
    link: 'https://www.busconsulting.in/',
    category: 'Web Development',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
  },
];



const fypBatch1 = [
  { img: fyp1, domain: 'Web App' },
  { img: fyp2, domain: 'AI/ML' },
  { img: fyp3, domain: 'Web App' },
  { img: fyp4, domain: 'Web App' },
  { img: fyp5, domain: 'Mobile App' },
  { img: fyp6, domain: 'Web App' },
  { img: fyp7, domain: 'AI/ML' },
  { img: fyp8, domain: 'AI/ML' },
  { img: fyp9, domain: 'Web App' },
  { img: fyp10, domain: 'AI/ML' },
];

const fypBatch2 = [
  { img: fyp11, domain: 'AI/ML' },
  { img: fyp12, domain: 'Web App' },
  { img: fyp13, domain: 'Web App' },
  { img: fyp14, domain: 'AI/ML' },
  { img: fyp15, domain: 'AI/ML' },
  { img: fyp16, domain: 'Web App' },
  { img: fyp18, domain: 'AI/ML' },
  { img: fyp19, domain: 'Web App' },
  { img: fyp20, domain: 'AI/ML' },
  { img: fyp21, domain: 'Web App' },
];

const Projects = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();


  return (
    <div className="relative min-h-screen pt-20">
      <SEO
        title="Student Projects in Madurai, Coimbatore & Chennai | Final Year Projects by Integer.IO Tech"
        description="Download and explore final year projects overall TamilNadu provided by Integer.IO Tech. We help students with AI, ML, Data Science, and cost efficient web development projects."
        page="projects"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h1 className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Projects
          </h1>
          <p
            className={`text-xs sm:text-lg md:text-xl max-w-4xl mx-auto font-medium leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'
              }`}
          >
            Explore our diverse portfolio of client success stories and download comprehensive project collections designed for technical excellence. From enterprise-grade web applications to cutting-edge AI research projects, we demonstrate our commitment to delivering high-impact digital solutions that solve real-world business challenges and academic requirements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sm:mb-20"
        >
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Client Projects
          </h2>

          <ModernProjectCarousel projects={portfolioProjects} />
        </motion.div>

        {/* ── Need a Custom Project? CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-20"
        >
          <InteractiveCard className="!p-6 sm:!p-10 md:!p-12 hover-3d text-center">
            <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Need a Custom Project?
            </h2>
            <p className={`text-sm sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Let's discuss your requirements and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contact#contact-form')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 shadow-lg hover:scale-105"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                Get in Touch
              </button>
              <a
                href="mailto:integer.io.ai@gmail.com"
                className={`inline-flex items-center justify-center gap-2 border-2 border-purple-500 px-6 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 hover:scale-105 ${isDark ? 'text-purple-400 hover:bg-purple-500 hover:text-white' : 'text-purple-700 hover:bg-purple-500 hover:text-white'
                  }`}
              >
                Email Us
              </a>
            </div>
          </InteractiveCard>
        </motion.div>

        {/* Rest of your existing code for PDF categories... */}
        {/* Infinite FYP Carousels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sm:mb-20 overflow-hidden"
        >
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🎓 Final Year Projects
          </h2>

          {/* Carousel 1 (Moving Left) */}
          <div className="relative overflow-hidden mb-6 sm:mb-8 pb-4 carousel-mask">
            <div
              className="flex gap-4 sm:gap-6 w-max animate-scroll-left transform-gpu"
            >
              {[...fypBatch1, ...fypBatch1].map((item, i) => (
                <div
                  key={i}
                  className={`relative w-40 sm:w-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border p-1 sm:p-2 transition-transform duration-500 hover:scale-[1.02] ${isDark
                    ? 'bg-gray-800/80 border-gray-700/50 text-white'
                    : 'bg-white/80 border-gray-200 text-gray-800'
                    }`}
                >
                  <div className="relative w-full h-28 sm:h-40 rounded-xl overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.domain}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge in the corner */}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded text-[9px] sm:text-[11px] font-bold border border-white/20 z-10 shadow-lg">
                      {item.domain}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel 2 (Moving Right) */}
          <div className="relative overflow-hidden pb-4 carousel-mask">
            <div
              className="flex gap-4 sm:gap-6 w-max animate-scroll-right transform-gpu"
            >
              {[...fypBatch2, ...fypBatch2].map((item, i) => (
                <div
                  key={i}
                  className={`relative w-40 sm:w-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border p-1 sm:p-2 transition-transform duration-500 hover:scale-[1.02] ${isDark
                    ? 'bg-gray-800/80 border-gray-700/50 text-white'
                    : 'bg-white/80 border-gray-200 text-gray-800'
                    }`}
                >
                  <div className="relative w-full h-28 sm:h-40 rounded-xl overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.domain}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge in the corner */}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded text-[9px] sm:text-[11px] font-bold border border-white/20 z-10 shadow-lg">
                      {item.domain}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Register Button */}
          <div className="flex justify-center mt-6 sm:mt-10">
            <a
              href="https://integer-io-projectportal.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-600 hover:to-purple-600 text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1"
            >
              Register for a Project
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Projects;
