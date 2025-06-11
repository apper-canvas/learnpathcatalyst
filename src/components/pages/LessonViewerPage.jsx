import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { courseService, lessonService, progressService, quizService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import AlertMessage from '@/components/molecules/AlertMessage';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import LessonVideoPlayer from '@/components/organisms/LessonVideoPlayer';
import LessonNotesDisplay from '@/components/organisms/LessonNotesDisplay';
import QuizCallToAction from '@/components/organisms/QuizCallToAction';
import LessonNavigation from '@/components/organisms/LessonNavigation';
import ProgressBar from '@/components/molecules/ProgressBar';

const LessonViewerPage = () => {
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
          <LoadingSpinner color="border-white" />
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson || !course) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <AlertMessage
          type="error"
          title="Lesson not found"
          message={error || "The lesson you're looking for doesn't exist."}
          linkButton={{ to: `/courses/${courseId}`, label: "Back to Course" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-black">
      <LessonVideoPlayer
        lesson={lesson}
        courseTitle={course.title}
        courseId={courseId}
        videoProgress={videoProgress}
        isVideoCompleted={isVideoCompleted}
        onProgressChange={handleVideoProgress}
      />

      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <Breadcrumb
                items={[
                    { label: course.title, to: `/courses/${courseId}` },
                    { label: lesson.title }
                ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <LessonNotesDisplay notes={lesson.notes} />

              {quiz && isVideoCompleted && (
                <QuizCallToAction courseId={courseId} lessonId={lessonId} />
              )}
            </div>

            <div className="space-y-6">
              <LessonNavigation
                courseId={courseId}
                previousLesson={previousLesson}
                nextLesson={nextLesson}
              />

              {progress && (
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h4 className="font-medium text-surface-900 mb-4">Course Progress</h4>
                  <div className="space-y-3">
                    <ProgressBar
                      progress={progress.completionPercentage}
                      label="Completion"
                      showPercentage
                      height="h-2"
                    />
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

export default LessonViewerPage;