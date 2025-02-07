import { motion } from "framer-motion";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import About from "./About";
import Quote from "./Quote";
import Skills from "./Skills";
import axios from "axios";

const Main = () => {
  const { data: intro, isLoading, isFetching } = useQuery({
    queryKey: ['intro'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/intro');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false // Prevent refetch on window focus
  });

  const [displayName, setDisplayName] = React.useState("");
  const name = " MD. Tahsinur Rahman"; // Removed extra spaces

  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayName(() => {
        if (index < name.length) {
          index++;
          return name.substring(0, index); // Show full string up to current index
        } else {
          clearInterval(timer); // Stop the interval after completion
          setTimeout(() => { // Clear the text after a delay
            
          }, 2000); // 2-second delay before restarting
          return name; // Ensure final display is the full name before reset
        }
      });
    }, 150);
  
    const startTyping = () => {
      setDisplayName(""); // Reset the display
      index = 0; // Reset the index
      timer; // Restart the interval
    };
  
    return () => clearInterval(timer);
  }, []);
  

  if (isLoading || isFetching || !intro) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side - Fixed Intro Section */}
          <motion.div 
            className="lg:col-span-4 bg-background-color rounded-xl p-6 lg:sticky lg:top-24 h-fit"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <img 
                src={intro[0]?.photoURL} 
                alt="Profile"
                className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-red-color hover:scale-105 hover:shadow-lg hover:shadow-red-color/50 transition-all duration-300"
              />
              <h1 className="text-3xl font-bold text-text-color mb-2">{displayName}</h1>
              <p className="text-lg text-text-color/80 mb-2">{intro[0]?.designation}</p>
              <p className="text-text-color/70 mb-6">
                {intro[0]?.location}
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="#cv"
                  className="btn btn-sm btn-outline text-red-color hover:bg-red-color hover:border-red-color"
                >
                  Download CV
                </a>
                <a
                  href="#contact"
                  className="btn btn-sm bg-red-color border-red-color hover:bg-red-600 text-white"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Scrollable Content Sections */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-12">
              <Quote />
              {/* About Section */}
              <About />

              {/* Skills Section */}
             <Skills />

              {/* Education Section */}
              <section id="education" className="bg-background-color rounded-xl p-6">
                <h2 className="text-2xl font-bold text-text-color mb-4">Education</h2>
                {/* Education content will go here */}
              </section>

              {/* Projects Section */}
              <section id="projects" className="bg-background-color rounded-xl p-6">
                <h2 className="text-2xl font-bold text-text-color mb-4">Projects</h2>
                {/* Projects content will go here */}
              </section>

              {/* Contact Section */}
              <section id="contact" className="bg-background-color rounded-xl p-6">
                <h2 className="text-2xl font-bold text-text-color mb-4">Contact</h2>
                {/* Contact content will go here */}
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Main;
