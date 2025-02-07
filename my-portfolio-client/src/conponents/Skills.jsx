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
    <div>
      <motion.section
        id="skills"
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
          Technologies I've Worked With
        </motion.h2>
        <motion.div
          className="pt-2 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-background-color/50 p-8 rounded-xl shadow-lg"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Marquee
                gradient={true}
                speed={50}
                pauseOnHover={true}
                gradientColor={[31, 31, 31]}
                className=""
              >
                {skills?.map((skill, index) => (
                  <div key={index} className="flex flex-col items-center mx-8">
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
                    />
                    <p className="mt-2 text-text-color/80">{skill.name}</p>
                  </div>
                ))}
              </Marquee>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Skills;
