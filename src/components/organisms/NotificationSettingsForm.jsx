import React from 'react';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';

const notificationDescriptions = {
    courseUpdates: 'Get notified about course updates and announcements',
    newLessons: 'Receive alerts when new lessons are added to your courses',
    quizReminders: 'Reminders to complete pending quizzes',
    achievements: 'Celebrate your learning milestones and achievements',
    weeklyProgress: 'Weekly summary of your learning progress',
};

const NotificationSettingsForm = ({ notifications, onNotificationChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-heading font-bold text-surface-900 mb-4">
                    Notification Preferences
                </h2>
                <p className="text-surface-600 mb-6">
                    Choose what notifications you'd like to receive
                </p>
            </div>

            <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                    <ToggleSwitch
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').trim()}
                        description={notificationDescriptions[key]}
                        checked={value}
                        onChange={() => onNotificationChange(key, !value)}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationSettingsForm;