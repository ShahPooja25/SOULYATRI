"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Hume/Nav";
import Footer from "@/components/footer";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isChat = pathname === "/chat";

  return (
    <>
      {!isChat && <Navbar />}
      <main className={`flex-grow ${!isHome ? "pt-[64px]" : ""}`}>
        {children}
      </main>
      {!isChat && <Footer />}
    </>
  );
}
