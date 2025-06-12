import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { courseService, lessonService, quizService, progressService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import AlertMessage from '@/components/molecules/AlertMessage';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import ProgressBar from '@/components/molecules/ProgressBar';
import QuizQuestionDisplay from '@/components/organisms/QuizQuestionDisplay';
import QuizResultDisplay from '@/components/organisms/QuizResultDisplay';

const QuizPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCourseLevelQuiz, setIsCourseLevelQuiz] = useState(false);
  
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
      
      // Determine if this is a course-level quiz (no lessonId) or lesson-specific quiz
      const isCourseQuiz = !lessonId;
      setIsCourseLevelQuiz(isCourseQuiz);
      
      try {
        if (isCourseQuiz) {
          // Course-level quiz
          const [courseData, quizData, progressData] = await Promise.all([
            courseService.getById(courseId),
            quizService.getByCourseId(courseId),
            progressService.getByCourseId(courseId)
          ]);
          
          setCourse(courseData);
          setQuiz(quizData);
          setProgress(progressData);
          setLesson(null);
        } else {
          // Lesson-specific quiz
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
        }
      } catch (err) {
        setError(err.message || 'Failed to load quiz');
        toast.error('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
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
      
      if (progress) {
        const scoreKey = isCourseLevelQuiz ? `course_${courseId}` : lessonId;
        const currentBestScore = progress.quizScores?.[scoreKey] || 0;
        const newBestScore = Math.max(currentBestScore, calculatedScore);
        
        const updatedQuizScores = {
          ...progress.quizScores,
          [scoreKey]: newBestScore
        };

        await progressService.update(progress.courseId, {
          ...progress,
          quizScores: updatedQuizScores,
          lastAccessed: new Date().toISOString()
        });

        if (calculatedScore > currentBestScore) {
          toast.success(`New best score! You scored ${calculatedScore}%`);
        } else if (calculatedScore === currentBestScore && currentBestScore > 0) {
          toast.info(`You matched your best score of ${calculatedScore}%`);
        }
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
    setScore(null);
    setShowResults(false);
    setIsSubmitting(false);
    toast.info('Quiz reset. Good luck!');
};
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  const handleNextQuestion = (index = currentQuestionIndex + 1) => {
    setCurrentQuestionIndex(Math.min(totalQuestions - 1, index));
  };

  const currentQuestion = quiz?.questions[currentQuestionIndex];
  const totalQuestions = quiz?.questions.length || 0;
  const progressPercentage = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <LoadingSpinner />
        <p className="text-surface-600">Loading quiz...</p>
      </div>
    );
  }

if (error || !quiz || !course) {
    const backPath = isCourseLevelQuiz ? `/courses/${courseId}` : `/courses/${courseId}/lessons/${lessonId}`;
    const backLabel = isCourseLevelQuiz ? "Back to Course" : "Back to Lesson";
    
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <AlertMessage
          type="error"
          title="Quiz not available"
          message={error || "No quiz found."}
          linkButton={{ to: backPath, label: backLabel }}
        />
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResultDisplay
        score={score}
        passingScore={quiz.passingScore}
        courseId={courseId}
        lessonId={lessonId}
        onRetakeQuiz={handleRetakeQuiz}
      />
    );
  }

  return (
    <div className="min-h-full bg-surface-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
<div className="mb-8">
          <Breadcrumb
            items={isCourseLevelQuiz ? [
              { label: course.title, to: `/courses/${courseId}` },
              { label: 'Quiz' }
            ] : [
              { label: course.title, to: `/courses/${courseId}` },
              { label: lesson.title, to: `/courses/${courseId}/lessons/${lessonId}` },
              { label: 'Quiz' }
            ]}
            className="mb-4"
          />
          
          <div className="flex items-center justify-between">
            <div>
<h1 className="text-2xl font-heading font-bold text-surface-900">
                {isCourseLevelQuiz ? `${course.title} - Final Quiz` : `Quiz: ${lesson.title}`}
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
          
          <ProgressBar progress={progressPercentage} height="h-2" className="mt-4" />
        </div>

        <QuizQuestionDisplay
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            selectedAnswers={selectedAnswers}
            onAnswerSelect={handleAnswerSelect}
            onPrev={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={handleSubmitQuiz}
            isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default QuizPage;