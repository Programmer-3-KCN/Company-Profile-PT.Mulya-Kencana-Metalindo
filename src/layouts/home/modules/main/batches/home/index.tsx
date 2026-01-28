"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FC, ReactElement, useEffect, useRef, useState } from "react";

import { scrollToSection } from "../../../nav/batches/content";
import { staggerContainer, staggerItem } from "../shared";

// CountUp Component
interface CountUpProps {
  duration?: number;
  end: number;
  suffix?: string;
}

const CountUp: FC<CountUpProps> = ({ duration = 2, end, suffix = "" }): ReactElement => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px", once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);

        // Easing function (easeOutExpo)
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(easeOutExpo * end);

        setCount(currentCount);

        if (now < endTime) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Hero Section
export const Content: FC = (): ReactElement => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ offset: ["start start", "end start"], target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100"
      id="home"
      ref={ref}
    >
      {/* Decorative Elements with Parallax */}
      <motion.div className="absolute top-0 right-0 size-96 rounded-full bg-amber-200/30 blur-3xl" style={{ y }} />
      <motion.div className="absolute bottom-0 left-0 size-96 rounded-full bg-orange-200/30 blur-3xl" style={{ y }} />
      <div className="absolute inset-0 bg-[url('/assets/images/project/hero-pattern.png')] opacity-5" />

      <motion.div className="relative z-10 container mx-auto px-6 pt-20 text-center lg:px-12" style={{ opacity }}>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100/80 px-4 py-2 text-sm font-medium text-amber-700 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
          </span>
          Sejak 1993 Melayani Indonesia
        </motion.div>
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-4xl leading-tight font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Solusi Terpercaya
          <motion.span
            animate={{ opacity: 1, scale: 1 }}
            className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Distribusi Bahan Bangunan
          </motion.span>
          Berkualitas
        </motion.h1>
        <motion.p
          animate={{ opacity: 1 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Menghadirkan material konstruksi terbaik dengan layanan distribusi yang handal untuk membangun masa depan Indonesia.
        </motion.p>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.a
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg shadow-amber-500/30"
            href="#products"
            onClick={(e) => scrollToSection(e, "products")}
            whileHover={{ boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Produk Kami
            <motion.svg className="size-5" fill="none" initial={{ x: 0 }} stroke="currentColor" viewBox="0 0 24 24" whileHover={{ x: 5 }}>
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </motion.svg>
          </motion.a>
          <motion.a
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white/80 px-8 py-4 font-semibold text-gray-700 backdrop-blur-sm transition-all"
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            whileHover={{ borderColor: "#f59e0b", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Hubungi Kami
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div animate="visible" className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8" initial="hidden" variants={staggerContainer}>
          {[
            { end: 30, label: "Tahun Pengalaman", suffix: "+" },
            { end: 500, label: "Mitra Bisnis", suffix: "+" },
            { end: 1000, label: "Proyek Selesai", suffix: "+" },
          ].map((stat) => (
            <motion.div className="text-center" key={stat.label} variants={staggerItem}>
              <motion.div
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-amber-600 md:text-4xl"
                initial={{ scale: 0 }}
                transition={{ delay: 0.8, stiffness: 200, type: "spring" }}
              >
                <CountUp duration={2.5} end={stat.end} suffix={stat.suffix} />
              </motion.div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.a
          animate={{ y: [0, 10, 0] }}
          className="flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-amber-500"
          href="#about-us"
          onClick={(e) => scrollToSection(e, "about-us")}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
};
