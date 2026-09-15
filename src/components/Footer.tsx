import { Smartphone, Download, Github, Heart, Shield, Server, FileText, Scale, Lock, ExternalLink, Mail, Globe } from 'lucide-react';
import { ANDROID_APK_URL, ANDROID_REPO_URL, APK_VERSION, SUPPORT_EMAIL, PRIMARY_DOMAIN } from '../data';
import { REPO_DOCS_URL } from '../legalData';

interface FooterProps {
  onOpenLegal?: (docId?: string) => void;
  onOpenPricing?: () => void;
}

export default function Footer({ onOpenLegal, onOpenPricing }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDocClick = (e: React.MouseEvent, docId: string) => {
    e.preventDefault();
    if (onOpenLegal) {
      onOpenLegal(docId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenPricing) {
      onOpenPricing();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#05070c] border-t border-slate-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto">
        {/* Pre-footer Call to Action Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-[#0e1626] to-teal-950/70 border border-emerald-500/30 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Take Complete Control of Your Server
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Download the official EREX Android App today. Manage console logs, reboot nodes,
              and check live TPS from anywhere.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              id="footer-download-apk-btn"
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="EREX-app-release.apk"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all duration-200"
            >
              <Smartphone className="w-4 h-4 text-slate-950" />
              <span>Download Android APK ({APK_VERSION})</span>
              <Download className="w-4 h-4" />
            </a>

            <a
              href={REPO_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4 text-emerald-400" />
              <span>GitHub Docs & Code</span>
            </a>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-sm">
                ⛏
              </div>
              <span className="font-display font-black text-xl text-white">EREX</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                HOSTING
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              High-performance Minecraft node hosting platform powered by AWS EC2, Hetzner, and Contabo infrastructure,
              enterprise NVMe storage, and automated mobile app management.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 6 Global Nodes Operational • 99.99% SLA</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={REPO_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl w-fit"
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span>Repo: Seemsyt/EREX-Releases</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl w-fit"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{SUPPORT_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  Software & Modpacks
                </a>
              </li>
              <li>
                <a href="#mobile-app" className="hover:text-emerald-400 transition-colors">
                  EREX Mobile App
                </a>
              </li>
              <li>
                <a href="#performance" className="hover:text-emerald-400 transition-colors">
                  Hardware Specifications
                </a>
              </li>
              <li>
                <a href="#nodes" className="hover:text-emerald-400 transition-colors">
                  Global Locations & Ping
                </a>
              </li>
              <li>
                <button
                  onClick={handlePricingClick}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Server Plans (2GB $5, 4GB $10, 8GB $20)
                </button>
              </li>
              <li>
                <a 
                  href="#success" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = 'success';
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Payment Success Page (/success)</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policies Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Policies & Terms</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={(e) => handleDocClick(e, 'terms')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleDocClick(e, 'privacy')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleDocClick(e, 'aup')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Acceptable Use Policy (AUP)
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleDocClick(e, 'refund')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleDocClick(e, 'security')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Security & Vulnerability
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleDocClick(e, 'license-erex')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Software Licenses
                </button>
              </li>
            </ul>
          </div>

          {/* Android App & Source */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              App Releases
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={ANDROID_APK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Direct APK ({APK_VERSION})
                </a>
              </li>
              <li>
                <a
                  href={REPO_DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://raw.githubusercontent.com/Seemsyt/EREX-Releases/main/TERMS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors text-slate-500"
                >
                  Raw Markdown Source
                </a>
              </li>
              <li>
                <span className="text-slate-500">Min: Android 8.0 Oreo+</span>
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Support: {SUPPORT_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://${PRIMARY_DOMAIN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Web: {PRIMARY_DOMAIN}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-900 text-[11px] text-slate-400 space-y-3">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> EREX is not an official Minecraft product, and is neither approved by
            nor associated with Mojang Studios or Microsoft. Minecraft is a registered trademark of Mojang Synergies AB.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
            <div>
              © {new Date().getFullYear()} EREX Hosting Platform. All rights reserved. Version-controlled in{' '}
              <a
                href={REPO_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                Seemsyt/EREX-Releases
              </a>.
            </div>
            <button
              onClick={scrollToTop}
              className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

