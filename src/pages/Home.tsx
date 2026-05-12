import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  // Globe,
  // Users,
  // Award,
  // Shield,
  // Zap,
  // HeadphonesIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveCard from '../components/InteractiveCard';

import { useTheme } from '../contexts/ThemeContext';
import ServiceCarousel from '../components/ServiceCarousel';
import SEO from '../components/SEO';

// Import product images
import chatzImg from '../assets/products/chatz.io.webp';
import imgGenImg from '../assets/products/img_gen.webp';

// Import project images from assets/services
import acImg from '../assets/services/ac.webp';
import sasImg from '../assets/services/sas.webp';
import karpagamImg from '../assets/services/karpagam.webp';
import whycardImg from '../assets/serivice caosel/whycard.webp';

// Import company logo
import halfLogo from '../assets/company_logo/half_logo.webp';

// Sample project data
const sampleProjects = [
  {
    id: 1,
    title: 'Cooling Services Website',
    description:
      'A service website for home appliance repairs including washing machines, fridges, and ACs.',
    image: acImg,
    link: 'https://multibrandwashingmachineservice.in/',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Business Consultancy Website',
    description:
      'A modern business website for an import-export consultancy firm offering expert guidance to global trade clients',
    image: sasImg,
    link: 'https://sas-impex.netlify.app/',
    category: 'Web Development',
  },
  {
    id: 3,
    title: 'Sri Karpagam Brand Website',
    description:
      'A product showcase website featuring traditional flours and food mixes with a clean product gallery',
    image: karpagamImg,
    link: 'https://srikarpagambrand.in/',
    category: 'Web Development',
  },
];

