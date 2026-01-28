"use client";

import { motion, useInView } from "framer-motion";
import { FC, ReactElement, useRef } from "react";

import { fadeInUp, staggerContainer, staggerItem } from "../shared";

// Products Section
export const Content: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  const products = [
    {
      description: "Menyediakan berbagai tipe baja ringan (Truss & Reng) berkualitas tinggi dengan standar SNI.",
      icon: (
        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
      ),
      title: "Baja Ringan & Rangka Atap",
    },
    {
      description: "Genteng metal dan atap inovatif yang tahan terhadap cuaca ekstrem.",
      icon: (
        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
      ),
      title: "Penutup Atap (Roofing)",
    },
    {
      description: "Komponen pendukung bangunan lainnya untuk solusi konstruksi terpadu.",
      icon: (
        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        </svg>
      ),
      title: "Aksesoris Konstruksi",
    },
    {
      description: "Dukungan logistik yang cepat dan tepat waktu ke seluruh mitra retail dan proyek.",
      icon: (
        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        </svg>
      ),
      title: "Layanan Distribusi",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12 sm:py-24" id="products" ref={ref}>
      {/* Decorative */}
      <motion.div
        animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
        className="absolute top-1/2 right-0 size-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/50 blur-3xl"
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-16"
          initial="hidden"
          variants={fadeInUp}
        >
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 sm:px-4 sm:py-1.5 sm:text-sm">
            Produk & Layanan
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Solusi Konstruksi Terpadu
          </h2>
          <p className="mt-3 text-sm text-gray-600 sm:mt-4 sm:text-lg">
            Kami menyediakan berbagai produk berkualitas untuk memenuhi kebutuhan konstruksi Anda
          </p>
        </motion.div>

        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          initial="hidden"
          variants={staggerContainer}
        >
          {products.map((product, index) => (
            <motion.div
              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/10 sm:rounded-2xl sm:p-6"
              key={index}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <motion.div
                className="absolute top-0 right-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-amber-500/10 transition-all duration-300 group-hover:bg-amber-500/20"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
              />
              <div className="relative">
                <motion.div
                  className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 transition-all duration-300 group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/30 sm:mb-5 sm:size-14 sm:rounded-xl"
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                >
                  {product.icon}
                </motion.div>
                <h3 className="mb-2 text-base font-bold text-gray-900 sm:mb-3 sm:text-lg">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
