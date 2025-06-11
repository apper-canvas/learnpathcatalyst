import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { courseService, progressService } from '@/services';
import DashboardStatsGrid from '@/components/organisms/DashboardStatsGrid';
import EnrolledCoursesList from '@/components/organisms/EnrolledCoursesList';
import BookmarkedLessonsSection from '@/components/organisms/BookmarkedLessonsSection';
import RecentActivityList from '@/components/organisms/RecentActivityList';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import AlertMessage from '@/components/molecules/AlertMessage';

const DashboardPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [courses, progress] = await Promise.all([
          courseService.getAll(),
          progressService.getAll()
        ]);
        
        // Simulate enrolled courses (first 3 courses, or actual enrolled if available)
        const enrolled = courses.slice(0, 3).map(course => {
          const courseProgress = progress.find(p => p.courseId === course.id) || {
            completionPercentage: Math.floor(Math.random() * 80) + 10,
            completedLessons: [], // Ensure this property exists
          };
          return { ...course, progress: courseProgress };
        });

        setEnrolledCourses(enrolled);
        
        // Simulate recent activity
        setRecentActivity([
          { id: 1, action: 'Completed lesson "JavaScript Basics"', time: '2 hours ago', type: 'lesson' },
          { id: 2, action: 'Scored 95% on "Spanish Greetings" quiz', time: '1 day ago', type: 'quiz' },
          { id: 3, action: 'Started "Advanced Math"', time: '2 days ago', type: 'course' }
        ]);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center py-12">
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full bg-surface-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-surface-900 mb-2">
            Welcome back, Learning Explorer! 👋
          </h1>
          <p className="text-surface-600">
            Continue your learning journey and track your progress.
          </p>
        </div>
        
<div className="space-y-8">
            <DashboardStatsGrid enrolledCoursesCount={enrolledCourses.length} />
            <EnrolledCoursesList enrolledCourses={enrolledCourses} />
            <BookmarkedLessonsSection />
            <RecentActivityList recentActivity={recentActivity} />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;