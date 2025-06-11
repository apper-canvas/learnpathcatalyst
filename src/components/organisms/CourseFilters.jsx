import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const CourseFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, categories, difficulties }) => {
    const categoryOptions = categories.map(cat => ({
        value: cat,
        label: cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)
    }));
    const difficultyOptions = difficulties.map(diff => ({
        value: diff,
        label: diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)
    }));

    return (
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                    <div className="relative">
                        <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4"
                        />
                    </div>
                </div>
                
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    options={categoryOptions}
                />
                
                <Select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    options={difficultyOptions}
                />
            </div>
        </div>
    );
};

export default CourseFilters;