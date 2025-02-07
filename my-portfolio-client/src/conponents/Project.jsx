import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Project = () => {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get(
        "https://official-portfolio-nine.vercel.app/projects"
      );
      return response.data || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <motion.section
        id="projects"
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
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projectsData?.map((project, index) => (
            <motion.div
              key={project._id}
              className="bg-background-color/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2 sm:gap-4">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-xs sm:btn-sm bg-red-color border-red-color hover:bg-red-600 text-white"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-xs sm:btn-sm btn-outline text-red-color hover:bg-red-color hover:border-red-color"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-text-color mb-2">
                  {project.name}
                </h3>
                <div className="mb-3">
                  <span className="px-2 sm:px-3 py-1 rounded-full bg-red-color/10 text-red-color text-xs sm:text-sm">
                    {project.techStack}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-text-color/80 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="w-full flex justify-center">
                  <Link
                    to={`/projects/${project._id}`}
                    className="btn btn-sm sm:btn-md w-full bg-red-color border-red-color hover:bg-red-600 text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Project;
