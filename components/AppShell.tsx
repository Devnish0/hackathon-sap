"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === "/homepage";

  if (isHomepage) {
    return (
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-brand-background">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-mission-grid bg-base-100">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
