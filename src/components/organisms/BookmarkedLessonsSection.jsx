import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import bookmarkService from '@/services/api/bookmarkService';
import { lessonService, courseService } from '@/services';

const BookmarkedLessonsSection = () => {
    const [bookmarkedLessons, setBookmarkedLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBookmarkedLessons = async () => {
            setLoading(true);
            setError(null);
            try {
                const bookmarks = await bookmarkService.getBookmarks();
                
                // Enrich bookmarks with lesson and course data
                const enrichedBookmarks = await Promise.all(
                    bookmarks.map(async (bookmark) => {
                        try {
                            const [lesson, course] = await Promise.all([
                                lessonService.getById(bookmark.lessonId),
                                courseService.getById(bookmark.courseId)
                            ]);
                            return {
                                ...bookmark,
                                lesson,
                                course
                            };
                        } catch (err) {
                            console.error(`Error loading data for bookmark ${bookmark.id}:`, err);
                            return null;
                        }
                    })
                );

                // Filter out any failed bookmark loads
                const validBookmarks = enrichedBookmarks.filter(Boolean);
                setBookmarkedLessons(validBookmarks);
            } catch (err) {
                setError(err.message || 'Failed to load bookmarked lessons');
                console.error('Error loading bookmarked lessons:', err);
            } finally {
                setLoading(false);
            }
        };

        loadBookmarkedLessons();
    }, []);

    const handleRemoveBookmark = async (lessonId) => {
        try {
            await bookmarkService.removeBookmark(lessonId);
            setBookmarkedLessons(prev => prev.filter(b => b.lessonId !== lessonId));
            toast.success('Bookmark removed');
        } catch (error) {
            toast.error('Failed to remove bookmark');
            console.error('Remove bookmark error:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-surface-500">Error loading bookmarked lessons</p>
            </div>
        );
    }

    if (bookmarkedLessons.length === 0) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl shadow-card"
            >
                <ApperIcon name="Bookmark" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-surface-900 mb-2">No bookmarked lessons yet</h3>
                <p className="text-surface-500 mb-6">Bookmark lessons while learning to review them later</p>
                <Link
                    to="/courses"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <ApperIcon name="BookOpen" className="w-4 h-4" />
                    <span>Browse Courses</span>
                </Link>
            </motion.div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-surface-900 flex items-center space-x-2">
                    <ApperIcon name="BookmarkCheck" className="w-6 h-6 text-primary" />
                    <span>Bookmarked Lessons</span>
                </h2>
                <span className="text-sm text-surface-500">
                    {bookmarkedLessons.length} lesson{bookmarkedLessons.length !== 1 ? 's' : ''} saved
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarkedLessons.map((bookmark, index) => (
                    <motion.div
                        key={bookmark.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg border border-surface-200 p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                                <Link
                                    to={`/courses/${bookmark.courseId}/lessons/${bookmark.lessonId}`}
                                    className="block"
                                >
                                    <h3 className="font-medium text-surface-900 truncate hover:text-primary transition-colors">
                                        {bookmark.lesson?.title || bookmark.lessonTitle}
                                    </h3>
                                    <p className="text-sm text-surface-500 mt-1">
                                        {bookmark.course?.title || 'Course'}
                                    </p>
                                </Link>
                            </div>
                            
                            <button
                                onClick={() => handleRemoveBookmark(bookmark.lessonId)}
                                className="ml-2 p-1 text-surface-400 hover:text-red-500 transition-colors"
                                title="Remove bookmark"
                            >
                                <ApperIcon name="X" className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-xs text-surface-400">
                            <div className="flex items-center space-x-3">
                                {bookmark.lesson?.duration && (
                                    <div className="flex items-center space-x-1">
                                        <ApperIcon name="Clock" className="w-3 h-3" />
                                        <span>{bookmark.lesson.duration} min</span>
                                    </div>
                                )}
                            </div>
                            <span>
                                Saved {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BookmarkedLessonsSection;