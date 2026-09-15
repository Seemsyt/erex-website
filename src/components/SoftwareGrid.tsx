import { useState } from 'react';
import { Layers, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SOFTWARE_LIST } from '../data';

export default function SoftwareGrid() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Vanilla / Optimized' | 'Modded' | 'Bedrock'>('All');

  const filtered = selectedFilter === 'All'
    ? SOFTWARE_LIST
    : SOFTWARE_LIST.filter(s => s.category.includes(selectedFilter) || s.category === selectedFilter);

  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#070a10] border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>ONE-CLICK SOFTWARE DEPLOYMENT</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Run Any Minecraft Flavor Without Hassle
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Switch between server jars in 1 click. EREX manages Java runtimes (Java 8, 17, 21, and 23)
            and applies optimized Aikar flags automatically.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {(['All', 'Vanilla / Optimized', 'Modded', 'Bedrock'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Software Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-[#0d1320] border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-bold">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {item.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 text-xs">
                <div className="text-slate-500 mb-1">Recommended for:</div>
                <div className="text-slate-200 font-medium">{item.recommendedFor}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
