import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" });

export const metadata: Metadata = {
  title: "Quantum Storytelling",
  description: "A theoretical framework for deeply personalized narrative generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${crimson.variable} font-sans bg-paper-texture antialiased`}>{children}</body>
    </html>
  );
}
