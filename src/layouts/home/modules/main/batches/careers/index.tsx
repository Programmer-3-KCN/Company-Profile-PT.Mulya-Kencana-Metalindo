"use client";

import { motion, useInView } from "framer-motion";
import { FC, ReactElement, useRef } from "react";

import { scrollToSection } from "../../../nav/batches/content";
import { fadeInUp } from "../shared";

// Careers Section
export const Content: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <section className="relative overflow-hidden py-12 sm:py-24" id="careers" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600" />
      <div className="absolute inset-0 bg-[url('/assets/images/project/pattern.png')] opacity-10" />

      {/* Decorative circles */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        className="absolute top-0 left-0 size-64 -translate-1/2 rounded-full bg-white/10 blur-3xl"
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
        className="absolute right-0 bottom-0 size-64 translate-1/2 rounded-full bg-white/10 blur-3xl"
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative container mx-auto px-4 text-center sm:px-6 lg:px-12">
        <motion.div animate={isInView ? "visible" : "hidden"} initial="hidden" variants={fadeInUp}>
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm">
            Karir
          </span>
          <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">Bergabung Bersama Kami</h2>
          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-white/90 sm:mt-6 sm:px-0 sm:text-lg">
            Kami selalu mencari individu berbakat dan berdedikasi untuk bergabung dalam tim kami. Jadilah bagian dari perjalanan kami membangun
            Indonesia.
          </p>
        </motion.div>

        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mt-6 flex flex-col items-center justify-center gap-3 px-4 sm:mt-10 sm:flex-row sm:gap-4 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-amber-600 shadow-xl transition-all hover:shadow-2xl sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Lihat Lowongan
          </motion.a>
          <motion.a
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/50 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Kirim CV
            <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
