import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer 
            className="py-4 sm:py-6 md:py-8 text-center text-sm sm:text-base md:text-lg text-text-color/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
                <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                    <span>© {new Date().getFullYear()}</span>
                    <span className="text-red-color font-medium">MD. Tahsinur Rahman</span>
                    <span>All rights reserved.</span>
                </p>
            </div>
        </motion.footer>
    );
};

export default Footer;