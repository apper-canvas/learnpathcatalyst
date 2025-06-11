import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import bookmarkService from '@/services/api/bookmarkService';
const LessonListItem = ({ lesson, courseId, isEnrolled, isCompleted, index }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const isAccessible = isEnrolled;

    // Check bookmark status on component mount
    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const bookmarked = await bookmarkService.isBookmarked(lesson.id);
                setIsBookmarked(bookmarked);
            } catch (error) {
                console.error('Error checking bookmark status:', error);
            }
        };
        
        checkBookmarkStatus();
    }, [lesson.id]);

    const handleBookmarkToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setBookmarkLoading(true);
        try {
            await bookmarkService.toggleBookmark(lesson.id, courseId, lesson.title);
            setIsBookmarked(!isBookmarked);
            toast.success(isBookmarked ? 'Bookmark removed' : 'Lesson bookmarked!');
        } catch (error) {
            toast.error('Failed to update bookmark');
            console.error('Bookmark error:', error);
        } finally {
            setBookmarkLoading(false);
        }
    };

    return (
        <motion.div
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
                <>
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
                    
                    <button
                        onClick={handleBookmarkToggle}
                        disabled={bookmarkLoading}
                        className={`ml-3 p-2 rounded-full transition-all duration-200 bookmark-btn ${
                            isBookmarked
                                ? 'text-primary hover:text-primary/80 bg-primary/10'
                                : 'text-surface-400 hover:text-primary hover:bg-primary/10'
                        } ${bookmarkLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                    >
                        <ApperIcon 
                            name={isBookmarked ? "BookmarkCheck" : "Bookmark"} 
                            className="w-4 h-4" 
                        />
                    </button>
                </>
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
};

export default LessonListItem;