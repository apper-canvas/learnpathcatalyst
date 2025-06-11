import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import LessonListItem from '@/components/molecules/LessonListItem';

const CourseCurriculum = ({ lessons, courseId, isEnrolled, completedLessons }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-card p-8"
        >
            <h2 className="text-2xl font-heading font-bold text-surface-900 mb-6">
                Course Curriculum
            </h2>

            {lessons.length === 0 ? (
                <div className="text-center py-12">
                    <ApperIcon name="BookOpen" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                    <p className="text-surface-500">No lessons available yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {lessons.map((lesson, index) => (
                        <LessonListItem
                            key={lesson.id}
                            lesson={lesson}
                            courseId={courseId}
                            isEnrolled={isEnrolled}
                            isCompleted={completedLessons.includes(lesson.id)}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default CourseCurriculum;