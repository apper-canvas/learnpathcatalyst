import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizOptionButton from '@/components/molecules/QuizOptionButton';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const QuizQuestionDisplay = ({ currentQuestion, currentQuestionIndex, totalQuestions, selectedAnswers, onAnswerSelect, onPrev, onNext, onSubmit, isSubmitting }) => {
    if (!currentQuestion) {
        return null; // Or render a placeholder/loading state
    }

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const isAnswerSelected = selectedAnswers[currentQuestion.id] !== undefined;
    const canSubmit = Object.keys(selectedAnswers).length === totalQuestions;

    return (
        <>
            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-card p-8 mb-8"
                >
                    <div className="mb-8">
                        <h2 className="text-xl font-medium text-surface-900 mb-6 break-words">
                            {currentQuestion.question}
                        </h2>
                        
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <QuizOptionButton
                                    key={index}
                                    option={option}
                                    index={index}
                                    isSelected={selectedAnswers[currentQuestion.id] === index}
                                    onClick={() => onAnswerSelect(currentQuestion.id, index)}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button
                    onClick={onPrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center space-x-2 px-4 py-2 text-surface-600 hover:text-surface-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1 }} whileTap={{ scale: 1 }}
                >
                    <ApperIcon name="ChevronLeft" className="w-4 h-4" />
                    <span>Previous</span>
                </Button>
                
                <div className="flex items-center space-x-4">
                    {/* Question indicators */}
                    <div className="hidden sm:flex items-center space-x-2">
                        {Array.from({ length: totalQuestions }).map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => onNext(index)} // Reusing onNext to jump to question
                                className={`w-8 h-8 rounded-full text-sm font-medium ${
                                    index === currentQuestionIndex
                                        ? 'bg-primary text-white'
                                        : selectedAnswers[currentQuestion.id] !== undefined && selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                                        ? 'bg-success text-white' // Indicate correctly answered in review
                                        : selectedAnswers[currentQuestion.id] !== undefined
                                        ? 'bg-orange-300 text-white' // Indicate incorrectly answered in review (if needed)
                                        : 'bg-surface-200 text-surface-600 hover:bg-surface-300'
                                }`}
                                whileHover={{ scale: 1 }} whileTap={{ scale: 1 }}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </div>
                
                {isLastQuestion ? (
                    <Button
                        onClick={onSubmit}
                        disabled={isSubmitting || !canSubmit}
                        className="flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <ApperIcon name="Send" className="w-4 h-4" />
                                <span>Submit Quiz</span>
                            </>
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={() => onNext(currentQuestionIndex + 1)}
                        disabled={currentQuestionIndex === totalQuestions - 1}
                        className="flex items-center space-x-2 px-4 py-2 text-surface-600 hover:text-surface-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1 }} whileTap={{ scale: 1 }}
                    >
                        <span>Next</span>
                        <ApperIcon name="ChevronRight" className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </>
    );
};

export default QuizQuestionDisplay;