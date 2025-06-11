import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import SettingsSidebar from '@/components/organisms/SettingsSidebar';
import ProfileSettingsForm from '@/components/organisms/ProfileSettingsForm';
import NotificationSettingsForm from '@/components/organisms/NotificationSettingsForm';
import PreferencesSettingsForm from '@/components/organisms/PreferencesSettingsForm';
import PrivacySettingsSection from '@/components/organisms/PrivacySettingsSection';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Learning Explorer',
    email: 'explorer@learnpath.com',
    bio: 'Passionate about continuous learning and skill development.',
    timezone: 'UTC-5',
    language: 'en'
  });
  
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    newLessons: true,
    quizReminders: false,
    achievements: true,
    weeklyProgress: true
  });

  const [preferences, setPreferences] = useState({
    autoplay: true,
    playbackSpeed: '1x',
    captions: false,
    theme: 'light',
    emailDigest: 'weekly'
  });

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileSave = () => {
    toast.success('Profile updated successfully!');
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Notification settings updated');
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Preferences updated');
  };

  const handleExportData = () => {
    toast.info('Data export requested. Check your email for the file.');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      toast.success('Account deletion initiated. Goodbye!');
      // Simulate logout/redirect logic here
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'preferences', label: 'Preferences', icon: 'Sliders' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' }
  ];

  return (
    <div className="min-h-full bg-surface-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-surface-900 mb-2">
            Settings
          </h1>
          <p className="text-surface-600">
            Manage your account preferences and learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <SettingsSidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-card p-8"
            >
              {activeTab === 'profile' && (
                <ProfileSettingsForm
                    profile={profile}
                    onProfileChange={handleProfileChange}
                    onSave={handleProfileSave}
                />
              )}

              {activeTab === 'notifications' && (
                <NotificationSettingsForm
                    notifications={notifications}
                    onNotificationChange={handleNotificationChange}
                />
              )}

              {activeTab === 'preferences' && (
                <PreferencesSettingsForm
                    preferences={preferences}
                    onPreferenceChange={handlePreferenceChange}
                />
              )}

              {activeTab === 'privacy' && (
                <PrivacySettingsSection
                    onExportData={handleExportData}
                    onDeleteAccount={handleDeleteAccount}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;