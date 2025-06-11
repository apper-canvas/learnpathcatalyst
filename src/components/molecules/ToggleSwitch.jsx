import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ checked, onChange, label, description }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
            <div>
                <h3 className="font-medium text-surface-900">{label}</h3>
                {description && <p className="text-sm text-surface-500">{description}</p>}
            </div>
            
            <button
                onClick={onChange}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    checked ? 'bg-primary' : 'bg-surface-300'
                }`}
            >
                <motion.div
                    animate={{ x: checked ? 24 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;