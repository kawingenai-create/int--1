import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Play,
  Pause,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import StatusPopup from './StatusPopup';
import { getApprovedReviews, PendingReview } from '../lib/supabase';

interface Review {
  id: number;
  name: string;
  company?: string;
  service: string;
  rating: number;
  review: string;
  image: string;
  email: string;
}

const ReviewCarousel: React.FC = () => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    rating: 5,
    services: [] as string[],
    description: '',
    imageUrl: '',
  });

  const [reviews, setReviews] = useState<Review[]>([]);

  const initialReviews: Review[] = [
    {
      id: 1,
      name: 'Sathya',
      company: 'SAS Impex',
      service: 'Web Development, Digital Marketing',
      rating: 5,
      review:
        'Excellent work on our company website. Professional design and fast delivery with outstanding support. Highly recommended for web development services.',
      image: 'https://i.postimg.cc/0ywc427b/image.png',
      email: 'sathya@sasimpex.com',
    },
    {
      id: 2,
      name: 'Kaviya',
      company: 'Student',
      service: 'AI & ML Projects',
      rating: 4,
      review:
        'Amazing work on my Blind People Object Detection using NLP project. The AI solution was innovative and helped me complete my academic project successfully.',
      image: 'https://i.postimg.cc/cJMRwKNG/236432-200.png',
      email: 'kaviya.student@example.com',
    },
    {
      id: 3,
      name: 'G. Veeramani',
      company: 'Sri Lakshmi Bus Consulting',
      service: 'Web Services, Logo & Poster Design',
      rating: 5,
      review:
        'Outstanding website development for our bus consulting business. The team delivered a professional and user-friendly website that perfectly meets our needs.',
      image: 'https://i.postimg.cc/L83NSQ0p/car1.jpg',
      email: 'veeramani@srilakshmibus.com',
    },
    {
      id: 4,
      name: 'Mr. Ravi Vishwanathan',
      company: 'Sri Karpagam Brand',
      service: 'Web Development, Video Editing',
      rating: 4.5,
      review:
        'Great results with their web development services. As the proprietor, I am impressed with the professional approach and quality of work delivered for our brand.',
      image:
        'https://i.postimg.cc/NMXwdwpt/Chat-GPT-Image-Aug-8-2025-01-52-35-PM.png',
      email: 'ravi@srikarpagambrand.com',
    },
    {
      id: 5,
      name: 'Deva',
      company: 'BE student',
      service: 'Data Analytics Projects, AI & ML Projects',
      rating: 5,
      review:
        'The fuel prediction data analytics project helped us optimize our operations significantly. Very impressed with their analytical skills and accurate predictions.',
      image:
        'https://i.postimg.cc/ryYS1X7s/Whats-App-Image-2025-05-25-at-16-15-18-9210f05f.jpg',
      email: 'deva.analytics@example.com',
    },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const approvedData = await getApprovedReviews();

        const dbReviews: Review[] = approvedData.map((r: PendingReview) => ({
          id: r.id,
          name: r.name,
          company: r.company,
          service: r.services,
          rating: r.rating,
          review: r.review,
          image: r.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}`,
          email: r.email,
        }));

        setReviews([...initialReviews, ...dbReviews]);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews(initialReviews);
      }
    };

    fetchReviews();
  }, [initialReviews]);

  useEffect(() => {
    if (reviews.length > 0 && isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 4000); // Slower for mobile
      return () => clearInterval(interval);
    }
  }, [reviews.length, isAutoPlay]);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const handlePrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const handleDeleteReview = (reviewId: number) => {
    if (initialReviews.some((r) => r.id === reviewId)) {
      setPopupMessage('Initial reviews cannot be deleted.');
      setPopupType('error');
      setShowStatusPopup(true);
      return;
    }

    const updatedReviews = reviews.filter((r) => r.id !== reviewId);
    setReviews(updatedReviews);

    const userReviews = updatedReviews.filter(
      (r) => !initialReviews.some((ir) => ir.id === r.id)
    );
    localStorage.setItem('reviews', JSON.stringify(userReviews));

    if (currentIndex >= updatedReviews.length && updatedReviews.length > 0) {
      setCurrentIndex(updatedReviews.length - 1);
    }

    setPopupMessage('Review deleted successfully.');
    setPopupType('success');
    setShowStatusPopup(true);
    setShowDeleteConfirm(null);
  };

  const serviceOptions = [
    'Web Services',
    'Digital Marketing',
    'Video Editing',
    'Logo & Poster Design',
    'AI & ML Projects',
    'Data Analytics Projects',
  ];

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now(),
      name: formData.name,
      company: formData.company,
      service: formData.services.join(', '),
      rating: formData.rating,
      review: formData.description,
      image:
        formData.imageUrl ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          formData.name
        )}&background=random`,
      email: formData.email,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(
      'reviews',
      JSON.stringify(
        updatedReviews.filter(
          (r) => !initialReviews.some((ir) => ir.id === r.id)
        )
      )
    );


    setPopupMessage(
      'Thank you for your review! It has been added to the carousel.'
    );
    setPopupType('success');
    setShowStatusPopup(true);

    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      rating: 5,
      services: [],
      description: '',
      imageUrl: '',
    });
    setShowReviewForm(false);
  };

  const getVisibleReviews = () => {
    if (reviews.length <= 3) return reviews;
    const visibleReviews = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + reviews.length) % reviews.length;
      visibleReviews.push({ ...reviews[index], position: i });
    }
    return visibleReviews;
  };

  const cardVariants = {
    center: { x: 0, scale: 1, opacity: 1, zIndex: 10, rotateY: 0 },
    left: { x: '-85%', scale: 0.8, opacity: 0.6, zIndex: 1, rotateY: 45 },
    right: { x: '85%', scale: 0.8, opacity: 0.6, zIndex: 1, rotateY: -45 },
  };

  const mobileCardVariants = {
    center: { x: 0, scale: 1, opacity: 1, zIndex: 10 },
    left: { x: '-100%', scale: 0.9, opacity: 0, zIndex: 1 },
    right: { x: '100%', scale: 0.9, opacity: 0, zIndex: 1 },
  };

  return (
    <div className="relative py-8 min-h-[500px] px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center mb-6">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isDark
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
        >
          {isAutoPlay ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {isAutoPlay ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="relative flex items-center justify-center h-[350px] sm:h-96 mb-8 w-full overflow-hidden">
        <AnimatePresence>
          {reviews.length > 0 &&
            getVisibleReviews().map((review) => {
              const position = review.position;
              const isCenter = position === 0;

              return (
                <motion.div
                  key={`${review.id}-${position}`}
                  className={`absolute w-full max-w-2xl h-[250px] sm:h-80 ${!isCenter ? 'hidden sm:block' : ''
                    }`}
                  variants={
                    (typeof window !== 'undefined' && window.innerWidth < 640) ? mobileCardVariants : cardVariants
                  }
                  animate={
                    isCenter ? 'center' : position === -1 ? 'left' : 'right'
                  }
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div
                    className={`h-full rounded-2xl backdrop-blur-xl border transition-all duration-500 relative ${isDark
                      ? 'bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
                      : 'bg-white/40 border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'
                      }`}
                  >
                    <div className="flex flex-col h-full justify-between p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-4 ring-2 ring-emerald-400/30"
                        />
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-base sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-800'
                              }`}
                          >
                            {review.name}
                          </h3>
                          {review.company && (
                            <p className="text-sm sm:text-base font-medium text-emerald-400 truncate">
                              {review.company}
                            </p>
                          )}
                          <p
                            className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'
                              }`}
                          >
                            Service:{' '}
                            <span
                              className="font-semibold bg-clip-text text-transparent"
                              style={{ backgroundImage: 'linear-gradient(135deg, #065f46, #0f766e, #1e40af)' }}
                            >
                              {review.service}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 sm:h-5 sm:w-5 mr-1 ${i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        <p
                          className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'
                            }`}
                        >
                          "{review.review}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={handlePrevious}
          className={`p-2 sm:p-3 rounded-full transition-colors shadow-lg ${isDark
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="flex space-x-2 overflow-x-auto max-w-xs sm:max-w-none">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentIndex
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 w-6'
                : isDark
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
                }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className={`p-2 sm:p-3 rounded-full transition-colors shadow-lg ${isDark
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteConfirm(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm rounded-xl shadow-2xl p-4 sm:p-6 ${isDark
              ? 'bg-gray-900 border border-gray-700'
              : 'bg-white border border-gray-200'
              }`}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3
                className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'
                  }`}
              >
                Delete Review
              </h3>
              <p
                className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
              >
                Are you sure you want to delete this review? This action cannot
                be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteReview(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowReviewForm(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm sm:max-w-md max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl ${isDark
              ? 'bg-gray-900 border border-gray-700'
              : 'bg-white border border-gray-200'
              }`}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  Give Your Review
                </h2>
                <button onClick={() => setShowReviewForm(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg ${isDark
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg ${isDark
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg ${isDark
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg ${isDark
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    Rating *
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      >
                        <Star
                          className={`h-6 w-6 ${star <= formData.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    Services Received *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="mr-2 text-emerald-500"
                        />
                        <span
                          className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'
                            }`}
                        >
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg resize-none ${isDark
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                  >
                    Profile Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg ${isDark
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Status Popup */}
      {showStatusPopup && (
        <StatusPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowStatusPopup(false)}
        />
      )}
    </div>
  );
};

export default ReviewCarousel;
