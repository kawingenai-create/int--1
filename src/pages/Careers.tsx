import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Users, Briefcase, Mail, Phone, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

// Import image
import careersHeroImg from '../assets/careers_hero.webp';

const Careers: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Careers | Join Integer.IO Tech - Madurai, Coimbatore & Chennai"
        description="Join the team at Integer.IO Tech. We are looking for passionate individuals to help us build SaaS products and provide cost efficient web development."
        page="careers"
      />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${isDark
                ? 'from-emerald-400 to-purple-400'
                : 'from-purple-800 to-emerald-700'
              }`}
          >
            Join Our Team
          </h1>
          <p
            className={`text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            Build AI. Break Limits. Create Future. We are always looking for passionate individuals to join Integer.IO Tech.
          </p>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16 relative rounded-2xl overflow-hidden shadow-2xl"
        >
           <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-gray-900/60 to-transparent' : 'bg-gradient-to-t from-black/20 to-transparent'}`} />
          <img
            src={careersHeroImg}
            alt="Integer.IO Tech Team - Madurai IT Companies Careers"
            className="w-full h-auto object-cover max-h-[250px] sm:max-h-[500px]"
          />
        </motion.div>

        {/* Application Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.4 }}
           className={`p-4 sm:p-10 rounded-2xl shadow-xl backdrop-blur-xl ${isDark
              ? 'bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
              : 'bg-white/40 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'
            }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Apply Now */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className={`p-3 rounded-xl ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                    <Briefcase className="h-6 w-6" />
                 </div>
                 <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                   Apply Now
                 </h2>
              </div>
              <p className={`mb-6 text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Ready to take the next step in your career? Fill out our application form and let's build something amazing together.
              </p>
              
              <a
                href="https://forms.gle/AzTZM9ccVWkFSWxP8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white font-semibold text-sm sm:text-base transition-all shadow-md group"
              >
                Open Application Form
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* HR Contact */}
            <div className={`pt-8 md:pt-0 md:pl-8 md:border-l ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
               <div className="flex items-center gap-3 mb-4">
                 <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                    <Users className="h-6 w-6" />
                 </div>
                 <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                   Contact HR
                 </h2>
              </div>
              <p className={`mb-6 text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Have questions about a role or the application process? Reach out directly to our HR team.
              </p>

              <div className="space-y-4 flex flex-col sm:flex-row md:flex-col gap-4">
                  <a 
                    href="mailto:integer.io.ai@gmail.com" 
                    className={`flex items-center space-x-3 text-xs sm:text-base font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-sm border w-full max-w-[280px] justify-center ${isDark 
                      ? 'bg-white/10 border-white/20 text-white hover:bg-emerald-500/30' 
                      : 'bg-white/60 border-gray-200 text-gray-800 hover:bg-emerald-50'
                    }`}
                  >
                    <Mail className="h-5 w-5 shrink-0" />
                    <span className="truncate">integer.io.ai@gmail.com</span>
                  </a>
                  <a 
                    href="tel:8015355914" 
                    className={`flex items-center space-x-3 text-xs sm:text-base font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-sm border w-full max-w-[280px] justify-center ${isDark 
                      ? 'bg-white/10 border-white/20 text-white hover:bg-emerald-500/30' 
                      : 'bg-white/60 border-gray-200 text-gray-800 hover:bg-emerald-50'
                    }`}
                  >
                    <Phone className="h-5 w-5 shrink-0" />
                    <span>+91 8015355914</span>
                  </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
