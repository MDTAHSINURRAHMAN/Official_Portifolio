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
    <motion.section
      id="education"
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
      >
        Educational Qualifications
      </motion.h2>
      <div className="space-y-8">
        {education?.map((edu, index) => (
          <motion.div
            key={edu._id}
            className={`p-6 rounded-xl bg-gradient-to-r from-background-color/50 to-background-color hover:shadow-xl transition-all duration-500 ${
              index % 2 === 0 ? 'ml-0 mr-8' : 'ml-8 mr-0'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div 
                className="w-24 h-24 rounded-full bg-background-color/30 p-3 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={edu.logo}
                  alt={edu.universityName}
                  className="w-16 h-16 object-contain"
                />
              </motion.div>
              <div className="flex-grow text-center md:text-left">
                <motion.h3 
                  className="text-xl font-bold text-text-color mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  {edu.universityName}
                </motion.h3>
                <motion.p 
                  className="text-lg text-text-color/80 mb-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.4 }}
                >
                  {edu.major}
                </motion.p>
                <motion.div
                  className="inline-block px-4 py-1 rounded-full bg-red-color/10 text-red-color text-sm"
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
  );
};

export default Education;
