import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/organisms/HeroSection';
import FeaturesGrid from '@/components/organisms/FeaturesGrid';
import CategoriesSection from '@/components/organisms/CategoriesSection';

const HomePage = () => {
    return (
        <div className="min-h-full bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <HeroSection />
                <FeaturesGrid />
                <CategoriesSection />
            </div>
        </div>
    );
};

export default HomePage;