const Home = () => {
  const { isDark } = useTheme();



  // const features = [
  //   {
  //     title: 'Global Reach',
  //     description: 'Serving clients worldwide with 24/7 support',
  //     icon: <Globe className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
  //     color: 'emerald' as const,
  //   },
  //   {
  //     title: 'Expert Team',
  //     description: 'Skilled professionals with years of experience',
  //     icon: <Users className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
  //     color: 'purple' as const,
  //   },
  //   {
  //     title: 'Quality Assured',
  //     description: 'Premium solutions with guaranteed satisfaction',
  //     icon: <Award className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
  //     color: 'blue' as const,
  //   },
  // ];



  const slideL = {
    hidden: { opacity: 0, x: typeof window !== 'undefined' && window.innerWidth < 640 ? -12 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideR = {
    hidden: { opacity: 0, x: typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen pt-16">
      <SEO
        title="Integer.IO Tech | AI Automation & Web Development Company in Madurai, Coimbatore & Chennai"
        description="Integer.IO Tech is a leading AI automation company and web development company in Madurai. We provide SaaS products, React development, business automation, digital transformation and final year projects across Tamil Nadu."
        page=""
      />
      {/* Hero Section with Enhanced Effects */}
      <section className="relative pt-16 sm:pt-24 md:pt-32 pb-10 sm:pb-20 px-3 sm:px-4 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            {/* Animated Badge */}
            <motion.div
              variants={slideL}
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-purple-500/20 border border-emerald-500/30 mb-2 sm:mb-4"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400 mr-1.5 sm:mr-2" />
              <span
                className={`text-xs sm:text-sm font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-600'
                  }`}
              >
                Trusted by 100+ clients
              </span>
            </motion.div>

            <h1 className="flex flex-col items-center justify-center gap-1 sm:gap-2 text-3xl sm:text-4xl md:text-7xl font-bold mb-4 sm:mb-8">
              <motion.span variants={slideR} className="flex items-center justify-center gap-2 sm:gap-4">
                <img src={halfLogo} alt="Integer.IO Tech - Top Madurai IT Companies" className="h-16 sm:h-14 md:h-24 w-auto object-contain" />
                <span className={`bg-gradient-to-r bg-clip-text text-transparent pb-0 sm:pb-1 text-xl sm:text-3xl md:text-5xl drop-shadow-sm ${isDark
                  ? 'from-emerald-300 via-violet-300 to-blue-300'
                  : 'from-violet-900 via-blue-800 to-emerald-800'
                  }`} style={{ lineHeight: '1.2' }}>
                  Integer.IO Tech
                </span>
              </motion.span>
              <div className="h-3 sm:h-6"></div>
              <motion.span
                variants={slideL}
                className={`text-base sm:text-2xl md:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'
                  }`}
              >
                Web Development & AI Automation Company
              </motion.span>
            </h1>

            <motion.p
              variants={slideR}
              className={`text-sm sm:text-xl md:text-2xl mb-3 sm:mb-6 mt-4 sm:mt-6 max-w-4xl mx-auto font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'
                }`}
            >
              Empowering Startups & Enterprises with Scalable AI-Driven Digital Solutions
            </motion.p>

            <motion.p
              variants={slideL}
              className={`text-xs sm:text-lg mb-4 sm:mb-10 max-w-4xl mx-auto font-medium leading-relaxed px-4 ${isDark ? 'text-gray-300' : 'text-gray-800'
                }`}
            >
              We specialize in high-performance React development, AI automation solutions, and custom SaaS products. Based in Madurai and serving clients globally, Integer.IO Tech bridges the gap between vision and technology, delivering future-ready solutions that drive efficiency and growth for modern businesses.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-16"
          >
            <Link
              to="/contact"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center group hover:scale-105 transform shadow-lg btn-hover-effect min-w-[200px]"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/918015355914?text=Hi! I'm interested in your services. Can we discuss?"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-6 py-3 sm:px-10 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform shadow-lg btn-hover-effect flex items-center justify-center gap-2 min-w-[200px]"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-2 sm:py-4 px-3 sm:px-4 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideL}
            className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 ${isDark ? 'bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400' : 'text-black'}`}
          >
            Our Core Services
          </motion.h2>

          <motion.section
            id="services"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideR}
          >
            <ServiceCarousel />
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideL}
            className="text-center mt-6 sm:mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform shadow-lg btn-hover-effect group"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Integer.IO Tech Section */}
      <section className="py-8 sm:py-16 px-4 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className={`p-5 sm:p-8 md:p-10 rounded-[2rem] backdrop-blur-xl border shadow-2xl transition-all duration-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-emerald-500/10'}`}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideL}
              className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-10 sm:mb-14 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Why Integer.IO Tech?
            </motion.h2>

          <div className="flex flex-row gap-4 sm:gap-12 lg:gap-20 items-center">
            
            {/* Left Side: Points List */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-6">
              {[
                { title: 'Time Management', description: 'Projects delivered precisely within 150 - 200 hours.' },
                { title: '24x7 Available', description: 'Always here to support you, any time of the day.' },
                { title: 'Modern AI Integration', description: 'Seamlessly incorporating the latest AI into your systems.' },
                { title: 'Maximum Security', description: 'Your project details and data must be fully secure.' },
                { title: 'Scalable Architecture', description: 'Future-proof solutions designed to grow with your business.' },
                { title: 'Creative Design', description: 'Beautiful, modern UI/UX that makes your brand stand out.' }
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideL}
                  custom={index}
                  className="flex flex-col border-l-4 border-emerald-500 pl-4 sm:pl-5"
                >
                  <h3 className={`text-sm sm:text-lg font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {point.title}
                  </h3>
                  <p className={`text-[10px] sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Side: Image Placeholder */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideR}
              className="hidden lg:flex lg:w-1/3 justify-center"
            >
              <div className="w-full max-w-sm sm:max-w-md">
                <InteractiveCard glowColor="emerald" className="!p-0 overflow-hidden">
                  <img
                    src={whycardImg}
                    alt="Why Integer.IO Tech - AI & Web Development"
                    className="w-full h-auto object-contain"
                  />
                </InteractiveCard>
              </div>
            </motion.div>

          </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-10 sm:py-20 px-3 sm:px-4 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideL}
            className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Our Premium Products
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideR}
            className={`text-center text-xs sm:text-lg mb-6 sm:mb-16 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
          >
            Discover our flagship digital solutions designed to transform your business operations and drive growth
          </motion.p>

          <div className="grid grid-cols-2 gap-2 sm:gap-6 md:gap-10">
            {/* Chatz.IO Product */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideL}
            >
              <InteractiveCard glowColor="emerald" className="h-full overflow-hidden">
                <div className={`relative rounded-t-xl ${isDark ? 'bg-gray-800/40' : 'bg-gray-50/50'}`}>
                  <img
                    src={chatzImg}
                    alt="Chatz.IO - SaaS Products by Integer.IO Tech for Students"
                    loading="lazy"
                    className="w-full h-36 sm:h-48 md:h-64 object-contain p-2"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className={`text-base sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Chatz.IO
                  </h3>
                  <p className={`text-[11px] sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    An intelligent AI-powered chat assistant designed specifically for students. Get help with studies and research.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </InteractiveCard>
            </motion.div>

            {/* Dips.IO Product */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideR}
            >
              <InteractiveCard glowColor="purple" className="h-full overflow-hidden">
                <div className={`relative rounded-t-xl ${isDark ? 'bg-gray-800/40' : 'bg-gray-50/50'}`}>
                  <img
                    src={imgGenImg}
                    alt="Dips.IO - Next-Gen SaaS Products by Integer.IO Tech"
                    loading="lazy"
                    className="w-full h-36 sm:h-48 md:h-64 object-contain p-2"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                    COMING SOON
                  </span>
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className={`text-base sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Dips.IO
                  </h3>
                  <p className={`text-[11px] sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    An innovative next-gen digital platform coming soon! Stay tuned for revolutionary features.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-purple-500 hover:bg-purple-600 text-white px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </InteractiveCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="py-10 sm:py-20 px-3 sm:px-4 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideL}
            className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-16 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Featured Projects
          </motion.h2>

          <div className="force-cols-2-mobile force-cols-3-desktop gap-2 sm:gap-8">
            {sampleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={index % 2 === 0 ? slideL : slideR}
                className={`group ${index >= 2 ? 'hidden sm:block' : ''}`}
              >
                <InteractiveCard
                  glowColor="emerald"
                  className="overflow-hidden h-full"
                >
                  <div className="relative overflow-hidden rounded-lg mb-1 sm:mb-4">
                    <img
                      src={project.image}
                      alt={`${project.title} - Cost efficient web development by Integer.IO Tech`}
                      loading="lazy"
                      className="w-full h-24 sm:h-44 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-1 sm:p-2 flex flex-col h-full">
                    <span className={`text-[9px] sm:text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {project.category}
                    </span>
                    <h3
                      className={`text-xs sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-[10px] sm:text-sm mb-2 sm:mb-4 flex-grow line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                    >
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-[9px] sm:text-sm font-medium transition-colors ${isDark
                        ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                    >
                      Visit <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideR}
            className="text-center mt-6 sm:mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg btn-hover-effect"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Home;
