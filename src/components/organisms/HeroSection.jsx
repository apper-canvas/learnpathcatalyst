import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import LinkButton from '@/components/atoms/LinkButton';

const HeroSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <ApperIcon name="GraduationCap" className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-surface-900 mb-6">
                Welcome to <span className="text-primary">LearnPath</span>
            </h1>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto mb-8">
                Master new skills through interactive video lessons, engaging quizzes, and personalized progress tracking.
                Start your learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LinkButton
                    to="/dashboard"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-lg"
                >
                    <ApperIcon name="Play" className="w-5 h-5" />
                    <span className="font-semibold">Start Learning</span>
                </LinkButton>
                <LinkButton
                    to="/courses"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-surface-900 rounded-xl hover:bg-surface-50 shadow-lg border border-surface-200"
                >
                    <ApperIcon name="BookOpen" className="w-5 h-5" />
                    <span className="font-semibold">Browse Courses</span>
                </LinkButton>
            </div>
        </motion.div>
    );
};

export default HeroSection;