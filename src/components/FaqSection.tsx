import { useState } from 'react';
import { HelpCircle, ChevronDown, Smartphone, ShieldCheck, Zap, Download } from 'lucide-react';
import { FAQ_ITEMS, ANDROID_APK_URL, APK_VERSION } from '../data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#090d16]"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ANSWERS ON DEMAND</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about EREX hosting and our Android mobile app.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors overflow-hidden ${
                  isOpen
                    ? 'bg-[#0d1320] border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                    : 'bg-[#0b0f19] border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white text-base sm:text-lg leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-emerald-500/20 text-emerald-400 rotate-180'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    <p>{item.answer}</p>
                    {item.category === 'Mobile App' && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-3">
                        <a
                          href={ANDROID_APK_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          download="EREX-app-release.apk"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download APK ({APK_VERSION})</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
