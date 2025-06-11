import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { courseService, lessonService, progressService } from '../services';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourseData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [courseData, lessonsData, progressData] = await Promise.all([
          courseService.getById(courseId),
          lessonService.getByCourseId(courseId),
          progressService.getByCourseId(courseId)
        ]);
        
        setCourse(courseData);
        setLessons(lessonsData);
        setProgress(progressData);
      } catch (err) {
        setError(err.message || 'Failed to load course details');
        toast.error('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadCourseData();
    }
  }, [courseId]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      // Create initial progress entry
      const newProgress = await progressService.create({
        courseId: courseId,
        completedLessons: [],
        quizScores: {},
        lastAccessed: new Date().toISOString(),
        completionPercentage: 0
      });
      
      setProgress(newProgress);
      toast.success('Successfully enrolled in course!');
    } catch (err) {
      toast.error('Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  const handleStartLearning = () => {
    if (lessons.length > 0) {
      const firstLesson = lessons.find(lesson => lesson.order === 1) || lessons[0];
      navigate(`/courses/${courseId}/lessons/${firstLesson.id}`);
    }
  };

  const isEnrolled = progress !== null;
  const completedLessons = progress?.completedLessons || [];

  if (loading) {
    return (
      <div className="min-h-full bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-200 rounded w-1/3"></div>
            <div className="h-4 bg-surface-200 rounded w-1/2"></div>
            <div className="bg-white rounded-xl p-6 shadow-card">
              <div className="h-64 bg-surface-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-surface-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Course not found</h3>
          <p className="text-surface-500 mb-4">
            {error || "The course you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            to="/courses"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-surface-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-surface-500 mb-8">
          <Link to="/courses" className="hover:text-primary transition-colors">
            Courses
          </Link>
          <ApperIcon name="ChevronRight" className="w-4 h-4" />
          <span className="text-surface-900 break-words">{course.title}</span>
        </nav>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-card p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <ApperIcon name="BookOpen" className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-surface-900 break-words">
                    {course.title}
                  </h1>
                  <p className="text-surface-500 capitalize">{course.category}</p>
                </div>
              </div>

              <p className="text-surface-600 text-lg mb-6 break-words">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-surface-500 mb-8">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Clock" className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="BookOpen" className="w-4 h-4" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="BarChart" className="w-4 h-4" />
                  <span className="capitalize">{course.difficulty} level</span>
                </div>
                {isEnrolled && (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="TrendingUp" className="w-4 h-4" />
                    <span>{progress.completionPercentage}% complete</span>
                  </div>
                )}
              </div>

              {/* Progress Bar (if enrolled) */}
              {isEnrolled && (
                <div className="mb-8">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-surface-500">Course Progress</span>
                    <span className="font-medium text-surface-900">
                      {completedLessons.length} of {lessons.length} lessons completed
                    </span>
                  </div>
                  <div className="w-full bg-surface-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.completionPercentage}%` }}
                      transition={{ duration: 1 }}
                      className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Enrollment Card */}
            <div className="lg:w-80 mt-8 lg:mt-0">
              <div className="bg-surface-50 rounded-lg p-6">
                {isEnrolled ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartLearning}
                    disabled={lessons.length === 0}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ApperIcon name="Play" className="w-5 h-5" />
                    <span className="font-semibold">
                      {completedLessons.length > 0 ? 'Continue Learning' : 'Start Learning'}
                    </span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
                  >
                    {enrolling ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-semibold">Enrolling...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Plus" className="w-5 h-5" />
                        <span className="font-semibold">Enroll for Free</span>
                      </>
                    )}
                  </motion.button>
                )}

                <p className="text-center text-sm text-surface-500 mt-3">
                  {isEnrolled ? 'Access all course materials' : 'Get instant access to all lessons'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Curriculum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-card p-8"
        >
          <h2 className="text-2xl font-heading font-bold text-surface-900 mb-6">
            Course Curriculum
          </h2>

          {lessons.length === 0 ? (
            <div className="text-center py-12">
              <ApperIcon name="BookOpen" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500">No lessons available yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isAccessible = isEnrolled;

                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${
                      isAccessible
                        ? 'border-surface-200 hover:border-primary/30 hover:bg-surface-50 cursor-pointer'
                        : 'border-surface-100 bg-surface-50'
                    }`}
                  >
                    {isAccessible ? (
                      <Link
                        to={`/courses/${courseId}/lessons/${lesson.id}`}
                        className="flex items-center space-x-4 flex-1 min-w-0"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-success text-white'
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {isCompleted ? (
                            <ApperIcon name="Check" className="w-5 h-5" />
                          ) : (
                            <ApperIcon name="Play" className="w-4 h-4" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-surface-900 truncate">
                            {lesson.order}. {lesson.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-surface-500 mt-1">
                            <div className="flex items-center space-x-1">
                              <ApperIcon name="Clock" className="w-3 h-3" />
                              <span>{lesson.duration} min</span>
                            </div>
                            {isCompleted && (
                              <div className="flex items-center space-x-1 text-success">
                                <ApperIcon name="CheckCircle" className="w-3 h-3" />
                                <span>Completed</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center">
                          <ApperIcon name="Lock" className="w-4 h-4 text-surface-400" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-surface-500 truncate">
                            {lesson.order}. {lesson.title}
                          </h3>
                          <div className="flex items-center space-x-1 text-sm text-surface-400 mt-1">
                            <ApperIcon name="Clock" className="w-3 h-3" />
                            <span>{lesson.duration} min</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetails;