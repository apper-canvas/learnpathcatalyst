import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { courseService, lessonService, progressService, quizService } from '../services';

const LessonViewer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  useEffect(() => {
    const loadLessonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [courseData, lessonData, lessonsData, progressData, quizData] = await Promise.all([
          courseService.getById(courseId),
          lessonService.getById(lessonId),
          lessonService.getByCourseId(courseId),
          progressService.getByCourseId(courseId),
          quizService.getByLessonId(lessonId).catch(() => null) // Quiz might not exist
        ]);
        
        setCourse(courseData);
        setLesson(lessonData);
        setLessons(lessonsData);
        setProgress(progressData);
        setQuiz(quizData);
        
        // Check if lesson is already completed
        if (progressData?.completedLessons?.includes(lessonId)) {
          setIsVideoCompleted(true);
          setVideoProgress(100);
        }
      } catch (err) {
        setError(err.message || 'Failed to load lesson');
        toast.error('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    if (courseId && lessonId) {
      loadLessonData();
    }
  }, [courseId, lessonId]);

  const handleVideoProgress = (progress) => {
    setVideoProgress(progress);
    if (progress >= 90 && !isVideoCompleted) {
      markLessonComplete();
    }
  };

  const markLessonComplete = async () => {
    if (!progress || isVideoCompleted) return;

    try {
      const updatedCompletedLessons = [...(progress.completedLessons || [])];
      if (!updatedCompletedLessons.includes(lessonId)) {
        updatedCompletedLessons.push(lessonId);
      }

      const completionPercentage = Math.round((updatedCompletedLessons.length / lessons.length) * 100);

      const updatedProgress = await progressService.update(progress.courseId, {
        ...progress,
        completedLessons: updatedCompletedLessons,
        completionPercentage,
        lastAccessed: new Date().toISOString()
      });

      setProgress(updatedProgress);
      setIsVideoCompleted(true);
      toast.success('Lesson completed! 🎉');
    } catch (err) {
      toast.error('Failed to update progress');
    }
  };

  const getNextLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  };

  const getPreviousLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    return currentIndex > 0 ? lessons[currentIndex - 1] : null;
  };

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();

  if (loading) {
    return (
      <div className="min-h-full bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson || !course) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Lesson not found</h3>
          <p className="text-surface-500 mb-4">
            {error || "The lesson you're looking for doesn't exist."}
          </p>
          <Link
            to={`/courses/${courseId}`}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-black">
      {/* Video Player */}
      <div className="relative bg-black">
        <div className="aspect-video bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center">
          {/* Simulated Video Player */}
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ApperIcon name="Play" className="w-10 h-10 ml-1" />
            </div>
            <h3 className="text-xl font-medium mb-2 break-words">{lesson.title}</h3>
            <p className="text-white/70">Duration: {lesson.duration} minutes</p>
            
            {/* Simulated Progress Bar */}
            <div className="w-64 mx-auto mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(videoProgress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${videoProgress}%` }}
                  className="bg-primary h-2 rounded-full"
                />
              </div>
              
              {/* Simulate video progress */}
              {!isVideoCompleted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVideoProgress(100)}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Complete Lesson
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-xl font-semibold break-words">{lesson.title}</h2>
              <p className="text-white/70">{course.title}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {isVideoCompleted && (
                <div className="flex items-center space-x-2 text-success">
                  <ApperIcon name="CheckCircle" className="w-5 h-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
              
              <Link
                to={`/courses/${courseId}`}
                className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                title="Back to course"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <nav className="flex items-center space-x-2 text-sm text-surface-500">
              <Link to={`/courses/${courseId}`} className="hover:text-primary transition-colors">
                {course.title}
              </Link>
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
              <span className="text-surface-900 break-words">{lesson.title}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Lesson Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-card p-6"
              >
                <h3 className="text-xl font-heading font-bold text-surface-900 mb-4">
                  Lesson Notes
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-surface-600 break-words">
                    {lesson.notes || 'No additional notes for this lesson.'}
                  </p>
                </div>
              </motion.div>

              {/* Quiz Section */}
              {quiz && isVideoCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <ApperIcon name="Brain" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-surface-900">
                        Test Your Knowledge
                      </h3>
                      <p className="text-surface-600 text-sm">
                        Complete the quiz to reinforce your learning
                      </p>
                    </div>
                  </div>
                  
                  <Link
                    to={`/courses/${courseId}/lessons/${lessonId}/quiz`}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    <ApperIcon name="Play" className="w-4 h-4" />
                    <span className="font-medium">Start Quiz</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Navigation Buttons */}
              <div className="bg-surface-50 rounded-xl p-6">
                <h4 className="font-medium text-surface-900 mb-4">Navigation</h4>
                <div className="space-y-3">
                  {previousLesson && (
                    <Link
                      to={`/courses/${courseId}/lessons/${previousLesson.id}`}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-surface-50 transition-colors border"
                    >
                      <ApperIcon name="ChevronLeft" className="w-4 h-4 text-surface-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-900 truncate">Previous</p>
                        <p className="text-xs text-surface-500 truncate">{previousLesson.title}</p>
                      </div>
                    </Link>
                  )}
                  
                  {nextLesson && (
                    <Link
                      to={`/courses/${courseId}/lessons/${nextLesson.id}`}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-surface-50 transition-colors border"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-900 text-right truncate">Next</p>
                        <p className="text-xs text-surface-500 text-right truncate">{nextLesson.title}</p>
                      </div>
                      <ApperIcon name="ChevronRight" className="w-4 h-4 text-surface-500" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Course Progress */}
              {progress && (
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h4 className="font-medium text-surface-900 mb-4">Course Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-500">Completion</span>
                      <span className="font-medium">{progress.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress.completionPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-surface-500">
                      {progress.completedLessons?.length || 0} of {lessons.length} lessons completed
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;