import React from 'react';
import StatCard from '@/components/molecules/StatCard';

const OverallProgressStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
                title="Enrolled Courses"
                value={stats.totalCourses}
                iconName="BookOpen"
                bgColorClass="bg-gradient-to-br from-primary to-primary/80"
                textColorClass="text-white"
                iconBgClass="bg-white/20"
                iconColorClass="text-white"
                delay={0}
            />
            <StatCard
                title="Completed"
                value={stats.completedCourses}
                iconName="CheckCircle"
                bgColorClass="bg-white"
                textColorClass="text-surface-900"
                iconBgClass="bg-success/10"
                iconColorClass="text-success"
                delay={0.1}
            />
            <StatCard
                title="Avg Progress"
                value={`${stats.avgProgress}%`}
                iconName="TrendingUp"
                bgColorClass="bg-white"
                textColorClass="text-surface-900"
                iconBgClass="bg-accent/10"
                iconColorClass="text-accent"
                delay={0.2}
            />
            <StatCard
                title="Lessons Done"
                value={stats.totalLessons}
                iconName="Play"
                bgColorClass="bg-white"
                textColorClass="text-surface-900"
                iconBgClass="bg-secondary/10"
                iconColorClass="text-secondary"
                delay={0.3}
            />
        </div>
    );
};

export default OverallProgressStats;