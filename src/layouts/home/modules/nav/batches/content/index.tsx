"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";

import logo from "@/public/assets/images/logos/PTMKM.png";

// Smooth Scroll Function
export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const navHeight = 56.5; // Navigation height offset
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navHeight;

    window.scrollTo({
      behavior: "smooth",
      top: offsetPosition,
    });
  }
};

// Navigation Component
export const Content: FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = ["Home", "About Us", "Products", "Why Choose Us", "Careers", "Contact"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        <motion.a
          className="flex items-end gap-1"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(e, "home");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image alt="Logo" className="xs:-translate-y-1.75 w-fit" height={25} src={logo} />
          <span className="xs:inline hidden text-lg font-bold text-amber-700 transition-colors md:text-xl">PT. Mulya Kencana Metalindo</span>
          {/* <span className="xs:hidden text-sm font-bold text-amber-700 transition-colors">PT. MKM</span> */}
        </motion.a>
        <div className="hidden gap-8 lg:flex">
          {navItems.map((item, index) => {
            const targetId = item.toLowerCase().replace(/\s+/g, "-");
            return (
              <motion.a
                animate={{ opacity: 1, y: 0 }}
                className={`relative font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:text-amber-600 hover:after:w-full ${
                  isScrolled ? "text-gray-700" : "text-gray-800"
                }`}
                href={`#${targetId}`}
                initial={{ opacity: 0, y: -20 }}
                key={item}
                onClick={(e) => scrollToSection(e, targetId)}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            );
          })}
        </div>
        <motion.button
          className={`rounded-lg transition-colors lg:hidden ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-800 hover:bg-white/20"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="-mr-1 size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </motion.button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden bg-white/95 backdrop-blur-md lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto space-y-1 px-6 py-4">
              {navItems.map((item, index) => {
                const targetId = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <motion.a
                    animate={{ opacity: 1, x: 0 }}
                    className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-600"
                    href={`#${targetId}`}
                    initial={{ opacity: 0, x: -20 }}
                    key={item}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        scrollToSection(e, targetId);
                      }, 100);
                    }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
