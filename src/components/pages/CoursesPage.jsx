import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { courseService, progressService, recommendationService } from '@/services';
import CourseFilters from '@/components/organisms/CourseFilters';
import CourseGrid from '@/components/organisms/CourseGrid';
import CourseRecommendationCarousel from '@/components/organisms/CourseRecommendationCarousel';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import AlertMessage from '@/components/molecules/AlertMessage';
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [coursesData, progressData] = await Promise.all([
        courseService.getAll(),
        progressService.getAll()
      ]);
      setCourses(coursesData);
      setProgress(progressData);

      // Load recommendations if user has progress
      if (progressData.length > 0) {
        setRecommendationsLoading(true);
        try {
          const recommendedCourses = await recommendationService.getRecommendations(progressData, coursesData);
          setRecommendations(recommendedCourses);
        } catch (recError) {
          console.error('Failed to load recommendations:', recError);
        } finally {
          setRecommendationsLoading(false);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load courses');
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const categories = ['all', ...new Set(courses.map(course => course.category))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getCourseProgress = (courseId) => {
    const courseProgress = progress.find(p => p.courseId === courseId);
    return courseProgress ? courseProgress.completionPercentage : 0;
  };

  const handleEnrollment = async (courseId) => {
    try {
      await courseService.enrollInCourse(courseId);
      toast.success('Successfully enrolled in course!');
      // Refresh data to update enrollment status
      loadData();
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in course. Please try again.');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  const showClearFiltersButton = searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all';
  if (loading) {
    return (
      <div className="min-h-full bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-200 rounded w-1/4"></div>
            <div className="h-4 bg-surface-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-card">
                  <div className="h-32 bg-surface-200 rounded mb-4"></div>
                  <div className="h-6 bg-surface-200 rounded mb-2"></div>
                  <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <AlertMessage
          type="error"
          title="Something went wrong"
          message={error}
          actionButton={{ label: 'Try Again', onClick: () => window.location.reload() }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-surface-900 mb-2">
            Course Library
          </h1>
          <p className="text-surface-600">
            Discover and enroll in courses to expand your knowledge
          </p>
        </div>
{/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mb-8">
            <CourseRecommendationCarousel 
              recommendations={recommendations}
              loading={recommendationsLoading}
              title="Recommended for You"
              subtitle="Continue your learning journey with these suggested courses"
            />
          </div>
        )}

        <CourseFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            categories={categories}
            difficulties={difficulties}
        />

<CourseGrid
            filteredCourses={filteredCourses}
            coursesCount={filteredCourses.length}
            totalCoursesCount={courses.length}
            getCourseProgress={getCourseProgress}
            onEnroll={handleEnrollment}
            onClearFilters={handleClearFilters}
            showClearFiltersButton={showClearFiltersButton}
        />
      </div>
    </div>
  );
};

export default CoursesPage;