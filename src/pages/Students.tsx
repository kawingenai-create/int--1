import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Code,
  Award,
  Users,
  Clock,
  FileText,
  Download,
} from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';

const Students = () => {
  const { isDark } = useTheme();

  const projectPackages = [
    {
      title: 'Machine Learning Projects',
      icon: <Code className="h-8 w-8" />,
      color: 'emerald' as const,
      projects: [
        'Predictive Analytics for Business',
        'Image Classification Systems',
        'Recommendation Engines',
        'Fraud Detection Systems',
        'Customer Segmentation',
      ],
      duration: '2-4 weeks',
    },
    {
      title: 'Web Development Projects',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'blue' as const,
      projects: [
        'E-commerce Platforms',
        'School Management Systems',
        'Portfolio Websites',
        'Booking Systems',
        'Social Media Platforms',
      ],
      duration: '1-3 weeks',
    },
    {
      title: 'Data Analysis Projects',
      icon: <Award className="h-8 w-8" />,
      color: 'purple' as const,
      projects: [
        'Sales Forecasting',
        'Market Research Analysis',
        'Healthcare Data Analysis',
        'Financial Risk Assessment',
        'Social Media Analytics',
      ],
      duration: '1-2 weeks',
    },
    {
      title: 'AI & Deep Learning',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'purple' as const,
      projects: [
        'Computer Vision Applications',
        'Natural Language Processing',
        'Chatbot Development',
        'Speech Recognition Systems',
        'Autonomous Systems',
      ],
      duration: '3-6 weeks',
    },
    {
      title: 'ATS-Friendly Resume Making',
      icon: <FileText className="h-8 w-8" />,
      color: 'indigo' as const,
      projects: [
        'Professional Resume Templates',
        'ATS Optimization',
        'Cover Letter Writing',
        'LinkedIn Profile Optimization',
        'Interview Preparation Guide',
      ],
      duration: '1-2 days',
    },
  ];

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Complete Documentation',
      description:
        'Detailed project reports, code documentation, and user manuals',
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Source Code',
      description:
        'Well-commented, clean code with proper structure and best practices',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: '1-on-1 Guidance',
      description:
        'Personal mentoring sessions to understand the project thoroughly',
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Presentation Support',
      description: 'Help with project presentation and viva preparation',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Timely Delivery',
      description: 'Projects delivered on time with regular progress updates',
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Academic Excellence',
      description:
        'Projects designed to meet university standards and requirements',
    },
  ];

  const resumeFeatures = [
    'ATS-Optimized Templates',
    'Keyword Optimization',
    'Professional Formatting',
    'Industry-Specific Designs',
    'Multiple Format Options (PDF, DOC)',
    'Free Revisions',
  ];

  return (
    <div className="relative min-h-screen pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Final-Year Student Corner
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'
              }`}
          >
            Dedicated support for college students with affordable project
            packages, complete documentation, and expert guidance
          </p>
        </motion.div>

        {/* Project Packages */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projectPackages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  scale: 0.9,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 12,
                  },
                },
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotateX: 5,
                rotateY: 5,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="group"
            >
              <div
                className={`
                relative p-8 rounded-2xl backdrop-blur-lg border transition-all duration-500 h-full
                ${isDark
                    ? 'bg-gray-900/70 border-gray-700/50 hover:bg-gray-800/80'
                    : 'bg-white/90 border-gray-300/50 hover:bg-white/95'
                  }
                hover:shadow-2xl hover:shadow-${pkg.color}-500/20
                transform-gpu will-change-transform
              `}
              >
                {/* Glow effect */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-r from-${pkg.color}-500/10 via-transparent to-${pkg.color}-500/10
                `}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`${isDark
                      ? `text-${pkg.color}-400`
                      : ({ emerald: 'text-emerald-700', blue: 'text-blue-700', purple: 'text-purple-700', pink: 'text-violet-700', indigo: 'text-indigo-700' }[pkg.color] ?? 'text-gray-700')
                    } mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {pkg.icon}
                  </motion.div>
                  <h3
                    className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    {pkg.title}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {pkg.projects.map((project, idx) => (
                      <motion.li
                        key={idx}
                        className={`flex items-center ${isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${isDark
                            ? `bg-${pkg.color}-400`
                            : ({ emerald: 'bg-emerald-700', blue: 'bg-blue-700', purple: 'bg-purple-700', pink: 'bg-violet-700', indigo: 'bg-indigo-700' }[pkg.color] ?? 'bg-gray-700')
                          }`}
                        />
                        {project}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <div
                      className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                    >
                      Duration: {pkg.duration}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Resume Making Special Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Professional Resume Services
          </h2>

          <InteractiveCard glowColor="indigo" className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <FileText className={`h-16 w-16 mb-6 ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`} />
                <h3
                  className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  ATS-Friendly Resume Making
                </h3>
                <p
                  className={`mb-6 leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                >
                  Get your dream job with professionally crafted, ATS-optimized
                  resumes that pass through automated screening systems and
                  impress hiring managers.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {resumeFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center ${isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${isDark ? 'bg-indigo-400' : 'bg-indigo-700'}`} />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/918015355914?text=Hi, I need help with ATS-friendly resume making"
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg text-center"
                  >
                    Order Resume
                  </a>
                  <button
                    onClick={() => {
                      const subject = 'Resume Sample Request';
                      const body =
                        'Hi,%0D%0A%0D%0AI would like to see sample ATS-friendly resume templates.%0D%0A%0D%0APlease send me some examples.%0D%0A%0D%0AThank you!';
                      window.open(
                        `mailto:mskawin2004@gmail.com?subject=${subject}&body=${body}`
                      );
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg flex items-center justify-center"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    View Samples
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="w-64 h-80 mx-auto bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border-2 border-indigo-400/30">
                  <div className="text-center">
                    <FileText className="h-24 w-24 text-indigo-400 mx-auto mb-4" />
                    <p
                      className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                    >
                      Professional Resume
                    </p>
                    <p
                      className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                    >
                      ATS Optimized
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            What You Get
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <InteractiveCard glowColor="emerald">
                  <div className={`mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{feature.icon}</div>
                  <h3
                    className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    {feature.description}
                  </p>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Special Student Offers
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InteractiveCard glowColor="emerald" className="p-8">
              <GraduationCap className={`h-16 w-16 mb-6 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
              <h3
                className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'
                  }`}
              >
                Group Project Discount
              </h3>
              <p
                className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
              >
                Get special pricing when you order projects for 3 or more team
                members
              </p>
              <ul
                className={`space-y-2 mb-6 ${isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}
              >
                <li>• Individual project support for each member</li>
                <li>• Collaborative documentation</li>
                <li>• Group presentation training</li>
              </ul>
              <div className={`font-bold text-xl ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                Contact for Group Rates
              </div>
            </InteractiveCard>

            <InteractiveCard glowColor="purple" className="p-8">
              <Award className={`h-16 w-16 mb-6 ${isDark ? 'text-purple-400' : 'text-purple-700'}`} />
              <h3
                className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'
                  }`}
              >
                Early Bird Special
              </h3>
              <p
                className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
              >
                Order your project 2 months before submission and get special
                pricing
              </p>
              <ul
                className={`space-y-2 mb-6 ${isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}
              >
                <li>• Extended development time</li>
                <li>• Multiple revision rounds</li>
                <li>• Detailed progress tracking</li>
              </ul>
              <div className={`font-bold text-xl ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                Special Discount Available
              </div>
            </InteractiveCard>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <InteractiveCard className="p-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ready to Excel in Your Final Year?
            </h2>
            <p
              className={`text-xl mb-8 ${isDark ? 'text-gray-200' : 'text-gray-700'
                }`}
            >
              Contact us today for free guidance and get started on your dream
              project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918015355914"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                WhatsApp: 8015355914
              </a>
              <a
                href="mailto:mskawin2004@gmail.com"
                className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Email for Free Guidance
              </a>
            </div>
          </InteractiveCard>
        </motion.div>

        {/* Interesting Footer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div
            className={`p-8 rounded-xl border-2 border-dashed ${isDark
                ? 'border-blue-400/30 bg-blue-400/5'
                : 'border-blue-500/30 bg-blue-500/5'
              }`}
          >
            <div className="text-center">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="text-3xl"
                >
                  🎓
                </motion.div>
                <h3
                  className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent ${isDark ? '!from-blue-400 !to-purple-400' : ''}`}
                >
                  Your Success is Our Mission
                </h3>
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl"
                >
                  🌟
                </motion.div>
              </div>
              <p
                className={`text-lg mb-6 ${isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}
              >
                "Education is the most powerful weapon which you can use to
                change the world." We're here to arm you with the best projects
                and knowledge for your bright future.
              </p>
              <div className="flex justify-center items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    📚
                  </motion.span>
                  <span
                    className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                  >
                    Learn
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💡
                  </motion.span>
                  <span
                    className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                  >
                    Create
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    🏆
                  </motion.span>
                  <span
                    className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                  >
                    Succeed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Students;
