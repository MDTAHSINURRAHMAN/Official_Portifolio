import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaCode, FaGraduationCap, FaProjectDiagram, FaEnvelope, FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isProductDetails = location.pathname.includes('/projects/');

  const navItems = [
    { icon: <FaHome size={24} />, name: "Home", href: "#home" },
    { icon: <FaUser size={24} />, name: "About", href: "#about" },
    { icon: <FaCode size={24} />, name: "Skills", href: "#skills" },
    { icon: <FaGraduationCap size={24} />, name: "Education", href: "#education" },
    { icon: <FaProjectDiagram size={24} />, name: "Projects", href: "#projects" },
    { icon: <FaEnvelope size={24} />, name: "Contact", href: "#contact" }
  ];

  const handleNavClick = (href) => {
    if (isProductDetails) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav 
      className="flex justify-center items-center pt-6 z-50 sticky top-0 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Menu Button */}
      <div className="md:hidden absolute right-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-text-color p-2 hover:bg-red-color/20 rounded-full transition-colors"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden fixed top-20 right-4 bg-background-color p-4 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 text-text-color hover:bg-red-color/20 rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                handleNavClick(item.href);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </motion.div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center items-center bg-background-color px-6 py-3 rounded-full shadow-lg gap-6">
        {navItems.map((item, index) => (
          <div 
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIcon(index)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <a 
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
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
