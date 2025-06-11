import React from 'react';
import ActivityItem from '@/components/molecules/ActivityItem';

const RecentActivityList = ({ recentActivity }) => {
    return (
        <div>
            <h2 className="text-2xl font-heading font-bold text-surface-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-card p-6">
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <ActivityItem
                            key={activity.id}
                            action={activity.action}
                            time={activity.time}
                            type={activity.type}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentActivityList;