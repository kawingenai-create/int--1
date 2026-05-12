import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Languages, ExternalLink, MessageCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { logChatbotLead } from '../lib/supabase';

import logo from '../assets/company_logo/tiitle-logo.webp';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: { label: string; url: string }[];
  navButtons?: { label: string; path: string; icon?: string }[];
  isIntake?: boolean;
  isWhatsAppFallback?: boolean;
}

const SYSTEM_PROMPT = `═══════════════════════════════════════
1. Kawin M.S. — CEO / Founder
   - Business strategy & decision making. Investment & project approvals.
   - Email: integeriokawin@gmail.com
   - Phone: +91 8015355914
   - LinkedIn: https://www.linkedin.com/in/kawin-m-s-570961285/
   - Portfolio: https://kawin-portfolio.netlify.app/

2. Hemanth — COO / Sales
   - Client handling & deals. Server & operations management.
   - Email: integeriohemanth@gmail.com
   - Phone: +91 6385279258

3. Livan — CMO / Relations
   - Social media & branding. Client visits & follow-ups.
   - Email: integeriolivan@gmail.com
   - Phone: +91 6385243064
   - Portfolio: https://livan-portfolio.netlify.app/

═══════════════════════════════════════
SERVICES (6 CORE CATEGORIES)
═══════════════════════════════════════
1. Web Application Development
   - Static websites, Dynamic web apps, Database integrations, Admin dashboards, API integrations, Performance optimization

2. AI Product & Automation Services
   - AI chatbots, Voice assistants, NLP solutions, Computer vision, AI process automation, Smart data insights

3. Custom Software & SaaS Product Development
   - ERP That can include: Billing software, CRM, HR, Inventory, CRM Solutions, SaaS Platforms, Data Analytics Dashboards, PDF Auto-generation, Business Automation Tools, Role-based Systems

4. Digital Marketing & Branding Services
   - SEO optimization, Social media marketing, Video editing, Logo & brand identity, Creative poster design

5. Education & Student Services
   - Final year projects (B.E/B.Tech/MCA/MBA), Student portfolios, Professional portfolios, ATS-friendly resumes, Project documentation, Career guidance
   - Student Project Portal: https://integer-io-projectportal.netlify.app/
   - Web Dev projects: 1-3 weeks, AI Automation projects: 2-4 weeks, Data Science: 1-2 weeks

6. Cloud Deployment & Technical Support
   - Cloud deployment, Server configuration, Website hosting setup, Domain & SSL setup, Performance monitoring, Ongoing maintenance

═══════════════════════════════════════
OUR PRODUCTS (SaaS & AI Tools)
    - Full details: [integer-io.netlify.app/products](https://integer-io.netlify.app/products)
═══════════════════════════════════════
1. Chatz.IO — AI Chat Assistant for Students (LIVE!)
   - Intelligent AI tutor for research, exam prep, and academic writing.
   - URL: [chatz-io.netlify.app](https://chatz-io.netlify.app/)

2. Project-Portal.IO — CRM & Project Management (LIVE!)
   - Streamlined workflow, task tracking, and client collaboration for agencies.
   - URL: [integer-io-projectportal.netlify.app](https://integer-io-projectportal.netlify.app/)

3. Dips.IO — AI Image Generation (COMING SOON)
   - Cutting-edge AI for creative image generation and smart documentation.

═══════════════════════════════════════
CLIENT PROJECTS (Portfolio)
    - Full details: [integer-io.netlify.app/projects](https://integer-io.netlify.app/projects)
═══════════════════════════════════════
1. SAS Impex — Import-Export Consultancy Website
   - High-performance business site with maps and detailed services.
   - URL: [sas-impex.netlify.app](https://sas-impex.netlify.app/)

2. Sri Karpagam Brand — Premium Food Branding
   - Modern React site with smooth animations and product galleries.
   - URL: [srikarpagambrand.in](https://srikarpagambrand.in/)

3. Cooling Services — Appliance Service Booking
   - Responsive repair booking system with technician tracking.
   - URL: [multibrandwashingmachineservice.in](https://multibrandwashingmachineservice.in/)

4. Floq Pump — Industrial Consulting
   - Professional informational site for industrial equipment.
   - URL: [demo.floqpumps.com](https://demo.floqpumps.com/)

5. Bus Consulting Services — Transport Operations 
   - Clean, professional consulting site for bus operators.
   - URL: [busconsulting.in](https://www.busconsulting.in/)

═══════════════════════════════════════
COMPANY LOCATION & CONTACT
═══════════════════════════════════════
- Location / Physical Address: Madurai, Thirunagar
- Primary Contact Number: +91 8015355914

═══════════════════════════════════════
COMPANY VALUES
═══════════════════════════════════════
- Innovation: Embrace cutting-edge technologies
- Passion: Every project crafted with dedication
- Excellence: Quality in every line of code
- Growth: Help businesses scale and reach new heights

═══════════════════════════════════════
RESPONSE RULES
═══════════════════════════════════════
- Be concise but informative (2-4 sentences max)
- Use **bold text** for the most important keywords or titles.
- Use link format [label](url) if providing contact details (e.g., [integeriokawin@gmail.com](mailto:integeriokawin@gmail.com) or [+91 8015355914](tel:+918015355914)).
- Always stay professional and project-oriented.
- Use common web design terms: Scalable, UI/UX, Automation, Generative AI.
- If asked about pricing, say "Pricing depends on the project scope. Connect with us on WhatsApp for a free consultation!"
- Always be professional, friendly, and helpful.
- ACT LIKE A REAL HUMAN AI ASSISTANT, NOT A ROBOT.
- If user speaks in Tamil/Tanglish, respond in Tanglish (Tamil words in English script mixed with English).
- For detailed inquiries, suggest contacting via WhatsApp (+91 8015355914) or email.
- IMPORTANT: Naturally try to collect the user's name and phone number during conversation if they haven't provided it. Use human-like phrases like "By the way, who am I speaking with?" or "Could I get your number to stay in touch?".
- Never make up information not listed above.
- When asked about team, mention all 3 members with their roles.
- When asked about services, list all 6 categories briefly.
- You are the Integer Helper AI — always introduce yourself as such. Respond naturally to greetings like 'hi' or 'hello' first before diving into details.`;

