import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ResilienceProvider } from "@/lib/context/ResilienceContext";
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
      <body className="min-h-screen bg-[#0B0D0E] text-[#E8E5DD] flex flex-col font-sans antialiased selection:bg-[#292E2F] selection:text-[#E8E5DD]">
        <ResilienceProvider>
          <Header />
          <main className="flex-1 bg-mission-grid flex flex-col">{children}</main>
          
          {/* Subtle Industrial Footer */}
          <footer className="border-t border-[#292E2F] bg-[#0B0D0E] px-4 py-2 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5F6564]">
            <div className="flex items-center space-x-3">
              <span className="text-[#9A9C97]">RESILIENCE AUTOPILOT v2.4</span>
              <span>//</span>
              <span className="italic text-[#9A9C97]">"Prediction is not the outcome. Preparedness is."</span>
            </div>
            <div className="flex items-center space-x-3 mt-1 sm:mt-0">
              <span className="border border-[#292E2F] px-1.5 py-0.2 text-[#D6A84F] bg-[#111416]">
                DEMO SCENARIO: SHANGHAI PORT (ILLUSTRATIVE)
              </span>
              <span>SECURE OPERATIONAL CHANNEL</span>
            </div>
          </footer>
        </ResilienceProvider>
      </body>
    </html>
  );
}
