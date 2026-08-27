"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Clapperboard,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Tv,
  Layers,
  HelpCircle,
  Play,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Recursos", href: "#recursos", icon: Layers },
    { label: "Palco de Cinema", href: "#cinema", icon: Tv },
    { label: "vs Discord Nitro", href: "#comparativo", icon: Zap },
    { label: "Playground 60 FPS", href: "#playground", icon: Play },
    { label: "FAQ", href: "#faq", icon: HelpCircle },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0E0F12]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-x-3 group">
          <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-[#5865F2] to-[#7983F5] text-white shadow-lg shadow-[#5865F2]/25 group-hover:scale-105 transition-transform">
            <Clapperboard className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#23A55A] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#23A55A] border-2 border-[#0E0F12]" />
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans group-hover:text-white transition-colors">
                CONCORD
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#5865F2]/20 text-[#8E97FF] border border-[#5865F2]/40">
                60 FPS SFU
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium tracking-wide -mt-0.5">
              Watch Party & Cinema
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-x-1 lg:gap-x-2 bg-[#1A1C23]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors flex items-center gap-x-1.5"
            >
              <link.icon className="h-3.5 w-3.5 text-zinc-400" />
              {link.label}
            </a>
          ))}
        </nav>

        {/* Auth CTA Buttons */}
        <div className="hidden sm:flex items-center gap-x-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5"
              >
                Entrar
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                size="sm"
                className="text-xs font-bold bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865F2]/30 rounded-xl px-4 py-2 flex items-center gap-x-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Criar Conta Grátis
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/setup">
              <Button
                size="sm"
                className="text-xs font-bold bg-[#23A55A] hover:bg-[#1C8B4C] text-white shadow-lg shadow-[#23A55A]/25 rounded-xl px-4 py-2 flex items-center gap-x-1.5"
              >
                <span>Abrir Concord</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-x-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-800/80 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#12141A]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-200 hover:text-white px-3 py-2.5 rounded-lg hover:bg-white/5 flex items-center gap-x-2.5"
              >
                <link.icon className="h-4 w-4 text-[#5865F2]" />
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-y-2">
            <SignedOut>
              <Link href="/sign-in" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-xs font-semibold border-zinc-700 text-zinc-200">
                  Entrar na Conta
                </Button>
              </Link>
              <Link href="/sign-up" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full text-xs font-bold bg-[#5865F2] hover:bg-[#4752C4] text-white">
                  Criar Conta Gratuita
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/setup" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full text-xs font-bold bg-[#23A55A] hover:bg-[#1C8B4C] text-white flex items-center justify-center gap-x-2">
                  <span>Ir para o Concord App</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
};
