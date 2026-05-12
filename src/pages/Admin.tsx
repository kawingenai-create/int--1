import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    Trash2,
    Star,
    Users,
    BarChart3,
    Clock,
    TrendingUp,
    RefreshCw,
    Download,
    Mail,
    Bot,
} from 'lucide-react';
import { 
    getPendingReviews, 
    getAnalytics, 
    getContactEnquiries, 
    getApprovedReviews, 
    getChatbotLeads,
    updateEnquiryStatus,
    deleteContactEnquiry,
    deleteChatbotLead,
    PendingReview,
    ContactEnquiry
} from '../lib/supabase';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTheme } from '../contexts/ThemeContext';
import InteractiveCard from '../components/InteractiveCard';

interface Review {
    id: number;
    name: string;
    company?: string;
    email: string;
    rating: number;
    review: string;
    service: string;
    image: string;
    status?: 'pending' | 'approved' | 'rejected';
}

interface Enquiry {
    id: number;
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    status: string;
    created_at: string;
}

interface ChatbotLead {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    message_count?: number;
    unhandled_queries?: string;
    session_id?: string;
    created_at?: string;
}

interface AnalyticsUser {
    id: number;
    last_visit: string;
    device_type: string;
    browser?: string;
    home_visits?: number;
    services_visits?: number;
    contact_visits?: number;
    about_visits?: number;
    products_visits?: number;
    projects_visits?: number;
    admin_visits?: number;
    total_time_spent?: number;
}

interface AnalyticsData {
    totalVisits: number;
    todayVisits: number;
    uniqueVisitors: number;
    mobileVisits: number;
    desktopVisits: number;
    pageViews: { page: string; views: number; avgTime: number }[];
    browserStats: { browser: string; count: number }[];
    weeklyVisits: { day: string; visits: number }[];
    hourlyVisits: { hour: string; today: number; yesterday: number; isCurrentHour: boolean }[];
    avgTimeSpent: number;
    timeOfDay: { morning: number; afternoon: number; evening: number; night: number };
}

