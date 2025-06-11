import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ActivityItem = ({ action, time, type, index }) => {
    let iconName = '';
    let bgColorClass = '';
    let textColorClass = '';

    switch (type) {
        case 'lesson':
            iconName = 'Play';
            bgColorClass = 'bg-info/10';
            textColorClass = 'text-info';
            break;
        case 'quiz':
            iconName = 'Award';
            bgColorClass = 'bg-success/10';
            textColorClass = 'text-success';
            break;
        case 'course':
        default:
            iconName = 'BookOpen';
            bgColorClass = 'bg-accent/10';
            textColorClass = 'text-accent';
            break;
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-surface-50 transition-colors"
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColorClass}`}>
                <ApperIcon name={iconName} className={`w-5 h-5 ${textColorClass}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-surface-900 font-medium">{action}</p>
                <p className="text-surface-500 text-sm">{time}</p>
            </div>
        </motion.div>
    );
};

export default ActivityItem;