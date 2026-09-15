import { useState, type FormEvent } from 'react';
import { 
  Download, 
  Smartphone, 
  QrCode, 
  Terminal, 
  Activity, 
  Users, 
  FolderLock, 
  Bell, 
  RotateCw, 
  Power, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { ANDROID_APK_URL, ANDROID_REPO_URL, APK_VERSION, APK_FILE_SIZE, MIN_ANDROID_VERSION } from '../data';

export default function AppShowcase() {
  const [activeTab, setActiveTab] = useState<'console' | 'stats' | 'players'>('console');
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileConsoleInput, setMobileConsoleInput] = useState('');
  const [mobileLogs, setMobileLogs] = useState([
    '[INFO] Authenticated via EREX Mobile Token',
    '[INFO] Server TPS: 20.0 (Optimal)',
    '[INFO] 18 players currently connected',
    '[WARN] Memory garbage collection triggered (0.02s)',
    '[INFO] Chunk generation: 14.8 chunks/sec on NVMe',
  ]);

  const copyDownloadLink = () => {
    navigator.clipboard.writeText(ANDROID_APK_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleMobileCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!mobileConsoleInput.trim()) return;
    setMobileLogs((prev) => [...prev, `> ${mobileConsoleInput.trim()}`, `[INFO] Command executed on node-01`]);
    setMobileConsoleInput('');
  };

  return (
    <section
      id="mobile-app"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#070a10]"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Smartphone className="w-3.5 h-3.5" />
            <span>OFFICIAL ANDROID APPLICATION</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Manage Your Minecraft World{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Straight from Your Phone
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Never be away from your community. Execute console commands, reboot crashed nodes,
            kick trolls, and monitor live TPS and RAM usage directly from your pocket.
          </p>
        </div>

        {/* Two-Column Showcase: Phone Frame + Download Card & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Android Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-slate-950 rounded-[48px] p-3 border-4 border-slate-800 shadow-2xl shadow-emerald-950/40 glow-emerald">
              {/* Phone speaker / camera punch-hole notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
                <div className="w-10 h-1 rounded-full bg-slate-800" />
              </div>

              {/* Phone Screen Container */}
              <div className="bg-[#0b101b] rounded-[40px] overflow-hidden border border-slate-800/80 flex flex-col h-[640px] text-white select-none">
                {/* Status Bar */}
                <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-[#090d16]">
                  <span>07:30</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400 font-bold">5G</span>
                    <div className="w-4 h-2 rounded-sm border border-slate-400 flex items-center p-0.5">
                      <div className="w-2.5 h-full bg-emerald-400 rounded-xs" />
                    </div>
                  </div>
                </div>

                {/* EREX App Header inside mockup */}
                <div className="px-4 py-3 bg-[#0d1424] border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
                      ⛏
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">EREX Mobile</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Survival SMP • 20.0 TPS
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      title="Restart Server"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Power Off"
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20"
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Mockup Tab Selector */}
                <div className="grid grid-cols-3 p-1.5 bg-[#090d17] border-b border-slate-800/80 text-[11px] font-medium">
                  <button
                    onClick={() => setActiveTab('console')}
                    className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      activeTab === 'console'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Terminal className="w-3 h-3" />
                    Console
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      activeTab === 'stats'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Activity className="w-3 h-3" />
                    Metrics
                  </button>
                  <button
                    onClick={() => setActiveTab('players')}
                    className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      activeTab === 'players'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Users className="w-3 h-3" />
                    Players (18)
                  </button>
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 p-3 overflow-y-auto bg-[#080b12] text-xs">
                  {activeTab === 'console' && (
                    <div className="h-full flex flex-col justify-between space-y-2">
                      <div className="space-y-1.5 font-mono text-[10px] text-slate-300 overflow-y-auto max-h-[360px]">
                        {mobileLogs.map((log, idx) => (
                          <div
                            key={idx}
                            className={`p-1 rounded ${
                              log.startsWith('>')
                                ? 'bg-emerald-500/10 text-emerald-300 font-bold'
                                : log.includes('WARN')
                                ? 'text-yellow-400'
                                : 'text-slate-300'
                            }`}
                          >
                            {log}
                          </div>
                        ))}
                      </div>

                      {/* Mobile Console Input */}
                      <form onSubmit={handleMobileCommand} className="pt-2 border-t border-slate-800 flex gap-1.5">
                        <input
                          type="text"
                          value={mobileConsoleInput}
                          onChange={(e) => setMobileConsoleInput(e.target.value)}
                          placeholder="/whitelist add player..."
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-md px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="submit"
                          className="px-2.5 py-1.5 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-bold"
                        >
                          Run
                        </button>
                      </form>
                    </div>
                  )}

                  {activeTab === 'stats' && (
                    <div className="space-y-3 pt-1">
                      {/* CPU Gauge */}
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Ryzen 9 CPU Load</span>
                          <span className="font-mono text-emerald-400 font-bold">24.5%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[24.5%] h-full bg-emerald-500 rounded-full" />
                        </div>
                      </div>

                      {/* Memory Gauge */}
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Memory Allocation</span>
                          <span className="font-mono text-teal-400 font-bold">4.1 / 8.0 GB</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[51%] h-full bg-teal-500 rounded-full" />
                        </div>
                      </div>

                      {/* NVMe Storage Gauge */}
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Gen4 NVMe Disk Space</span>
                          <span className="font-mono text-slate-300 font-bold">18.4 / 120 GB</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[15%] h-full bg-slate-400 rounded-full" />
                        </div>
                      </div>

                      {/* Live TPS & Ping Cards */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                          <div className="text-[10px] text-emerald-400">Server TPS</div>
                          <div className="text-base font-mono font-black text-emerald-300">20.00</div>
                        </div>
                        <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-center">
                          <div className="text-[10px] text-teal-400">Avg Player Ping</div>
                          <div className="text-base font-mono font-black text-teal-300">14 ms</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'players' && (
                    <div className="space-y-2">
                      <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                        Online Players (18/100)
                      </div>
                      {[
                        { name: 'Alex_Master', ping: '12ms', rank: 'OP' },
                        { name: 'SteveMiner', ping: '18ms', rank: 'Member' },
                        { name: 'EnderDragon99', ping: '24ms', rank: 'Member' },
                        { name: 'PixelBuilder', ping: '15ms', rank: 'VIP' },
                      ].map((p, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-emerald-700 flex items-center justify-center font-bold text-[10px]">
                              {p.name[0]}
                            </div>
                            <div>
                              <div className="text-[11px] font-semibold text-white">{p.name}</div>
                              <div className="text-[9px] text-slate-400">{p.ping} • {p.rank}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[9px] hover:bg-red-500/30">
                              Kick
                            </button>
                            <button className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] hover:bg-slate-700">
                              Msg
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom App Navigation Bar */}
                <div className="py-2.5 px-6 bg-[#090d16] border-t border-slate-800 flex items-center justify-around text-slate-400 text-[10px]">
                  <span className="text-emerald-400 font-semibold">Dashboard</span>
                  <span>Files</span>
                  <span>Backups</span>
                  <span>Settings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Download Card, QR Code & App Highlights */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            {/* Primary Download Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1422] border border-emerald-500/30 shadow-2xl relative overflow-hidden glow-emerald">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Smartphone className="w-36 h-36 text-emerald-400" />
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
                  {APK_VERSION} Release
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {APK_FILE_SIZE} • {MIN_ANDROID_VERSION}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Download EREX for Android
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Get full mobile control over your Minecraft nodes. Direct APK download
                hosted on official GitHub releases for lightning-fast speeds and safety.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  id="appshowcase-download-apk-btn"
                  href={ANDROID_APK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="EREX-app-release.apk"
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-200 cursor-pointer"
                >
                  <Download className="w-5 h-5 text-emerald-100" />
                  <span>Download APK ({APK_VERSION})</span>
                </a>

                <button
                  id="copy-apk-link-btn"
                  onClick={copyDownloadLink}
                  className="px-4 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  title="Copy Direct Download Link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* QR Code & Scan Option */}
              <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800/90 flex flex-col sm:flex-row items-center gap-4">
                {/* Visual SVG QR Code that represents the direct APK download */}
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-slate-950"
                    fill="currentColor"
                  >
                    {/* Top-left corner finder */}
                    <rect x="5" y="5" width="28" height="28" fill="#000" rx="3" />
                    <rect x="9" y="9" width="20" height="20" fill="#fff" rx="2" />
                    <rect x="13" y="13" width="12" height="12" fill="#000" rx="1" />
                    {/* Top-right corner finder */}
                    <rect x="67" y="5" width="28" height="28" fill="#000" rx="3" />
                    <rect x="71" y="9" width="20" height="20" fill="#fff" rx="2" />
                    <rect x="75" y="13" width="12" height="12" fill="#000" rx="1" />
                    {/* Bottom-left corner finder */}
                    <rect x="5" y="67" width="28" height="28" fill="#000" rx="3" />
                    <rect x="9" y="71" width="20" height="20" fill="#fff" rx="2" />
                    <rect x="13" y="75" width="12" height="12" fill="#000" rx="1" />
                    {/* Random decorative QR data grid cells */}
                    <rect x="38" y="10" width="8" height="8" fill="#000" />
                    <rect x="50" y="10" width="8" height="8" fill="#000" />
                    <rect x="38" y="24" width="8" height="8" fill="#000" />
                    <rect x="50" y="24" width="8" height="8" fill="#000" />
                    <rect x="10" y="38" width="8" height="8" fill="#000" />
                    <rect x="24" y="38" width="8" height="8" fill="#000" />
                    <rect x="38" y="38" width="8" height="8" fill="#000" />
                    <rect x="52" y="38" width="8" height="8" fill="#000" />
                    <rect x="66" y="38" width="8" height="8" fill="#000" />
                    <rect x="80" y="38" width="8" height="8" fill="#000" />
                    <rect x="10" y="52" width="8" height="8" fill="#000" />
                    <rect x="38" y="52" width="8" height="8" fill="#000" />
                    <rect x="66" y="52" width="8" height="8" fill="#000" />
                    <rect x="80" y="52" width="8" height="8" fill="#000" />
                    <rect x="38" y="66" width="8" height="8" fill="#000" />
                    <rect x="52" y="66" width="8" height="8" fill="#000" />
                    <rect x="66" y="66" width="8" height="8" fill="#000" />
                    <rect x="38" y="80" width="8" height="8" fill="#000" />
                    <rect x="52" y="80" width="8" height="8" fill="#000" />
                    <rect x="80" y="80" width="8" height="8" fill="#000" />
                  </svg>
                </div>

                <div className="text-center sm:text-left">
                  <div className="text-xs font-semibold text-white flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>Scan with Your Phone Camera</span>
                  </div>
                  <p className="text-[12px] text-slate-400 leading-normal">
                    Point your camera to instantly initiate the APK download on your Android device.
                  </p>
                  <a
                    href={ANDROID_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 mt-1.5 font-medium"
                  >
                    <span>View GitHub Releases Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2.5">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">Real-Time Mobile RCON</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Send server commands, manage permissions, and broadcast messages instantly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-2.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">Crash & Lag Alerts</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Receive immediate push notifications if tick rates drop or memory spikes occur.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2.5">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">Player Moderation</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  View who is online, ban griefers, inspect player pings, and edit whitelists.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-2.5">
                  <RotateCw className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">1-Tap Safe Reboots</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Save world data and perform clean server restarts directly from notification shade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
