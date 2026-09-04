import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import SiteMotion from "./components/marketing/SiteMotion";
import { PastelProvider } from "./components/marketing/pastelHeading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  variable: "--font-hero",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Adhyagnan — Observatory software for exoplanets",
  description: "Dark-space observatory software for Kepler, K2, and TESS. Dual agents, NASA archives, and published F1 scores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} ${interTight.variable} antialiased`}>
        <PastelProvider>
          <SiteMotion />
          {children}
        </PastelProvider>
      </body>
    </html>
  );
}
