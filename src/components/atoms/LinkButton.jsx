import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LinkButton = ({ to, children, className = '', whileHover, whileTap, ...rest }) => {
    return (
        <motion.div
            whileHover={whileHover || { scale: 1.02 }}
            whileTap={whileTap || { scale: 0.98 }}
        >
            <Link
                to={to}
                className={`${className} transition-colors duration-200`}
                {...rest}
            >
                {children}
            </Link>
        </motion.div>
    );
};

export default LinkButton;