import { useState } from 'react';
import { Globe, Wifi, Activity, CheckCircle2, RotateCw, Server } from 'lucide-react';
import { SERVER_NODES } from '../data';

export default function PingTester() {
  const [testing, setTesting] = useState(false);
  const [pingResults, setPingResults] = useState<Record<string, number>>({
    fra: 18,
    lon: 22,
    ash: 15,
    dal: 24,
    sin: 28,
    syd: 32,
  });

  const runPingTest = () => {
    setTesting(true);
    setTimeout(() => {
      const updated: Record<string, number> = {};
      SERVER_NODES.forEach((node) => {
        // jitter by +- 3ms
        const jitter = Math.floor(Math.random() * 7) - 3;
        updated[node.id] = Math.max(9, node.basePing + jitter);
      });
      setPingResults(updated);
      setTesting(false);
    }, 900);
  };

  // Find lowest ping
  const bestNodeId = Object.entries(pingResults).reduce(
    (min, curr) => (curr[1] < min[1] ? curr : min),
    ['ash', 999]
  )[0];

  return (
    <section
      id="nodes"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#070a10]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>LOW-LATENCY EDGE MESH</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Global Deployment Nodes
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Host your Minecraft world closer to your player base. Choose your preferred node
              upon server activation with zero extra fees.
            </p>
          </div>

          <button
            id="run-ping-test-btn"
            onClick={runPingTest}
            disabled={testing}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700 hover:border-emerald-500/40 transition-colors shadow-lg cursor-pointer self-start md:self-auto"
          >
            <RotateCw className={`w-4 h-4 text-emerald-400 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Testing Ping...' : 'Refresh Latency Test'}</span>
          </button>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVER_NODES.map((node) => {
            const currentPing = pingResults[node.id] || node.basePing;
            const isBest = node.id === bestNodeId;

            return (
              <div
                key={node.id}
                className={`p-5 rounded-2xl bg-[#0d1320] border transition-all duration-200 relative ${
                  isBest
                    ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/40 bg-gradient-to-b from-[#0e1726] to-[#0d1320]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {isBest && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      FASTEST ROUTE
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shadow-inner">
                    <Server className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">
                      {node.city}, {node.country}
                    </h3>
                    <div className="text-xs text-slate-400">{node.region}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 mt-3 text-xs">
                  <div>
                    <div className="text-slate-400">Live Ping</div>
                    <div className="font-mono font-bold text-base flex items-center gap-1.5 mt-0.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      <span className={currentPing < 25 ? 'text-emerald-400' : 'text-teal-300'}>
                        {currentPing} ms
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Infrastructure</div>
                    <div className="font-mono text-slate-200 text-xs mt-1 truncate" title={node.hardware}>
                      {node.hardware}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/50 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Uptime: <strong className="text-emerald-400">{node.uptime}</strong></span>
                  <span className="text-slate-500">DDoS: 3.2 Tbps L4/L7</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
