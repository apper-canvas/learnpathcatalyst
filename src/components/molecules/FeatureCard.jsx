import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const FeatureCard = ({ iconName, title, description, gradientColorClass, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-200"
        >
            <div className={`w-16 h-16 bg-gradient-to-br ${gradientColorClass} rounded-xl flex items-center justify-center mb-6`}>
                <ApperIcon name={iconName} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-heading font-bold text-surface-900 mb-4">
                {title}
            </h3>
            <p className="text-surface-600 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
};

export default FeatureCard;