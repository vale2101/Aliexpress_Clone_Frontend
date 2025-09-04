import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "../components/organisms/Navbar";
import CategoriesBar from "../components/organisms/CategoryBar";
import Footer from "../components/organisms/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AliExpress Clone",
  description: "Frontend only",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <CategoriesBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
