import React from 'react';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';
import Button from '@/components/atoms/Button';

const PreferencesSettingsForm = ({ preferences, onPreferenceChange }) => {
    const playbackSpeedOptions = ['0.5x', '0.75x', '1x', '1.25x', '1.5x'];
    const emailDigestFrequencies = ['daily', 'weekly', 'monthly'];

    return (
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
                <ToggleSwitch
                    label="Auto-play videos"
                    description="Automatically play the next video in a lesson"
                    checked={preferences.autoplay}
                    onChange={() => onPreferenceChange('autoplay', !preferences.autoplay)}
                />

                <div className="p-4 bg-surface-50 rounded-lg">
                    <h3 className="font-medium text-surface-900 mb-3">Playback Speed</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {playbackSpeedOptions.map(speed => (
                            <Button
                                key={speed}
                                onClick={() => onPreferenceChange('playbackSpeed', speed)}
                                className={`px-3 py-2 text-sm rounded-lg ${
                                    preferences.playbackSpeed === speed
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-surface-700 hover:bg-surface-100'
                                }`}
                                whileHover={{ scale: 1 }} // Override default Button hover
                                whileTap={{ scale: 1 }} // Override default Button tap
                            >
                                {speed}
                            </Button>
                        ))}
                    </div>
                </div>

                <ToggleSwitch
                    label="Captions"
                    description="Show subtitles for video lessons"
                    checked={preferences.captions}
                    onChange={() => onPreferenceChange('captions', !preferences.captions)}
                />

                <div className="p-4 bg-surface-50 rounded-lg">
                    <h3 className="font-medium text-surface-900 mb-3">Email Digest</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {emailDigestFrequencies.map(frequency => (
                            <Button
                                key={frequency}
                                onClick={() => onPreferenceChange('emailDigest', frequency)}
                                className={`px-3 py-2 text-sm rounded-lg capitalize ${
                                    preferences.emailDigest === frequency
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-surface-700 hover:bg-surface-100'
                                }`}
                                whileHover={{ scale: 1 }} // Override default Button hover
                                whileTap={{ scale: 1 }} // Override default Button tap
                            >
                                {frequency}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreferencesSettingsForm;