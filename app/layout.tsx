import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ResilienceProvider } from "@/lib/context/ResilienceContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
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
      className={`${instrumentSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="h-screen bg-[#0B0D0E] text-[#E8E5DD] font-sans antialiased overflow-hidden selection:bg-[#23282A] selection:text-[#E8E5DD]">
        <ResilienceProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-mission-grid">
              <Header />
              <div className="flex-1 flex flex-col">{children}</div>
            </div>
          </div>
        </ResilienceProvider>
      </body>
    </html>
  );
}
