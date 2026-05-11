import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartQuotation — Pool quotations",
  description: "Professional quotations for swimming pool construction",
};

import Navbar from "@/components/Navbar";
import { GoogleProvider } from "@/components/providers/GoogleProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleProvider>
          <Navbar />
          {children}
        </GoogleProvider>
      </body>
    </html>
  );
}
 
