import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ResilienceProvider } from "@/lib/context/ResilienceContext";
<<<<<<< HEAD
import AppShell from "@/components/AppShell";
=======
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
>>>>>>> upstream/main

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resilience Autopilot | Enterprise Decision & Resilience Control System",
  description:
    "Autonomous agentic supply-chain platform continuously rehearsing multi-horizon disruptions and executing validated recovery playbooks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="cupcake"
      className={`${plusJakartaSans.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
<<<<<<< HEAD
      <body className="font-sans antialiased bg-base-100 text-base-content">
        <ResilienceProvider>
          <AppShell>{children}</AppShell>
=======
      <body className="h-screen font-sans antialiased overflow-hidden bg-base-100 text-base-content">
        <ResilienceProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-mission-grid bg-base-100">
              <Header />
              <div className="flex-1 flex flex-col">{children}</div>
            </div>
          </div>
>>>>>>> upstream/main
        </ResilienceProvider>
      </body>
    </html>
  );
}
