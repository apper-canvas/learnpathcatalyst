import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const QuizOptionButton = ({ option, index, isSelected, onClick, isCorrect = null, disabled = false }) => {
    let borderColorClass = 'border-surface-200 hover:border-surface-300';
    let bgColorClass = '';
    let textColorClass = 'text-surface-700';
    let dotBorderColorClass = 'border-surface-300';
    let dotBgColorClass = '';
    let dotTextColorClass = '';

    if (isSelected) {
        borderColorClass = 'border-primary bg-primary/5';
        textColorClass = 'text-primary';
        dotBorderColorClass = 'border-primary';
        dotBgColorClass = 'bg-primary';
        dotTextColorClass = 'text-white';
    }

    if (isCorrect !== null) { // If in results view
        if (isCorrect) {
            borderColorClass = 'border-success bg-success/5';
            textColorClass = 'text-success';
            dotBorderColorClass = 'border-success';
            dotBgColorClass = 'bg-success';
            dotTextColorClass = 'text-white';
        } else if (isSelected && !isCorrect) {
            borderColorClass = 'border-error bg-error/5';
            textColorClass = 'text-error';
            dotBorderColorClass = 'border-error';
            dotBgColorClass = 'bg-error';
            dotTextColorClass = 'text-white';
        }
    }

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.01 }}
            whileTap={{ scale: disabled ? 1 : 0.99 }}
            onClick={onClick}
            disabled={disabled}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${borderColorClass} ${bgColorClass} ${textColorClass} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${dotBorderColorClass} ${dotBgColorClass}`}>
                    {(isSelected || isCorrect) && (
                        <ApperIcon name={isCorrect ? "Check" : (isSelected ? "Check" : "")} className={`w-3 h-3 ${dotTextColorClass}`} />
                    )}
                </div>
                <span className="break-words">{option}</span>
            </div>
        </motion.button>
    );
};

export default QuizOptionButton;