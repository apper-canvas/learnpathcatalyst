import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import LinkButton from '@/components/atoms/LinkButton';

const QuizCallToAction = ({ courseId, lessonId }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 p-6"
        >
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <ApperIcon name="Brain" className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-heading font-bold text-surface-900">
                        Test Your Knowledge
                    </h3>
                    <p className="text-surface-600 text-sm">
                        Complete the quiz to reinforce your learning
                    </p>
                </div>
            </div>
            
            <LinkButton
                to={`/courses/${courseId}/lessons/${lessonId}/quiz`}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90"
            >
                <ApperIcon name="Play" className="w-4 h-4" />
                <span className="font-medium">Start Quiz</span>
            </LinkButton>
        </motion.div>
    );
};

export default QuizCallToAction;