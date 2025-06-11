import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, label, className = '', height = 'h-2', showPercentage = false }) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));
    return (
        <div className={className}>
            {label && (
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-surface-500">{label}</span>
                    {showPercentage && <span className="font-medium text-surface-900">{Math.round(clampedProgress)}%</span>}
                </div>
            )}
            <div className={`w-full bg-surface-200 rounded-full ${height}`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${clampedProgress}%` }}
                    transition={{ duration: 1 }}
                    className={`bg-gradient-to-r from-primary to-accent ${height} rounded-full`}
                />
            </div>
        </div>
    );
};

export default ProgressBar;