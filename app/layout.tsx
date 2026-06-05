import type { Metadata, Viewport } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reservedaily.ukaykhing.com"),
  title: "ReserveDaily, Reserve Your Path to Wellness",
  description:
    "Malaysia's curated wellness marketplace. Book vetted treatments, check your health with VitalNow AI, and shop doctor-certified supplements.",
  openGraph: {
    title: "ReserveDaily, Reserve Your Path to Wellness",
    description:
      "Vetted providers, clinical-grade exosomes, concierge booking, your integrated wellness journey in one place.",
    url: "https://reservedaily.ukaykhing.com",
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
    <html lang="en" className={`${figtree.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon-light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.png" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
