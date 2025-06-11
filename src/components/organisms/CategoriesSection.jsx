import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '@/components/molecules/CategoryCard';

const categories = [
    { icon: 'Languages', name: 'Languages', count: '12 courses' },
    { icon: 'Code', name: 'Programming', count: '18 courses' },
    { icon: 'Calculator', name: 'Mathematics', count: '15 courses' },
    { icon: 'Palette', name: 'Design', count: '9 courses' }
];

const CategoriesSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
        >
            <h2 className="text-3xl font-heading font-bold text-surface-900 mb-8">
                Learn Across Multiple Subjects
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.name}
                        iconName={category.icon}
                        name={category.name}
                        count={category.count}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default CategoriesSection;