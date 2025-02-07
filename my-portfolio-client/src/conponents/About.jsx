import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { motion } from "framer-motion";

const About = () => {
  const { data: about, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await axios.get(
        "https://official-portfolio-nine.vercel.app/about"
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8">
      <motion.section
        id="about"
        className="max-w-7xl mx-auto rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-color mb-6 sm:mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-20 after:h-1 after:bg-red-color"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <motion.div
            className="bg-background-color/50 p-4 sm:p-6 rounded-lg hover:scale-105 transition-all duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-text-color mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-color rounded-full mr-2"></span>
              My Journey
            </h3>
            <p className="text-sm sm:text-base text-text-color/80 leading-relaxed">
              {about[0]?.journey}
            </p>
          </motion.div>

          <motion.div
            className="bg-background-color/50 p-4 sm:p-6 rounded-lg hover:scale-105 transition-all duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-text-color mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-color rounded-full mr-2"></span>
              Personality
            </h3>
            <p className="text-sm sm:text-base text-text-color/80 leading-relaxed">
              {about[0]?.personality}
            </p>
          </motion.div>

          <motion.div
            className="bg-background-color/50 p-4 sm:p-6 rounded-lg hover:scale-105 transition-all duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-text-color mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-color rounded-full mr-2"></span>
              Work Interests
            </h3>
            <p className="text-sm sm:text-base text-text-color/80 leading-relaxed">
              {about[0]?.workInterests}
            </p>
          </motion.div>

          <motion.div
            className="bg-background-color/50 p-4 sm:p-6 rounded-lg hover:scale-105 transition-all duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-text-color mb-3 flex items-center">
              <span className="w-2 h-2 bg-red-color rounded-full mr-2"></span>
              Hobbies
            </h3>
            <p className="text-sm sm:text-base text-text-color/80 leading-relaxed">
              {about[0]?.hobbies}
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
