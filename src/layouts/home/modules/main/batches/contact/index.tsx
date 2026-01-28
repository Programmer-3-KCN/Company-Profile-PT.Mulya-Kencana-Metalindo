"use client";

import { motion, useInView } from "framer-motion";
import { FC, ReactElement, useRef } from "react";

import { fadeInUp, staggerContainer, staggerItem } from "../shared";

// Contact Section
export const Content: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  const contactInfo = [
    {
      icon: (
        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      ),
      label: "Alamat",
      value: "Jl. Terusan Pasir Koja No. 109B, Bandung, Jawa Barat 40242",
    },
    {
      icon: (
        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      label: "Email",
      link: "mailto:info@mulyakencanametalindo.com",
      value: "info@mulyakencanametalindo.com",
    },
    {
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      label: "Instagram",
      link: "https://instagram.com/mulyakencanametalindo",
      value: "@mulyakencanametalindo",
    },
    {
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      label: "LinkedIn",
      link: "https://linkedin.com/company/pt-mulya-kencana-metalindo",
      value: "PT. Mulya Kencana Metalindo",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-12 sm:py-24" id="contact" ref={ref}>
      {/* Decorative */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        className="absolute bottom-0 left-0 size-72 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-100/50 blur-3xl"
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-16"
          initial="hidden"
          variants={fadeInUp}
        >
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 sm:px-4 sm:py-1.5 sm:text-sm">
            Kontak
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">Hubungi Kami</h2>
          <p className="mt-3 text-sm text-gray-600 sm:mt-4 sm:text-lg">Kami siap membantu Anda dengan kebutuhan material konstruksi</p>
        </motion.div>

        <div className="grid gap-4 sm:gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            animate={isInView ? "visible" : "hidden"}
            className="space-y-3 sm:space-y-4 lg:col-span-2"
            initial="hidden"
            variants={staggerContainer}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                className="group flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:border-amber-200 hover:shadow-md sm:gap-4 sm:rounded-2xl sm:p-5"
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <motion.div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 transition-all group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white sm:size-12 sm:rounded-xl"
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 360 }}
                >
                  {info.icon}
                </motion.div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 sm:text-base">{info.label}</h4>
                  {info.link ? (
                    <a
                      className="text-xs break-all text-amber-600 transition-colors hover:text-amber-700 hover:underline sm:text-sm"
                      href={info.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-xs text-gray-600 sm:text-sm">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="h-64 overflow-hidden rounded-2xl border border-gray-200 shadow-xl sm:h-auto sm:rounded-3xl lg:col-span-3"
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <iframe
              allowFullScreen={true}
              className="size-full min-h-64 border-0 sm:min-h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6962659152127!2d107.59719319999999!3d-6.9268629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e61f857b6e79%3A0x84033ec28c966976!2sPT.%20Mulya%20Kencana%20Metalindo!5e0!3m2!1sen!2sid!4v1769582899158!5m2!1sen!2sid"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
