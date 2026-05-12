import React, { useState, useEffect, useRef } from 'react';
import {
  Award,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Rocket,
  Lightbulb,
  Heart,
  // Briefcase,
  // LineChart,
  // Megaphone,
} from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/company_logo/hand.webp';
import ReviewCarousel from '../components/ReviewCarousel';
import kawin from '../assets/team/kawin.webp'
import livan from '../assets/team/livan.webp'
import hemanth from '../assets/team/hemanth.webp'
import SEO from '../components/SEO';

const About = () => {
  const { isDark } = useTheme();

  const teamMembers = [
    {
      name: 'Kawin M.S',
      role: 'CEO / Founder',
      quotes: [
        'Business strategy & decision making — vision that drives us forward.',
        'Investment & project approvals — every big move starts here.'
      ],
      email: 'integeriokawin@gmail.com',
      phone: '+91 80153 55914',
      linkedin: 'https://www.linkedin.com/in/kawin-m-s-570961285/',
      portfolio: 'https://kawin-portfolio.netlify.app/',
      image: kawin,
      color: 'indigo',
    },
    {
      name: 'Hemanth K',
      role: 'COO / Sales',
      quotes: [
        'Client handling & deals — building lasting partnerships.',
        'Server & operations management — the backbone of our execution.'
      ],
      email: 'integeriohemanth@gmail.com',
      phone: '+91 63852 79258',
      linkedin: 'https://www.linkedin.com/in/hemanth-k-iykyk',
      portfolio: 'https://project-rl7ny.vercel.app/',
      image: hemanth,
      color: 'indigo',
    },
    {
      name: 'Livan M.G',
      role: 'CMO / Relations',
      quotes: [
        'Social media & branding — telling our story to the world.',
        'Client visits & follow-ups — keeping our community connected.'
      ],
      email: 'integeriolivan@gmail.com',
      phone: '+91 63852 43064',
      linkedin: 'https://linkedin.com/in/livan',
      portfolio: 'https://livan-portfolio.netlify.app/',
      image: livan,
      color: 'indigo',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'from-emerald-500 to-emerald-400',
      purple: 'from-purple-500 to-purple-400',
      blue: 'from-blue-500 to-blue-400',
      pink: 'from-violet-500 to-violet-400',
      indigo: 'from-indigo-500 to-indigo-400',
      cyan: 'from-cyan-500 to-cyan-400',
    };
    return colorMap[color as keyof typeof colorMap] || 'from-emerald-500 to-emerald-400';
  };

  const values = [
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies to deliver modern solutions.',
      color: 'emerald',
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: 'Passion',
      description: 'Every project is crafted with dedication and enthusiasm.',
      color: 'purple',
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: 'Excellence',
      description: 'We strive for quality in every line of code we write.',
      color: 'purple',
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: 'Growth',
      description: 'We help businesses scale and reach new heights.',
      color: 'blue',
    },
  ];

  return (
    <div className="relative min-h-screen pt-20">
      <SEO 
        title="About Us | Integer.IO Tech - AI & Web Development Experts"
        description="Learn about Integer.IO Tech, our mission, values, and the expert team dedicated to providing top-tier AI automation, SaaS products, ERP and web development."
        page="about"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-10 pb-4 sm:pb-8"
        >
          <h1
            className={`text-2xl sm:text-4xl md:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ lineHeight: '1.3', paddingBottom: '0.4rem', letterSpacing: '0.02em' }}
          >
            About Integer.IO
          </h1>
        </motion.div>

        {/* Company Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Mission
          </h2>
          <InteractiveCard glowColor="emerald" className="!p-4 sm:!p-6 md:!p-12">
            <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 lg:gap-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 flex-shrink-0"
              >
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center border overflow-hidden shadow-xl ${isDark
                    ? 'border-emerald-500 shadow-emerald-500/20'
                    : 'bg-white border-emerald-500 shadow-emerald-500/10'
                    }`}
                >
                  <img
                    src={logo}
                    alt="Integer.IO Tech Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>

              <div className="flex-1">
                <div className="text-center lg:text-left mb-6">
                  <h3 className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Empowering Digital Transformation
                  </h3>
                  <p className={`text-xs sm:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Integer.IO Tech is a leading digital solutions provider based in Madurai, founded with a clear vision to
                    <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}> democratize technology</span> for
                    businesses of all sizes. We specialize in high-performance web development, custom AI Automation solutions, enterprise-grade ERP systems including Billing software, CRM, and digital marketing strategies tailored for growth. Our expertise lies in building secure, scalable, and user-centric digital products that solve real-world problems.
                  </p>
                  <p className={`text-xs sm:text-base lg:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Our mission is to make cutting-edge technology
                    <span className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}> accessible and affordable</span> for
                    everyone—from ambitious startups and small local businesses to students seeking professional guidance for their final year projects.
                    Founded in <span className={`font-bold ${isDark ? 'text-violet-400' : 'text-violet-700'}`}>2024</span>, we have quickly grown into a trusted technology partner, bringing <span className={`font-bold px-2 py-0.5 rounded-md ${isDark ? 'text-emerald-400 bg-emerald-400/10' : 'text-emerald-700 bg-emerald-700/10'}`}>2+ Years</span> of collective technical expertise.
                    We don't just build software; we build partnerships, transforming complex ideas into intuitive digital realities with a focus on innovation, excellence, and personalized support.
                  </p>
                </div>

              </div>
            </div>
          </InteractiveCard>

          {/* Stats Section - Outside Card */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-10">
            {[{ label: 'Happy Clients', target: 100, suffix: '+', color: 'emerald' }, { label: 'Projects Done', target: 110, suffix: '+', color: 'purple' }, { label: 'Support', target: 24, suffix: '/7', color: 'cyan' }].map((stat) => {
              const CounterStat = () => {
                const [count, setCount] = useState(0);
                const ref = useRef<HTMLDivElement>(null);
                const hasAnimated = useRef(false);

                useEffect(() => {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        const duration = 2000;
                        const start = performance.now();
                        const animate = (now: number) => {
                          const elapsed = now - start;
                          const progress = Math.min(elapsed / duration, 1);
                          const eased = 1 - Math.pow(1 - progress, 3);
                          setCount(Math.floor(eased * stat.target));
                          if (progress < 1) requestAnimationFrame(animate);
                        };
                        requestAnimationFrame(animate);
                      }
                    },
                    { threshold: 0.3 }
                  );
                  if (ref.current) observer.observe(ref.current);
                  return () => observer.disconnect();
                }, []);

                return (
                  <div ref={ref} className={`text-center p-3 sm:p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${isDark
                      ? 'bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
                      : 'bg-white/40 border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'
                    }`}>
                    <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDark
                        ? `text-${stat.color}-400`
                        : ({ emerald: 'text-emerald-700', purple: 'text-purple-700', cyan: 'text-teal-700' }[stat.color] ?? 'text-gray-700')
                      }`}>
                      {count}{stat.suffix}
                    </div>
                    <div className={`text-xs sm:text-sm md:text-base font-medium mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {stat.label}
                    </div>
                  </div>
                );
              };
              return <CounterStat key={stat.label} />;
            })}
          </div>
        </motion.div>

        {/* Team Section with Square Cards - 3 in a row on PC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 pt-4 sm:pt-8"
        >
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Team
          </h2>

          {/* Modern Alternating Team Cards */}
          <div className="flex flex-col gap-24 sm:gap-24">
            {teamMembers.map((member, index) => {
              const isEven = index % 2 !== 0;
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative ${index === 0 ? 'mt-16 sm:mt-0' : ''} pt-24 sm:pt-0 mx-4 sm:mx-0 ${isEven ? 'sm:pr-24 md:pr-32' : 'sm:pl-24 md:pl-32'}`}
                >
                  {/* Larger Offset Profile Circle */}
                  <div className={`absolute ${isEven ? 'right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-[-40px] md:right-[-60px]' : 'left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[-40px] md:left-[-60px]'} top-24 sm:top-1/2 -translate-y-1/2 z-20 w-48 h-48 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center text-4xl sm:text-6xl md:text-8xl font-bold text-white shadow-[0_0_40px_rgba(99,102,241,0.4)] dark:shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden border-4 sm:border-8 ${isDark ? 'bg-[#0f172a] border-white/20' : 'bg-white border-white shadow-2xl'}`}>
                    {member.image ? (
                      <div className="w-full h-full p-1.5 sm:p-2">
                        <img src={member.image} alt={member.name} className="w-full h-full object-contain rounded-full" />
                      </div>
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>

                  <InteractiveCard glowColor="indigo" className={`!p-0 overflow-visible rounded-3xl ${isDark ? 'bg-gray-800/40 backdrop-blur-md border-white/5' : 'bg-white/70 backdrop-blur-md border-gray-100 shadow-2xl'}`}>
                    <div className={`flex flex-col lg:flex-row items-center gap-4 sm:gap-8 p-5 sm:p-10 md:p-12 pt-32 sm:pt-10 ${isEven ? 'sm:pr-32 lg:pr-40' : 'sm:pl-32 lg:pl-40'}`}>

                      {/* Name & Quotes Column (Middle) */}
                      <div className={`flex-1 text-center sm:text-left w-full ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        {/* Name */}
                        <h3 className={`text-lg sm:text-2xl md:text-3xl font-extrabold mb-1 sm:mb-3 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {member.name}
                        </h3>

                        {/* Role Badge */}
                        <div className={`inline-block px-3 py-1 rounded-full text-[9px] sm:text-xs font-bold mb-3 sm:mb-6 ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
                          {member.role}
                        </div>

                        {/* Quotes */}
                        <div className="space-y-1 mb-4 sm:mb-0">
                          {member.quotes.map((quote, qIdx) => (
                            <p key={qIdx} className={`text-[10px] sm:text-base md:text-xl italic font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              "{quote}"
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Divider for Desktop - Vertical */}
                      <div className={`hidden lg:block w-px h-32 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} ${isEven ? 'order-1' : 'order-2'}`} />

                      {/* Contact & Social Column (Side) */}
                      <div className={`flex flex-col gap-4 sm:gap-6 min-w-[250px] w-full lg:w-auto ${isEven ? 'lg:order-1 text-left' : 'lg:order-3 text-left'}`}>
                        <div className="flex flex-col gap-2.5">
                          <div className={`flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 rounded-xl border text-[10px] sm:text-sm font-semibold transition-all ${isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-white border-gray-200 text-gray-700 shadow-sm'}`}>
                            <Mail className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="truncate max-w-[160px] sm:max-w-[180px]">{member.email}</span>
                          </div>
                          <div className={`flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 rounded-xl border text-[10px] sm:text-sm font-semibold transition-all ${isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-white border-gray-200 text-gray-700 shadow-sm'}`}>
                            <Phone className="w-3.5 h-3.5 text-indigo-500" />
                            {member.phone}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#2d336b] text-white text-xs sm:text-sm font-bold transition-all hover:scale-105 hover:bg-[#3d438b] shadow-xl shadow-indigo-900/20"
                          >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                          </a>
                          {member.portfolio && (
                            <a
                              href={member.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#10b981] text-white text-xs sm:text-sm font-bold transition-all hover:scale-105 hover:bg-[#059669] shadow-xl shadow-emerald-500/20"
                            >
                              <Globe className="w-4 h-4" />
                              Portfolio
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  </InteractiveCard>
                </motion.div>
              );
            })}
          </div>

        </motion.div>

        {/* Client Reviews Section */}
        <motion.div
          id="client-reviews"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 scroll-mt-24"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-black'}`}>
            Our Customer Reviews
          </h2>
          <ReviewCarousel />
        </motion.div>

        {/* Our Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Values
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <InteractiveCard glowColor={value.color as 'emerald' | 'purple' | 'blue'} className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-2 sm:mb-4 ${isDark
                        ? `text-${value.color}-400`
                        : ({ emerald: 'text-emerald-700', pink: 'text-violet-700', purple: 'text-purple-700', blue: 'text-blue-700' }[value.color] ?? 'text-gray-700')
                      }`}>
                      {React.cloneElement(value.icon, { className: 'h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10' })}
                    </div>
                    <h3 className={`text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {value.title}
                    </h3>
                    <p className={`text-[10px] sm:text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {value.description}
                    </p>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
