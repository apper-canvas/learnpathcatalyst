import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className = '', disabled, type = 'button', whileHover, whileTap, ...rest }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={`${className} transition-colors duration-200`}
            disabled={disabled}
            whileHover={whileHover || (disabled ? {} : { scale: 1.02 })}
            whileTap={whileTap || (disabled ? {} : { scale: 0.98 })}
            {...rest}
        >
            {children}
        </motion.button>
    );
};

export default Button;