const Admin: React.FC = () => {
    const { isDark } = useTheme();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'reviews' | 'analytics' | 'enquiries' | 'chatbot'>('reviews');
    const [chatbotLeads, setChatbotLeads] = useState<ChatbotLead[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [approvedReviews, setApprovedReviews] = useState<Review[]>([]); // Approved reviews state
    const [editingReview, setEditingReview] = useState<Review | null>(null); // Track review being edited
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]); // Added enquiries state
    const [replyText, setReplyText] = useState<{ [key: number]: string }>({}); // Added replyText state
    const [expandedReply, setExpandedReply] = useState<number | null>(null); // Track which enquiry's reply is expanded
    const [analytics, setAnalytics] = useState<AnalyticsData>({
        totalVisits: 0,
        todayVisits: 0,
        uniqueVisitors: 0,
        mobileVisits: 0,
        desktopVisits: 0,
        pageViews: [],
        browserStats: [],
        weeklyVisits: [],
        hourlyVisits: [],
        avgTimeSpent: 0,
        timeOfDay: { morning: 0, afternoon: 0, evening: 0, night: 0 },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [deviceFilter, setDeviceFilter] = useState<'today' | 'lastMonth' | 'overall'>('overall');
    const [allUsers, setAllUsers] = useState<AnalyticsUser[]>([]);
    const dashboardRef = useRef<HTMLDivElement>(null);

    const ADMIN_PASSWORD = 'kawin235';

    // Check if already authenticated
    useEffect(() => {
        const authStatus = sessionStorage.getItem('adminAuth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
            loadData();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            setError('');
            loadData();
        } else {
            setError('Incorrect password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
        setPassword('');
    };

    const loadData = async () => {
        setIsLoading(true);
        try {
            // Import Supabase functions dynamically
            // Functions already imported at top level
            // const { getPendingReviews, getAnalytics, getContactEnquiries, getApprovedReviews, getChatbotLeads } = await import('../lib/supabase');

            // Load pending reviews from Supabase
            const reviewsData = await getPendingReviews();
            const approvedData = await getApprovedReviews(); // Fetch approved reviews
            const enquiriesData = await getContactEnquiries(); // Fetch enquiries
            setReviews(reviewsData.map((r: PendingReview) => ({
                id: r.id,
                name: r.name,
                company: r.company,
                email: r.email,
                rating: r.rating,
                review: r.review,
                service: r.services,
                image: r.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}`,
                status: r.status,
            })));
            // Map enquiries data properly - filter out any invalid entries
            const mappedEnquiries: Enquiry[] = enquiriesData
                .filter((e: ContactEnquiry) => e && e.id)
                .map((e: ContactEnquiry) => ({
                    id: e.id!,
                    name: e.name || 'Unknown',
                    phone: e.phone || 'N/A',
                    email: e.email || 'N/A',
                    service: e.service || 'General Enquiry',
                    message: e.message || '',
                    status: e.status || 'new',
                    created_at: e.created_at || new Date().toISOString(),
                }));
            setEnquiries(mappedEnquiries);

            // Map approved reviews data
            setApprovedReviews(approvedData.map((r: PendingReview) => ({
                id: r.id,
                name: r.name,
                company: r.company,
                email: r.email,
                rating: r.rating,
                review: r.review,
                service: r.services,
                image: r.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}`,
                status: 'approved' as const,
            })));

            // Load chatbot leads
            try {
                const leadsData = await getChatbotLeads();
                setChatbotLeads(leadsData || []);
            } catch { /* table may not exist yet */ }

            // Load analytics from Supabase
            const users = await getAnalytics();

            if (users && users.length > 0) {
                const today = new Date().toDateString();
                setAllUsers(users);

                // Total unique visitors
                const uniqueVisitors = users.length;

                // Calculate total visits across all pages
                const totalVisits = users.reduce((sum: number, u: AnalyticsUser) => {
                    return sum + (u.home_visits || 0) + (u.services_visits || 0) +
                        (u.contact_visits || 0) + (u.about_visits || 0) +
                        (u.products_visits || 0) + (u.projects_visits || 0) +
                        (u.admin_visits || 0);
                }, 0);

                // Today's visitors (users who visited today)
                const todayVisits = users.filter((u: AnalyticsUser) =>
                    new Date(u.last_visit).toDateString() === today
                ).length;

                // Device breakdown
                const mobileVisits = users.filter((u: AnalyticsUser) =>
                    u.device_type === 'mobile' || u.device_type === 'tablet'
                ).length;

                // Page view counts
                const pageViews = [
                    {
                        page: 'Home',
                        views: users.reduce((sum: number, u: AnalyticsUser) => sum + (u.home_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'Services',
                        views: users.reduce((sum: number, u: AnalyticsUser) => sum + (u.services_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'Contact',
                        views: users.reduce((sum: number, u: AnalyticsUser) => sum + (u.contact_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'About',
                        views: users.reduce((sum: number, u: AnalyticsUser) => sum + (u.about_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'Products',
                        views: users.reduce((sum: number, u: AnalyticsUser) => sum + (u.products_visits || 0), 0),
                        avgTime: 0
                    },
                    {
                        page: 'Projects',
                        views: users.reduce((sum: number, u: AnalyticsUser) => sum + (u.projects_visits || 0), 0),
                        avgTime: 0
                    }
                ].sort((a, b) => b.views - a.views);

                // Average time spent
                const totalTime = users.reduce((sum: number, u: AnalyticsUser) => sum + (u.total_time_spent || 0), 0);
                const avgTimeSpent = users.length > 0 ? Math.round(totalTime / users.length) : 0;

                // Browser stats
                const browserCounts: { [key: string]: number } = {};
                users.forEach((u: AnalyticsUser) => {
                    const browser = u.browser || 'Other';
                    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
                });
                const browserStats = Object.entries(browserCounts)
                    .map(([browser, count]) => ({ browser, count }))
                    .sort((a, b) => b.count - a.count);

                // Monthly visits (last 30 days)
                const monthlyVisits: { day: string; visits: number }[] = [];
                for (let i = 29; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dayStr = date.toDateString();
                    const dayVisits = users.filter((u: AnalyticsUser) =>
                        new Date(u.last_visit).toDateString() === dayStr
                    ).length;
                    monthlyVisits.push({
                        day: `${date.getDate()}/${date.getMonth() + 1}`,
                        visits: dayVisits,
                    });
                }

                // Hourly visits - Comparative (Today vs Yesterday)
                const currentHour = new Date().getHours();
                const todayHourlyCounts = new Array(24).fill(0);
                const yesterdayHourlyCounts = new Array(24).fill(0);

                // Get yesterday's date string
                const yesterdayDate = new Date();
                yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                const yesterday = yesterdayDate.toDateString();

                users.forEach((u: AnalyticsUser) => {
                    const date = new Date(u.last_visit);
                    const dateStr = date.toDateString();

                    if (dateStr === today) {
                        todayHourlyCounts[date.getHours()]++;
                    } else if (dateStr === yesterday) {
                        yesterdayHourlyCounts[date.getHours()]++;
                    }
                });

                const hourlyVisits = todayHourlyCounts.map((count, hour) => {
                    return {
                        hour: `${hour}:00`,
                        today: count,
                        yesterday: yesterdayHourlyCounts[hour],
                        isCurrentHour: hour === currentHour
                    };
                });

                setAnalytics({
                    totalVisits,
                    todayVisits,
                    uniqueVisitors,
                    mobileVisits,
                    desktopVisits: uniqueVisitors - mobileVisits,
                    pageViews,
                    browserStats,
                    weeklyVisits: monthlyVisits,
                    hourlyVisits: hourlyVisits || [],
                    avgTimeSpent,
                    timeOfDay: { morning: 0, afternoon: 0, evening: 0, night: 0 },
                });
            }
        } catch (err) {
            console.error('Error loading data:', err);
        }
        setIsLoading(false);
    };

    const handleApproveReview = async (id: number) => {
        const { updateReviewStatus } = await import('../lib/supabase');
        const success = await updateReviewStatus(id, 'approved');
        if (success) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const handleRejectReview = async (id: number) => {
        const { updateReviewStatus } = await import('../lib/supabase');
        const success = await updateReviewStatus(id, 'rejected');
        if (success) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const handleDeleteReview = async (id: number) => {
        if (!window.confirm('Are you sure you want to permanently delete this pending review?')) {
            return;
        }

        try {
            const { supabase } = await import('../lib/supabase');
            const { error } = await supabase
                .from('pending_reviews')
                .delete()
                .eq('id', id);

            if (!error) {
                setReviews(reviews.filter(r => r.id !== id));
            } else {
                console.error('Delete error details:', error);
                alert(`Failed to delete review permanently.\n\nReason: ${error.message || 'Unknown error'}\n\nNote: You may need to enable DELETE permission for the anon or authenticated role on the 'pending_reviews' table in the Supabase Dashboard.`);
            }
        } catch (error: any) {
            console.error('Error deleting review:', error);
            alert(`An error occurred while deleting the review: ${error?.message || 'Unknown error'}`);
        }
    };

    const handleDeleteEnquiry = async (id: number) => {
        if (window.confirm('Are you sure you want to permanently delete this enquiry?')) {
            try {
                const { deleteContactEnquiry } = await import('../lib/supabase');
                const result = await deleteContactEnquiry(id);
                if (result.success) {
                    setEnquiries(enquiries.filter(e => e.id !== id));
                } else {
                    alert(`Failed to delete enquiry.\n\nReason: ${result.error || 'Unknown error'}\n\nNote: You may need to enable DELETE permission for the anon role in Supabase Table Editor → Policies.`);
                }
            } catch (error: any) {
                console.error('Error deleting enquiry:', error);
                alert(`An error occurred: ${error?.message || 'Unknown error'}`);
            }
        }
    };

    const handleDeleteChatbotLead = async (id: number) => {
        if (window.confirm('Are you sure you want to permanently delete this chatbot lead?')) {
            try {
                const { deleteChatbotLead } = await import('../lib/supabase');
                const success = await deleteChatbotLead(id);
                if (success) {
                    setChatbotLeads(chatbotLeads.filter(l => l.id !== id));
                } else {
                    alert('Failed to delete chatbot lead. Please check Supabase RLS permissions.');
                }
            } catch (error: any) {
                console.error('Error deleting chatbot lead:', error);
                alert(`An error occurred: ${error?.message || 'Unknown error'}`);
            }
        }
    };

    // Handle editing approved review
    const handleEditApprovedReview = async (review: Review) => {
        if (!editingReview) {
            setEditingReview(review);
            return;
        }

        // Save the edited review
        try {
            const { updateApprovedReview } = await import('../lib/supabase');
            const success = await updateApprovedReview(editingReview.id, {
                name: editingReview.name,
                company: editingReview.company,
                rating: editingReview.rating,
                review: editingReview.review,
                services: editingReview.service,
            });

            if (success) {
                setApprovedReviews(approvedReviews.map(r =>
                    r.id === editingReview.id ? editingReview : r
                ));
                setEditingReview(null);
            } else {
                alert('Failed to update review');
            }
        } catch (error) {
            console.error('Error updating approved review:', error);
            alert('An error occurred while updating the review');
        }
    };

    // Handle deleting approved review
    const handleDeleteApprovedReview = async (id: number) => {
        if (!window.confirm('Are you sure you want to permanently delete this approved review?')) {
            return;
        }

        try {
            const { deleteApprovedReview } = await import('../lib/supabase');
            const result = await deleteApprovedReview(id);

            if (result.success) {
                setApprovedReviews(approvedReviews.filter(r => r.id !== id));
            } else {
                console.error('Delete error details:', result.error);
                alert(`Failed to delete approved review permanently.\n\nReason: ${result.error || 'Unknown error'}\n\nNote: Permanent deletion requires DELETE permissions for the 'pending_reviews' table in your Supabase project.`);
            }
        } catch (error: any) {
            console.error('Error deleting approved review:', error);
            alert(`An error occurred: ${error?.message || 'Unknown error'}`);
        }
    };

    const generatePDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            let yPosition = 0;

            // Professional Header with Background
            pdf.setFillColor(16, 185, 129); // Emerald Green
            pdf.rect(0, 0, pageWidth, 40, 'F');

            yPosition = 25;
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(26);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Integer.IO', 20, yPosition);

            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Analytics Report', pageWidth - 20, yPosition, { align: 'right' });

            yPosition += 30;

            // Report Meta Data
            pdf.setTextColor(50, 50, 50);
            pdf.setFontSize(10);
            pdf.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, 20, yPosition);
            pdf.text(`Report ID: #${Math.floor(Math.random() * 10000)}`, pageWidth - 20, yPosition, { align: 'right' });

            yPosition += 15;
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.5);
            pdf.line(20, yPosition, pageWidth - 20, yPosition);
            yPosition += 15;

            // Executive Summary Title
            pdf.setFontSize(18);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(16, 185, 129); // Emerald
            pdf.text('Executive Summary', 20, yPosition);
            yPosition += 8;

            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(60, 60, 60);

            // Summary Grid Logic
            const summaryData = [
                { label: 'Total Visits', value: analytics.totalVisits.toLocaleString() },
                { label: 'Unique Visitors', value: analytics.uniqueVisitors.toLocaleString() },
                { label: "Today's Visits", value: analytics.todayVisits.toString() },
                { label: 'Avg. Time', value: `${Math.floor(analytics.avgTimeSpent / 60)}m ${analytics.avgTimeSpent % 60}s` },
                { label: 'Mobile Traffic', value: `${Math.round((analytics.mobileVisits / (analytics.totalVisits || 1)) * 100)}%` },
                { label: 'Desktop Traffic', value: `${Math.round((analytics.desktopVisits / (analytics.totalVisits || 1)) * 100)}%` },
            ];

            let xPos = 20;
            summaryData.forEach((item, index) => {
                if (index % 2 === 0 && index !== 0) {
                    yPosition += 12;
                    xPos = 20;
                }

                // Label
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(10);
                pdf.setTextColor(100, 100, 100);
                pdf.text(item.label + ':', xPos, yPosition);

                // Value
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(11);
                pdf.setTextColor(0, 0, 0);
                pdf.text(item.value, xPos + 40, yPosition);

                xPos += 80;
            });

            yPosition += 20;

            // Capture charts
            if (dashboardRef.current) {
                const charts = dashboardRef.current.querySelectorAll('.recharts-wrapper');

                for (let i = 0; i < Math.min(charts.length, 2); i++) {
                    if (yPosition > pageHeight - 100) {
                        pdf.addPage();
                        yPosition = 20;
                    }

                    pdf.setFontSize(14);
                    pdf.setFont('helvetica', 'bold');
                    pdf.setTextColor(16, 185, 129);
                    pdf.text(i === 0 ? 'Traffic Trends' : 'Monthly Overview', 20, yPosition);
                    yPosition += 10;

                    const chart = charts[i] as HTMLElement;
                    const canvas = await html2canvas(chart, {
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        scale: 2,
                        logging: false,
                        useCORS: true,
                    });

                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = pageWidth - 40;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
                    yPosition += imgHeight + 15;
                }
            }

            // Top Pages Table
            if (yPosition > pageHeight - 60) {
                pdf.addPage();
                yPosition = 30;
            }

            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(16, 185, 129);
            pdf.text('Top Content Performance', 20, yPosition);
            yPosition += 10;

            // Table Header
            pdf.setFillColor(240, 240, 240);
            pdf.rect(20, yPosition, pageWidth - 40, 10, 'F');
            pdf.setFontSize(10);
            pdf.setTextColor(0, 0, 0);
            pdf.text('Page Name', 25, yPosition + 7);
            pdf.text('Views', pageWidth - 80, yPosition + 7);
            pdf.text('Avg. Time', pageWidth - 40, yPosition + 7);
            yPosition += 10;

            // Table Rows
            analytics.pageViews.slice(0, 8).forEach((page) => {
                const rowY = yPosition + 7;
                pdf.setFont('helvetica', 'normal');
                pdf.text(page.page, 25, rowY);
                pdf.text(page.views.toString(), pageWidth - 80, rowY);
                pdf.text(`${page.avgTime}s`, pageWidth - 40, rowY);

                pdf.setDrawColor(230, 230, 230);
                pdf.line(20, yPosition + 10, pageWidth - 20, yPosition + 10);
                yPosition += 10;
            });

            // Footer
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(150);
                pdf.text('Integer.IO - Confidential - Internal Use Only', pageWidth / 2, pageHeight - 10, { align: 'center' });
                pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
            }

            // Save PDF
            pdf.save(`Integer-IO-Analytics-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-28 sm:pt-32 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm"
                >
                    <InteractiveCard glowColor="purple" className="p-6 sm:p-8">
                        <div className="text-center mb-6">
                            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                                }`}>
                                <Lock className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                            </div>
                            <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Admin Access
                            </h1>
                            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Enter password to continue
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className={`w-full px-4 py-3 pr-12 border rounded-lg text-sm ${isDark
                                        ? 'bg-gray-800 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-800'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                            >
                                Login
                            </button>
                        </form>
                    </InteractiveCard>
                </motion.div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen pt-28 sm:pt-32 px-2 sm:px-4 pb-8 sm:pb-12">
            <div className="max-w-7xl mx-auto">
                {/* Print-Only Report Header (hidden on screen, visible on print) */}
                <div className="hidden print:block text-center mb-8 pb-6 border-b-2 border-gray-300">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <BarChart3 className="h-10 w-10" />
                        <span className="text-3xl font-bold">Integer.IO</span>
                    </div>
                    <h1 className="text-2xl font-semibold">Analytics Report</h1>
                    <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 print:hidden"
                >
                    <div>
                        <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Admin Dashboard
                        </h1>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Manage reviews and view analytics
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 printable-hidden">
                        <button
                            onClick={generatePDF}
                            disabled={isGeneratingPDF || activeTab !== 'analytics'}
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${isDark
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-700 disabled:text-gray-500'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-300 disabled:text-gray-500'
                                } disabled:cursor-not-allowed`}
                        >
                            {isGeneratingPDF ? (
                                <>
                                    <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    Export PDF
                                </>
                            )}
                        </button>
                        <button
                            onClick={loadData}
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${isDark
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                }`}
                        >
                            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-2 mb-4 sm:mb-6">
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 py-2.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'reviews'
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                            : isDark
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <Star className="h-4 w-4" />
                        <span className="truncate">Reviews ({reviews.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 py-2.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'analytics'
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                            : isDark
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <BarChart3 className="h-4 w-4" />
                        <span className="truncate">Analytics</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('enquiries')}
                        className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 py-2.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'enquiries'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                            : isDark
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <Mail className="h-4 w-4" />
                        <span className="truncate">Enquiries ({enquiries.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('chatbot')}
                        className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 py-2.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${activeTab === 'chatbot'
                            ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg'
                            : isDark
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <Bot className="h-4 w-4" />
                        <span className="truncate text-left leading-tight">Chatbot Leads ({chatbotLeads.length})</span>
                    </button>
                </div>

                {/* Reviews Tab */}
                {
                    activeTab === 'reviews' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {reviews.length === 0 ? (
                                <InteractiveCard className="p-4 sm:p-8 text-center">
                                    <Star className={`h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                                    <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        No reviews yet
                                    </p>
                                </InteractiveCard>
                            ) : (
                                <div className="grid gap-4">
                                    {reviews.map((review) => (
                                        <InteractiveCard key={review.id} className="p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <img
                                                    src={review.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}`}
                                                    alt={review.name}
                                                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                        <div>
                                                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                                {review.name}
                                                            </h3>
                                                            {review.company && (
                                                                <p className="text-sm text-emerald-400">{review.company}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < review.rating
                                                                        ? 'text-yellow-400 fill-current'
                                                                        : 'text-gray-300'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        Service: {review.service}
                                                    </p>
                                                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        "{review.review}"
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        <button
                                                            onClick={() => handleApproveReview(review.id)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm transition-all"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectReview(review.id)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition-all"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                            Reject
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteReview(review.id)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-all"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </InteractiveCard>
                                    ))}
                                </div>
                            )}

                            {/* Approved Reviews Section */}
                            {approvedReviews.length > 0 && (
                                <div className="mt-6 sm:mt-8">
                                    {/* Mobile Card View (shown only on small screens) */}
                                    <div className="grid gap-4 sm:hidden">
                                        {approvedReviews.map((review) => (
                                            <InteractiveCard key={review.id} className="p-4 relative">
                                                <div className="flex gap-3 mb-3">
                                                    <img
                                                        src={review.image}
                                                        alt={review.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                            {review.name}
                                                        </h4>
                                                        <p className={`text-xs truncate ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                            {review.company || 'Private Client'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                        ))}
                                                    </div>
                                                    <p className={`text-[10px] uppercase font-semibold tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        {review.service}
                                                    </p>
                                                    <p className={`text-sm italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                        "{review.review}"
                                                    </p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditApprovedReview(review)}
                                                        className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteApprovedReview(review.id)}
                                                        className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </InteractiveCard>
                                        ))}
                                    </div>

                                    {/* Desktop Table View (hidden on mobile) */}
                                    <div className="hidden sm:block overflow-x-auto">
                                        <table className={`w-full border-collapse rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                            <thead>
                                                <tr className={isDark ? 'bg-gray-700' : 'bg-gray-100'}>
                                                    <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Client</th>
                                                    <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Company</th>
                                                    <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Rating</th>
                                                    <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Service</th>
                                                    <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Review</th>
                                                    <th className={`px-4 py-3 text-center text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {approvedReviews.map((review) => (
                                                    <tr key={review.id} className={`border-t ${isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <img
                                                                    src={review.image}
                                                                    alt={review.name}
                                                                    className="w-8 h-8 rounded-full object-cover"
                                                                />
                                                                {editingReview?.id === review.id ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editingReview.name}
                                                                        onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                                                                        className={`px-2 py-1 rounded border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                                                    />
                                                                ) : (
                                                                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{review.name}</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {editingReview?.id === review.id ? (
                                                                <input
                                                                    type="text"
                                                                    value={editingReview.company || ''}
                                                                    onChange={(e) => setEditingReview({ ...editingReview, company: e.target.value })}
                                                                    className={`px-2 py-1 rounded border text-sm w-full ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                                                />
                                                            ) : (
                                                                <span className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{review.company || '-'}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {editingReview?.id === review.id ? (
                                                                <select
                                                                    value={editingReview.rating}
                                                                    onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                                                                    className={`px-2 py-1 rounded border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                                                >
                                                                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                                                                </select>
                                                            ) : (
                                                                <div className="flex items-center gap-1">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {editingReview?.id === review.id ? (
                                                                <input
                                                                    type="text"
                                                                    value={editingReview.service}
                                                                    onChange={(e) => setEditingReview({ ...editingReview, service: e.target.value })}
                                                                    className={`px-2 py-1 rounded border text-sm w-full ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                                                />
                                                            ) : (
                                                                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{review.service}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 max-w-xs">
                                                            {editingReview?.id === review.id ? (
                                                                <textarea
                                                                    value={editingReview.review}
                                                                    onChange={(e) => setEditingReview({ ...editingReview, review: e.target.value })}
                                                                    className={`px-2 py-1 rounded border text-sm w-full resize-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                                                    rows={2}
                                                                />
                                                            ) : (
                                                                <p className={`text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`} title={review.review}>
                                                                    "{review.review}"
                                                                </p>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center justify-center gap-2">
                                                                {editingReview?.id === review.id ? (
                                                                    <>
                                                                        <button
                                                                            onClick={() => handleEditApprovedReview(review)}
                                                                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm transition-all"
                                                                        >
                                                                            <CheckCircle className="h-4 w-4" />
                                                                            Save
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setEditingReview(null)}
                                                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all ${isDark ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                                                                        >
                                                                            <XCircle className="h-4 w-4" />
                                                                            Cancel
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <button
                                                                            onClick={() => handleEditApprovedReview(review)}
                                                                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-all"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteApprovedReview(review.id)}
                                                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-all"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                            Delete
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )
                }

                {/* Analytics Tab */}
                {
                    activeTab === 'analytics' && (
                        <motion.div
                            ref={dashboardRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                                <InteractiveCard glowColor="emerald" className="!p-3 sm:!p-6">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <div className={`p-2 sm:p-3 rounded-xl ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                                            <Users className={`h-4 w-4 sm:h-6 sm:w-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Visitors</p>
                                            <p className={`text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {analytics.uniqueVisitors.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>


                                <InteractiveCard glowColor="blue" className="!p-3 sm:!p-6">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <div className={`p-2 sm:p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                                            <BarChart3 className={`h-4 w-4 sm:h-6 sm:w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Page Views</p>
                                            <p className={`text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {analytics.totalVisits.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>

                                <InteractiveCard glowColor="purple" className="!p-3 sm:!p-6">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <div className={`p-2 sm:p-3 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                                            <TrendingUp className={`h-4 w-4 sm:h-6 sm:w-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Today's Page Views</p>
                                            <p className={`text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {analytics.todayVisits.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>

                                <InteractiveCard glowColor="blue" className="!p-3 sm:!p-6">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <div className={`p-2 sm:p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                                            <Clock className={`h-4 w-4 sm:h-6 sm:w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg Time</p>
                                            <p className={`text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {Math.floor(analytics.avgTimeSpent / 60)}m {analytics.avgTimeSpent % 60}s
                                            </p>
                                        </div>
                                    </div>
                                </InteractiveCard>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
                                {/* Hourly Visits Chart */}
                                <InteractiveCard className="!p-3 sm:!p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-6">
                                        <h3 className={`text-sm sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            Visits Comparison (Last 24 Hours)
                                        </h3>
                                        <div className="flex items-center gap-4 text-xs">
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Yesterday</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Today</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-48 sm:h-64 w-full" style={{ minHeight: '192px', minWidth: '200px' }}>
                                        <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                                            <AreaChart data={analytics.hourlyVisits}>
                                                <defs>
                                                    <linearGradient id="colorToday" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorYesterday" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} vertical={false} />
                                                <XAxis
                                                    dataKey="hour"
                                                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    interval={3}
                                                />
                                                <YAxis
                                                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                                        borderColor: isDark ? '#374151' : '#e5e7eb',
                                                        borderRadius: '0.5rem',
                                                        color: isDark ? '#ffffff' : '#000000',
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="yesterday"
                                                    stroke="#9ca3af"
                                                    fill="url(#colorYesterday)"
                                                    fillOpacity={1}
                                                    strokeWidth={2}
                                                    name="Yesterday"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="today"
                                                    stroke="#10b981"
                                                    fill="url(#colorToday)"
                                                    fillOpacity={1}
                                                    strokeWidth={2}
                                                    name="Today"
                                                    dot={(props) => {
                                                        const { cx, cy, payload } = props;
                                                        if (payload.isCurrentHour) {
                                                            return (
                                                                <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="#fff" strokeWidth={2}>
                                                                    <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                                                                </circle>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </InteractiveCard>

                                {/* Monthly Visits Bar Chart */}
                                <InteractiveCard className="!p-3 sm:!p-6">
                                    <h3 className={`text-sm sm:text-lg font-semibold mb-3 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        Monthly Overview (Last 30 Days)
                                    </h3>
                                    <div className="h-48 sm:h-64 w-full" style={{ minHeight: '192px', minWidth: '200px' }}>
                                        <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                                            <BarChart data={analytics.weeklyVisits}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} vertical={false} />
                                                <XAxis
                                                    dataKey="day"
                                                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <YAxis
                                                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                                    contentStyle={{
                                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                                        borderColor: isDark ? '#374151' : '#e5e7eb',
                                                        borderRadius: '0.5rem',
                                                        color: isDark ? '#ffffff' : '#000000',
                                                    }}
                                                />
                                                <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </InteractiveCard>
                            </div>

                            {/* Updated Page Views & Device Stats */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
                                {/* Page Views with Time */}
                                <InteractiveCard className="!p-3 sm:!p-6">
                                    <h3 className={`text-sm sm:text-lg font-semibold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        Top Pages by Views
                                    </h3>
                                    {analytics.pageViews.length === 0 ? (
                                        <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            No data available
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {analytics.pageViews.slice(0, 5).map((pv, idx) => (
                                                <div key={idx} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {idx + 1}
                                                        </span>
                                                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                            {pv.page}
                                                        </p>
                                                    </div>
                                                    <p className={`text-sm font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                        {pv.views} visits
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </InteractiveCard>

                                {/* Device Stats Pie Chart */}
                                <InteractiveCard className="!p-3 sm:!p-6">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <h3 className={`text-sm sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            Device Distribution
                                        </h3>
                                        <select
                                            value={deviceFilter || 'overall'}
                                            onChange={(e) => setDeviceFilter(e.target.value as 'today' | 'lastMonth' | 'overall')}
                                            className={`px-3 py-1.5 rounded-lg border text-sm font-medium outline-none cursor-pointer ${isDark
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-gray-100 border-gray-300 text-gray-800'
                                                }`}
                                        >
                                            <option value="today">Today</option>
                                            <option value="lastMonth">Last Month</option>
                                            <option value="overall">Overall</option>
                                        </select>
                                    </div>
                                    <div className="h-48 sm:h-64 w-full" style={{ minHeight: '192px', minWidth: '200px' }}>
                                        <ResponsiveContainer width="100%" height="100%" minWidth={200}>
                                            <PieChart>
                                                <Pie
                                                    data={(() => {
                                                        const filteredUsers = allUsers.filter((u: AnalyticsUser) => {
                                                            if (deviceFilter === 'today') {
                                                                return new Date(u.last_visit).toDateString() === new Date().toDateString();
                                                            } else if (deviceFilter === 'lastMonth') {
                                                                const monthAgo = new Date();
                                                                monthAgo.setMonth(monthAgo.getMonth() - 1);
                                                                return new Date(u.last_visit) >= monthAgo;
                                                            }
                                                            return true; // overall
                                                        });
                                                        const mobile = filteredUsers.filter((u: AnalyticsUser) => u.device_type === 'mobile' || u.device_type === 'tablet').length;
                                                        const desktop = filteredUsers.length - mobile;
                                                        return [
                                                            { name: 'Mobile', value: mobile },
                                                            { name: 'Desktop', value: desktop }
                                                        ];
                                                    })()}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={true}
                                                    label={({ name, value, percent, x, y }) => (
                                                        <text x={x} y={y} fill={isDark ? '#ffffff' : '#1f2937'} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
                                                            {`${name}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`}
                                                        </text>
                                                    )}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    <Cell fill="#8b5cf6" />
                                                    <Cell fill="#10b981" />
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                                        borderColor: isDark ? '#374151' : '#e5e7eb',
                                                        borderRadius: '0.5rem',
                                                        color: isDark ? '#ffffff' : '#000000',
                                                    }}
                                                />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </InteractiveCard>
                            </div>
                        </motion.div>
                    )}

                {/* Enquiries Tab */}
                {
                    activeTab === 'enquiries' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid gap-6">
                                {enquiries.length === 0 ? (
                                    <InteractiveCard className="p-6 sm:p-12 text-center">
                                        <Mail className={`h-10 w-10 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                                        <h3 className={`text-base sm:text-xl font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            No Enquiries Yet
                                        </h3>
                                        <p className={`text-xs sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Contact form submissions will appear here
                                        </p>
                                    </InteractiveCard>
                                ) : (
                                    enquiries.map((enquiry) => (
                                        <InteractiveCard key={enquiry.id} className="p-3 sm:p-6">
                                            {/* Header with name and date */}
                                            <div className="mb-3">
                                                <h3 className={`text-base sm:text-lg font-semibold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                    {enquiry.name}
                                                </h3>
                                                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {new Date(enquiry.created_at).toLocaleString()}
                                                </p>
                                            </div>

                                            {/* Enquiry details */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                                                <div>
                                                    <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Email
                                                    </p>
                                                    <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {enquiry.email}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Phone
                                                    </p>
                                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {enquiry.phone}
                                                    </p>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Service
                                                    </p>
                                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {enquiry.service}
                                                    </p>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Message
                                                    </p>
                                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {enquiry.message}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Reply section - shown when expanded */}
                                            {expandedReply === enquiry.id && (
                                                <div className="mt-3 sm:mt-4 mb-3">
                                                    <label className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        Reply
                                                    </label>
                                                    <textarea
                                                        value={replyText[enquiry.id] || ''}
                                                        onChange={(e) => setReplyText({ ...replyText, [enquiry.id]: e.target.value })}
                                                        placeholder="Type your reply here..."
                                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors text-sm ${isDark
                                                            ? 'bg-gray-800 border-gray-600 text-white'
                                                            : 'bg-white border-gray-300 text-gray-800'
                                                            }`}
                                                        rows={2}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const reply = replyText[enquiry.id] || '';
                                                            const subject = `Re: ${enquiry.service} Enquiry`;
                                                            const body = `${reply}%0D%0A%0D%0A--- Original Message ---%0D%0AFrom: ${enquiry.name}%0D%0AEmail: ${enquiry.email}%0D%0APhone: ${enquiry.phone}%0D%0AService: ${enquiry.service}%0D%0AMessage: ${enquiry.message}`;
                                                            window.open(`mailto:${enquiry.email}?subject=${subject}&body=${body}`);
                                                            setExpandedReply(null); // Close after sending
                                                        }}
                                                        className="mt-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                    >
                                                        <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        Send
                                                    </button>
                                                </div>
                                            )}

                                            {/* Action buttons at the end */}
                                            <div className={`flex gap-2 mt-3 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                                <button
                                                    onClick={() => setExpandedReply(expandedReply === enquiry.id ? null : enquiry.id)}
                                                    className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
                                                >
                                                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    {expandedReply === enquiry.id ? 'Cancel' : 'Reply'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEnquiry(enquiry.id)}
                                                    className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
                                                >
                                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </InteractiveCard>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )
                }

                {/* Chatbot Leads Tab */}
                {
                    activeTab === 'chatbot' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {/* Analytics Summary Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                <InteractiveCard glowColor="blue" className="!p-3 sm:!p-4 text-center">
                                    <Bot className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {chatbotLeads.length}
                                    </p>
                                    <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Leads</p>
                                </InteractiveCard>
                                <InteractiveCard glowColor="emerald" className="!p-3 sm:!p-4 text-center">
                                    <TrendingUp className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                    <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {chatbotLeads.reduce((sum: number, l: ChatbotLead) => sum + (l.message_count || 0), 0)}
                                    </p>
                                    <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Messages</p>
                                </InteractiveCard>
                                <InteractiveCard glowColor="purple" className="!p-3 sm:!p-4 text-center">
                                    <Clock className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                                    <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {chatbotLeads.filter((l: ChatbotLead) => {
                                            if (!l.created_at) return false;
                                            const d = new Date(l.created_at);
                                            const today = new Date();
                                            return d.toDateString() === today.toDateString();
                                        }).length}
                                    </p>
                                    <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Today's Chats</p>
                                </InteractiveCard>
                                <InteractiveCard glowColor="blue" className="!p-3 sm:!p-4 text-center">
                                    <Users className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {chatbotLeads.filter((l: ChatbotLead) => l.name && l.email).length}
                                    </p>
                                    <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Verified Leads</p>
                                </InteractiveCard>
                            </div>

                            {/* Leads Table */}
                            {chatbotLeads.length === 0 ? (
                                <InteractiveCard className="p-4 sm:p-8 text-center">
                                    <Bot className={`h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                                    <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        No chatbot leads yet. Leads will appear here when visitors chat with Integer Helper AI.
                                    </p>
                                </InteractiveCard>
                            ) : (
                                <InteractiveCard className="!p-0 overflow-hidden">
                                    <div className={`p-3 sm:p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                        <h3 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            🤖 Integer Chat Leads
                                        </h3>
                                    </div>

                                    {/* Mobile Cards (shown on small screens) */}
                                    <div className="sm:hidden divide-y divide-gray-700/50">
                                        {chatbotLeads.map((lead: ChatbotLead) => (
                                            <div key={lead.id} className="p-4 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                            {lead.name || 'Anonymous User'}
                                                        </h4>
                                                        <p className={`text-xs truncate ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                                            {lead.email || 'No email provided'}
                                                        </p>
                                                    </div>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                                        {lead.message_count || 0} msgs
                                                    </span>
                                                </div>

                                                {lead.unhandled_queries && (
                                                    <div className={`p-2 rounded-lg text-xs leading-relaxed ${isDark ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'}`}>
                                                        <span className="font-bold">Latest Query:</span> {lead.unhandled_queries}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-1">
                                                    <div className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        {lead.created_at ? new Date(lead.created_at).toLocaleString() : '—'}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`text-[10px] font-medium uppercase tracking-tighter ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                                            ID: {lead.session_id?.slice(0, 8)}...
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteChatbotLead(lead.id)}
                                                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                                            title="Delete Lead"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Desktop Table View (hidden on mobile) */}
                                    <div className="hidden sm:block overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className={isDark ? 'bg-gray-800/50' : 'bg-gray-50'}>
                                                    <th className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>#</th>
                                                    <th className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Name</th>
                                                    <th className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</th>
                                                    <th className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Msgs</th>
                                                    <th className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>User Query</th>
                                                    <th className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date & Time</th>
                                                    <th className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {chatbotLeads.map((lead: ChatbotLead, index: number) => (
                                                    <tr key={lead.id} className={`border-t transition-colors ${isDark ? 'border-gray-700/50 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                                                        <td className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{index + 1}</td>
                                                        <td className="px-3 sm:px-4 py-2.5">
                                                            <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                                {lead.name || '—'}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-2.5">
                                                            <span className={`text-xs sm:text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                                                {lead.email || '—'}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-2.5">
                                                            <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-full text-xs font-bold ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                                                {lead.message_count || 0}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-2.5">
                                                            {lead.unhandled_queries ? (
                                                                <span className={`text-xs sm:text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                                                                    {lead.unhandled_queries}
                                                                </span>
                                                            ) : (
                                                                <span className={`text-[10px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>—</span>
                                                            )}
                                                        </td>
                                                        <td className={`px-3 sm:px-4 py-2.5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                            {lead.created_at ? (
                                                                <div>
                                                                    <div>{new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                                                    <div className="text-[10px] opacity-70">{new Date(lead.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                                                                </div>
                                                            ) : '—'}
                                                        </td>
                                                        <td className="px-3 sm:px-4 py-2.5">
                                                            <button
                                                                onClick={() => handleDeleteChatbotLead(lead.id)}
                                                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                                                title="Delete Lead"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </InteractiveCard>
                            )}
                        </motion.div>
                    )
                }
            </div>
        </div >
    );
};

export default Admin;
