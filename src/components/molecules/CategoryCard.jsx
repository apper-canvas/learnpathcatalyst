import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CategoryCard = ({ iconName, name, count }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer"
        >
            <div className="w-12 h-12 bg-surface-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={iconName} className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-surface-900 mb-1">{name}</h3>
            <p className="text-sm text-surface-500">{count}</p>
        </motion.div>
    );
};

export default CategoryCard;