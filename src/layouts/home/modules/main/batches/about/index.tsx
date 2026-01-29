"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FC, ReactElement, useRef } from "react";

import logo from "@/public/assets/images/logos/PTMKM.png";

import { fadeInLeft, fadeInRight, fadeInUp } from "../shared";

// About Section
export const Content: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-24" id="about-us" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 size-72 -translate-1/2 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid items-center gap-8 sm:gap-16 lg:grid-cols-2">
          <motion.div animate={isInView ? "visible" : "hidden"} className="order-2 lg:order-1" initial="hidden" variants={fadeInLeft}>
            <motion.span
              className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 sm:px-4 sm:py-1.5 sm:text-sm"
              variants={fadeInUp}
            >
              Tentang Kami
            </motion.span>
            <motion.h2
              className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl"
              variants={fadeInUp}
            >
              PT. Mulya Kencana
              <span className="block text-amber-600">Metalindo</span>
            </motion.h2>
            <motion.p className="mt-4 text-sm leading-relaxed text-gray-600 sm:mt-6 sm:text-lg" variants={fadeInUp}>
              PT. Mulya Kencana Metalindo adalah perusahaan swasta nasional yang berdedikasi dalam bidang manufaktur dan distribusi bahan bangunan.
              Berawal dari semangat untuk memberikan kontribusi nyata bagi industri konstruksi tanah air, kami telah tumbuh menjadi mitra strategis
              bagi berbagai proyek pembangunan mulai dari skala retail hingga infrastruktur.
            </motion.p>

            <motion.div
              className="mt-6 rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:mt-8 sm:rounded-2xl sm:p-6"
              variants={fadeInUp}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <motion.div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white sm:size-12 sm:rounded-xl"
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 360 }}
                >
                  <svg className="size-5 sm:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 sm:text-lg">Sejarah & Filosofi</h3>
                  <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
                    Didirikan di Bandung, nama &quot;Kencana&quot; diambil dari simbol kereta kencana yang melambangkan kendaraan terhormat. Filosofi
                    ini mencerminkan komitmen kami untuk senantiasa bergerak maju dengan cara yang terhormat.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div animate={isInView ? "visible" : "hidden"} className="relative order-1 lg:order-2" initial="hidden" variants={fadeInRight}>
            <motion.div
              animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
              className="absolute -top-4 -right-4 size-full rounded-3xl bg-gradient-to-br from-amber-200 to-orange-200"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-1 shadow-2xl shadow-amber-500/20"
              transition={{ duration: 0.3 }}
              whileHover={{ rotate: 1, scale: 1.02 }}
            >
              <div className="flex aspect-square items-center justify-center rounded-[22px] bg-gradient-to-br from-amber-50 to-white p-8">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}>
                  <Image alt="Company Logo" className="w-fit drop-shadow-lg" height={250} src={logo} />
                </motion.div>
              </div>
            </motion.div>
            {/* Floating Card */}
            <motion.div
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              className="absolute -bottom-4 left-0 rounded-xl border border-gray-100 bg-white p-3 shadow-xl sm:-bottom-6 sm:-left-6 sm:rounded-2xl sm:p-4"
              initial={{ opacity: 0, x: -50, y: 50 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  className="flex size-10 items-center justify-center rounded-full bg-green-100 sm:size-12"
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="size-5 text-green-600 sm:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </motion.div>
                <div>
                  <div className="text-xl font-bold text-gray-900 sm:text-2xl">30+</div>
                  <div className="text-xs text-gray-500 sm:text-sm">Tahun Berpengalaman</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
