"use client";

import { useState } from "react";
import Logo from "./Logo";
import Navlinks from "./Navlinks";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8 lg:px-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Burger Button for Mobile */}
        <button 
          className="md:hidden text-white z-60 p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:block">
          <Navlinks />
        </div>

        {/* Request a Quote Button - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full 
            hover:bg-blue-500 hover:text-white transition-colors duration-300 
            text-sm font-medium whitespace-nowrap">
            Request a Quote
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900 z-50 flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-4">
                <Logo />
                <button 
                  className="text-white p-2"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Menu Content */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col flex-grow justify-center items-center space-y-8 px-4"
              >
                {menuLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={link.href}
                      className="text-white text-4xl font-bold tracking-wide 
                        hover:text-blue-300 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile CTA Button */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="p-6"
              >
                <button 
                  className="w-full px-8 py-4 bg-blue-500 text-white rounded-full 
                    hover:bg-blue-600 transition-colors duration-300 
                    text-lg font-semibold tracking-wide shadow-lg"
                >
                  Request a Quote
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;