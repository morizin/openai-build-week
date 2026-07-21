import type { Metadata } from "next";
import { LmsProviders } from "@/features/lms/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProofPath — Verify understanding",
  description: "An evidence-first mastery loop for learners and instructors.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LmsProviders>{children}</LmsProviders>
      </body>
    </html>
  );
}
