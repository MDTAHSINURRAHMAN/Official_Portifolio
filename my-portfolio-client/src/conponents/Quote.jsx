import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from './Loading';

const Quote = () => {
  const { data: quote, isLoading } = useQuery({
    queryKey: ['quote'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/quote');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  });

  if (isLoading) return <Loading />;

  return (
    <motion.div
      className="pt-2 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="relative bg-background-color/50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="absolute -top-5 -left-5 w-10 h-10 bg-red-color rounded-full flex items-center justify-center">
            <span className="text-3xl text-white">"</span>
          </div>
          
          <div className="text-center">
            <p className="text-xl md:text-2xl italic text-text-color/90 mb-6 leading-relaxed">
              {quote?.[0]?.text || "The only way to do great work is to love what you do."}
            </p>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-0.5 bg-red-color/50"></div>
              <p className="mx-4 text-lg font-semibold text-red-color">
                {quote?.[0]?.author || "Steve Jobs"}
              </p>
              <div className="w-12 h-0.5 bg-red-color/50"></div>
            </div>
          </div>

          <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-red-color rounded-full flex items-center justify-center rotate-180">
            <span className="text-3xl text-white">"</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Quote;
