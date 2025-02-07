import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaCode, FaGraduationCap, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const navItems = [
    { icon: <FaHome size={24} />, name: "Home", href: "#home" },
    { icon: <FaUser size={24} />, name: "About", href: "#about" },
    { icon: <FaCode size={24} />, name: "Skills", href: "#skills" },
    { icon: <FaGraduationCap size={24} />, name: "Education", href: "#education" },
    { icon: <FaProjectDiagram size={24} />, name: "Projects", href: "#projects" },
    { icon: <FaEnvelope size={24} />, name: "Contact", href: "#contact" }
  ];

  return (
    <motion.nav 
      className="flex justify-center items-center py-6 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-center bg-background-color px-6 py-3 rounded-full shadow-lg gap-6">
        {navItems.map((item, index) => (
          <div 
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIcon(index)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <a 
              href={item.href}
              className="text-white w-10 h-10 flex items-center justify-center hover:bg-red-color rounded-full transition-colors duration-300"
            >
              {item.icon}
            </a>
            {hoveredIcon === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                <span className="text-sm text-text-color bg-[#1D1D1D] px-2 py-1 rounded">
                  {item.name}
                </span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
