import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carter Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <svg className="pointer-events-none cursor-none">
          <filter id="grainy">
            <feTurbulence type="turbulence" baseFrequency="0.5"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
          </filter>
        </svg>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
