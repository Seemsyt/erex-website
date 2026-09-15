import { useState, useEffect } from 'react';
import { Smartphone, Download, Server, Cpu, Shield, HelpCircle, Menu, X, Globe, Sparkles, FileText, ShieldCheck } from 'lucide-react';
import { ANDROID_APK_URL, APK_VERSION } from '../data';

interface NavbarProps {
  onOpenLegal?: (docId?: string) => void;
  onOpenPricing?: () => void;
}

export default function Navbar({ onOpenLegal, onOpenPricing }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLegalClick = () => {
    setMobileMenuOpen(false);
    if (onOpenLegal) {
      onOpenLegal('terms');
    }
  };

  const handlePricingClick = () => {
    setMobileMenuOpen(false);
    if (onOpenPricing) {
      onOpenPricing();
    } else {
      scrollToSection('pricing');
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090b10]/90 backdrop-blur-md border-b border-emerald-500/20 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="brand-logo-link"
          className="flex items-center gap-3 group cursor-pointer text-left"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0d121c] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors" />
              {/* Isometric Minecraft cube icon */}
              <div className="relative w-5 h-5 flex items-center justify-center font-mono font-black text-emerald-400 text-sm tracking-tighter">
                ⛏
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                EREX
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                HOST
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Minecraft Node Platform
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            id="nav-features-btn"
            onClick={() => scrollToSection('features')}
            className="px-3 py-2 text-sm text-slate-300 hover:text-emerald-400 font-medium rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            id="nav-app-btn"
            onClick={() => scrollToSection('mobile-app')}
            className="px-3 py-2 text-sm text-slate-300 hover:text-emerald-400 font-medium rounded-lg hover:bg-slate-800/40 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Mobile App</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              APK
            </span>
          </button>
          <button
            id="nav-performance-btn"
            onClick={() => scrollToSection('performance')}
            className="px-3 py-2 text-sm text-slate-300 hover:text-emerald-400 font-medium rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            Hardware
          </button>
          <button
            id="nav-nodes-btn"
            onClick={() => scrollToSection('nodes')}
            className="px-3 py-2 text-sm text-slate-300 hover:text-emerald-400 font-medium rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            Locations
          </button>
          <button
            id="nav-pricing-btn"
            onClick={handlePricingClick}
            className="px-3 py-2 text-sm text-slate-300 hover:text-emerald-400 font-medium rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            Pricing & Plans
          </button>
          <button
            id="nav-faq-btn"
            onClick={() => scrollToSection('faq')}
            className="px-3 py-2 text-sm text-slate-300 hover:text-emerald-400 font-medium rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button
            id="nav-policies-btn"
            onClick={handleLegalClick}
            className="px-3 py-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium rounded-lg hover:bg-emerald-950/30 border border-emerald-500/20 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Policies & Terms</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Primary APK Download Action */}
          <a
            id="nav-apk-download-btn"
            href={ANDROID_APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="EREX-app-release.apk"
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-900/30 hover:shadow-emerald-500/25 transition-all duration-200 border border-emerald-400/30"
          >
            <Download className="w-4 h-4 text-emerald-100 group-hover:translate-y-0.5 transition-transform" />
            <span>Download APK</span>
            <span className="hidden lg:inline-block text-[11px] px-1.5 py-0.5 rounded bg-black/30 font-mono text-emerald-200">
              {APK_VERSION}
            </span>
          </a>

          <button
            id="nav-plans-btn"
            onClick={handlePricingClick}
            className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white text-xs sm:text-sm font-medium border border-slate-700/60 transition-colors cursor-pointer"
          >
            Plans ($5–$10/mo)
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={ANDROID_APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
            title="Download APK"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/50 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#0e1420]/95 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <button
            onClick={() => scrollToSection('features')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
          >
            Features & Capabilities
          </button>
          <button
            onClick={() => scrollToSection('mobile-app')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60 hover:text-emerald-400 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              EREX Android App
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
              v1.0.0
            </span>
          </button>
          <button
            onClick={() => scrollToSection('performance')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
          >
            Hardware & DDoS Shield
          </button>
          <button
            onClick={() => scrollToSection('nodes')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
          >
            Global Node Network
          </button>
          <button
            onClick={handlePricingClick}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
          >
            Server Plans & Pricing (2GB $5, 4GB $10, 8GB $20)
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
          >
            Frequently Asked Questions
          </button>
          <button
            onClick={handleLegalClick}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 hover:bg-emerald-900/30 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Policies, Terms & Licenses
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
              7 Docs
            </span>
          </button>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="EREX-app-release.apk"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-center text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Android APK (v1.0.0)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
