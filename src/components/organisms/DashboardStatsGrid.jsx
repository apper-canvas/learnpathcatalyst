import React from 'react';
import StatCard from '@/components/molecules/StatCard';

const DashboardStatsGrid = ({ enrolledCoursesCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                title="Learning Streak"
                value="7 days"
                iconName="Flame"
                bgColorClass="bg-gradient-to-br from-primary to-primary/80"
                textColorClass="text-white"
                iconBgClass="bg-white/20"
                iconColorClass="text-white"
                delay={0}
            />
            <StatCard
                title="Courses Enrolled"
                value={enrolledCoursesCount}
                iconName="BookOpen"
                bgColorClass="bg-white"
                textColorClass="text-surface-900"
                iconBgClass="bg-secondary/10"
                iconColorClass="text-secondary"
                delay={0.1}
            />
            <StatCard
                title="Lessons Completed"
                value="42" // This was hardcoded, keeping it as is per instructions.
                iconName="CheckCircle"
                bgColorClass="bg-white"
                textColorClass="text-surface-900"
                iconBgClass="bg-success/10"
                iconColorClass="text-success"
                delay={0.2}
            />
        </div>
    );
};

export default DashboardStatsGrid;