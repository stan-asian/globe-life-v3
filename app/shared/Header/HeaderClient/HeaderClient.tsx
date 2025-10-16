"use client";
import Image from "next/image";
import { useState } from "react";
import { Facebook, Instagram, Music2, Linkedin, Menu, X } from "lucide-react";

export default function HeaderClient() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#00558C] border-b-1 border-white backdrop-blur-lg fixed z-100 w-full">
      <div className="max-w-[80rem] mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 md:gap-2">
            <div className="relative w-28 sm:w-40 md:w-56 lg:w-40">
              <Image
                src="/assets/image/logo/Logo-White.svg"
                alt="Logo"
                width={200}
                height={10}
              />
            </div>
            <span className="bg-gray-300 w-[1.5px] h-10" />
            <h1 className="text-gray-200 text-lg font-light">Agents</h1>
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center">
            <a
              href="/contact"
              className="ml-2 px-5 py-2 text-white border-1 border-white hover:bg-white/20 text-sm font-light rounded-lg uppercase tracking-widest transition-all"
            >
              Contact
            </a>
            {[
              { icon: <Facebook />, href: "https://facebook.com" },
              { icon: <Instagram />, href: "https://instagram.com" },
              { icon: <Music2 />, href: "https://tiktok.com" },
              { icon: <Linkedin />, href: "https://linkedin.com" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-all rounded-full"
              >
                {item.icon && (
                  <span className="w-5 h-5 text-white">{item.icon}</span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col items-center mt-3 gap-2 pb-3 border-t border-white/20 animate-fadeIn">
            <div className="flex gap-3 pt-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <Music2 className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>

            <a
              href="/contact"
              className="mt-2 px-4 py-2 border border-white text-white text-sm font-medium hover:bg-white hover:text-[#00558C] transition-all duration-200 rounded-full"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
