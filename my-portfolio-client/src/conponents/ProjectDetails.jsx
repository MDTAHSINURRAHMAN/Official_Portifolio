import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectDetails = () => {
  const { id } = useParams();

  const { data: projectData, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://official-portfolio-nine.vercel.app/projects/${id}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (!projectData) {
    return (
      <div className="text-center text-lg sm:text-xl md:text-2xl text-text-color mt-6 sm:mt-8 md:mt-10">
        Project not found
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Link
        to="/"
        className="btn btn-sm sm:btn-md btn-outline text-red-color hover:bg-red-color hover:border-red-color mb-4 sm:mb-6 md:mb-8 transition-all duration-300"
      >
        &larr; Back to Home
      </Link>

      <motion.div
        className="bg-gradient-to-br from-background-color/80 to-background-color/40 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border border-red-color/10"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] group">
          <img
            src={projectData.image}
            alt={projectData.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center">
            <div className="text-center px-4 sm:px-6">
              <motion.div
                className="flex gap-3 sm:gap-4 md:gap-6 justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <a
                  href={projectData.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm sm:btn-md md:btn-lg bg-red-color border-red-color hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <FaExternalLinkAlt className="text-lg sm:text-xl md:text-2xl" />
                </a>
                <a
                  href={projectData.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm sm:btn-md md:btn-lg btn-outline text-white hover:bg-red-color hover:border-red-color transition-all duration-300 hover:scale-105"
                >
                  <FaGithub className="text-lg sm:text-xl md:text-2xl" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-8 md:p-12">
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-color mb-3 sm:mb-4 relative">
              Tech Stack
              <span className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 h-1 bg-red-color"></span>
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {projectData.techStack?.split(",").map((tech, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-red-color/10 text-red-color text-xs sm:text-sm font-medium hover:bg-red-color hover:text-white transition-all duration-300"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-color mb-3 sm:mb-4 relative">
              Project Description
              <span className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 h-1 bg-red-color"></span>
            </h2>
            <p className="text-text-color/80 leading-relaxed text-sm sm:text-base md:text-lg">
              {projectData.description}
            </p>
          </motion.div>

          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-color mb-3 sm:mb-4 relative">
              Challenges
              <span className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 h-1 bg-red-color"></span>
            </h2>
            <p className="text-text-color/80 leading-relaxed text-sm sm:text-base md:text-lg">
              {projectData.challenges}
            </p>
          </motion.div>

          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-color mb-3 sm:mb-4 relative">
              Future Improvements
              <span className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 h-1 bg-red-color"></span>
            </h2>
            <p className="text-text-color/80 leading-relaxed text-sm sm:text-base md:text-lg">
              {projectData.improvements}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;
