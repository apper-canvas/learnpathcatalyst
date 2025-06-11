import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/molecules/ProgressBar';

const CourseCard = ({ course, progressPercentage, isEnrolled, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200"
        >
            <Link to={`/courses/${course.id}`} className="block">
                <div className="p-6">
                    {/* Course Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
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
                        {isEnrolled && (
                            <div className="flex-shrink-0 ml-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                                    Enrolled
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Course Description */}
                    <p className="text-surface-600 text-sm mb-4 line-clamp-3">
                        {course.description}
                    </p>

                    {/* Course Meta */}
                    <div className="flex items-center justify-between text-sm text-surface-500 mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <ApperIcon name="Clock" className="w-4 h-4" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <ApperIcon name="BookOpen" className="w-4 h-4" />
                                <span>{course.totalLessons} lessons</span>
                            </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                            course.difficulty === 'beginner' ? 'bg-success/10 text-success' :
                            course.difficulty === 'intermediate' ? 'bg-warning/10 text-warning' :
                            'bg-error/10 text-error'
                        }`}>
                            {course.difficulty}
                        </span>
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {isEnrolled && (
                        <div className="space-y-2">
                            <ProgressBar progress={progressPercentage} label="Progress" showPercentage />
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

export default CourseCard;