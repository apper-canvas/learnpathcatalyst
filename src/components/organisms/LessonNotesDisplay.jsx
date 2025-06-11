import React from 'react';
import { motion } from 'framer-motion';

const LessonNotesDisplay = ({ notes }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-card p-6"
        >
            <h3 className="text-xl font-heading font-bold text-surface-900 mb-4">
                Lesson Notes
            </h3>
            <div className="prose prose-sm max-w-none">
                <p className="text-surface-600 break-words">
                    {notes || 'No additional notes for this lesson.'}
                </p>
            </div>
        </motion.div>
    );
};

export default LessonNotesDisplay;