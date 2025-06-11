import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import CourseCard from '@/components/molecules/CourseCard';

const CourseGrid = ({ filteredCourses, coursesCount, totalCoursesCount, getCourseProgress, onClearFilters, showClearFiltersButton }) => {
    return (
        <>
            <div className="mb-6">
                <p className="text-surface-600">
                    Showing {coursesCount} of {totalCoursesCount} courses
                </p>
            </div>

            {filteredCourses.length === 0 ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-16 bg-white rounded-xl shadow-card"
                >
                    <ApperIcon name="BookOpen" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-surface-900 mb-2">No courses found</h3>
                    <p className="text-surface-500 mb-6">
                        {showClearFiltersButton
                            ? 'Try adjusting your search or filters'
                            : 'No courses available at the moment'
                        }
                    </p>
                    {showClearFiltersButton && (
                        <Button
                            onClick={onClearFilters}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
                        >
                            Clear Filters
                        </Button>
                    )}
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => {
                        const courseProgress = getCourseProgress(course.id);
                        const isEnrolled = courseProgress > 0;

                        return (
                            <CourseCard
                                key={course.id}
                                course={course}
                                progressPercentage={courseProgress}
                                isEnrolled={isEnrolled}
                                index={index}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default CourseGrid;