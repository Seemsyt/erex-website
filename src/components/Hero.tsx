import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { Download, Smartphone, Play, Zap, ShieldCheck, Terminal, Users, Cpu, Activity, ArrowRight, CheckCircle2, Server } from 'lucide-react';
import { ANDROID_APK_URL, APK_VERSION, APK_FILE_SIZE } from '../data';

interface HeroProps {
  onOpenPricing?: () => void;
}

export default function Hero({ onOpenPricing }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const consoleCardRef = useRef<HTMLDivElement>(null);
  const floatingBlockRef = useRef<HTMLDivElement>(null);

  // Interactive console state
  const [commandInput, setCommandInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<Array<{ text: string; type: 'info' | 'warn' | 'success' | 'cmd' }>>([
    { text: '[07:30:11 INFO] Loading Minecraft server version 1.21.4 (Paper-34)', type: 'info' },
    { text: '[07:30:12 INFO] Initializing EREX NVMe Gen4 Storage cache: 0.12ms', type: 'info' },
    { text: '[07:30:13 INFO] CosmicGuard DDoS Filter: 3.2 Tbps L4/L7 Active', type: 'success' },
    { text: '[07:30:14 INFO] Preparing level "world" with 16 worker threads (Ryzen 9)', type: 'info' },
    { text: '[07:30:15 INFO] [EREX-App] Remote Android Agent connected (v1.0.0)', type: 'success' },
    { text: '[07:30:16 INFO] Done (1.42s)! For help, type "help"', type: 'success' },
    { text: '[07:30:20 INFO] Alex[/192.168.1.42:54890] logged in with entity id 104', type: 'info' },
  ]);

  const [tps, setTps] = useState(20.0);
  const [activePlayers, setActivePlayers] = useState(24);

  // Run GSAP entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgesRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          titleRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaGroupRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          consoleCardRef.current,
          { scale: 0.94, y: 40, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
          '-=0.6'
        );

      // Continuous floating animation for the decorative block
      if (floatingBlockRef.current) {
        gsap.to(floatingBlockRef.current, {
          y: -12,
          rotation: 3,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Periodic random console heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvents = [
        '[Server thread/INFO]: Saved the world chunks to NVMe in 24ms',
        '[EREX-Node/METRIC]: CPU Load: 14.2% | Memory: 4.1GB/8.0GB | TPS: 20.00',
        '[Geyser-Spigot]: Player "BedrockGamer_99" authenticated via Xbox Live',
        '[Server thread/INFO]: Player "Alex" issued server command: /spawn',
      ];
      const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      setConsoleLogs((prev) => [...prev.slice(-7), { text: randomEvent, type: 'info' }]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleCommandSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim();
    const cleanCmd = cmd.startsWith('/') ? cmd.slice(1) : cmd;

    const newLogs = [...consoleLogs, { text: `> ${cmd}`, type: 'cmd' as const }];

    if (cleanCmd.toLowerCase() === 'tps') {
      newLogs.push({ text: `[Server thread/INFO]: TPS from last 1m, 5m, 15m: 20.0, 20.0, 20.0 (0.0% tick loss)`, type: 'success' });
    } else if (cleanCmd.toLowerCase() === 'list') {
      newLogs.push({ text: `[Server thread/INFO]: There are ${activePlayers} of 100 players online: Alex, Steve, Notch, Phoenix, ShadowGamer...`, type: 'info' });
    } else if (cleanCmd.toLowerCase() === 'help') {
      newLogs.push({ text: `[Server thread/INFO]: Available commands: /tps, /list, /status, /say <msg>, /app`, type: 'info' });
    } else if (cleanCmd.toLowerCase() === 'app') {
      newLogs.push({ text: `[EREX-App/INFO]: EREX Android app connected. Download APK: v1.0.0 available at releases.`, type: 'success' });
    } else if (cleanCmd.toLowerCase().startsWith('say ')) {
      const msg = cleanCmd.slice(4);
      newLogs.push({ text: `[Server] ${msg}`, type: 'warn' });
    } else {
      newLogs.push({ text: `[Server thread/INFO]: Executed command: ${cleanCmd}`, type: 'info' });
    }

    setConsoleLogs(newLogs.slice(-8));
    setCommandInput('');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden bg-radial-gradient bg-grid-pattern"
    >
      {/* Glow Orbs Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Top Announcements & Badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-950/50">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white">Cheap Servers on EREX:</span>
            <span className="text-emerald-300 font-bold">Stop wasting $15/mo for a laggy 4GB server</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>AWS EC2 • Hetzner • Contabo • 20.0 TPS</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            Cheap Minecraft Servers.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Zero Lag. Controlled from Your Phone.
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8"
          >
            Stop wasting <span className="line-through text-red-400 font-semibold">$15/month</span> for a laggy 4GB server with slow ticks and stuttering chunk loading. Choose <strong className="text-emerald-300 font-bold">EREX for just $10/month</strong> for an ultra-smooth 20.0 TPS server hosted on high-performance <strong className="text-white font-semibold">AWS EC2, Hetzner & Contabo</strong> nodes — with complete live management on the official <strong className="text-emerald-300 font-semibold">EREX Android App</strong>.
          </p>

          {/* Action CTAs - Focused on App Download & Plan Comparison */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none"
          >
            {/* Primary Android APK Direct Download */}
            <a
              id="hero-download-apk-btn"
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="EREX-app-release.apk"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 border border-emerald-300/30 group"
            >
              <Smartphone className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-normal text-emerald-100 leading-tight">
                  Get Started on Mobile
                </div>
                <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Download EREX App</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-black/30 font-mono text-emerald-200 border border-emerald-400/20">
                    {APK_VERSION}
                  </span>
                </div>
              </div>
              <Download className="w-5 h-5 ml-1 text-emerald-200 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* Check Pricing & Savings CTA */}
            <button
              id="hero-view-plans-btn"
              onClick={() => onOpenPricing ? onOpenPricing() : scrollToSection('pricing')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 text-white font-semibold text-base border border-slate-700/80 hover:border-emerald-500/40 transition-all duration-200 shadow-lg shadow-black/40 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>See Unbeatable Plans ($5, $10, $20)</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              2GB for $5 • 4GB for $10 • 8GB for $20
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Billed via Paddle (Secure Checkout)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              72-Hour Full Refund Policy
            </span>
          </div>

          {/* Direct Competitor Callout Card */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1422] to-slate-900 border border-emerald-500/25 max-w-2xl mx-auto shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30">
                <div className="text-red-400 font-bold text-xs flex items-center gap-1.5">
                  <span>❌</span>
                  <span>Typical Other Hosts</span>
                </div>
                <div className="text-slate-300 text-xs mt-1.5 space-y-1">
                  <div>• <strong className="text-red-300 font-semibold">$15–$20 / mo</strong> for only 4GB</div>
                  <div>• Overcrowded old Intel Xeon nodes</div>
                  <div>• Stutters down to 13–15 TPS under load</div>
                  <div>• Frustrating desktop-only web panels</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 relative">
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                  Save 40%+
                </div>
                <div className="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                  <span>✅</span>
                  <span>EREX High-Performance</span>
                </div>
                <div className="text-slate-200 text-xs mt-1.5 space-y-1">
                  <div>• <strong className="text-emerald-400 font-bold">Only $10 / mo</strong> for 4GB RAM</div>
                  <div>• AWS EC2, Hetzner & Contabo Nodes</div>
                  <div>• Consistent, butter-smooth 20.0 TPS</div>
                  <div>• Manage everything on the EREX Android App</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Interactive Node & Terminal Dashboard Mockup */}
        <div
          ref={consoleCardRef}
          className="relative max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0b0f19]/90 border border-emerald-500/20 shadow-2xl shadow-black/80 overflow-hidden glow-emerald"
        >
          {/* Top Node Bar */}
          <div className="bg-[#0f1624] px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-4 w-px bg-slate-700 mx-1" />
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">node-01.us-east.erex.nx.kg</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-sans">
                  RUNNING
                </span>
              </div>
            </div>

            {/* Quick Live Telemetry Counters */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>TPS: <strong>{tps.toFixed(1)}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span>Players: <strong>{activePlayers}</strong>/100</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Ping: <strong>14ms</strong></span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span>RAM: <strong>4.2 / 8.0 GB</strong></span>
              </div>
            </div>
          </div>

          {/* Console Body */}
          <div className="p-4 sm:p-6 bg-[#080c14] font-mono text-xs sm:text-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300 font-semibold">Interactive Server Console Stream</span>
                <span className="text-slate-400">(Try typing commands below)</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Connected</span>
              </div>
            </div>

            {/* Scrollable logs */}
            <div className="h-52 sm:h-60 overflow-y-auto space-y-1.5 pr-2 select-text">
              {consoleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed break-all ${
                    log.type === 'success'
                      ? 'text-emerald-400'
                      : log.type === 'warn'
                      ? 'text-yellow-300 font-semibold'
                      : log.type === 'cmd'
                      ? 'text-cyan-300 font-bold bg-slate-900/60 px-2 py-0.5 rounded'
                      : 'text-slate-300'
                  }`}
                >
                  {log.text}
                </div>
              ))}
            </div>

            {/* Command input */}
            <form
              onSubmit={handleCommandSubmit}
              className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2"
            >
              <div className="text-emerald-400 font-bold">$</div>
              <input
                id="console-command-input"
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Type command like /tps, /list, /say hello, or /app..."
                className="flex-1 bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold cursor-pointer transition-colors"
              >
                Send
              </button>
            </form>
          </div>

          {/* Bottom quick spec bar */}
          <div className="bg-[#0d131f] px-4 sm:px-6 py-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                CosmicGuard 3.2 Tbps L4/L7 Active
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="hidden sm:inline text-slate-300">NVMe 7000 MB/s Gen4 Read</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">Paper 1.21.4</span>
              <span className="text-slate-500">|</span>
              <a
                href="#mobile-app"
                className="text-slate-300 hover:text-emerald-400 underline decoration-emerald-500/50 underline-offset-2 transition-colors"
              >
                Manage via EREX App →
              </a>
            </div>
          </div>
        </div>

        {/* Floating decorative element */}
        <div
          ref={floatingBlockRef}
          className="hidden lg:block absolute -bottom-10 -right-6 pointer-events-none opacity-40 z-0"
        >
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-emerald-600/30 to-teal-400/20 border border-emerald-500/30 blur-sm" />
        </div>
      </div>
    </section>
  );
}
