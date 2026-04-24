import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vital AI | ReserveDaily",
  description:
    "Upload your blood test report and receive AI-powered health analysis with personalised wellness recommendations.",
};

export default function VitalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
