import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import LinkButton from '@/components/atoms/LinkButton';

const QuizResultDisplay = ({ score, passingScore, courseId, lessonId, onRetakeQuiz }) => {
    const passed = score >= (passingScore || 70);

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-card p-8 text-center"
            >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    passed ? 'bg-success/10' : 'bg-warning/10'
                }`}>
                    <ApperIcon 
                        name={passed ? "Trophy" : "RefreshCw"} 
                        className={`w-10 h-10 ${passed ? 'text-success' : 'text-warning'}`} 
                    />
                </div>
                
                <h1 className="text-3xl font-heading font-bold text-surface-900 mb-4">
                    {passed ? 'Congratulations!' : 'Good Effort!'}
                </h1>
                
                <p className="text-surface-600 mb-8">
                    {passed 
                        ? 'You have successfully completed this quiz.'
                        : 'You can retake the quiz to improve your score.'
                    }
                </p>
                
                <div className="bg-surface-50 rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-surface-500">Your Score</p>
                            <p className="text-3xl font-bold text-surface-900">{score}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-surface-500">Passing Score</p>
                            <p className="text-3xl font-bold text-surface-900">{passingScore || 70}%</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {!passed && (
                        <Button
                            onClick={onRetakeQuiz}
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
                        >
                            <ApperIcon name="RefreshCw" className="w-4 h-4" />
                            <span>Retake Quiz</span>
                        </Button>
                    )}
                    
                    <LinkButton
                        to={`/courses/${courseId}/lessons/${lessonId}`}
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-surface-100 text-surface-900 rounded-lg hover:bg-surface-200"
                    >
                        <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                        <span>Back to Lesson</span>
                    </LinkButton>
                    
                    <LinkButton
                        to={`/courses/${courseId}`}
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90"
                    >
                        <ApperIcon name="BookOpen" className="w-4 h-4" />
                        <span>Continue Course</span>
                    </LinkButton>
                </div>
            </motion.div>
        </div>
    );
};

export default QuizResultDisplay;