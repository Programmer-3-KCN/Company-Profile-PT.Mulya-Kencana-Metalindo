"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { FC, ReactElement, useEffect, useRef, useState } from "react";

// Smooth Scroll Function
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const navHeight = 80; // Navigation height offset
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navHeight;

    window.scrollTo({
      behavior: "smooth",
      top: offsetPosition,
    });
  }
};

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, y: 0 },
};

// const fadeInDown: Variants = {
//   hidden: { opacity: 0, y: -30 },
//   visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, y: 0 },
// };

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, x: 0 },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, x: 0 },
};

// const scaleIn: Variants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
// };

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }, y: 0 },
};

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

// Navigation Component
const Navigation: FC = (): ReactElement => {
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
          className="flex items-center gap-3"
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image alt="Logo" className="h-10 w-auto md:h-12" height={50} src="/assets/images/logos/logo.png" width={50} />
          <span className={`text-lg font-bold transition-colors md:text-xl ${isScrolled ? "text-amber-700" : "text-amber-800"}`}>
            PT Mulya Kencana Metalindo
          </span>
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
          className={`rounded-lg p-2 transition-colors lg:hidden ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-800 hover:bg-white/20"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      scrollToSection(e, targetId);
                      setIsMenuOpen(false);
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

// Hero Section
const HeroSection: FC = (): ReactElement => {
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

// About Section
const AboutSection: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <section className="relative overflow-hidden bg-white py-24" id="about-us" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 size-72 -translate-1/2 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div animate={isInView ? "visible" : "hidden"} className="order-2 lg:order-1" initial="hidden" variants={fadeInLeft}>
            <motion.span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700" variants={fadeInUp}>
              Tentang Kami
            </motion.span>
            <motion.h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl" variants={fadeInUp}>
              PT Mulya Kencana
              <span className="block text-amber-600">Metalindo</span>
            </motion.h2>
            <motion.p className="mt-6 text-lg leading-relaxed text-gray-600" variants={fadeInUp}>
              PT Mulya Kencana Metalindo adalah perusahaan swasta nasional yang berdedikasi dalam bidang manufaktur dan distribusi bahan bangunan.
              Berawal dari semangat untuk memberikan kontribusi nyata bagi industri konstruksi tanah air, kami telah tumbuh menjadi mitra strategis
              bagi berbagai proyek pembangunan mulai dari skala retail hingga infrastruktur.
            </motion.p>

            <motion.div className="mt-8 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-6" variants={fadeInUp}>
              <div className="flex items-start gap-4">
                <motion.div
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white"
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 360 }}
                >
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Sejarah & Filosofi</h3>
                  <p className="mt-2 text-gray-600">
                    Didirikan pada tahun 1993 di Bandung, nama &quot;Kencana&quot; diambil dari simbol kereta kencana yang melambangkan kendaraan
                    terhormat. Filosofi ini mencerminkan komitmen kami untuk senantiasa bergerak maju dengan cara yang terhormat.
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
                  <Image alt="Company Logo" className="w-3/4 drop-shadow-lg" height={300} src="/assets/images/logos/logo.png" width={300} />
                </motion.div>
              </div>
            </motion.div>
            {/* Floating Card */}
            <motion.div
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              className="absolute -bottom-6 -left-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
              initial={{ opacity: 0, x: -50, y: 50 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  className="flex size-12 items-center justify-center rounded-full bg-green-100"
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="size-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">30+</div>
                  <div className="text-sm text-gray-500">Tahun Berpengalaman</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Vision Mission Section
const VisionMissionSection: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <section className="relative overflow-hidden bg-gray-900 py-24" ref={ref}>
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

      <div className="relative container mx-auto px-6 lg:px-12">
        <motion.div animate={isInView ? "visible" : "hidden"} className="mb-16 text-center" initial="hidden" variants={fadeInUp}>
          <span className="inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-semibold text-amber-400">Visi & Misi</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Arah dan Tujuan Kami</h2>
        </motion.div>

        <motion.div animate={isInView ? "visible" : "hidden"} className="grid gap-8 lg:grid-cols-2" initial="hidden" variants={staggerContainer}>
          {/* Visi Card */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-white/10"
            variants={staggerItem}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-amber-500/20 blur-2xl transition-all group-hover:bg-amber-500/30" />
            <div className="relative">
              <motion.div
                className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
                transition={{ duration: 0.5 }}
                whileHover={{ rotate: 360, scale: 1.1 }}
              >
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </motion.div>
              <h3 className="mb-4 text-2xl font-bold text-white">Visi</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                &quot;Menjadi perusahaan distribusi bahan bangunan terdepan di Indonesia yang dikenal karena kualitas produk, inovasi layanan, dan
                integritas bisnis.&quot;
              </p>
            </div>
          </motion.div>

          {/* Misi Card */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-white/10"
            variants={staggerItem}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-orange-500/20 blur-2xl transition-all group-hover:bg-orange-500/30" />
            <div className="relative">
              <motion.div
                className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
                transition={{ duration: 0.5 }}
                whileHover={{ rotate: 360, scale: 1.1 }}
              >
                <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </motion.div>
              <h3 className="mb-4 text-2xl font-bold text-white">Misi</h3>
              <ul className="space-y-4">
                {[
                  "Menyediakan produk konstruksi berkualitas tinggi yang memenuhi standar keamanan dan ketahanan.",
                  "Membangun jaringan distribusi yang efisien dan menjangkau seluruh pelosok daerah.",
                  "Memberikan solusi terbaik dan layanan purna jual yang prima bagi setiap pelanggan.",
                  "Mengembangkan potensi SDM dan teknologi untuk pertumbuhan berkelanjutan.",
                ].map((item, index) => (
                  <motion.li
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    key={index}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-400">
                      {index + 1}
                    </span>
                    <span className="text-gray-300">{item}</span>
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

// Products Section
const ProductsSection: FC = (): ReactElement => {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24" id="products" ref={ref}>
      {/* Decorative */}
      <motion.div
        animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
        className="absolute top-1/2 right-0 size-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/50 blur-3xl"
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      />

      <div className="relative container mx-auto px-6 lg:px-12">
        <motion.div animate={isInView ? "visible" : "hidden"} className="mx-auto mb-16 max-w-2xl text-center" initial="hidden" variants={fadeInUp}>
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">Produk & Layanan</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Solusi Konstruksi Terpadu</h2>
          <p className="mt-4 text-lg text-gray-600">Kami menyediakan berbagai produk berkualitas untuk memenuhi kebutuhan konstruksi Anda</p>
        </motion.div>

        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          variants={staggerContainer}
        >
          {products.map((product, index) => (
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/10"
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
                  className="mb-5 inline-flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 transition-all duration-300 group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/30"
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                >
                  {product.icon}
                </motion.div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUsSection: FC = (): ReactElement => {
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

// Careers Section
const CareersSection: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <section className="relative overflow-hidden py-24" id="careers" ref={ref}>
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

      <div className="relative container mx-auto px-6 text-center lg:px-12">
        <motion.div animate={isInView ? "visible" : "hidden"} initial="hidden" variants={fadeInUp}>
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">Karir</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Bergabung Bersama Kami</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Kami selalu mencari individu berbakat dan berdedikasi untuk bergabung dalam tim kami. Jadilah bagian dari perjalanan kami membangun
            Indonesia.
          </p>
        </motion.div>

        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-amber-600 shadow-xl transition-all hover:shadow-2xl"
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Kirim CV
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection: FC = (): ReactElement => {
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
        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      label: "Instagram",
      link: "https://instagram.com/mulyakencanametalindo",
      value: "@mulyakencanametalindo",
    },
    {
      icon: (
        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      label: "LinkedIn",
      link: "https://linkedin.com/company/pt-mulya-kencana-metalindo",
      value: "PT Mulya Kencana Metalindo",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24" id="contact" ref={ref}>
      {/* Decorative */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        className="absolute bottom-0 left-0 size-72 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-100/50 blur-3xl"
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative container mx-auto px-6 lg:px-12">
        <motion.div animate={isInView ? "visible" : "hidden"} className="mx-auto mb-16 max-w-2xl text-center" initial="hidden" variants={fadeInUp}>
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">Kontak</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Hubungi Kami</h2>
          <p className="mt-4 text-lg text-gray-600">Kami siap membantu Anda dengan kebutuhan material konstruksi</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div animate={isInView ? "visible" : "hidden"} className="space-y-4 lg:col-span-2" initial="hidden" variants={staggerContainer}>
            {contactInfo.map((info, index) => (
              <motion.div
                className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-amber-200 hover:shadow-md"
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <motion.div
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 transition-all group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white"
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 360 }}
                >
                  {info.icon}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900">{info.label}</h4>
                  {info.link ? (
                    <a
                      className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
                      href={info.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="overflow-hidden rounded-3xl border border-gray-200 shadow-xl lg:col-span-3"
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <iframe
              allowFullScreen
              className="w-full"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7985!2d107.5766!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMDMuMCJTIDEwN8KwMzQnMzUuOCJF!5e0!3m2!1sen!2sid!4v1234567890"
              style={{ border: 0 }}
              title="Lokasi PT Mulya Kencana Metalindo"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Section
const FooterSection: FC = (): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px", once: true });

  return (
    <footer className="bg-gray-900 pt-16 pb-8" ref={ref}>
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="container mx-auto px-6 lg:px-12"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main Footer */}
        <div className="grid gap-8 pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <a className="flex items-center gap-3" href="#home" onClick={(e) => scrollToSection(e, "home")}>
              <Image alt="Logo" className="h-12 w-auto brightness-0 invert" height={50} src="/assets/images/logos/logo.png" width={50} />
              <span className="text-xl font-bold text-white">PT Mulya Kencana Metalindo</span>
            </a>
            <p className="mt-4 max-w-md text-gray-400">
              Perusahaan distribusi bahan bangunan terpercaya sejak 1993. Menyediakan solusi konstruksi berkualitas untuk membangun Indonesia.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
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
                  className="flex size-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-amber-500 hover:text-white"
                  href={social.href}
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div animate={isInView ? { opacity: 1, y: 0 } : {}} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Products", "Why Choose Us", "Careers", "Contact"].map((link, index) => {
                const targetId = link.toLowerCase().replace(/\s+/g, "-");
                return (
                  <motion.li
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    initial={{ opacity: 0, x: -10 }}
                    key={link}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <motion.a
                      className="text-gray-400 transition-colors hover:text-amber-500"
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
          <motion.div animate={isInView ? { opacity: 1, y: 0 } : {}} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <h3 className="mb-4 font-semibold text-white">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 size-5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                Jl. Terusan Pasir Koja No. 109B, Bandung
              </li>
              <li className="flex items-center gap-2">
                <svg className="size-5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                info@mulyakencanametalindo.com
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          animate={isInView ? { opacity: 1 } : {}}
          className="border-t border-gray-800 pt-8"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} PT Mulya Kencana Metalindo. All rights reserved.</p>
            <p className="text-sm text-gray-500">Building Indonesia Since 1993</p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp: FC = (): ReactElement => (
  <motion.a
    animate={{ opacity: 1, scale: 1 }}
    className="fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl"
    href="https://wa.me/6281234567890"
    initial={{ opacity: 0, scale: 0 }}
    rel="noopener noreferrer"
    target="_blank"
    title="Chat via WhatsApp"
    transition={{ delay: 1.5, stiffness: 200, type: "spring" }}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.svg
      animate={{ rotate: [0, 10, -10, 0] }}
      className="size-7"
      fill="currentColor"
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      viewBox="0 0 24 24"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </motion.svg>
  </motion.a>
);

// Main Content Component
export const Content: FC = (): ReactElement => (
  <section className="min-h-screen scroll-smooth">
    <Navigation />
    <HeroSection />
    <AboutSection />
    <VisionMissionSection />
    <ProductsSection />
    <WhyChooseUsSection />
    <CareersSection />
    <ContactSection />
    <FooterSection />
    <FloatingWhatsApp />
  </section>
);
