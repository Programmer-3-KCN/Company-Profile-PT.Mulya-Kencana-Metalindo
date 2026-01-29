"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FC, ReactElement, useRef } from "react";

import logo from "@/public/assets/images/logos/PTMKM.png";

import { scrollToSection } from "../../../nav/batches/content";

// Footer Section
export const Content: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px", once: true });

  return (
    <footer className="bg-gray-900 pt-10 pb-6 sm:pt-16 sm:pb-8" ref={ref}>
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="container mx-auto px-4 sm:px-6 lg:px-12"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main Footer */}
        <div className="grid gap-6 pb-8 sm:gap-8 sm:pb-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <a className="flex items-end gap-1" href="#home" onClick={(e) => scrollToSection(e, "home")}>
              <Image alt="Logo" className="xs:-translate-y-1.75 w-fit brightness-0 invert" height={25} src={logo} />
              <span className="xs:inline hidden text-lg font-bold text-white sm:text-xl">PT. Mulya Kencana Metalindo</span>
              {/* <span className="xs:hidden text-base font-bold text-white">PT. MKM</span> */}
            </a>
            <p className="mt-3 max-w-md text-sm text-gray-400 sm:mt-4 sm:text-base">
              Perusahaan distribusi bahan bangunan terpercaya. Menyediakan solusi konstruksi berkualitas untuk membangun Indonesia.
            </p>
            {/* Social Links */}
            {/* <div className="mt-4 flex gap-3 sm:mt-6 sm:gap-4">
              {[
                {
                  href: "https://instagram.com/mulyakencanametalindo",
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  href: "https://linkedin.com/company/pt-mulya-kencana-metalindo",
                  icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                },
              ].map((social, index) => (
                <motion.a
                  className="flex size-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-amber-500 hover:text-white sm:size-10"
                  href={social.href}
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="size-4 sm:size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div> */}
          </motion.div>

          {/* Quick Links */}
          <motion.div animate={isInView ? { opacity: 1, y: 0 } : {}} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h3 className="mb-3 text-sm font-semibold text-white sm:mb-4 sm:text-base">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {["Home", "About Us", "Products", "Why Choose Us"].map((link, index) => {
                const targetId = link.toLowerCase().replace(/\s+/g, "-");
                return (
                  <motion.li
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    initial={{ opacity: 0, x: -10 }}
                    key={link}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <motion.a
                      className="text-sm text-gray-400 transition-colors hover:text-amber-500 sm:text-base"
                      href={`#${targetId}`}
                      onClick={(e) => scrollToSection(e, targetId)}
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact */}
          {/* <motion.div animate={isInView ? { opacity: 1, y: 0 } : {}} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <h3 className="mb-3 text-sm font-semibold text-white sm:mb-4 sm:text-base">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-400 sm:space-y-3 sm:text-base">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 size-4 shrink-0 text-amber-500 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span className="text-xs sm:text-sm">Jl. Terusan Pasir Koja No. 109B, Bandung</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="size-4 shrink-0 text-amber-500 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span className="text-xs break-all sm:text-sm">info@mulyakencanametalindo.com</span>
              </li>
            </ul>
          </motion.div> */}
        </div>

        {/* Bottom Bar */}
        <motion.div
          animate={isInView ? { opacity: 1 } : {}}
          className="border-t border-gray-800 pt-6 sm:pt-8"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-between gap-2 sm:gap-4 md:flex-row">
            <p className="text-center text-xs text-gray-500 sm:text-sm">
              &copy; {new Date().getFullYear()} PT. Mulya Kencana Metalindo. All rights reserved.
            </p>
            {/* <p className="text-xs text-gray-500 sm:text-sm">Building Indonesia Since 1993</p> */}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
