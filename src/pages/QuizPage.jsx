import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import { courseService, lessonService, quizService, progressService } from '../services';

const QuizPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadQuizData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [courseData, lessonData, quizData, progressData] = await Promise.all([
          courseService.getById(courseId),
          lessonService.getById(lessonId),
          quizService.getByLessonId(lessonId),
          progressService.getByCourseId(courseId)
        ]);
        
        setCourse(courseData);
        setLesson(lessonData);
        setQuiz(quizData);
        setProgress(progressData);
      } catch (err) {
        setError(err.message || 'Failed to load quiz');
        toast.error('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    if (courseId && lessonId) {
      loadQuizData();
    }
  }, [courseId, lessonId]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      if (selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const handleSubmitQuiz = async () => {
    if (!quiz || Object.keys(selectedAnswers).length !== quiz.questions.length) {
      toast.warning('Please answer all questions before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
      
      // Update progress with quiz score
      if (progress) {
        const updatedQuizScores = {
          ...progress.quizScores,
          [lessonId]: calculatedScore
        };

        await progressService.update(progress.courseId, {
          ...progress,
          quizScores: updatedQuizScores,
          lastAccessed: new Date().toISOString()
        });
      }

      setShowResults(true);
      
      if (calculatedScore >= (quiz.passingScore || 70)) {
        toast.success(`Great job! You scored ${calculatedScore}%`);
      } else {
        toast.info(`You scored ${calculatedScore}%. Try again to improve!`);
      }
    } catch (err) {
      toast.error('Failed to submit quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };

  const currentQuestion = quiz?.questions[currentQuestionIndex];
  const totalQuestions = quiz?.questions.length || 0;
  const progressPercentage = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-surface-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz || !course || !lesson) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Quiz not available</h3>
          <p className="text-surface-500 mb-4">
            {error || "No quiz found for this lesson."}
          </p>
          <Link
            to={`/courses/${courseId}/lessons/${lessonId}`}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Lesson
          </Link>
        </div>
      </div>
    );
  }

  if (showResults) {
    const passed = score >= (quiz.passingScore || 70);
    
    return (
      <div className="min-h-full bg-surface-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-card p-8 text-center"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? 'bg-success/10' : 'bg-warning/10'
            }`}>
              <ApperIcon 
                name={passed ? "Trophy" : "RefreshCw"} 
                className={`w-10 h-10 ${passed ? 'text-success' : 'text-warning'}`} 
              />
            </div>
            
            <h1 className="text-3xl font-heading font-bold text-surface-900 mb-4">
              {passed ? 'Congratulations!' : 'Good Effort!'}
            </h1>
            
            <p className="text-surface-600 mb-8">
              {passed 
                ? 'You have successfully completed this quiz.'
                : 'You can retake the quiz to improve your score.'
              }
            </p>
            
            <div className="bg-surface-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-surface-500">Your Score</p>
                  <p className="text-3xl font-bold text-surface-900">{score}%</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500">Passing Score</p>
                  <p className="text-3xl font-bold text-surface-900">{quiz.passingScore || 70}%</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!passed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetakeQuiz}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ApperIcon name="RefreshCw" className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </motion.button>
              )}
              
              <Link
                to={`/courses/${courseId}/lessons/${lessonId}`}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-surface-100 text-surface-900 rounded-lg hover:bg-surface-200 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                <span>Back to Lesson</span>
              </Link>
              
              <Link
                to={`/courses/${courseId}`}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
              >
                <ApperIcon name="BookOpen" className="w-4 h-4" />
                <span>Continue Course</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-surface-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-surface-500 mb-4">
            <Link to={`/courses/${courseId}`} className="hover:text-primary transition-colors">
              {course.title}
            </Link>
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
            <Link to={`/courses/${courseId}/lessons/${lessonId}`} className="hover:text-primary transition-colors">
              {lesson.title}
            </Link>
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
            <span className="text-surface-900">Quiz</span>
          </nav>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-surface-900">
                Quiz: {lesson.title}
              </h1>
              <p className="text-surface-500">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-surface-500">Progress</p>
              <p className="text-lg font-semibold text-surface-900">
                {Math.round(progressPercentage)}%
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-surface-200 rounded-full h-2 mt-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-card p-8 mb-8"
          >
            <div className="mb-8">
              <h2 className="text-xl font-medium text-surface-900 mb-6 break-words">
                {currentQuestion?.question}
              </h2>
              
              <div className="space-y-3">
                {currentQuestion?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswers[currentQuestion.id] === index
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-surface-200 hover:border-surface-300 text-surface-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion.id] === index
                          ? 'border-primary bg-primary text-white'
                          : 'border-surface-300'
                      }`}>
                        {selectedAnswers[currentQuestion.id] === index && (
                          <ApperIcon name="Check" className="w-3 h-3" />
                        )}
                      </div>
                      <span className="break-words">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 text-surface-600 hover:text-surface-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ApperIcon name="ChevronLeft" className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Question indicators */}
            <div className="hidden sm:flex items-center space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-primary text-white'
                      : selectedAnswers[quiz.questions[index].id] !== undefined
                      ? 'bg-success text-white'
                      : 'bg-surface-200 text-surface-600 hover:bg-surface-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          {currentQuestionIndex === totalQuestions - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitQuiz}
              disabled={isSubmitting || Object.keys(selectedAnswers).length !== totalQuestions}
              className="flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="Send" className="w-4 h-4" />
                  <span>Submit Quiz</span>
                </>
              )}
            </motion.button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(Math.min(totalQuestions - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="flex items-center space-x-2 px-4 py-2 text-surface-600 hover:text-surface-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;