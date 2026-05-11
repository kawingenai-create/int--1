import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertCircle, CheckCircle } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import termsImage from '../assets/careers_hero.webp';

const TermsOfService = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen pt-20">
      <SEO 
        title="Terms of Service - Integer.IO Tech"
        description="Read our terms of service and understand our policies for using Integer.IO Tech."
        page="terms"
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="relative w-full max-w-3xl mx-auto h-40 sm:h-64 mb-8 sm:mb-10 rounded-2xl overflow-hidden shadow-2xl">
            <img src={termsImage} alt="Terms of Service" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
              <Scale className="h-16 w-16 sm:h-24 sm:w-24 text-emerald-400" />
            </div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Terms of Service
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Please read these terms carefully before using our services.
          </p>
        </motion.div>

        <div className="space-y-8">
          <InteractiveCard glowColor="emerald">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Service Agreement
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                By using Integer.IO Tech, you agree to these terms and conditions. 
                We provide web development, AI Automation projects, logo design, and digital marketing services.
              </p>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                <li>Services are provided on a project basis</li>
                <li>All work is custom and tailored to client needs</li>
                <li>We maintain professional standards in all deliverables</li>
              </ul>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="purple">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Payment Terms
              </h2>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                <li>50% advance payment required to start projects</li>
                <li>Remaining 50% due upon project completion</li>
                <li>Payment methods: Bank transfer, UPI, or as agreed</li>
                <li>Refunds considered on case-by-case basis</li>
                <li>Late payment may result in project delays</li>
              </ul>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="blue">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Intellectual Property
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Upon full payment, clients receive full ownership of custom work created specifically for them.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Source code ownership</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Design rights transfer</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Third-party licenses apply</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Portfolio usage rights retained</span>
                </div>
              </div>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="pink">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Project Delivery & Revisions
              </h2>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                <li>Delivery timelines are estimates and may vary</li>
                <li>Up to 3 rounds of revisions included</li>
                <li>Additional revisions may incur extra charges</li>
                <li>Client feedback required within 7 days</li>
                <li>Final approval required before project closure</li>
              </ul>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="indigo">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Limitation of Liability
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Integer.IO Tech provides services "as is" and makes no warranties beyond those 
                explicitly stated in project agreements.
              </p>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                <li>We are not liable for indirect or consequential damages</li>
                <li>Liability limited to project value</li>
                <li>Client responsible for data backups</li>
                <li>Third-party service issues beyond our control</li>
              </ul>
            </div>
          </InteractiveCard>

          <InteractiveCard glowColor="cyan">
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Contact Information
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                For questions about these terms, please contact us:
              </p>
              <div className="space-y-2">
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Email: <a href="mailto:mskawin2004@gmail.com" className="text-emerald-400 hover:text-emerald-300">mskawin2004@gmail.com</a>
                </p>
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Phone: <a href="tel:8015355914" className="text-emerald-400 hover:text-emerald-300">+91 8015355914</a>
                </p>
                <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
