"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code, Shield, Clock, Info } from "lucide-react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href
      ? "text-gray-900 scale-110 font-semibold shadow-sm shadow-gray-400 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-lg transition-all duration-300"
      : "text-gray-600 hover:text-gray-900 hover:scale-105 hover:shadow-sm hover:shadow-gray-400 px-1 py-1 rounded-lg transition-all duration-300";

  return (
    <header className="py-6 px-4 md:px-8 border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
        
          <h1
            className={`${orbitron.className} text-3xl md:text-5xl font-bold tracking-wide bg-gradient-to-r from-gray-900 via-purple-700 to-blue-500 bg-clip-text text-transparent`}
          >
            PromptSmith
          </h1>
        </div>

        <nav className="flex gap-6 text-sm md:text-base font-medium">
          <Link
            href="/generate"
            className={`flex items-center gap-2 ${isActive("/generate")}`}
          >
            <Code className="w-6 h-6" /> Generator
          </Link>
         <Link href="/rules" className={isActive("/rules")}> <span className="material-icons align-middle mr-1">security</span> Firestore Rules </Link>
          <Link
            href="/history"
            className={`flex items-center gap-2 ${isActive("/history")}`}
          >
            <Clock className="w-5 h-5" /> History
          </Link>
          <Link
            href="/about"
            className={`flex items-center gap-2 ${isActive("/about")}`}
          >
            <Info className="w-5 h-5" /> About
          </Link>
        </nav>
      </div>
    </header>
  );
}
