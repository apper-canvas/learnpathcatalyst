import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const SettingsSidebar = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="lg:col-span-1">
            <nav className="space-y-2">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${
                            activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-surface-700 hover:bg-surface-100 hover:text-primary'
                        }`}
                        whileHover={false} // Disable default Button hover for custom styling
                        whileTap={false} // Disable default Button tap for custom styling
                    >
                        <ApperIcon name={tab.icon} className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                    </Button>
                ))}
            </nav>
        </div>
    );
};

export default SettingsSidebar;