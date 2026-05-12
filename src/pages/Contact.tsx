import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Twitter,
  Globe,
  Users,
  Star,
  XCircle,
  ChevronDown,
} from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';
import ReviewFormModal from '../components/ReviewFormModal';
import SEO from '../components/SEO';

const Contact = () => {
  const { isDark } = useTheme();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: [] as string[], // Changed to array for multi-select
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-scroll to form if hash is present
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    } else if (window.location.hash === '#review') {
      setShowReviewForm(true);
    }
  }, []);

  // Validation function
  const validateForm = (): boolean => {
    setValidationError('');

    // Name validation (text only)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formData.name.trim())) {
      setValidationError('Name must contain only letters and spaces');
      return false;
    }

    // Phone validation (exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setValidationError('Phone number must be exactly 10 digits');
      return false;
    }

    // Service validation (at least one selected)
    if (formData.service.length === 0) {
      setValidationError('Please select at least one service');
      return false;
    }

    // Message validation (min 25 characters)
    if (formData.message.trim().length < 10) {
      setValidationError('Message must be at least 10 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setValidationError('');

    try {
      // Submit to database
      const { submitContactForm } = await import('../lib/supabase');
      const success = await submitContactForm({
        ...formData,
        service: formData.service.join(', ') // Convert array to string
      });

      if (success) {
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            service: [],
            message: '',
          });
        }, 3000);
      } else {
        setValidationError('Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setValidationError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle service checkbox toggle
  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      service: prev.service.includes(service)
        ? prev.service.filter(s => s !== service)
        : [...prev.service, service]
    }));
  };

  const services = [
    'Web Development',

    'AI Apps & Integration (Chatbot)',
    'Final Year Projects',
    'Digital Marketing',
    'Video/Logo Designing',
    'Portfolio (Students/Employees)',
    'ERP That can include: Billing software, CRM, HR, Inventory',
    'Mobile App Development',
    'Data Analytics'
  ];

  return (
    <div className="relative min-h-screen pt-20">
      <SEO 
        title="Contact Us | Integer.IO Tech - Madurai, Coimbatore & Chennai"
        description="Get in touch with Integer.IO Tech for cost efficient web development, SaaS products, and final year projects overall TamilNadu. Based in Madurai, serving clients globally."
        page="contact"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h1 className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Contact Us
          </h1>
          <p className={`text-sm sm:text-lg md:text-xl font-medium max-w-4xl mx-auto leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Ready to transform your innovative ideas into high-performance digital reality? Whether you have a specific project in mind, need technical consultation, or want to explore how AI automation can scale your business, our expert team at Integer.IO Tech is here to help you every step of the way. Get in touch with us today for a personalized consultation!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-stretch">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 className={`text-xl sm:text-3xl font-bold mb-4 sm:mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Get In Touch
            </h2>

            <div className="space-y-3 sm:space-y-6 mb-4 sm:mb-8">
              {/* Contact Details Card */}
              <InteractiveCard glowColor="emerald" className="hover-3d">
                <h3 className={`text-sm sm:text-lg font-bold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Contact Details
                </h3>
                <div className="space-y-2.5 sm:space-y-4">
                  <a href="tel:8015355914" className="flex items-center space-x-3 sm:space-x-4 group">
                    <Phone className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400 flex-shrink-0" />
                    <span className={`text-xs sm:text-base transition-colors ${isDark ? 'text-gray-200 group-hover:text-emerald-400' : 'text-gray-700 group-hover:text-emerald-600'}`}>+91 8015355914</span>
                  </a>
                  <a href="mailto:integer.io.ai@gmail.com" className="flex items-center space-x-3 sm:space-x-4 group">
                    <Mail className="h-4 w-4 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0" />
                    <span className={`text-xs sm:text-base transition-colors break-all ${isDark ? 'text-gray-200 group-hover:text-purple-400' : 'text-gray-700 group-hover:text-purple-600'}`}>integer.io.ai@gmail.com</span>
                  </a>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <MapPin className="h-4 w-4 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0" />
                    <span className={`text-xs sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Madurai, Coimbatore, Chennai</span>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className={`mt-4 sm:mt-6 pt-3 sm:pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <h4 className={`text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Follow Us</h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <a href="https://instagram.com/Integer.IO.services" target="_blank" rel="noopener noreferrer"
                      className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 ${isDark ? 'border-white/10 hover:bg-violet-500/20 hover:border-violet-500/50' : 'border-gray-200 hover:bg-violet-50 hover:border-violet-400'}`}>
                      <Instagram className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61588744035428" target="_blank" rel="noopener noreferrer"
                      className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 ${isDark ? 'border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50' : 'border-gray-200 hover:bg-blue-50 hover:border-blue-400'}`}>
                      <Facebook className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-blue-400' : 'text-blue-700'}`} />
                    </a>
                    <a href="https://www.linkedin.com/company/integer-io-services/" target="_blank" rel="noopener noreferrer"
                      className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 ${isDark ? 'border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50' : 'border-gray-200 hover:bg-blue-50 hover:border-blue-400'}`}>
                      <Linkedin className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </a>
                    <a href="https://www.youtube.com/@integer-io" target="_blank" rel="noopener noreferrer"
                      className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 ${isDark ? 'border-white/10 hover:bg-red-500/20 hover:border-red-500/50' : 'border-gray-200 hover:bg-red-50 hover:border-red-400'}`}>
                      <Youtube className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                    </a>
                    <a href="https://x.com/Integer_IO" target="_blank" rel="noopener noreferrer"
                      className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 ${isDark ? 'border-white/10 hover:bg-gray-500/20 hover:border-gray-500/50' : 'border-gray-200 hover:bg-gray-50 hover:border-gray-400'}`}>
                      <Twitter className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                    </a>
                  </div>
                </div>
              </InteractiveCard>

              {/* Service Areas Card */}
              <InteractiveCard glowColor="purple" className="hover-3d">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <MapPin className={`h-5 w-5 sm:h-8 sm:w-8 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-purple-700'}`} />
                  <div>
                    <h3 className={`text-sm sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Service Areas</h3>
                    <div className="space-y-0.5 sm:space-y-1">
                      <p className={`text-xs sm:text-base flex items-center ${isDark ? 'text-emerald-400' : 'text-purple-700'}`}>
                        <Globe className={`h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-purple-700'}`} />
                        Online Clients: Worldwide
                      </p>
                      <p className={`text-xs sm:text-base flex items-center ${isDark ? 'text-emerald-400' : 'text-purple-700'}`}>
                        <Users className={`h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-purple-700'}`} />
                        Offline Clients: Madurai, Coimbatore, Chennai
                      </p>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </div>


          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            id="contact-form"
          >
            <InteractiveCard
              glowColor="emerald"
              className="!p-4 sm:!p-6 md:!p-8 hover-3d"
              noTilt={true}
            >
              <h2
                className={`text-lg sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-800'
                  }`}
              >
                Send us a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                  <h3
                    className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    Enquiry Submitted Successfully!
                  </h3>
                  <p
                    className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                  >
                    We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  {validationError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                      <p className="text-red-500 text-sm">{validationError}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                          }`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                          }`}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                          }`}
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                      >
                        Services Interested In * ({formData.service.length} selected)
                      </label>
                      <div className="relative">
                        {/* Selected Services Display */}
                        <div
                          onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                          className={`w-full min-h-[48px] px-3 py-2 border rounded-lg cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors ${isDark
                            ? 'bg-gray-800 border-gray-600'
                            : 'bg-white border-gray-300'
                            }`}
                        >
                          {formData.service.length === 0 ? (
                            <div className={`py-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              Select services
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {formData.service.map((service) => (
                                <span
                                  key={service}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-full font-medium"
                                >
                                  {service}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleServiceToggle(service);
                                    }}
                                    className="flex items-center justify-center w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                                  >
                                    <svg
                                      className="w-3 h-3"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Dropdown Menu */}
                        {showServiceDropdown && (
                          <div
                            className={`absolute z-10 w-full mt-2 rounded-lg shadow-lg border max-h-64 overflow-y-auto ${isDark
                              ? 'bg-gray-800 border-gray-600'
                              : 'bg-white border-gray-300'
                              }`}
                          >
                            <div className="sticky top-0 right-0 flex justify-end p-2 bg-inherit z-20 border-b border-inherit">
                              <button
                                type="button"
                                onClick={() => setShowServiceDropdown(false)}
                                className={`p-1 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </div>
                            {services.map((service) => (
                              <label
                                key={service}
                                className={`flex items-center px-4 py-3 cursor-pointer hover:bg-opacity-10 transition-colors ${isDark
                                  ? 'hover:bg-white'
                                  : 'hover:bg-gray-900'
                                  }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.service.includes(service)}
                                  onChange={() => handleServiceToggle(service)}
                                  className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                                />
                                <span className={`ml-3 text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                  {service}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors resize-none ${isDark
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                          }`}
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center group shadow-lg btn-hover-effect hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Quick Action Buttons - 3 in one row */}
                    <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(true)}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-2 py-2 sm:px-3 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                        Review
                      </button>
                      <a
                        href="tel:8015355914"
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-2 sm:px-3 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                        Call
                      </a>
                      <a
                        href="https://wa.me/918015355914"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-2 py-2 sm:px-3 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </form>
                </>
              )}
            </InteractiveCard>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 sm:mt-16"
        >
          <h2 className={`text-lg sm:text-2xl font-bold mb-4 sm:mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: 'How long does it take to build a website?',
                a: 'Depending on the complexity, a standard website takes 1–2 weeks. Custom web apps or SaaS products may take 3–6 weeks. We provide regular progress updates throughout.',
              },
              {
                q: 'Do you provide support after project delivery?',
                a: 'Yes! We offer 24/7 WhatsApp support for all our clients. We also provide free bug fixes for 30 days after delivery and affordable maintenance plans.',
              },
              {
                q: 'What is the cost for a final year project?',
                a: 'Our student project packages are highly affordable starting from ₹1,500. We offer group discounts, early bird pricing, and include complete documentation with presentation support.',
              },
            ].map((faq, index) => (
              <InteractiveCard key={index} glowColor="emerald" className="!p-0 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full flex items-center justify-between p-3 sm:p-5 text-left transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50/50'}`}
                >
                  <span className={`text-xs sm:text-base font-semibold pr-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'} ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className={`px-3 sm:px-5 pb-3 sm:pb-5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {faq.a}
                  </div>
                </motion.div>
              </InteractiveCard>
            ))}
          </div>
        </motion.div>

        {/* Review Form Modal */}
        <ReviewFormModal
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
        />

      </div>
    </div>
  );
};

export default Contact;
