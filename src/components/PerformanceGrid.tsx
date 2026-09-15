import { Cpu, Zap, Shield, HardDrive, Layers, RefreshCw, Server, ArrowUpRight } from 'lucide-react';

export default function PerformanceGrid() {
  return (
    <section
      id="performance"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#090d16] border-y border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>UNCOMPROMISING ARCHITECTURE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Built for Extreme Minecraft Workloads
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Minecraft server performance is strictly bottlenecked by single-core clock speeds, memory throughput,
            and disk I/O. That’s why EREX deploys across optimized enterprise infrastructure from AWS EC2, Hetzner, and Contabo.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Enterprise Cloud & Dedicated Infrastructure */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1320] border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
              High-Frequency Compute
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              AWS EC2 • Hetzner • Contabo
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Dedicated compute allocations across tier-1 cloud and bare-metal nodes. Prevents micro-stutters and ensures 20.0 TPS even when 30+ players are exploring with elytra or running dense farms.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 flex justify-between">
              <span className="text-slate-400">Node Providers</span>
              <span className="text-emerald-400 font-bold">AWS • Hetzner • Contabo</span>
            </div>
          </div>

          {/* Card 2: Gen4 NVMe RAID-1 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1320] border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
              <HardDrive className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider mb-1">
              7,000 MB/s Read & Write
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Enterprise PCIe 4.0 NVMe
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              World generation and region chunk saving happen in milliseconds. Mirrored in
              RAID-1 to ensure hardware drive failures never cause world corruption.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 flex justify-between">
              <span className="text-slate-400">Chunk Save Latency</span>
              <span className="text-teal-400 font-bold">&lt; 0.25 ms</span>
            </div>
          </div>

          {/* Card 3: CosmicGuard DDoS */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1320] border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
              3.2 Tbps Protection
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Minecraft-Aware L4/L7 Defense
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Automatic mitigation against protocol handshake spam, botnets, UDP reflection,
              and socket exhaustion. Players never disconnect during attacks.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 flex justify-between">
              <span className="text-slate-400">Mitigation Response</span>
              <span className="text-emerald-400 font-bold">Sub-Second (0ms lag)</span>
            </div>
          </div>
        </div>

        {/* Benchmark Comparison Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c111c] border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Infrastructure Stability for Minecraft Constant 20.0 TPS
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Dedicated compute allocations directly dictate whether your server maintains 20.0 TPS or dips into unplayable lag spikes.
              </p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono whitespace-nowrap self-start md:self-auto">
              Higher is Better
            </span>
          </div>

          <div className="space-y-4">
            {/* EREX */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-1.5 font-medium">
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  EREX: AWS EC2 / Hetzner / Contabo High-Performance Nodes
                </span>
                <span className="font-mono text-emerald-300 font-bold">Constant 20.0 TPS</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[98%]" />
              </div>
            </div>

            {/* Typical Shared Host */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-1.5 font-medium text-slate-400">
                <span>Standard Budget Hosts: Overloaded Shared Intel Nodes</span>
                <span className="font-mono text-slate-400">Drops to 12-14 TPS at 10+ players</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="h-full bg-slate-600 rounded-full w-[43%]" />
              </div>
            </div>

            {/* Generic Basic VPS */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-1.5 font-medium text-slate-500">
                <span>Unoptimized Shared Cloud VPS (No noisy-neighbor isolation)</span>
                <span className="font-mono text-slate-500">Severe Tick Drops & Stutter</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="h-full bg-slate-700 rounded-full w-[30%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
