import React from 'react';
import FeatureCard from '@/components/molecules/FeatureCard';

const features = [
    {
        icon: 'Video',
        title: 'Interactive Video Lessons',
        description: 'Learn with high-quality video content designed for maximum engagement and retention.',
        color: 'from-primary to-primary/80'
    },
    {
        icon: 'Brain',
        title: 'Knowledge Quizzes',
        description: 'Test your understanding with interactive quizzes and get instant feedback on your progress.',
        color: 'from-secondary to-secondary/80'
    },
    {
        icon: 'TrendingUp',
        title: 'Progress Tracking',
        description: 'Monitor your learning journey with detailed analytics and achievement badges.',
        color: 'from-accent to-accent/80'
    }
];

const FeaturesGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
                <FeatureCard
                    key={feature.title}
                    iconName={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    gradientColorClass={feature.color}
                    index={index}
                />
            ))}
        </div>
    );
};

export default FeaturesGrid;