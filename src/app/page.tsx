import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import HomeLayout from "../layouts/home";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  description:
    "PT. Mulya Kencana Metalindo - Perusahaan distribusi bahan bangunan. Menyediakan baja ringan, rangka atap, genteng metal, dan aksesoris konstruksi berkualitas SNI.",
  keywords: ["PT. Mulya Kencana Metalindo", "Bandung", "Indonesia"],
  openGraph: {
    description:
      "PT. Mulya Kencana Metalindo - Perusahaan distribusi bahan bangunan. Menyediakan baja ringan, rangka atap, genteng metal, dan aksesoris konstruksi berkualitas SNI.",
    images: [
      {
        alt: "PT. Mulya Kencana Metalindo",
        height: 800,
        url: "https://pt-mulya-kencana-metalindo.vercel.app/assets/images/logos/PTMKM.png", // Must be an absolute URL and PNG format
        width: 800,
      },
    ],
    locale: "id_ID",
    siteName: "PT. Mulya Kencana Metalindo",
    title: "PT. Mulya Kencana Metalindo | Distributor Bahan Bangunan Terpercaya",
    type: "website",
    url: "https://pt-mulya-kencana-metalindo.vercel.app/",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      noimageindex: false,
    },
    index: true,
    nocache: false,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mulyakencanametalindo",
    description:
      "PT. Mulya Kencana Metalindo - Perusahaan distribusi bahan bangunan. Menyediakan baja ringan, rangka atap, genteng metal, dan aksesoris konstruksi berkualitas SNI.",
    images: ["https://pt-mulya-kencana-metalindo.vercel.app/assets/images/logos/PTMKM.png"], // Must be an absolute URL and PNG format
    title: "PT. Mulya Kencana Metalindo | Distributor Bahan Bangunan Terpercaya",
  },
};

const HomePage: FC = (): ReactElement => <HomeLayout />;

export default HomePage;
