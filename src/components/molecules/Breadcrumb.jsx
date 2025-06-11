import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Breadcrumb = ({ items, className = '' }) => {
    return (
        <nav className={`flex items-center space-x-2 text-sm text-surface-500 ${className}`}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {item.to ? (
                        <Link to={item.to} className="hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-surface-900 break-words">{item.label}</span>
                    )}
                    {index < items.length - 1 && (
                        <ApperIcon name="ChevronRight" className="w-4 h-4" />
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;