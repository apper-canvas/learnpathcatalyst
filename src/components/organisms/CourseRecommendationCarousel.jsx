import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import CourseCard from '@/components/molecules/CourseCard';
import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

const CourseRecommendationCarousel = ({ 
  recommendations = [], 
  loading = false, 
  error = null,
  title = "Recommended for You",
  subtitle = "Based on your learning progress"
}) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320; // Card width + gap
    const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    // Update scroll button states
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }, 300);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-surface-200 rounded-lg animate-pulse"></div>
          <div>
            <div className="h-6 bg-surface-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-surface-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>
        <div className="flex space-x-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-80 h-64 bg-surface-100 rounded-xl animate-pulse flex-shrink-0"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="text-center py-8">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-3" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Unable to load recommendations</h3>
          <p className="text-surface-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!recommendations.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-surface-900">
              {title}
            </h2>
            <p className="text-surface-500 text-sm">{subtitle}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-lg border transition-all ${
              canScrollLeft 
                ? 'border-surface-300 hover:border-primary hover:bg-primary/5 text-surface-600 hover:text-primary' 
                : 'border-surface-200 text-surface-300 cursor-not-allowed'
            }`}
          >
            <ApperIcon name="ChevronLeft" className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-lg border transition-all ${
              canScrollRight 
                ? 'border-surface-300 hover:border-primary hover:bg-primary/5 text-surface-600 hover:text-primary' 
                : 'border-surface-200 text-surface-300 cursor-not-allowed'
            }`}
          >
            <ApperIcon name="ChevronRight" className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recommendations.map((course, index) => (
            <div key={course.id} className="flex-shrink-0 w-80">
              <CourseCard
                course={course}
                progressPercentage={0}
                isEnrolled={false}
                index={index}
              />
              {/* Recommendation reason */}
              {course.reason && (
                <div className="mt-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full inline-block">
                  {course.reason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseRecommendationCarousel;