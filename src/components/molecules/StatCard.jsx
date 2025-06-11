import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ title, value, iconName, bgColorClass, textColorClass, iconBgClass, iconColorClass, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={`${bgColorClass} rounded-xl p-6 ${textColorClass} shadow-card`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className={`${textColorClass.includes('white') ? 'text-white/80' : 'text-surface-500'}`}>{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgClass}`}>
                    <ApperIcon name={iconName} className={`w-6 h-6 ${iconColorClass}`} />
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;