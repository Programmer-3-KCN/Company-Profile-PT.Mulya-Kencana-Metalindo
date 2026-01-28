"use client";

import { motion, useInView } from "framer-motion";
import { FC, ReactElement, useRef } from "react";

import { fadeInUp, staggerContainer, staggerItem } from "../shared";

// Vision Mission Section
export const Content: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <section className="relative overflow-hidden bg-gray-900 py-12 sm:py-24" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          className="absolute top-0 left-1/4 size-96 rounded-full bg-amber-500 blur-3xl"
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          className="absolute right-1/4 bottom-0 size-96 rounded-full bg-orange-500 blur-3xl"
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div animate={isInView ? "visible" : "hidden"} className="mb-8 text-center sm:mb-16" initial="hidden" variants={fadeInUp}>
          <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 sm:px-4 sm:py-1.5 sm:text-sm">
            Visi & Misi
          </span>
          <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">Arah dan Tujuan Kami</h2>
        </motion.div>

        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 sm:gap-8 lg:grid-cols-2"
          initial="hidden"
          variants={staggerContainer}
        >
          {/* Visi Card */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-white/10 sm:rounded-3xl sm:p-8"
            variants={staggerItem}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-amber-500/20 blur-2xl transition-all group-hover:bg-amber-500/30" />
            <div className="relative">
              <motion.div
                className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 sm:mb-6 sm:size-16 sm:rounded-2xl"
                transition={{ duration: 0.5 }}
                whileHover={{ rotate: 360, scale: 1.1 }}
              >
                <svg className="size-6 text-white sm:size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </motion.div>
              <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl">Visi</h3>
              <p className="text-sm leading-relaxed text-gray-300 sm:text-lg">
                &quot;Menjadi perusahaan distribusi bahan bangunan terdepan di Indonesia yang dikenal karena kualitas produk, inovasi layanan, dan
                integritas bisnis.&quot;
              </p>
            </div>
          </motion.div>

          {/* Misi Card */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-white/10 sm:rounded-3xl sm:p-8"
            variants={staggerItem}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-orange-500/20 blur-2xl transition-all group-hover:bg-orange-500/30" />
            <div className="relative">
              <motion.div
                className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 sm:mb-6 sm:size-16 sm:rounded-2xl"
                transition={{ duration: 0.5 }}
                whileHover={{ rotate: 360, scale: 1.1 }}
              >
                <svg className="size-6 text-white sm:size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </motion.div>
              <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl">Misi</h3>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Menyediakan produk konstruksi berkualitas tinggi yang memenuhi standar keamanan dan ketahanan.",
                  "Membangun jaringan distribusi yang efisien dan menjangkau seluruh pelosok daerah.",
                  "Memberikan solusi terbaik dan layanan purna jual yang prima bagi setiap pelanggan.",
                  "Mengembangkan potensi SDM dan teknologi untuk pertumbuhan berkelanjutan.",
                ].map((item, index) => (
                  <motion.li
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    className="flex items-start gap-2 sm:gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    key={index}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-400 sm:mt-1 sm:size-6 sm:text-sm">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-300 sm:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
