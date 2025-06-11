import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from './ApperIcon';
import { courseService, progressService } from '../services';

const MainFeature = () => {
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
        
        // Simulate enrolled courses (first 3 courses)
        const enrolled = courses.slice(0, 3).map(course => {
          const courseProgress = progress.find(p => p.courseId === course.id) || {
            completionPercentage: Math.floor(Math.random() * 80) + 10
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
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-card">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-surface-200 rounded w-1/3"></div>
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                <div className="h-2 bg-surface-200 rounded w-full"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
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
    );
  }

  return (
    <div className="space-y-8">
      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100">Learning Streak</p>
              <p className="text-3xl font-bold">7 days</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <ApperIcon name="Flame" className="w-6 h-6" />
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
              <p className="text-surface-500">Courses Enrolled</p>
              <p className="text-3xl font-bold text-surface-900">{enrolledCourses.length}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <ApperIcon name="BookOpen" className="w-6 h-6 text-secondary" />
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
              <p className="text-surface-500">Lessons Completed</p>
              <p className="text-3xl font-bold text-surface-900">42</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-success" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enrolled Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-surface-900">Continue Learning</h2>
          <Link
            to="/courses"
            className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ApperIcon name="ArrowRight" className="w-4 h-4" />
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 bg-white rounded-xl shadow-card"
          >
            <ApperIcon name="BookOpen" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-surface-900 mb-2">No courses enrolled yet</h3>
            <p className="text-surface-500 mb-6">Explore our course library to start your learning journey</p>
            <Link
              to="/courses"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ApperIcon name="Search" className="w-4 h-4" />
              <span>Browse Courses</span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200"
              >
                <Link to={`/courses/${course.id}`} className="block p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                      <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-surface-900 truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-surface-500 capitalize">{course.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-surface-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-500">Progress</span>
                      <span className="font-medium text-surface-900">
                        {course.progress.completionPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress.completionPercentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-surface-900 mb-6">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-surface-50 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'lesson' ? 'bg-info/10' :
                  activity.type === 'quiz' ? 'bg-success/10' :
                  'bg-accent/10'
                }`}>
                  <ApperIcon 
                    name={
                      activity.type === 'lesson' ? 'Play' :
                      activity.type === 'quiz' ? 'Award' :
                      'BookOpen'
                    } 
                    className={`w-5 h-5 ${
                      activity.type === 'lesson' ? 'text-info' :
                      activity.type === 'quiz' ? 'text-success' :
                      'text-accent'
                    }`} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-surface-900 font-medium">{activity.action}</p>
                  <p className="text-surface-500 text-sm">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;