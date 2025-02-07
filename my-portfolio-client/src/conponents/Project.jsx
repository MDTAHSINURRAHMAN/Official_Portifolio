import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const Project = () => {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/projects');
      return response.data || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <motion.section
      id="projects"
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
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-red-color border-red-color hover:bg-red-600 text-white"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline text-red-color hover:bg-red-color hover:border-red-color"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-text-color mb-2">{project.name}</h3>
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full bg-red-color/10 text-red-color text-sm">
                  {project.techStack}
                </span>
              </div>
              <p className="text-text-color/80 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="w-full flex justify-center">
                <Link to={`/projects/${project._id}`} className="btn w-full bg-red-color border-red-color hover:bg-red-600 text-white">View Details</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Project;
