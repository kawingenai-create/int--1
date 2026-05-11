import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import { useTheme } from '../contexts/ThemeContext';
import SEO from '../components/SEO';

// Import product images
import chatzImg from '../assets/products/chatz.io.webp';
import chatzImg2 from '../assets/products/chatzio 2.webp';
import chatzLogo from '../assets/products/chatz-logo.webp';
import crmImg1 from '../assets/products/crm1.webp';
import crmImg2 from '../assets/products/crm2.webp';
import crmLogo from '../assets/products/crm_logo.webp';
import imgGenImg from '../assets/products/img_gen.webp';
import imgGenImg2 from '../assets/products/img_gen2.webp';
import dispLogo from '../assets/products/disp-logo.webp';


const ProductImageCarousel = ({ images, title, color, badge, isDark }: { images: string[], title: string, color: string, badge: string, isDark: boolean }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Auto-scroll logic (pauses on hover)
    React.useEffect(() => {
        if (isHovered) return; // Pause if hovered

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length, isHovered]);

    const paginate = (newDirection: number) => {
        setCurrentIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = images.length - 1;
            if (next >= images.length) next = 0;
            return next;
        });
    };

    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <>
            <div
                className={`relative overflow-hidden rounded-2xl group active:cursor-grabbing border-2 border-emerald-500/80 hover:border-violet-500/80 transition-colors duration-300 shadow-md ${isModalOpen ? '' : 'cursor-pointer'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => !isModalOpen && setIsModalOpen(true)}
            >
                <div className={`relative h-44 sm:h-56 lg:h-72 w-full rounded-2xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`${title} - SaaS Products by Integer.IO Tech Madurai IT Companies`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-contain p-3 sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, zIndex: 1 }}
                        exit={{ opacity: 0, zIndex: 0 }}
                        transition={{ duration: 0.5 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(_, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -10000) {
                                paginate(1);
                            } else if (swipe > 10000) {
                                paginate(-1);
                            }
                        }}
                    />
                </AnimatePresence>

                {/* Badge */}
                <div className="absolute top-3 right-3 z-20">
                    <span className={`px-3 py-1.5 ${color === 'emerald' ? 'bg-emerald-500' : color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'} text-white text-xs font-bold rounded-full shadow-lg`}>
                        {badge}
                    </span>
                </div>

                {/* Dots */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === currentIndex
                                ? (isDark ? 'bg-white w-4' : 'bg-gray-800 w-4')
                                : (isDark ? 'bg-white/30' : 'bg-gray-800/30')
                                }`}
                        />
                    ))}
                </div>
                </div>
            </div>

        {/* Slider Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X className="w-6 h-6 sm:w-8 sm:h-8" />
                        </button>
                        
                        <button
                            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                            className="absolute left-2 sm:left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 sm:w-10 sm:h-10" />
                        </button>
                        
                        <div 
                            className="relative w-full max-w-5xl h-[60vh] sm:h-[80vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                key={currentIndex}
                                src={images[currentIndex]}
                                alt={`${title} Fullscreen - SaaS Products by Integer.IO Tech Madurai IT Companies`}
                                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                            />
                        </div>
                        
                        <button
                            onClick={(e) => { e.stopPropagation(); paginate(1); }}
                            className="absolute right-2 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 sm:w-10 sm:h-10" />
                        </button>

                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                    className={`w-3 h-3 rounded-full transition-all shadow-md ${
                                        idx === currentIndex ? 'bg-emerald-500 w-6' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Products = () => {
    const { isDark } = useTheme();

    const products = [
        {
            id: 1,
            title: 'Chatz.IO',
            logo: chatzLogo,
            subtitle: 'AI Chat Assistant for Students',
            images: [chatzImg, chatzImg2],
            description: 'Chatz.IO is a sophisticated AI-powered chat assistant meticulously designed to support students in their academic journey. It offers instant, high-quality assistance with complex study topics, research methodology, exam preparation, and comprehensive academic guidance. With its deep knowledge base and smart conversational capabilities, Chatz.IO acts as a 24/7 personal tutor, helping students achieve their learning goals with confidence.',
            features: [
                'AI-powered study assistance and tutoring',
                'Research and academic writing support',
                'Exam preparation and practice questions',
                'Multi-subject knowledge integration',
            ],
            visitUrl: 'https://chatz-io.netlify.app/',
            color: 'emerald' as const,
            badge: 'NEW',
            isComingSoon: false,
        },
        {
            id: 2,
            title: 'Project-Portal.IO (CRM)',
            logo: crmLogo,
            subtitle: 'Comprehensive Project Management',
            images: [crmImg1, crmImg2],
            description: 'Project-Portal.IO is a robust, all-in-one Project Management and CRM system engineered to optimize business workflows and enhance team productivity. It provides a centralized hub for managing complex projects, tracking real-time progress, facilitating seamless team collaboration, and maintaining professional client communications. Designed specifically for development agencies and modern teams, it ensures every project stage is executed with precision.',
            features: [
                'Project Lifecycle Management',
                'Client & Team Collaboration Tools',
                'Task Tracking & Progress Monitoring',
                'Automated Reporting & Analytics',
            ],
            visitUrl: 'https://integer-io-projectportal.netlify.app/',
            color: 'emerald' as const,
            badge: 'NEW',
            isComingSoon: false,
        },
        {
            id: 3,
            title: 'Dips.IO',
            logo: dispLogo,
            subtitle: 'AI Image Generation & Documentation',
            images: [imgGenImg, imgGenImg2],
            description: 'Dips.IO represents the next generation of creative tools, combining state-of-the-art AI image generation with advanced documentation management. This innovative platform allows users to transform text into stunning visual assets while simultaneously organizing project technicalities. Whether you are a designer, developer, or content creator, Dips.IO streamlines your creative workflow by bridging the gap between artistic vision and structured documentation.',
            features: [
                'AI-Powered Image Generation',
                'Smart Documentation Management',
                'Seamless Workflow Integration',
                'Advanced Export Options',
            ],
            visitUrl: '',
            color: 'emerald' as const,
            badge: 'COMING SOON',
            isComingSoon: true,
        },
    ];

    return (
        <div className="relative min-h-screen pt-20">
            <SEO 
                title="Our Products in Madurai, Coimbatore & Chennai | SaaS Products by Integer.IO Tech"
                description="Explore SaaS products developed by Integer.IO Tech, one of the top Madurai IT companies. We build cost efficient web development and AI automation tools."
                page="products"
            />
            <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 sm:mb-16"
                >
                    <h1
                        className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                        Our Products
                    </h1>
                    <p
                        className={`text-sm sm:text-lg md:text-xl max-w-3xl mx-auto font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'
                            }`}
                    >
                        Discover our flagship digital solutions designed to transform your business operations and drive growth
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="space-y-8 sm:space-y-12 lg:space-y-16">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <InteractiveCard glowColor={product.color} className="overflow-hidden">
                                <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-4 sm:gap-6 lg:gap-8 p-1 sm:p-4 lg:p-6`}>
                                    {/* Product Image Carousel */}
                                    <div className="lg:w-1/2">
                                        <ProductImageCarousel images={product.images} title={product.title} color={product.color} badge={product.badge} isDark={isDark} />
                                    </div>

                                    {/* Product Details */}
                                    <div className="lg:w-1/2 flex flex-col justify-center">
                                        <span className={`text-[10px] sm:text-xs lg:text-sm font-semibold uppercase tracking-wider mb-1 sm:mb-2 ${isDark ? `text-${product.color}-400` : 'text-emerald-700'}`}>
                                            {product.subtitle}
                                        </span>
                                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                                            <img
                                                src={product.logo}
                                                alt={`${product.title} logo`}
                                                className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-cover rounded-lg shadow-lg ${isDark
                                                    ? 'bg-white border-2 border-white'
                                                    : 'bg-white border-2 border-gray-200'
                                                    }`}
                                            />
                                            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                {product.title}
                                            </h2>
                                        </div>
                                        <p
                                            className={`text-xs sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'
                                                }`}
                                        >
                                            {product.description}
                                        </p>

                                        {/* Features List */}
                                        <ul className={`space-y-1.5 sm:space-y-2 lg:space-y-3 mb-4 sm:mb-6 lg:mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {product.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2 sm:gap-3">
                                                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1.5 ${product.color === 'emerald' ? 'bg-emerald-400' : product.color === 'blue' ? 'bg-blue-400' : 'bg-purple-400'} rounded-full flex-shrink-0`} />
                                                    <span className="text-xs sm:text-sm lg:text-base">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Visit Button or Coming Soon */}
                                        {product.isComingSoon ? (
                                            <div
                                                className={`inline-flex items-center justify-center gap-2 bg-gray-500 cursor-not-allowed text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg w-full sm:w-auto text-xs sm:text-sm lg:text-base`}
                                            >
                                                Coming Soon
                                            </div>
                                        ) : (
                                            <a
                                                href={product.visitUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center justify-center gap-2 ${product.color === 'emerald'
                                                    ? 'bg-emerald-500 hover:bg-emerald-600'
                                                    : product.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600'
                                                        : 'bg-purple-500 hover:bg-purple-600'
                                                    } text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto text-xs sm:text-sm lg:text-base`}
                                            >
                                                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                                                Visit Product
                                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </InteractiveCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-10 sm:mt-16 lg:mt-20"
                >
                    <InteractiveCard className="!p-4 sm:!p-8 lg:!p-12 text-center">
                        <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Need a Custom Solution?
                        </h2>
                        <p
                            className={`text-sm sm:text-lg lg:text-xl mb-4 sm:mb-8 ${isDark ? 'text-gray-200' : 'text-gray-700'
                                }`}
                        >
                            We can build tailored products to match your specific business needs.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Contact Us
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                    </InteractiveCard>
                </motion.div>
            </div>
        </div >
    );
};

export default Products;
