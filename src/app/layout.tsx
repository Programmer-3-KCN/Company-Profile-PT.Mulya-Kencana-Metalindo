import type { Metadata } from "next";

import { FC, PropsWithChildren, ReactElement } from "react";

import { APIConnectionChecker } from "../components";
import { NextAuthProvider, NextThemesProvider, ReactQueryProvider } from "../libs";
import { geistMono, geistSans, inter, roboto } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  authors: [{ name: "Gede Dewo Wahyu M.W", url: "https://github.com/gdwmw" }],
  category: "Distributor Bahan Bangunan",
  creator: "PT. Mulya Kencana Metalindo",
  publisher: "PT. Mulya Kencana Metalindo",
  referrer: "strict-origin-when-cross-origin",
  title: {
    default: "PT. Mulya Kencana Metalindo",
    template: "PT. Mulya Kencana Metalindo | %s",
  },
};

type T = Readonly<PropsWithChildren>;

const RootLayout: FC<T> = (props): ReactElement => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} font-inter bg-gray-100 antialiased dark:bg-gray-900`}
    >
      <NextThemesProvider>
        <ReactQueryProvider>
          <NextAuthProvider>
            {props.children}
            {(process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_EXAMPLE_MODE === "true") && <APIConnectionChecker />}
          </NextAuthProvider>
        </ReactQueryProvider>
      </NextThemesProvider>
    </body>
  </html>
);

export default RootLayout;