const DAILY_MSG_LIMIT = 6;

const getSessionId = (): string => {
  let sid = localStorage.getItem('integer_session_id');
  if (!sid) {
    sid = 'integer_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('integer_session_id', sid);
  }
  return sid;
};

const getTodayKey = (): string => {
  const d = new Date();
  return `integer_count_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
};

const getDailyCount = (): number => parseInt(localStorage.getItem(getTodayKey()) || '0', 10);

const incrementDailyCount = (): number => {
  const key = getTodayKey();
  const next = getDailyCount() + 1;
  localStorage.setItem(key, next.toString());
  return next;
};

// Detect phone number in text
const extractPhone = (text: string): string | null => {
  const match = text.match(/(\+?\d[\d\s\-]{7,14}\d)/);
  return match ? match[1].replace(/[\s\-]/g, '') : null;
};

const ChatbotWidget: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hideOnFooter, setHideOnFooter] = useState(false);
  const [isTamil, setIsTamil] = useState(false);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isLimited, setIsLimited] = useState(false);
  const [contactGatePassed, setContactGatePassed] = useState(false);
  const [gateInput, setGateInput] = useState('');
  const [gateError, setGateError] = useState('');
  const sessionId = useRef(getSessionId());

  // ── Rotating tooltip phrases ──
  const tooltipPhrases = [
    'Need AI help? 🤖',
    'Free consultation! 🌟',
    'Got a project? 🚀',
    'Automate it now ⚡',
    'Talk to us now! 💬',
    'Build with AI 🌟',
  ];
  const [tipIdx, setTipIdx] = useState(() => Math.floor(Math.random() * 6));
  const [tipVisible, setTipVisible] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('integer_user_email');
    const savedPhone = localStorage.getItem('integer_user_phone');
    if (savedEmail || savedPhone) {
      setContactGatePassed(true);
      if (savedEmail) setUserEmail(savedEmail);
      if (savedPhone) setUserPhone(savedPhone);
    }
    // Always show the same welcome message
    setMessages([{
      id: '1',
      text: "👋 **Hi!** I'm Integer Helper AI, your personal assistant at **Integer.IO Tech**. \n\nHow can I help you regarding our **Web Development**, **AI Automation**, or **Digital Branding** services today?",
      sender: 'bot',
      timestamp: new Date(),
      navButtons: [
        { label: 'Our Services', path: '/services', icon: '🛠️' },
        { label: 'Products', path: '/products', icon: '📦' },
        { label: 'Projects', path: '/projects', icon: '🚀' },
        { label: 'Contact Us', path: '/contact', icon: '📞' },
      ],
    }]);
    if (getDailyCount() >= DAILY_MSG_LIMIT) setIsLimited(true);
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Tooltip fade-in then cycle
  useEffect(() => {
    const show = setTimeout(() => setTipVisible(true), 1800);
    return () => clearTimeout(show);
  }, []);
  useEffect(() => {
    if (!tipVisible) return;
    const timer = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIdx(prev => (prev + 1) % tooltipPhrases.length);
        setTipVisible(true);
      }, 500);
    }, 3500);
    return () => clearInterval(timer);
  }, [tipVisible]);

  // Hide chatbot button when footer is visible on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;

    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideOnFooter(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => {
    setIsTamil(!isTamil);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: !isTamil
        ? "🌐 **Tanglish mode activated!** Ippo Tamil-la pesalaam.\n\nEnna help venum? Illa enna **Project details** theriyanum?"
        : "🌐 **English mode activated!** How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    }]);
  };

  // Gate modal submit handler with validation
  const handleGateSubmit = async () => {
    const val = gateInput.trim();
    if (!val) {
      setGateError('Please enter your email or phone number.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone validation: 10+ digits, optionally with +, spaces, dashes
    const phoneRegex = /^[+]?[\d\s-]{10,15}$/;
    const cleanPhone = val.replace(/[\s-]/g, '');

    if (emailRegex.test(val)) {
      setUserEmail(val);
      localStorage.setItem('integer_user_email', val);
      setContactGatePassed(true);
      // Save to DB
      logChatbotLead({
        session_id: sessionId.current,
        email: val,
        message_count: 0,
      });
    } else if (phoneRegex.test(val) && cleanPhone.replace('+', '').length >= 10) {
      setUserPhone(val);
      localStorage.setItem('integer_user_phone', val);
      setContactGatePassed(true);
      // Save to DB
      logChatbotLead({
        session_id: sessionId.current,
        email: val, // store in email field as contact
        message_count: 0,
      });
    } else {
      setGateError('Please enter a valid email (e.g. name@email.com) or phone number (10+ digits).');
      return;
    }
  };

  // ── GROQ API ──
  const callGroqAPI = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) throw new Error('VITE_GROQ_API_KEY is missing in .env');

    const history = messages.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
      content: m.text
    }));

    const lang = isTamil ? '\nRespond in Tanglish.' : '';
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: SYSTEM_PROMPT + lang }, ...history, { role: 'user', content: userMessage }],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Groq fail (${res.status}): ${errorData}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  };

  // ── GEMINI API ──
  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') throw new Error('VITE_GEMINI_API_KEY is missing/invalid');

    const lang = isTamil ? ' Respond in Tanglish.' : '';
    // Confirmed available for this key: gemini-2.5-flash
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: SYSTEM_PROMPT + lang + '\n\nUser: ' + userMessage }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini fail (${res.status}): ${errorText}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  };

  // ── DUAL AI fallback ── 
  const BOTH_FAILED = '__BOTH_FAILED__';
  const callAIWithFallback = async (userMessage: string): Promise<string> => {
    const useGroqFirst = Math.random() < 0.5;
    const pFn = useGroqFirst ? callGroqAPI : callGeminiAPI;
    const sFn = useGroqFirst ? callGeminiAPI : callGroqAPI;

    try {
      const res = await pFn(userMessage);
      if (!res) throw new Error('Empty response');
      return res;
    } catch (e1: any) {
      try {
        const res = await sFn(userMessage);
        if (!res) throw new Error('Empty response');
        return res;
      } catch (e2: any) {
        return BOTH_FAILED;
      }
    }
  };

  // Determine navigation buttons based on query
  const getNavButtons = (query: string): { label: string; path: string; icon: string }[] | undefined => {
    const q = query.toLowerCase();
    if (q.includes('service') || q.includes('offer') || q.includes('what do')) {
      return [
        { label: 'View All Services', path: '/services', icon: '🛠️' },
        { label: 'Student Corner', path: '/services?service=education-services', icon: '🎓' },
      ];
    }
    if (q.includes('product') || q.includes('chatz') || q.includes('dips')) {
      return [
        { label: 'View Products', path: '/products', icon: '📦' },
        { label: 'Try Chatz.IO', path: 'https://chatz-io.netlify.app/', icon: '💬' },
      ];
    }
    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('client')) {
      return [
        { label: 'View Projects', path: '/projects', icon: '🚀' },
      ];
    }
    if (q.includes('about team') || q.includes('about the team') || q.includes('ceo') || q.includes('kawin') || q.includes('who is') || q.includes('who are')) {
      return [
        { label: 'Meet Our Team', path: '/about', icon: '👥' },
      ];
    }
    if (q.includes('contact') || q.includes('reach') || q.includes('email')) {
      return [
        { label: 'Contact Form', path: '/contact', icon: '📝' },
      ];
    }
    if (q.includes('student') || q.includes('final year') || q.includes('resume')) {
      return [
        { label: 'Student Services', path: '/services?service=education-services', icon: '🎓' },
        { label: 'Register Project', path: 'https://integer-io-projectportal.netlify.app/', icon: '📋' },
      ];
    }
    return [
      { label: 'Services', path: '/services', icon: '🛠️' },
      { label: 'Products', path: '/products', icon: '📦' },
      { label: 'Projects', path: '/projects', icon: '🚀' },
      { label: 'Contact', path: '/contact', icon: '📞' },
    ];
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Background Data Extraction (Human-like)
    const phone = extractPhone(text);
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
    const extractedEmail = emailMatch ? emailMatch[1] : null;

    // Smart Name Extraction
    let extractedName = null;
    const namePatterns = [
      /my name is ([a-z\s]+)/i,
      /i am ([a-z\s]+)/i,
      /i'm ([a-z\s]+)/i,
      /this is ([a-z\s]+)/i,
      /call me ([a-z\s]+)/i
    ];

    for (const pattern of namePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const potentialName = match[1].trim().split(' ')[0];
        // Don't capture common words or greetings as names
        const commonWords = ['hi', 'hello', 'hey', 'the', 'a', 'an', 'some', 'any', 'bro', 'sir', 'madam'];
        if (potentialName.length > 2 && !commonWords.includes(potentialName.toLowerCase())) {
          extractedName = potentialName.charAt(0).toUpperCase() + potentialName.slice(1);
          break;
        }
      }
    }

    // Update local state and storage if new info found (fallback for normal flow)
    if (extractedName && (!userName || userName === 'Visitor')) {
      setUserName(extractedName);
      localStorage.setItem('integer_user_name', extractedName);
    }
    if (phone && !userPhone) {
      setUserPhone(phone);
      localStorage.setItem('integer_user_phone', phone);
    }
    if (extractedEmail && !userEmail) {
      setUserEmail(extractedEmail);
      localStorage.setItem('integer_user_email', extractedEmail);
    }

    // No intake steps needed — gate modal handles contact collection
    // Go straight to AI

    // Daily and Session Limit Logic
    const newCount = incrementDailyCount();

    // Call AI
    const responseText = await callAIWithFallback(text);

    // AI Response Handling
    if (responseText === BOTH_FAILED) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "**Connect with us directly on WhatsApp** — our team will reply within minutes! 🚀",
        sender: 'bot',
        timestamp: new Date(),
        isWhatsAppFallback: true,
      }]);
      setIsTyping(false);
      return;
    }

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      navButtons: getNavButtons(text),
    };

    const q = text.toLowerCase();
    if (q.includes('project') || q.includes('portfolio') || q.includes('client')) {
      botResponse.links = [
        { label: 'SAS Impex', url: 'https://sas-impex.netlify.app/' },
        { label: 'Sri Karpagam', url: 'https://srikarpagambrand.in/' },
        { label: 'Cooling Services', url: 'https://multibrandwashingmachineservice.in/' },
        { label: 'Chatz.IO', url: 'https://chatz-io.netlify.app/' },
      ];
    }

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);

    const skipRegex = /^(hi|hello|hey|thanks|thank you|bye|ok|okay|vanakkam|nandri|tqs|ok bro|bro)( \w+)*$/i;
    const isImportantQuery = !skipRegex.test(text.trim()) && text.trim().length > 4;

    logChatbotLead({
      session_id: sessionId.current,
      name: userName || 'Visitor',
      email: userEmail || 'Not Provided',
      message_count: 1,
      unhandled_queries: isImportantQuery ? `[${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}] ${text}` : undefined,
    });

    if (newCount >= DAILY_MSG_LIMIT) {
      setIsLimited(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          text: `Thanks for chatting, ${userName || 'friend'}! 💬\nFor detailed assistance, connect with our CEO Kawin M.S. on WhatsApp!`,
          sender: 'bot',
          timestamp: new Date(),
        }]);
      }, 1500);
    }
  };

  const openWhatsApp = (customMsg?: string) => {
    const msg = encodeURIComponent(
      customMsg || `Hi! I have some queries regarding your services.`
    );
    window.open(`https://wa.me/918015355914?text=${msg}`, '_blank');
  };

  const handleNavClick = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[') && part.includes('](')) {
        const label = part.match(/\[(.*?)\]/)?.[1];
        const url = part.match(/\((.*?)\)/)?.[1];
        if (label && url) {
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline underline-offset-2"
              onClick={(e) => {
                if (url.startsWith('mailto:') || url.startsWith('tel:')) {
                  e.preventDefault();
                  window.location.href = url;
                }
              }}
            >
              {label}
            </a>
          );
        }
      }
      return part;
    });
  };

  return (
    <>
      {/* ── CHATBOT FLOATING BUTTON ── */}
      <motion.div
        className={`fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-[60] ${hideOnFooter && !isOpen ? 'pointer-events-none' : ''}`}
        style={{ position: 'fixed', bottom: typeof window !== 'undefined' && window.innerWidth < 640 ? 16 : 24, left: typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 24 }}
        initial={{ scale: 0 }}
        animate={{ scale: hideOnFooter && !isOpen ? 0 : 1, opacity: hideOnFooter && !isOpen ? 0 : 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        {/* Cycling tooltip — absolutely above the button, doesn't affect button position */}
        <AnimatePresence mode="wait">
          {!isOpen && tipVisible && (
            <motion.div
              key={tipIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ position: 'absolute', bottom: '100%', left: 0, marginBottom: 8, zIndex: 10 }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg ${isDark
                  ? 'bg-gray-800 text-white border border-gray-700'
                  : 'bg-white text-gray-800 border border-gray-100'
                }`}
            >
              {tooltipPhrases[tipIdx]}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The button with wave rings — always at the same position */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 64, height: typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 64 }}>

          {/* Green outer wave ring */}
          <motion.div
            style={{
              position: 'absolute',
              borderRadius: '50%',
              border: '2px solid rgba(16,185,129,0.6)',
              width: typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 64,
              height: typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 64,
            }}
            animate={!isOpen ? { scale: [1, 1.7, 1.7], opacity: [0.7, 0, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* Violet inner wave ring — slightly delayed */}
          <motion.div
            style={{
              position: 'absolute',
              borderRadius: '50%',
              border: '2px solid rgba(139,92,246,0.6)',
              width: typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 64,
              height: typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 64,
            }}
            animate={!isOpen ? { scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
          />

          {!isOpen ? (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center rounded-full bg-white shadow-xl"
              style={{ width: typeof window !== 'undefined' && window.innerWidth < 640 ? 42 : 56, height: typeof window !== 'undefined' && window.innerWidth < 640 ? 42 : 56, border: '2px solid rgba(139,92,246,0.3)' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              <img src={logo} alt="Chatbot" className="w-7 h-7 sm:w-9 sm:h-9 object-contain" />
              {/* Live dot */}
              <span style={{
                position: 'absolute', top: 2, right: 2,
                width: 10, height: 10, borderRadius: '50%',
                background: '#10b981', border: '1.5px solid #fff',
                boxShadow: '0 0 6px #10b981',
              }} />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center rounded-full bg-red-500 text-white shadow-2xl"
              style={{ width: 56, height: 56 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className={`fixed bottom-24 left-[4vw] sm:left-6 w-[92vw] sm:w-[420px] h-[72vh] sm:h-[580px] z-[60] overflow-hidden flex flex-col rounded-2xl border shadow-2xl ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}
            style={{ boxShadow: isDark ? '0 25px 60px rgba(0,0,0,0.5)' : '0 25px 60px rgba(0,0,0,0.15)' }}
          >
            {/* Contact Gate Modal Overlay */}
            {!contactGatePassed && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
                <div className={`relative mx-4 w-full max-w-xs rounded-2xl p-5 shadow-2xl border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                  {/* Close button for the gate modal */}
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-200 group/close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center mb-4">
                    <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <img src={logo} alt="Integer.IO" className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Welcome to Integer.IO</h3>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Enter your email or phone number to start chatting</p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={gateInput}
                      onChange={(e) => { setGateInput(e.target.value); setGateError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleGateSubmit()}
                      placeholder="Email or Phone Number"
                      className={`w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors ${isDark
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-emerald-500'
                        : 'bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-emerald-500'
                        }`}
                    />
                    {gateError && (
                      <p className="text-red-500 text-xs text-center">{gateError}</p>
                    )}
                    <button
                      onClick={handleGateSubmit}
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                    >
                      Continue to Chat →
                    </button>
                  </div>
                  <p className={`text-[9px] text-center mt-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Your info is safe & used only to assist you better.</p>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-indigo-700 p-3.5 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="bg-white p-1.5 rounded-xl shadow-md">
                    <img src={logo} alt="Integer.IO" className="h-7 w-auto" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm leading-tight">Integer Helper AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-white/70 text-[10px]">Integer.IO Tech</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openWhatsApp()}
                    className="relative p-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white transition-colors shadow-none"
                    title="Chat on WhatsApp"
                  >
                    <span className="absolute inset-0 rounded-lg bg-emerald-400 animate-ping opacity-50"></span>
                    <svg 
                      viewBox="0 0 24 24" 
                      className="relative w-4 h-4 z-10 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className={`p-1.5 rounded-lg text-white transition-colors ${isTamil ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
                    title={isTamil ? "Switch to English" : "Switch to Tanglish"}
                  >
                    <Languages className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`flex-1 overflow-y-auto p-3 space-y-3 ${isDark ? 'bg-gray-900/60' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {m.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full flex flex-shrink-0 mt-1 shadow-sm overflow-hidden bg-white items-center justify-center">
                      <img src={logo} alt="AI" className="w-[85%] h-[85%] object-contain mt-0.5" />
                    </div>
                  )}
                  <div className="max-w-[80%] space-y-2">
                    <div className={`rounded-2xl p-3 shadow-sm ${m.sender === 'user'
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-tr-sm'
                        : (isDark ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-gray-800 border border-gray-100') + ' rounded-tl-sm'
                      }`}>
                      <p className="text-[13px] leading-relaxed whitespace-pre-line">{renderMessageText(m.text)}</p>
                      <span className="text-[9px] opacity-40 mt-1 block">
                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {m.navButtons && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.navButtons.map((btn, i) => (
                          <button
                            key={i}
                            onClick={() => handleNavClick(btn.path)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 hover:scale-105 shadow-sm ${isDark
                                ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              }`}
                          >
                            <span>{btn.icon}</span>
                            {btn.label}
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* WhatsApp fallback — shown when both AIs fail */}
                    {m.isWhatsAppFallback && (
                      <a
                        href="https://wa.me/918015355914?text=Hi%20Integer.IO%2C%20I%20need%20help!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
                        style={{ background: 'linear-gradient(135deg, #047857, #1d4ed8)' }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp Now
                      </a>
                    )}

                    {m.links && (
                      <div className="space-y-1">
                        {m.links.map(link => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between p-2 rounded-lg text-[11px] font-medium border transition-all hover:scale-[1.02] ${isDark ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                              }`}
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start gap-2">
                  <div className="w-7 h-7 rounded-full flex flex-shrink-0 shadow-sm overflow-hidden bg-white items-center justify-center p-0.5">
                    <img src={logo} alt="AI" className="w-full h-full object-contain" />
                  </div>
                  <div className={`rounded-full px-4 py-2 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm border border-gray-100'}`}>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={lastMessageRef} />
            </div>

            {isLimited ? (
              <div className={`p-4 border-t space-y-2 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Continue on WhatsApp
                </button>
                <p className={`text-[10px] text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Connect directly with our team
                </p>
              </div>
            ) : (
              <div className={`p-3 border-t ${isDark ? 'bg-gray-900/80 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                    placeholder={isTamil ? "Type pannunga..." : "Ask me anything..."}
                    className={`flex-1 bg-transparent border-none outline-none text-sm ${isDark ? 'text-white placeholder:text-gray-500' : 'text-gray-800 placeholder:text-gray-400'}`}
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                    className={`p-2 rounded-lg transition-all ${input.trim()
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:scale-105'
                        : (isDark ? 'text-gray-600' : 'text-gray-300')
                      }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 px-1">
                  <p className="text-[9px] text-gray-400">Powered by Integer Helper AI</p>
                  <button
                    onClick={() => openWhatsApp()}
                    className="flex items-center gap-1 text-[9px] text-emerald-500 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    WhatsApp
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
