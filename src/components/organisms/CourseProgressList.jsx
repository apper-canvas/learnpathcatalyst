import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/molecules/ProgressBar';

const CourseProgressList = ({ enrolledCourses }) => {
    return (
        <div>
            <h2 className="text-2xl font-heading font-bold text-surface-900 mb-6">
                Course Progress
            </h2>
            <div className="space-y-4">
                {enrolledCourses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-white rounded-xl shadow-card p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4 flex-1 min-w-0">
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
                            
                            <div className="text-right flex-shrink-0">
                                <p className="text-2xl font-bold text-surface-900">
                                    {course.progress.completionPercentage}%
                                </p>
                                <p className="text-xs text-surface-500">Complete</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <ProgressBar
                                progress={course.progress.completionPercentage}
                                label="Progress"
                                showPercentage={false} // Percentage shown above
                            />
                            
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-surface-500"></span> {/* Empty span for alignment */}
                                <span className="text-surface-700">
                                    {course.progress.completedLessons?.length || 0} of {course.totalLessons} lessons
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-xs text-surface-500">
                                    Last accessed: {new Date(course.progress.lastAccessed).toLocaleDateString()}
                                </span>
                                
                                <Link
                                    to={`/courses/${course.id}`}
                                    className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80 font-medium"
                                >
                                    <span>Continue</span>
                                    <ApperIcon name="ArrowRight" className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CourseProgressList;