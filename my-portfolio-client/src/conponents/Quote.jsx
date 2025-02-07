import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

const Quote = () => {
  const { data: quote, isLoading } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const response = await axios.get(
        "https://official-portfolio-nine.vercel.app/quote"
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <motion.div
      className="pt-2 px-2 sm:px-4 md:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative bg-background-color/50 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="absolute -top-3 sm:-top-4 md:-top-5 -left-3 sm:-left-4 md:-left-5 w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 bg-red-color rounded-full flex items-center justify-center">
            <span className="text-xl sm:text-2xl md:text-3xl text-white">
              "
            </span>
          </div>

          <div className="text-center">
            <p className="text-lg sm:text-xl md:text-2xl italic text-text-color/90 mb-4 sm:mb-5 md:mb-6 leading-relaxed px-2 sm:px-4">
              {quote?.[0]?.text ||
                "The only way to do great work is to love what you do."}
            </p>

            <div className="flex items-center justify-center">
              <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-red-color/50"></div>
              <p className="mx-2 sm:mx-3 md:mx-4 text-base sm:text-lg font-semibold text-red-color">
                {quote?.[0]?.author || "Steve Jobs"}
              </p>
              <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-red-color/50"></div>
            </div>
          </div>

          <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -right-3 sm:-right-4 md:-right-5 w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 bg-red-color rounded-full flex items-center justify-center rotate-180">
            <span className="text-xl sm:text-2xl md:text-3xl text-white">
              "
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Quote;
