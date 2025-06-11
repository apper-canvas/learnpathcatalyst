import React from 'react';

const Input = ({ id, name, type = 'text', value, onChange, placeholder, className = '', disabled, ...rest }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${className} w-full px-4 py-3 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
            {...rest}
        />
    );
};

export default Input;