import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmartQuotation — Pool quotations",
  description: "Professional quotations for swimming pool construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
