import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const PrivacySettingsSection = ({ onExportData, onDeleteAccount }) => {
    return (
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
                            <Button className="text-primary hover:text-primary/80 text-sm font-medium" whileHover={{ scale: 1 }} whileTap={{ scale: 1 }}>
                                View Privacy Policy
                            </Button>
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
                            <Button onClick={onExportData} className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 text-sm">
                                Request Export
                            </Button>
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
                            <Button onClick={onDeleteAccount} className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 text-sm">
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacySettingsSection;