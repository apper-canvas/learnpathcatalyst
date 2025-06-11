import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import { courseService, progressService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import AlertMessage from '@/components/molecules/AlertMessage';
import LinkButton from '@/components/atoms/LinkButton';
import OverallProgressStats from '@/components/organisms/OverallProgressStats';
import AchievementsList from '@/components/organisms/AchievementsList';
import CourseProgressList from '@/components/organisms/CourseProgressList';

const ProgressPage = () => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProgressData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [coursesData, progressData] = await Promise.all([
          courseService.getAll(),
          progressService.getAll()
        ]);
        setCourses(coursesData);
        setProgress(progressData);
      } catch (err) {
        setError(err.message || 'Failed to load progress data');
        toast.error('Failed to load progress data');
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, []);

  const getEnrolledCourses = () => {
return courses.filter(course => 
      progress.some(p => p.courseId === course.id)
    ).map(course => {
      const courseProgress = progress.find(p => p.courseId === course.id);
      return { 
        ...course, 
        progress: courseProgress,
        quizScores: courseProgress?.quizScores || {}
      };
    });
  };

  const getOverallStats = () => {
    const enrolledCourses = getEnrolledCourses();
    const totalCourses = enrolledCourses.length;
    const completedCourses = enrolledCourses.filter(c => c.progress.completionPercentage === 100).length;
    const avgProgress = totalCourses > 0 
      ? Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress.completionPercentage, 0) / totalCourses)
      : 0;
    
    const totalLessons = enrolledCourses.reduce((sum, c) => sum + (c.progress.completedLessons?.length || 0), 0);
    
    return {
      totalCourses,
      completedCourses,
      avgProgress,
      totalLessons
    };
  };

  const getAchievements = () => {
    const stats = getOverallStats();
    const achievements = [];

    if (stats.totalLessons >= 10) {
      achievements.push({
        id: 'lessons-10',
        title: 'Dedicated Learner',
        description: 'Completed 10+ lessons',
        icon: 'Award',
        color: 'bg-success/10 text-success'
      });
    }

    if (stats.completedCourses >= 1) {
      achievements.push({
        id: 'course-complete',
        title: 'Course Finisher',
        description: 'Completed your first course',
        icon: 'Trophy',
        color: 'bg-accent/10 text-accent'
      });
    }

    if (stats.avgProgress >= 50) {
      achievements.push({
        id: 'halfway-hero',
        title: 'Halfway Hero',
        description: 'Average progress above 50%',
        icon: 'TrendingUp',
        color: 'bg-primary/10 text-primary'
      });
    }

    return achievements;
  };

  const stats = getOverallStats();
  const enrolledCourses = getEnrolledCourses();
  const achievements = getAchievements();

  if (loading) {
    return (
      <div className="min-h-full bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-card">
                  <div className="h-16 bg-surface-200 rounded mb-4"></div>
                  <div className="h-6 bg-surface-200 rounded"></div>
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
            My Progress
          </h1>
          <p className="text-surface-600">
            Track your learning journey and celebrate achievements
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow-card"
          >
            <ApperIcon name="TrendingUp" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-surface-900 mb-2">No progress to show yet</h3>
            <p className="text-surface-500 mb-6">
              Enroll in courses to start tracking your learning progress
            </p>
            <LinkButton
              to="/courses"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              <ApperIcon name="BookOpen" className="w-4 h-4" />
              <span>Browse Courses</span>
            </LinkButton>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <OverallProgressStats stats={stats} />
            <AchievementsList achievements={achievements} />
<CourseProgressList 
              enrolledCourses={enrolledCourses}
              showQuizScores={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;