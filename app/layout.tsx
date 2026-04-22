import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: "normal",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReserveDaily, Reserve Your Path to Wellness",
  description:
    "Malaysia's curated wellness marketplace. Book vetted treatments, check your health with Vital AI, and shop doctor-certified supplements.",
  openGraph: {
    title: "ReserveDaily, Reserve Your Path to Wellness",
    description:
      "Vetted providers, clinical-grade exosomes, concierge booking, your integrated wellness journey in one place.",
    url: "https://reservedaily.com",
    siteName: "ReserveDaily",
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReserveDaily, Reserve Your Path to Wellness",
    description:
      "Malaysia's curated wellness marketplace, vetted clinics, regenerative medicine, and doctor-certified supplements.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a2659",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
