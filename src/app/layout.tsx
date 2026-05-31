import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ReduxProvider from "@/components/common/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import { Session } from "inspector/promises";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexton eCommerce",
  description:
    "A modern e-commerce platform built with Next.js, Tailwind CSS, and NextAuth for seamless user authentication. Explore our wide range of products, manage your orders, and enjoy a smooth shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} w-full flex justify-center items-center antialiased `}
      >
        <div className="w-full max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8">
          <SessionProvider>
            <ReduxProvider>
              <Header />
              <div>{children}</div>
              <Footer />
              <Toaster />
            </ReduxProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
