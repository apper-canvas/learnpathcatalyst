import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { courseService, progressService } from '../services';

const Progress = () => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');

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
      return { ...course, progress: courseProgress };
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
              {[...Array(4)].map((_, i) => (
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
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Something went wrong</h3>
          <p className="text-surface-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
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
            <Link
              to="/courses"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ApperIcon name="BookOpen" className="w-4 h-4" />
              <span>Browse Courses</span>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-100">Enrolled Courses</p>
                    <p className="text-3xl font-bold">{stats.totalCourses}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <ApperIcon name="BookOpen" className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-surface-500">Completed</p>
                    <p className="text-3xl font-bold text-surface-900">{stats.completedCourses}</p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <ApperIcon name="CheckCircle" className="w-6 h-6 text-success" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-surface-500">Avg Progress</p>
                    <p className="text-3xl font-bold text-surface-900">{stats.avgProgress}%</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <ApperIcon name="TrendingUp" className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-surface-500">Lessons Done</p>
                    <p className="text-3xl font-bold text-surface-900">{stats.totalLessons}</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <ApperIcon name="Play" className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-heading font-bold text-surface-900 mb-6">
                  Achievements 🏆
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-card"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.color}`}>
                          <ApperIcon name={achievement.icon} className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-surface-900">{achievement.title}</h3>
                          <p className="text-sm text-surface-500">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Course Progress */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-surface-900 mb-6">
                Course Progress
              </h2>
              <div className="space-y-4">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-xl shadow-card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading font-semibold text-surface-900 truncate">
                            {course.title}
                          </h3>
                          <p className="text-sm text-surface-500 capitalize">{course.category}</p>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-bold text-surface-900">
                          {course.progress.completionPercentage}%
                        </p>
                        <p className="text-xs text-surface-500">Complete</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-surface-500">Progress</span>
                        <span className="text-surface-700">
                          {course.progress.completedLessons?.length || 0} of {course.totalLessons} lessons
                        </span>
                      </div>
                      
                      <div className="w-full bg-surface-200 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress.completionPercentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-surface-500">
                          Last accessed: {new Date(course.progress.lastAccessed).toLocaleDateString()}
                        </span>
                        
                        <Link
                          to={`/courses/${course.id}`}
                          className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80 font-medium"
                        >
                          <span>Continue</span>
                          <ApperIcon name="ArrowRight" className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;