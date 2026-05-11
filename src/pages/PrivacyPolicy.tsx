import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import privacyImage from '../assets/careers_hero.webp';

const PrivacyPolicy = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen pt-20">
      <SEO 
        title="Privacy Policy - Integer.IO Tech"
        description="Learn how Integer.IO Tech protects your privacy and handles your personal information."
        page="privacy"
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="relative w-full max-w-3xl mx-auto h-40 sm:h-64 mb-8 sm:mb-10 rounded-2xl overflow-hidden shadow-2xl">
            <img src={privacyImage} alt="Privacy Policy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
              <Shield className="h-16 w-16 sm:h-24 sm:w-24 text-emerald-400" />
            </div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Privacy Policy
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Your privacy is important to us. Learn how we protect your information.
          </p>
        </motion.div>

        <div className="space-y-8">
          <InteractiveCard glowColor="emerald">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Information We Collect
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                We collect information you provide directly to us, such as when you contact us for services, 
                subscribe to our newsletter, or fill out forms on our website.
              </p>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                <li>Contact information (name, email, phone number)</li>
                <li>Project requirements and specifications</li>
                <li>Communication preferences</li>
                <li>Usage data and analytics</li>
              </ul>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="purple">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                How We Use Your Information
              </h2>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                <li>Provide and improve our services</li>
                <li>Communicate with you about projects and updates</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Analyze website usage and performance</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="blue">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Data Security
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-blue-400" />
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>SSL Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Secure Storage</span>
                </div>
              </div>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="pink">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Your Rights
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                You have the right to:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="indigo">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2">
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Email: <a href="mailto:mskawin2004@gmail.com" className="text-emerald-400 hover:text-emerald-300">mskawin2004@gmail.com</a>
                </p>
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Phone: <a href="tel:8015355914" className="text-emerald-400 hover:text-emerald-300">+91 8015355914</a>
                </p>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
