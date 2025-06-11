import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';

const Settings = () => {
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

  const handleProfileUpdate = () => {
    toast.success('Profile updated successfully!');
  };

  const handleNotificationUpdate = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Notification settings updated');
  };

  const handlePreferenceUpdate = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Preferences updated');
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
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-surface-700 hover:bg-surface-100 hover:text-primary'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-card p-8"
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-surface-900 mb-4">
                      Profile Information
                    </h2>
                    <p className="text-surface-600 mb-6">
                      Update your personal information and preferences
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full px-4 py-3 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Language
                      </label>
                      <select
                        value={profile.language}
                        onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-4 py-3 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleProfileUpdate}
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
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
                      <div key={key} className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-surface-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-sm text-surface-500">
                            {key === 'courseUpdates' && 'Get notified about course updates and announcements'}
                            {key === 'newLessons' && 'Receive alerts when new lessons are added to your courses'}
                            {key === 'quizReminders' && 'Reminders to complete pending quizzes'}
                            {key === 'achievements' && 'Celebrate your learning milestones and achievements'}
                            {key === 'weeklyProgress' && 'Weekly summary of your learning progress'}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => handleNotificationUpdate(key, !value)}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                            value ? 'bg-primary' : 'bg-surface-300'
                          }`}
                        >
                          <motion.div
                            animate={{ x: value ? 24 : 2 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-surface-900 mb-4">
                      Learning Preferences
                    </h2>
                    <p className="text-surface-600 mb-6">
                      Customize your learning experience
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-surface-900">Auto-play videos</h3>
                        <p className="text-sm text-surface-500">
                          Automatically play the next video in a lesson
                        </p>
                      </div>
                      <button
                        onClick={() => handlePreferenceUpdate('autoplay', !preferences.autoplay)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                          preferences.autoplay ? 'bg-primary' : 'bg-surface-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: preferences.autoplay ? 24 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>

                    <div className="p-4 bg-surface-50 rounded-lg">
                      <h3 className="font-medium text-surface-900 mb-3">Playback Speed</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {['0.5x', '0.75x', '1x', '1.25x', '1.5x'].map(speed => (
                          <button
                            key={speed}
                            onClick={() => handlePreferenceUpdate('playbackSpeed', speed)}
                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                              preferences.playbackSpeed === speed
                                ? 'bg-primary text-white'
                                : 'bg-white text-surface-700 hover:bg-surface-100'
                            }`}
                          >
                            {speed}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-surface-900">Captions</h3>
                        <p className="text-sm text-surface-500">
                          Show subtitles for video lessons
                        </p>
                      </div>
                      <button
                        onClick={() => handlePreferenceUpdate('captions', !preferences.captions)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                          preferences.captions ? 'bg-primary' : 'bg-surface-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: preferences.captions ? 24 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>

                    <div className="p-4 bg-surface-50 rounded-lg">
                      <h3 className="font-medium text-surface-900 mb-3">Email Digest</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {['daily', 'weekly', 'monthly'].map(frequency => (
                          <button
                            key={frequency}
                            onClick={() => handlePreferenceUpdate('emailDigest', frequency)}
                            className={`px-3 py-2 text-sm rounded-lg transition-colors capitalize ${
                              preferences.emailDigest === frequency
                                ? 'bg-primary text-white'
                                : 'bg-white text-surface-700 hover:bg-surface-100'
                            }`}
                          >
                            {frequency}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-surface-900 mb-4">
                      Privacy & Security
                    </h2>
                    <p className="text-surface-600 mb-6">
                      Manage your privacy settings and data preferences
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 border border-surface-200 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <ApperIcon name="Shield" className="w-5 h-5 text-info" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-surface-900 mb-2">Data Usage</h3>
                          <p className="text-sm text-surface-600 mb-4">
                            We collect learning progress data to improve your experience and provide personalized recommendations.
                          </p>
                          <button className="text-primary hover:text-primary/80 text-sm font-medium">
                            View Privacy Policy
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border border-surface-200 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <ApperIcon name="Download" className="w-5 h-5 text-warning" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-surface-900 mb-2">Export Data</h3>
                          <p className="text-sm text-surface-600 mb-4">
                            Download a copy of your learning data, progress, and account information.
                          </p>
                          <button className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 transition-colors text-sm">
                            Request Export
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border border-error/20 bg-error/5 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <ApperIcon name="Trash2" className="w-5 h-5 text-error" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-surface-900 mb-2">Delete Account</h3>
                          <p className="text-sm text-surface-600 mb-4">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors text-sm">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;