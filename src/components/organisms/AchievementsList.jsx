import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const AchievementsList = ({ achievements }) => {
    if (achievements.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <h2 className="text-2xl font-heading font-bold text-surface-900 mb-6">
                Achievements 🏆
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                    <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-card"
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.color}`}>
                                <ApperIcon name={achievement.icon} className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">{achievement.title}</h3>
                                <p className="text-sm text-surface-500">{achievement.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AchievementsList;