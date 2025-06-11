import React from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import FormField from '@/components/molecules/FormField';

const ProfileSettingsForm = ({ profile, onProfileChange, onSave }) => {
    const timezoneOptions = [
        { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
        { value: 'UTC-6', label: 'Central Time (UTC-6)' },
        { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
        { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    ];

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
    ];

    return (
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
                <FormField label="Full Name" htmlFor="profile-name">
                    <Input
                        id="profile-name"
                        type="text"
                        value={profile.name}
                        onChange={(e) => onProfileChange('name', e.target.value)}
                    />
                </FormField>

                <FormField label="Email Address" htmlFor="profile-email">
                    <Input
                        id="profile-email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => onProfileChange('email', e.target.value)}
                    />
                </FormField>

                <FormField label="Bio" htmlFor="profile-bio" className="md:col-span-2">
                    <TextArea
                        id="profile-bio"
                        value={profile.bio}
                        onChange={(e) => onProfileChange('bio', e.target.value)}
                        rows={3}
                    />
                </FormField>

                <FormField label="Timezone" htmlFor="profile-timezone">
                    <Select
                        id="profile-timezone"
                        value={profile.timezone}
                        onChange={(e) => onProfileChange('timezone', e.target.value)}
                        options={timezoneOptions}
                    />
                </FormField>

                <FormField label="Language" htmlFor="profile-language">
                    <Select
                        id="profile-language"
                        value={profile.language}
                        onChange={(e) => onProfileChange('language', e.target.value)}
                        options={languageOptions}
                    />
                </FormField>
            </div>

            <div className="pt-4">
                <Button
                    onClick={onSave}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default ProfileSettingsForm;