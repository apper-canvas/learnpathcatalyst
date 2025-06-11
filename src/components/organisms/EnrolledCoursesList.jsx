import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import CourseCard from '@/components/molecules/CourseCard';
import LinkButton from '@/components/atoms/LinkButton';

const EnrolledCoursesList = ({ enrolledCourses }) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-surface-900">Continue Learning</h2>
                <Link
                    to="/courses"
                    className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
                >
                    <span>View All</span>
                    <ApperIcon name="ArrowRight" className="w-4 h-4" />
                </Link>
            </div>

            {enrolledCourses.length === 0 ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 bg-white rounded-xl shadow-card"
                >
                    <ApperIcon name="BookOpen" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-surface-900 mb-2">No courses enrolled yet</h3>
                    <p className="text-surface-500 mb-6">Explore our course library to start your learning journey</p>
                    <LinkButton
                        to="/courses"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <ApperIcon name="Search" className="w-4 h-4" />
                        <span>Browse Courses</span>
                    </LinkButton>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course, index) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            progressPercentage={course.progress.completionPercentage}
                            isEnrolled={true}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCoursesList;