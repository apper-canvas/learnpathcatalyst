import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/molecules/ProgressBar';
import Button from '@/components/atoms/Button';

const CourseDetailsHeader = ({ course, isEnrolled, progressPercentage, completedLessonsCount, totalLessonsCount, handleEnroll, handleStartLearning, enrolling, lessons }) => {
    return (
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
                                <span>{progressPercentage}% complete</span>
                            </div>
                        )}
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {isEnrolled && (
                        <ProgressBar
                            progress={progressPercentage}
                            label="Course Progress"
                            showPercentage
                            className="mb-8"
                        >
                            <span className="font-medium text-surface-900">
                                {completedLessonsCount} of {totalLessonsCount} lessons completed
                            </span>
                        </ProgressBar>
                    )}
                </div>

                {/* Enrollment Card */}
                <div className="lg:w-80 mt-8 lg:mt-0">
                    <div className="bg-surface-50 rounded-lg p-6">
                        {isEnrolled ? (
                            <Button
                                onClick={handleStartLearning}
                                disabled={lessons.length === 0}
                                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ApperIcon name="Play" className="w-5 h-5" />
                                <span className="font-semibold">
                                    {completedLessonsCount > 0 ? 'Continue Learning' : 'Start Learning'}
                                </span>
                            </Button>
                        ) : (
                            <Button
                                onClick={handleEnroll}
                                disabled={enrolling}
                                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50"
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
                            </Button>
                        )}

                        <p className="text-center text-sm text-surface-500 mt-3">
                            {isEnrolled ? 'Access all course materials' : 'Get instant access to all lessons'}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseDetailsHeader;