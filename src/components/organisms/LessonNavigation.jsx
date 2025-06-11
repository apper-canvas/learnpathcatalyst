import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const LessonNavigation = ({ courseId, previousLesson, nextLesson }) => {
    return (
        <div className="bg-surface-50 rounded-xl p-6">
            <h4 className="font-medium text-surface-900 mb-4">Navigation</h4>
            <div className="space-y-3">
                {previousLesson && (
                    <Link
                        to={`/courses/${courseId}/lessons/${previousLesson.id}`}
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-surface-50 transition-colors border"
                    >
                        <ApperIcon name="ChevronLeft" className="w-4 h-4 text-surface-500" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-surface-900 truncate">Previous</p>
                            <p className="text-xs text-surface-500 truncate">{previousLesson.title}</p>
                        </div>
                    </Link>
                )}
                
                {nextLesson && (
                    <Link
                        to={`/courses/${courseId}/lessons/${nextLesson.id}`}
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-surface-50 transition-colors border"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-surface-900 text-right truncate">Next</p>
                            <p className="text-xs text-surface-500 text-right truncate">{nextLesson.title}</p>
                        </div>
                        <ApperIcon name="ChevronRight" className="w-4 h-4 text-surface-500" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default LessonNavigation;