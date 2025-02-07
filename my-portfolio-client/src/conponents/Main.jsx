import { motion } from "framer-motion";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import About from "./About";
import Quote from "./Quote";
import Skills from "./Skills";
import Education from "./Education";
import Project from "./Project";
import axios from "axios";
import Contact from "./Contact";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

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

  const { data: socialLinks } = useQuery({
    queryKey: ['socialLinks'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/find');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
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

  const getIconComponent = (name) => {
    switch(name.toLowerCase()) {
      case 'github':
        return <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'linkedin':
        return <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'facebook':
        return <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'twitter':
        return <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'instagram':
        return <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return null;
    }
  };

  if (isLoading || isFetching || !intro) {
    return <Loading />;
  }

  return (
    <div id="home" className="min-h-screen w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Fixed Intro Section */}
          <motion.div 
            className="lg:col-span-4 bg-background-color rounded-xl p-4 sm:p-6 lg:sticky lg:top-24 h-fit py-12 sm:py-16 lg:py-24 w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <img 
                src={intro[0]?.photoURL} 
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full mx-auto mb-4 sm:mb-6 border-4 border-red-color hover:scale-105 hover:shadow-lg hover:shadow-red-color/50 transition-all duration-300"
              />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-color mb-2">{displayName}</h1>
              <p className="text-base sm:text-lg text-text-color/80 mb-2">{intro[0]?.designation}</p>
              <p className="text-sm sm:text-base text-text-color/70 mb-4 sm:mb-6">
                {intro[0]?.location}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4">
                <a 
                  href="#cv"
                  className="btn btn-xs sm:btn-sm md:btn-md btn-outline text-red-color hover:bg-red-color hover:border-red-color w-full sm:w-[45%]"
                >
                  Download CV
                </a>
                <a
                  href="#contact"
                  className="btn btn-xs sm:btn-sm md:btn-md bg-red-color border-red-color hover:bg-red-600 text-white w-full sm:w-[45%]"
                >
                  Contact Me
                </a>
              </div>
              <div className="flex justify-center items-center gap-4 flex-wrap mt-4">
                {socialLinks?.map((link) => (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background-color/30 hover:bg-red-color/50 text-text-color hover:text-black transition-all duration-300"
                  >
                    {getIconComponent(link.name)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Scrollable Content Sections */}
          <motion.div 
            className="lg:col-span-8 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              <Quote />
              {/* About Section */}
              <About />

              {/* Skills Section */}
              <Skills />

              {/* Education Section */}
              <Education />

              {/* Projects Section */}
              <Project />

              {/* Contact Section */}
              <Contact />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Main;
