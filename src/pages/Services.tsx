import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Code, Brain, FileText, Megaphone, Search, Globe, Shield, MessageCircle, CheckCircle2 } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';
import SEO from '../components/SEO';

/* Safelist for dynamic Tailwind classes used in Services:
   from-emerald-500/10 to-emerald-500/10 text-emerald-400 bg-emerald-400
   from-purple-500/10 to-purple-500/10 text-purple-400 bg-purple-400
   from-blue-500/10 to-blue-500/10 text-blue-400 bg-blue-400
   from-pink-500/10 to-pink-500/10 text-pink-400 bg-pink-400
   from-indigo-500/10 to-indigo-500/10 text-indigo-400 bg-indigo-400
   from-orange-500/10 to-orange-500/10 text-orange-400 bg-orange-400
   from-teal-500/10 to-teal-500/10 text-teal-400 bg-teal-400
*/

const Services = () => {
  const { isDark } = useTheme();
  const location = useLocation();

  // Returns light-mode-safe color classes (no light green, pink, or sky blue)
  const iconColor = (color: string) => isDark
    ? `text-${color}-400`
    : ({
      emerald: 'text-emerald-700', purple: 'text-purple-700', blue: 'text-blue-700',
      pink: 'text-violet-700', indigo: 'text-indigo-700', cyan: 'text-teal-700',
      teal: 'text-teal-700', orange: 'text-orange-700'
    }[color] ?? 'text-gray-700');

  const dotColor = (color: string) => isDark
    ? `bg-${color}-400`
    : ({
      emerald: 'bg-emerald-700', purple: 'bg-purple-700', blue: 'bg-blue-700',
      pink: 'bg-violet-700', indigo: 'bg-indigo-700', cyan: 'bg-teal-700',
      teal: 'bg-teal-700', orange: 'bg-orange-700'
    }[color] ?? 'bg-gray-700');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedService, setHighlightedService] = useState<string | null>(null);
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle URL parameter for service navigation from footer
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceKey = params.get('service');
    if (serviceKey) {
      setHighlightedService(serviceKey);
      // Scroll to the service card after a short delay
      setTimeout(() => {
        const element = serviceRefs.current[serviceKey];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
      // Remove highlight after 3 seconds
      setTimeout(() => setHighlightedService(null), 3000);
    }
  }, [location.search]);

  const coreServices = [
    {
      key: 'web-development',
      category: 'Web Application Development',
      icon: <Code className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'emerald' as const,
      description: 'We design and develop secure, scalable, and high-performance web solutions tailored to the unique needs of modern businesses and ambitious startups. Our team leverages the latest frameworks like React and Next.js to build intuitive interfaces that engage users and drive conversions.',
      features: [
        'Static websites',
        'Dynamic web applications',
        'Database integrations',
        'Admin dashboards',
        'API integrations',
        'Performance optimization'
      ]
    },
    {
      key: 'ai-automation',
      category: 'AI Product & Automation Services',
      icon: <Brain className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'purple' as const,
      description: 'We build intelligent, future-ready AI solutions designed to automate complex workflows, enhance decision-making, and significantly improve overall business efficiency. From custom GPT models to automated data pipelines, we help you leverage AI for a competitive advantage.',
      features: [
        'AI chatbots',
        'Voice assistants',
        'NLP solutions',
        'Computer vision',
        'AI process automation',
        'Smart data insights'
      ]
    },
    {
      key: 'software-saas',
      category: 'Custom Software & SaaS Product Development',
      icon: <FileText className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'blue' as const,
      description: 'We create robust custom software and comprehensive SaaS platforms meticulously tailored to solve real-world business challenges. Our solutions focus on long-term scalability, data security, and seamless integration, ensuring your technical infrastructure grows alongside your company.',
      features: [
        'ERP That can include: Billing software, CRM, HR, Inventory',
        'CRM Solutions',
        'SaaS Platforms',
        'Data Analytics Dashboards',
        'PDF Auto-generation',
        'Business Automation Tools',
        'Role-based Systems'
      ]
    },
    {
      key: 'digital-marketing',
      category: 'Digital Marketing & Branding Services',
      icon: <Megaphone className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'pink' as const,
      description: 'We empower brands to dominate their digital space by building strong online presences and generating high-quality leads through targeted marketing strategies. Our creative team combines data-driven SEO insights with impactful design to deliver measurable growth for your brand.',
      features: [
        'SEO optimization',
        'Social media marketing',
        'Video editing',
        'Logo & brand identity',
        'Creative poster design'
      ]
    },
    {
      key: 'education-services',
      category: 'Education & Student Services',
      icon: <Globe className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'indigo' as const,
      description: 'We provide specialized support for students and working professionals, offering industry-ready solutions and guidance that bridge the gap between academic learning and career success. Our comprehensive services ensure you have the technical foundation and professional edge needed to excel.',
      features: [
        'Final year projects',
        'Student portfolios',
        'Professional portfolios',
        'ATS-friendly resumes',
        'Project documentation',
        'Career guidance'
      ]
    },
    {
      key: 'cloud-deployment',
      category: 'Cloud Deployment & Technical Support',
      icon: <Shield className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      color: 'cyan' as const,
      description: 'We deliver reliable, enterprise-grade cloud hosting and comprehensive technical support to ensure your digital applications remain secure, fast, and always accessible to your users. Our proactive monitoring and maintenance minimize downtime and optimize your server infrastructure.',
      features: [
        'Cloud deployment',
        'Server configuration',
        'Website hosting setup',
        'Domain & SSL setup',
        'Performance monitoring',
        'Ongoing maintenance'
      ]
    }
  ];

  // Student project keywords for search
  const studentProjectKeywords = [
    'machine learning', 'ml', 'data analysis', 'ai', 'deep learning', 'nlp',
    'natural language', 'computer vision', 'chatbot', 'speech', 'resume',
    'ats', 'student', 'final year', 'project', 'predictive', 'image classification',
    'recommendation', 'fraud detection', 'sales forecasting', 'market research',
    'healthcare analytics', 'financial risk'
  ];

  // Filter services based on search query
  const filteredServices = coreServices.filter(service =>
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Check if search matches student content
  const showStudentSection = searchQuery === '' ||
    studentProjectKeywords.some(keyword => keyword.includes(searchQuery.toLowerCase())) ||
    searchQuery.toLowerCase().includes('student') ||
    searchQuery.toLowerCase().includes('project') ||
    searchQuery.toLowerCase().includes('resume');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="relative min-h-screen pt-20">
      <SEO
        title="Our Services in Madurai, Coimbatore & Chennai | SaaS Products & Web Development"
        description="Integer.IO Tech offers cost efficient web development, custom SaaS products, AI automation, and final year projects overall TamilNadu."
        page="services"
      />

      {/* Tailwind Safelist (Hidden) - Required for dynamic colors */}
      <div className="hidden text-pink-400 bg-pink-400 from-pink-500/10 to-pink-500/10 text-emerald-400 bg-emerald-400 from-emerald-500/10 to-emerald-500/10 text-purple-400 bg-purple-400 from-purple-500/10 to-purple-500/10 text-blue-400 bg-blue-400 from-blue-500/10 to-blue-500/10 text-indigo-400 bg-indigo-400 from-indigo-500/10 to-indigo-500/10 text-orange-400 bg-orange-400 from-orange-500/10 to-orange-500/10 text-teal-400 bg-teal-400 from-teal-500/10 to-teal-500/10 text-cyan-400 bg-cyan-400 from-cyan-500/10 to-cyan-500/10 text-emerald-700 bg-emerald-700 text-purple-700 bg-purple-700 text-blue-700 bg-blue-700 text-violet-700 bg-violet-700 text-indigo-700 bg-indigo-700 text-teal-700 bg-teal-700 text-orange-700 bg-orange-700" aria-hidden="true"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h1 className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Services
          </h1>
          <p className={`text-xs sm:text-lg md:text-xl max-w-3xl mx-auto font-medium mb-4 sm:mb-8 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Comprehensive digital solutions tailored for businesses, institutions, and students worldwide
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${isDark
              ? 'bg-gray-800/50 border-gray-700 focus-within:border-emerald-500'
              : 'bg-white/80 border-gray-300 focus-within:border-emerald-500'
              }`}>
              <Search className={`h-5 w-5 ml-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 bg-transparent border-none outline-none text-base ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                  }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`mr-4 text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Core Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-6 sm:mb-12">
            <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Core Services
            </h2>
            <p className={`text-xs sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {filteredServices.length > 0 ? (
            <motion.div
              key={filteredServices.length}
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-8 sm:mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {filteredServices.map((service) => {
                return (
                  <motion.div
                    key={service.key}
                    ref={(el) => { serviceRefs.current[service.key] = el; }}
                    variants={itemVariants}
                    whileHover={{
                      y: -2,
                      scale: 1.008,
                      rotateX: 0.8,
                      rotateY: 0.8,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="group"
                  >
                    <div className={`
                    relative p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 h-full
                    ${isDark
                        ? 'bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10'
                        : 'bg-white/40 border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:bg-white/60'
                      }
                    ${highlightedService === service.key
                        ? 'ring-4 ring-emerald-500 ring-opacity-50'
                        : ''
                      }
                    hover:shadow-2xl
                    transform-gpu will-change-transform
                  `}>
                      {/* Glow effect */}
                      <div className={`
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-r from-${service.color}-500/10 via-transparent to-${service.color}-500/10
                    `} />

                      <div className="relative z-10 flex flex-col h-full">
                        <motion.div
                          className={`${iconColor(service.color)} mb-3 sm:mb-6 flex justify-center lg:justify-start`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {service.icon}
                        </motion.div>
                        <h3 className={`text-base sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-3 text-center lg:text-left ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {service.category}
                        </h3>
                        <p className={`text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-4 font-medium text-center lg:text-left ${iconColor(service.color)}`}>
                          {service.description}
                        </p>
                        <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-6 flex-grow">
                          {service.features.map((feature, featureIdx) => (
                            <motion.li
                              key={featureIdx}
                              className={`flex items-center text-xs sm:text-sm md:text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIdx * 0.1 }}
                            >
                              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2 sm:mr-3 flex-shrink-0 ${dotColor(service.color)}`} />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-sm sm:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                No services found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-emerald-400 hover:text-emerald-300 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </motion.div>

        {/* ── Start Today CTA Banner ── */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 sm:mb-16"
          >
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 rounded-2xl px-5 py-5 sm:px-10 sm:py-7 border ${isDark
              ? 'bg-white/5 border-white/10 backdrop-blur-xl'
              : 'bg-gradient-to-r from-emerald-50 to-purple-50 border-emerald-200/60'
              }`}>
              <div className="text-center sm:text-left">
                <p className={`text-[11px] sm:text-sm font-semibold uppercase tracking-widest mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  ⚡ Start Today
                </p>
                <h3 className={`text-base sm:text-xl font-bold mb-0.5 sm:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Let's build something amazing together.
                </h3>
                <p className={`text-[11px] sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tell us your requirements — we'll craft the perfect solution for you.
                </p>
              </div>
              <a
                href="/contact#contact-form"
                className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}

        {/* Student Project Packages */}
        {showStudentSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className={`text-xl sm:text-3xl md:text-4xl font-extrabold text-center mb-2 sm:mb-4 ${isDark ? 'text-white drop-shadow-md' : 'text-gray-900 drop-shadow-sm'}`}>
              🎓 Final Year Student Corner
            </h2>
            <p className={`text-center text-xs sm:text-lg mb-4 sm:mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Dedicated support for college students with affordable project packages and expert guidance
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
              {/* Web Development */}
              <InteractiveCard glowColor="emerald">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-emerald-400 mb-2 sm:mb-4" />
                <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Web Development</h3>
                <ul className={`space-y-1 sm:space-y-2 mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />Full Stack Applications</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />React & Node.js Projects</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />E-commerce Websites</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />Portfolio Websites</li>
                </ul>
                <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>⏱ 100–150 hrs</span>
              </InteractiveCard>

              {/* AI Automation & GenAI */}
              <InteractiveCard glowColor="purple">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-purple-400 mb-2 sm:mb-4" />
                <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>AI Automation & GenAI</h3>
                <ul className={`space-y-1 sm:space-y-2 mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />Machine Learning Models</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />Generative AI Apps</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />Chatbot Development</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />Computer Vision</li>
                </ul>
                <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-purple-500/15 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>⏱ 100–150 hrs</span>
              </InteractiveCard>

              {/* Data Science & Analysis */}
              <InteractiveCard glowColor="blue">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-400 mb-2 sm:mb-4" />
                <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Data Science & Analysis</h3>
                <ul className={`space-y-1 sm:space-y-2 mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full" />Data Visualization</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full" />Predictive Analytics</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full" />Business Intelligence</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full" />Statistical Analysis</li>
                </ul>
                <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>⏱ 50–100 hrs</span>
              </InteractiveCard>

              {/* Documentation Process */}
              <InteractiveCard glowColor="indigo">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-indigo-400 mb-2 sm:mb-4" />
                <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>Documentation Process</h3>
                <ul className={`space-y-1 sm:space-y-2 mb-2 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-indigo-400 rounded-full" />Full Report Documentation</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-indigo-400 rounded-full" />Softcopy Delivery</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-indigo-400 rounded-full" />Data Flow Diagrams</li>
                  <li className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-indigo-400 rounded-full" />Structured Tables</li>
                </ul>
                <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-indigo-500/15 text-indigo-400' : 'bg-indigo-100 text-indigo-700'}`}>⏱ 15–50 hrs</span>
              </InteractiveCard>
            </div>

          </motion.div>
        )}

        {/* Project Deliverables Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-24"
        >
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            What's Included in Your Project?
          </h2>

          {/* Single unified card with 2x2 grid inside */}
          <InteractiveCard glowColor="emerald" className="!p-4 sm:!p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {/* Point 1: Complete Documentation */}
              <div className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border ${isDark ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-500/20 bg-emerald-50/60'}`}>
                <div className="p-1.5 bg-emerald-500/15 rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                </div>
                <div>
                  <h4 className={`font-bold text-sm sm:text-base mb-0.5 sm:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Complete Documentation
                  </h4>
                  <p className={`text-[11px] sm:text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Full docs, softcopy, data flow diagrams, and structured tables included.
                  </p>
                </div>
              </div>

              {/* Point 2: Fast Delivery */}
              <div className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border ${isDark ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-500/20 bg-emerald-50/60'}`}>
                <div className="p-1.5 bg-emerald-500/15 rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                </div>
                <div>
                  <h4 className={`font-bold text-sm sm:text-base mb-0.5 sm:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Fast Delivery
                  </h4>
                  <p className={`text-[11px] sm:text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Delivered efficiently within a strict maximum 150-hour timeline.
                  </p>
                </div>
              </div>

              {/* Point 3: Resume-Level Quality */}
              <div className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border ${isDark ? 'border-purple-500/20 bg-purple-500/5' : 'border-purple-500/20 bg-purple-50/60'}`}>
                <div className="p-1.5 bg-purple-500/15 rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-purple-400' : 'text-purple-700'}`} />
                </div>
                <div>
                  <h4 className={`font-bold text-sm sm:text-base mb-0.5 sm:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Resume-Level Quality
                  </h4>
                  <p className={`text-[11px] sm:text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Enterprise-standard projects ready to showcase professionally on your resume.
                  </p>
                </div>
              </div>

              {/* Point 4: Bonus Benefits */}
              <div className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border ${isDark ? 'border-purple-500/20 bg-purple-500/5' : 'border-purple-500/20 bg-purple-50/60'}`}>
                <div className="p-1.5 bg-purple-500/15 rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-purple-400' : 'text-purple-700'}`} />
                </div>
                <div>
                  <h4 className={`font-bold text-sm sm:text-base mb-0.5 sm:mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Bonus Benefits
                  </h4>
                  <p className={`text-[11px] sm:text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Free cloud deployment for web projects + exclusive referral discounts.
                  </p>
                </div>
              </div>

            </div>

            {/* Register Button */}
            <div className="text-center mt-5 sm:mt-8">
              <a
                href="https://integer-io-projectportal.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:scale-105"
              >
                <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                Register for Final Year Project
              </a>
            </div>
          </InteractiveCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >

        </motion.div>
      </div>
    </div>
  );
};

export default Services;
