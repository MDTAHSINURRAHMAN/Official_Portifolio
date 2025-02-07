import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from './Loading';
import { motion } from 'framer-motion';

const About = () => {
    const { data: about, isLoading } = useQuery({
        queryKey: ['about'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/about');
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    });

    if (isLoading) return <Loading />;

    return (
        <div>
            <motion.section 
                id="about" 
                className="rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2 
                    className="text-2xl md:text-3xl font-bold text-text-color mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-20 after:h-1 after:bg-red-color"
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.2 }}
                >About Me</motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                        className="bg-background-color/50 p-4 rounded-lg hover:scale-105 transition-all duration-300"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-xl font-semibold text-text-color mb-3 flex items-center">
                            <span className="w-2 h-2 bg-red-color rounded-full mr-2"></span>
                            My Journey
                        </h3>
                        <p className="text-text-color/80 leading-relaxed">{about[0]?.journey}</p>
                    </motion.div>

                    <motion.div 
                        className="bg-background-color/50 p-4 rounded-lg hover:scale-105 transition-all duration-300"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl font-semibold text-text-color mb-3 flex items-center">
                            <span className="w-2 h-2 bg-red-color rounded-full mr-2"></span>
                            Personality
                        </h3>
                        <p className="text-text-color/80 leading-relaxed">{about[0]?.personality}</p>
                    </motion.div>

                    <motion.div 
                        className="bg-background-color/50 p-4 rounded-lg hover:scale-105 transition-all duration-300"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-xl font-semibold text-text-color mb-3 flex items-center">
                            <span className="w-2 h-2 bg-red-color rounded-full mr-2"></span>
                            Work Interests
                        </h3>
                        <p className="text-text-color/80 leading-relaxed">{about[0]?.workInterests}</p>
                    </motion.div>

                    <motion.div 
                        className="bg-background-color/50 p-4 rounded-lg hover:scale-105 transition-all duration-300"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold text-text-color mb-3 flex items-center">
                            <span className="w-2 h-2 bg-red-color rounded-full mr-2"></span>
                            Hobbies
                        </h3>
                        <p className="text-text-color/80 leading-relaxed">{about[0]?.hobbies}</p>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default About;