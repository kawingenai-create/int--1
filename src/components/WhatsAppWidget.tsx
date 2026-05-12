import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const WhatsAppWidget: React.FC = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    "Hi! I need help with web development",
    "I'm interested in AI Automation projects",
    "Can you help with logo design?",
    "I need a final year project",
    "What are your pricing options?"
  ];

  const sendMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918015355914?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(5, 150, 105, 0.7)",
              "0 0 0 15px rgba(29, 78, 216, 0)",
              "0 0 0 30px rgba(29, 78, 216, 0)"
            ],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.button>
      </motion.div>

      {/* WhatsApp Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-24 left-6 w-80 rounded-lg shadow-2xl border z-50 ${isDark
                ? 'bg-gray-900 border-gray-700'
                : 'bg-white border-gray-200'
              }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Integer.IO Tech</h3>
                  <p className="text-sm opacity-90">Typically replies instantly</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                <p className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  👋 Hi there! How can we help you today?
                </p>
              </div>

              {quickMessages.map((message, index) => (
                <motion.button
                  key={index}
                  onClick={() => sendMessage(message)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${isDark
                      ? 'border-gray-600 hover:bg-gray-800 text-gray-200'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="text-sm">{message}</p>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <button
                  onClick={() => sendMessage("Hi! I'd like to know more about your services.")}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Chat
                </button>
                <a
                  href="tel:8015355914"
                  className={`p-2 rounded-lg border transition-colors ${isDark
                      ? 'border-gray-600 hover:bg-gray-800'
                      : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppWidget;
