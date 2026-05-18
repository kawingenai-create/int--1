import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Twitter,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/company_logo/half_logo.webp';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  // Professional console message for recruitment
  useEffect(() => {
    console.clear();

    // Integer.IO ASCII Logo
    console.log(`%c
                                              ++++++++++++++                                    
                                         ++++++++++++++++++++++++                               
                                      ++++++++++++++  +++++++++++++++                           
                  +++++++           +++++++                     +++++++                         
                 +++++++++        ++++++                           +++++++                      
                 ++++ ++++      ++++++      ++    ++    ++           ++++++                     
                 +++++++++     +++++       +++   ++++  ++++            +++++                    
                   +++++     ++++++    ++++++++++++++++++++++++         +++++                   
           +       +++++     ++++    ++++++++++++++++++++++++++++         ++++                  
       ++++++++    +++++    ++++    +++++                    +++++         ++++                 
       +++++++++    +++++   +++     ++++                      ++++         ++++                 
       +++  ++++     +++++++        ++++              ++      ++++         +++++                
       ++++++++++      +++++++++++++++++      +++  +++++++++  ++++         +++++                
         ++++++++++       ++++++++++++++      +++ ++++  ++++  +++++++      +++++                
               +++++++++++++++++++++++++      +++ +++    ++++ ++++          +++++               
                 +++++++++++++++++++++++      +++ +++    ++++ ++++          +++++               
                                    ++++   +  +++ ++++  ++++  +++++++        +++++              
            ++++++         +++++++++++++  +++ +++  ++++++++   ++++++++        +++++             
           +++++++++    ++++++++++++++++   +                  ++++              +++++           
           +++  ++++++++++++        ++++                      ++++               ++++           
           +++++++++++++++    ++++++++++                      ++++               +++++          
            ++++++           ++++++++++++++++++++++++++++++++++++             +++++++           
                           +++++      ++++++++++++++++++++++++++             +++++              
                         +++++   +         +++   ++++  ++++                   ++++              
                  ++++++++++    +++        +++   ++++  ++++                  +++++              
                 ++++++++++     ++++                                        +++++               
                 ++++  ++++      ++++                                        ++++               
                  ++++++++       ++++                                       +++++               
                   ++++++        ++++                                       ++++                
                                 ++++                                       ++++                
                                 ++++                        ++++++        +++++                
                                 ++++                     ++++++++++++++++++++                  
                                ++++                     +++++   +++++++++++                    
                                ++++                     ++++                                   
                                ++++                     ++++                                   
                               ++++                     ++++                                    
                               +++++++++++++++++++++++++++++                                    
                               ++++++++++++++++++++++++++++                                     
`, 'color: #05e01bff; font-family: monospace;');

    // Integer.IO Text
    console.log(`%c
██╗███╗   ██╗████████╗███████╗ ██████╗ ███████╗██████╗    ██╗ ██████╗ 
██║████╗  ██║╚══██╔══╝██╔════╝██╔════╝ ██╔════╝██╔══██╗   ██║██╔═══██╗
██║██╔██╗ ██║   ██║   █████╗  ██║  ███╗█████╗  ██████╔╝   ██║██║   ██║
██║██║╚██╗██║   ██║   ██╔══╝  ██║   ██║██╔══╝  ██╔══██╗   ██║██║   ██║
██║██║ ╚████║   ██║   ███████╗╚██████╔╝███████╗██║  ██║██╗██║╚██████╔╝
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝ ╚═════╝ 
`, 'color: #8b5cf6; font-family: monospace; font-weight: bold;');

    console.log('%c════════════════════════════════════════════════════════════════════════════════', 'color: #374151;');
    console.log('%c   🚀  INTERESTED IN JOINING OUR TEAM?', 'color: #00ffcc; font-size: 16px; font-weight: bold;');
    console.log('%c════════════════════════════════════════════════════════════════════════════════', 'color: #374151;');
    console.log('%c   📧  Email       :  integer.io.ai@gmail.com', 'color: #ffffff; font-size: 13px;');
    console.log('%c   📝  Apply Here  :  https://forms.gle/AzTZM9ccVWkFSWxP8', 'color: #00e676; font-size: 13px;');
    console.log('%c════════════════════════════════════════════════════════════════════════════════', 'color: #374151;');
    console.log('%c   ⚡  Build AI. Break Limits. Create Future.', 'color: #ff9800; font-size: 12px; font-style: italic;');
    console.log('%c════════════════════════════════════════════════════════════════════════════════', 'color: #374151;');
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Products', path: '/products' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const services = [
    { name: 'Web Application Development', key: 'web-development' },
    { name: 'AI Product & Automation', key: 'ai-automation' },
    { name: 'Custom Software & SaaS', key: 'software-saas' },
    { name: 'Digital Marketing & Branding', key: 'digital-marketing' },
    { name: 'Education & Student Services', key: 'education-services' },
    { name: 'Cloud Deployment & Support', key: 'cloud-deployment' },
  ];

  return (
    <footer
      className={`relative mt-10 sm:mt-20 border-t transition-all duration-300 ${isDark
        ? 'bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-950/80 border-emerald-500/20 backdrop-blur-xl'
        : 'bg-gradient-to-b from-white/90 via-gray-50/80 to-white/90 border-gray-300/60 backdrop-blur-xl'
        }`}
    >
      {/* Subtle gradient and grid accents for professional feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
      >
        <div className={`absolute -top-24 -right-24 w-80 h-80 blur-3xl rounded-full ${isDark ? 'bg-emerald-500/10' : 'bg-violet-400/10'
          }`} />
        <div className={`absolute -bottom-16 -left-24 w-96 h-96 blur-3xl rounded-full ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/10'
          }`} />
      </div>


      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-14">
        {/* Desktop: 4 columns, Mobile: 2 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Company Info - Full width on mobile */}
          <motion.div
            className="col-span-2 lg:col-span-1 mb-0"
          >
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4">
              <img src={logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
              <span className={`text-lg sm:text-[1.28rem] font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark
                ? 'from-emerald-400 to-purple-400'
                : 'from-purple-600 via-purple-500 to-emerald-500'
                }`}>
                Integer.IO
              </span>
            </div>
            <p
              className={`mb-2 sm:mb-4 text-xs sm:text-[1.02rem] leading-relaxed ${isDark ? 'text-gray-300' : 'text-black'
                }`}
            >
              Empowering Tamil Nadu's future through smart web & AI solutions.
            </p>
            {/* Mobile: horizontal icon-only row */}
            <div className="flex sm:hidden flex-wrap gap-1.5 mt-1">
              {[
                { href: 'https://wa.me/918015355914', icon: <Phone className="h-4 w-4" />, label: 'WhatsApp' },
                { href: 'https://www.youtube.com/@integer-io', icon: <Youtube className="h-4 w-4" />, label: 'YouTube' },
                { href: 'mailto:integer.io.ai@gmail.com', icon: <Mail className="h-4 w-4" />, label: 'Email' },
                { href: 'https://www.instagram.com/Integer.IO/', icon: <Instagram className="h-4 w-4" />, label: 'Instagram' },
                { href: 'https://www.linkedin.com/company/integer-io-services/', icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
                { href: 'https://www.facebook.com/profile.php?id=61588744035428', icon: <Facebook className="h-4 w-4" />, label: 'Facebook' },
                { href: 'https://x.com/Integer_IO', icon: <Twitter className="h-4 w-4" />, label: 'X' },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`p-1.5 rounded-lg transition-colors border ${isDark ? 'text-gray-200 border-white/10 hover:text-emerald-400' : 'text-gray-600 border-gray-200 hover:text-emerald-600'}`}
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Desktop: 2-column grid with icon + label */}
            <div className="hidden sm:grid grid-cols-2 gap-x-3 gap-y-1.5 mt-1">
              <a href="https://wa.me/918015355914" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'}`}>
                <span className={`p-1.5 rounded-lg border ${isDark ? 'border-white/10' : 'border-gray-200'}`}><Phone className="h-3.5 w-3.5" /></span>WhatsApp
              </a>
              <a href="https://www.youtube.com/@integer-io" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-600'}`}>
                <span className={`p-1.5 rounded-lg border ${isDark ? 'border-white/10' : 'border-gray-200'}`}><Youtube className="h-3.5 w-3.5" /></span>YouTube
              </a>
              <a href="mailto:integer.io.ai@gmail.com" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}>
                <span className={`p-1.5 rounded-lg border ${isDark ? 'border-white/10' : 'border-gray-200'}`}><Mail className="h-3.5 w-3.5" /></span>Email Us
              </a>
              <a href="https://www.instagram.com/Integer.IO/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'}`}>
                <span className={`p-1.5 rounded-lg border ${isDark ? 'border-white/10' : 'border-gray-200'}`}><Instagram className="h-3.5 w-3.5" /></span>Instagram
              </a>
              <a href="https://www.linkedin.com/company/integer-io-services/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}>
                <span className={`p-1.5 rounded-lg border ${isDark ? 'border-white/10' : 'border-gray-200'}`}><Linkedin className="h-3.5 w-3.5" /></span>LinkedIn
              </a>
              <a href="https://www.facebook.com/profile.php?id=61588744035428" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-blue-500' : 'text-gray-600 hover:text-blue-700'}`}>
                <span className={`p-1.5 rounded-lg border ${isDark ? 'border-white/10' : 'border-gray-200'}`}><Facebook className="h-3.5 w-3.5" /></span>Facebook
              </a>
              <a href="https://x.com/Integer_IO" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-gray-400' : 'text-gray-600 hover:text-gray-800'}`}>
                <span className={`p-1.5 rounded-lg border ${isDark ? 'border-white/10' : 'border-gray-200'}`}><Twitter className="h-3.5 w-3.5" /></span>Twitter / X
              </a>
            </div>
          </motion.div>

          {/* Quick Links + Legal - LEFT column on mobile */}
          <motion.div
          >
            <h3
              className={`text-sm sm:text-[1.02rem] font-semibold tracking-wide mb-3 ${isDark ? 'text-white' : 'text-black'
                }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-0.5 sm:space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-xs sm:text-[0.9rem] transition-all flex items-center ${isDark
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-black hover:text-emerald-700'
                      }`}
                  >
                    <ArrowRight className={`h-3 w-3 mr-1.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4
              className={`text-xs sm:text-[1.02rem] font-bold mt-3 sm:mt-6 mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-black'
                }`}
            >
              Legal
            </h4>
            <ul className="space-y-0.5 sm:space-y-1.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-xs sm:text-[0.9rem] transition-all flex items-center ${isDark
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-black hover:text-emerald-700'
                      }`}
                  >
                    <ArrowRight className={`h-3 w-3 mr-1.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services - RIGHT column on mobile */}
          <motion.div
          >
            <h3
              className={`text-xs sm:text-[1.02rem] font-semibold tracking-wide mb-2 sm:mb-3 ${isDark ? 'text-white' : 'text-black'
                }`}
            >
              Our Services
            </h3>
            <ul className="space-y-0.5 sm:space-y-1.5">
              {services.map((service) => (
                <li key={service.key}>
                  <Link
                    to={`/services?service=${service.key}`}
                    className={`text-xs sm:text-[0.9rem] transition-all flex items-center ${isDark
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-black hover:text-emerald-700'
                      }`}
                  >
                    <ArrowRight className={`h-3 w-3 mr-1.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info LEFT + Business Hours RIGHT - on larger screens combined */}
          <motion.div
            className="col-span-2 lg:col-span-1"
          >
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
              {/* Contact Info */}
              <div>
                <h3
                  className={`text-xs sm:text-[1.02rem] font-semibold tracking-wide mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-black'
                    }`}
                >
                  Contact Info
                </h3>
                <div className="space-y-1.5 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Phone className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <a href="tel:8015355914" className={`text-xs sm:text-[0.9rem] ${isDark ? 'text-gray-300' : 'text-black'}`}>
                      +91 8015355914
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Mail className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <a href="mailto:integer.io.ai@gmail.com" className={`text-xs sm:text-[0.9rem] ${isDark ? 'text-gray-300' : 'text-black'}`}>
                      integer.io.ai@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <MapPin className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-xs sm:text-[0.9rem] ${isDark ? 'text-gray-300' : 'text-black'}`}>
                      Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h4 className={`text-xs sm:text-[1.02rem] font-semibold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                  Business Hours
                </h4>
                <div className={`text-xs sm:text-[0.9rem] space-y-0.5 sm:space-y-1.5 ${isDark ? 'text-gray-300' : 'text-black'}`}>
                  <p>Mon-Sat: 9AM - 8PM</p>
                  <p>Sunday: 10AM - 6PM</p>
                  <p className="text-emerald-500 font-medium text-xs">24/7 WhatsApp Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className={`mt-4 sm:mt-10 pt-4 sm:pt-8 border-t flex justify-center items-center ${isDark ? 'border-gray-800' : 'border-gray-200'
            }`}
        >
          <div className="flex flex-col items-center">
            <p
              className={`text-xs sm:text-[0.9rem] font-medium ${isDark ? 'text-gray-400' : 'text-black'}`}
            >
              © 2026 Integer.IO Tech. All rights reserved.
            </p>
            <p
              className={`text-[10px] sm:text-[0.82rem] mt-1 flex flex-wrap justify-center items-center ${isDark ? 'text-gray-500' : 'text-black'}`}
            >
              Crafted with{' '}
              <Heart className={`h-2.5 w-2.5 sm:h-3 sm:w-3 mx-1 animate-pulse ${isDark ? 'text-red-400' : 'text-red-600'}`} /> by
              <Link
                to="/admin"
                className={`ml-1 hover:text-emerald-400 transition-colors font-bold ${isDark ? 'text-gray-400' : 'text-black'}`}
              >
                Integer.IO Tech
              </Link>
            </p>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
