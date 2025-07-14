"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "App", href: "#app" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId.replace("#", ""));
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const Navbar = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/signup");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white px-4 py-4 flex justify-between items-center border-b border-gray-100">
      {/* Left - Logo */}
      <div className="flex-1">
  <Link href="/" className="inline-block">
    <img
      src="/logo.png"
      alt="SoulYatri Logo"
      className="h-10 w-auto"
    />
  </Link>
</div>


      {/* Center - Navigation */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex space-x-6 lg:space-x-8">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => smoothScrollTo(item.href)}
              className="text-black hover:text-[#FF7B00] font-medium transition-colors duration-200 px-3 py-2 text-sm lg:text-base"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right - Buttons */}
      <div className="flex-1 flex justify-end space-x-2 md:space-x-4">
  <Link href="/signup">
    <button className="bg-white text-[#FF7B00] hover:bg-gray-50 px-3 md:px-4 py-2 rounded-[40px] text-xs md:text-sm border-2 border-[#FF7B00]  font-medium transition-colors">
      Sign Up
    </button>
  </Link>
  <button
    onClick={handleGetStarted}
    className="bg-[#18A2B8]  hover:from-[#e66a00] hover:to-[#1591a3] text-white px-3 md:px-4 py-2 rounded-[40px] text-xs md:text-sm font-medium transition-all"
  >
    Get Started
  </button>
</div>


      {/* Mobile Menu Placeholder */}
      <div className="md:hidden ml-4">{/* Add hamburger if needed */}</div>
    </nav>
  );
};

export default Navbar;