import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "./Loading";

const Education = () => {
  const { data: education, isLoading } = useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/education");
      return response.data[0]?.education || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <motion.section
        id="education"
        className="max-w-7xl mx-auto rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-color mb-4 sm:mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-16 sm:after:w-20 after:h-1 after:bg-red-color"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Educational Qualifications
        </motion.h2>
        <div className="space-y-6 sm:space-y-8">
          {education?.map((edu, index) => (
            <motion.div
              key={edu._id}
              className={`p-4 sm:p-6 md:p-8 rounded-xl bg-gradient-to-r from-background-color/50 to-background-color hover:shadow-xl transition-all duration-500 ${
                index % 2 === 0 
                  ? 'ml-0 mr-0 sm:mr-4 md:mr-8' 
                  : 'ml-0 mr-0 sm:ml-4 md:ml-8'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <motion.div 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-background-color/30 p-2 sm:p-3 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={edu.logo}
                    alt={edu.universityName}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  />
                </motion.div>
                <div className="flex-grow text-center sm:text-left">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-text-color mb-1 sm:mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    {edu.universityName}
                  </motion.h3>
                  <motion.p 
                    className="text-base sm:text-lg text-text-color/80 mb-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.4 }}
                  >
                    {edu.major}
                  </motion.p>
                  <motion.div
                    className="inline-block px-3 sm:px-4 py-1 rounded-full bg-red-color/10 text-red-color text-xs sm:text-sm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.5 }}
                  >
                    {edu.startYear} - {edu.endYear}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Education;
