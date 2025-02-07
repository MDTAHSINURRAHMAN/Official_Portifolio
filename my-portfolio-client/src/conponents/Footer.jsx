import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer 
            className="py-6 text-center text-text-color/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p>© {new Date().getFullYear()} <span className="text-red-color">MD. Tahsinur Rahman</span> All rights reserved.</p>
        </motion.footer>
    );
};

export default Footer;