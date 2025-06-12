import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { courseService, lessonService, progressService } from '@/services';
import bookmarkService from '@/services/api/bookmarkService';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import AlertMessage from '@/components/molecules/AlertMessage';
import CourseDetailsHeader from '@/components/organisms/CourseDetailsHeader';
import CourseCurriculum from '@/components/organisms/CourseCurriculum';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState(null);
const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const loadCourseData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [courseData, lessonsData, progressData, bookmarksData] = await Promise.all([
          courseService.getById(courseId),
          lessonService.getByCourseId(courseId),
          progressService.getByCourseId(courseId),
          bookmarkService.getBookmarks()
        ]);
        
        setCourse(courseData);
        setLessons(lessonsData);
        setProgress(progressData);
        setBookmarks(bookmarksData);
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
      // First enroll in the course
      await courseService.enrollInCourse(courseId);
      
      // Then create progress tracking
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
                {Array.from({ length: 5 }).map((_, i) => (
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
        <AlertMessage
          type="error"
          title="Course not found"
          message={error || "The course you're looking for doesn't exist or has been removed."}
          linkButton={{ to: "/courses", label: "Back to Courses" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-surface-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
            items={[
                { label: 'Courses', to: '/courses' },
                { label: course.title }
            ]}
            className="mb-8"
        />

        <CourseDetailsHeader
            course={course}
            isEnrolled={isEnrolled}
            progressPercentage={progress?.completionPercentage || 0}
            completedLessonsCount={completedLessons.length}
            totalLessonsCount={lessons.length}
            handleEnroll={handleEnroll}
            handleStartLearning={handleStartLearning}
            enrolling={enrolling}
            lessons={lessons} // Pass lessons to handleStartLearning checks
/>

        <CourseCurriculum
            lessons={lessons}
            courseId={courseId}
            isEnrolled={isEnrolled}
            completedLessons={completedLessons}
            bookmarks={bookmarks}
        />
      </div>
    </div>
  );
};

export default CourseDetailsPage;