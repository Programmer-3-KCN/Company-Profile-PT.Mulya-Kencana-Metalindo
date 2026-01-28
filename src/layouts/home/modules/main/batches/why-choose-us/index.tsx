"use client";

import { motion, useInView } from "framer-motion";
import { FC, ReactElement, useRef } from "react";

import { fadeInUp, staggerContainer, staggerItem } from "../shared";

// Why Choose Us Section
export const Content: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  const advantages = [
    {
      description: "Beroperasi sejak 1993, memberikan pemahaman mendalam tentang kebutuhan pasar.",
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      ),
      title: "Pengalaman 30+ Tahun",
      value: "30+",
    },
    {
      description: "Hanya mendistribusikan produk yang telah teruji kualitas dan keamanannya.",
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      title: "Produk Tersertifikasi SNI",
      value: "100%",
    },
    {
      description: "Jangkauan pengiriman luas didukung manajemen rantai pasok profesional.",
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      title: "Jaringan Luas",
      value: "500+",
    },
    {
      description: "Kepercayaan klien adalah prioritas utama melalui transparansi bisnis.",
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      title: "Integritas Teruji",
      value: "1000+",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24" id="why-choose-us" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div animate={isInView ? "visible" : "hidden"} className="mx-auto mb-16 max-w-2xl text-center" initial="hidden" variants={fadeInUp}>
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">Keunggulan Kami</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Mengapa Memilih Kami?</h2>
          <p className="mt-4 text-lg text-gray-600">Komitmen kami untuk memberikan yang terbaik dalam setiap aspek layanan</p>
        </motion.div>

        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          variants={staggerContainer}
        >
          {advantages.map((item, index) => (
            <motion.div className="group text-center" key={index} variants={staggerItem} whileHover={{ y: -5 }}>
              <div className="relative mx-auto mb-6">
                {/* Outer Ring */}
                <motion.div
                  animate={isInView ? { opacity: 0, scale: 1 } : {}}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 blur-sm transition-all duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                {/* Main Circle */}
                <motion.div
                  className="relative mx-auto flex size-28 flex-col items-center justify-center rounded-full border-4 border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 transition-all duration-300 group-hover:border-amber-300"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <motion.span
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    className="text-3xl font-bold text-amber-600"
                    initial={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {item.value}
                  </motion.span>
                </motion.div>
                {/* Icon Badge */}
                <motion.div
                  animate={isInView ? { scale: 1 } : {}}
                  className="absolute -right-1 -bottom-1 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg"
                  initial={{ scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, stiffness: 200, type: "spring" }}
                  whileHover={{ rotate: 360 }}
                >
                  {item.icon}
                </motion.div>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
