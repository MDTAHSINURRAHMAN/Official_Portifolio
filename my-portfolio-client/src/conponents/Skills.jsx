import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import Marquee from "react-fast-marquee";

const Skills = () => {
  const { data: skills, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/skills");
      return response.data[0]?.skills || []; // Access skills array from first document
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <motion.section
        id="skills"
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
          Technologies I've Worked With
        </motion.h2>
        <motion.div
          className="pt-2 px-2 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-background-color/50 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Desktop Marquee */}
              <div className="hidden md:block">
                <Marquee
                  gradient={true}
                  speed={50}
                  pauseOnHover={true}
                  gradientColor={[31, 31, 31]}
                >
                  {skills?.map((skill, index) => (
                    <div key={index} className="flex flex-col items-center mx-6 sm:mx-8">
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain hover:scale-110 transition-transform duration-300"
                      />
                      <p className="mt-2 text-sm sm:text-base text-text-color/80">{skill.name}</p>
                    </div>
                  ))}
                </Marquee>
              </div>

              {/* Mobile Grid */}
              <div className="md:hidden grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6">
                {skills?.map((skill, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-xs sm:text-sm text-center text-text-color/80">{skill.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Skills;
