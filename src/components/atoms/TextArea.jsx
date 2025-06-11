import React from 'react';

const TextArea = ({ id, name, value, onChange, placeholder, rows = 3, className = '', disabled, ...rest }) => {
    return (
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`${className} w-full px-4 py-3 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none`}
            {...rest}
        />
    );
};

export default TextArea;