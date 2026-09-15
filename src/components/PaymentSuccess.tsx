import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Smartphone, 
  Download, 
  ArrowRight, 
  Server, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  Cpu,
  Zap,
  RotateCw,
  Home
} from 'lucide-react';
import { ANDROID_APK_URL, APK_VERSION, ANDROID_REPO_URL } from '../data';

interface PaymentSuccessProps {
  onBackToHome?: () => void;
  orderId?: string;
  planName?: string;
  ramAmount?: number;
  serverIp?: string;
}

export default function PaymentSuccess({
  onBackToHome,
  orderId = 'ERX-94821',
  planName = 'Community Node (4GB)',
  ramAmount = 4,
  serverIp = 'smp-alpha.erex.nx.kg:25565'
}: PaymentSuccessProps) {
  const [copied, setCopied] = useState(false);
  const [activationProgress, setActivationProgress] = useState(72);
  const [deepLinkAttempted, setDeepLinkAttempted] = useState(false);
  const [activeStep, setActiveStep] = useState(2);

  // Simulated activation progress
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setActivationProgress(90);
      setActiveStep(3);
    }, 1800);

    const timer2 = setTimeout(() => {
      setActivationProgress(100);
      setActiveStep(4);
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const copyServerIp = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenErexApp = () => {
    setDeepLinkAttempted(true);
    // Attempt custom URI scheme for Android app
    window.location.href = 'erex://open';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
      {/* Top Simple Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Server className="w-4 h-4" />
            </div>
            <span className="font-display font-extrabold text-lg text-white tracking-wider">
              EREX <span className="text-emerald-400">HOST</span>
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs sm:text-sm text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Return to Website</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16">
        <div className="w-full max-w-xl mx-auto space-y-6">
          
          {/* Main Success Slate Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl relative overflow-hidden">
            {/* Emerald Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Glowing Success Icon */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>PADDLE ORDER CONFIRMED</span>
              </div>

              <div className="relative mb-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 stroke-[2.2]" />
                </div>
                {/* Ping animation badge */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
                </span>
              </div>

              {/* Exact Requested Heading */}
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Payment Successful!
              </h1>

              {/* Exact Requested Subheading / Directive */}
              <p className="mt-3 text-sm sm:text-base text-slate-300 font-medium max-w-md leading-relaxed">
                Your server is activating. You can now return to the Erex app.
              </p>

              {/* Live Status Pill */}
              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {activationProgress < 100 ? 'Allocating Container Node...' : 'Node Active & Ready'}
                </span>
              </div>
            </div>

            {/* Activation Progress Bar */}
            <div className="relative z-10 mt-8 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Activation Status</span>
                <span className="text-emerald-400 font-bold">{activationProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 ease-out rounded-full shadow-sm shadow-emerald-400/50"
                  style={{ width: `${activationProgress}%` }}
                />
              </div>
            </div>

            {/* Stepper Breakdown */}
            <div className="relative z-10 mt-6 pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-slate-200">Payment verified & invoice generated</span>
                <span className="ml-auto font-mono text-[11px] text-emerald-400 font-bold">Verified</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  activeStep >= 2 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-slate-200">Hardware & Gen4 NVMe allocated</span>
                <span className="ml-auto font-mono text-[11px] text-slate-400">{ramAmount} GB DDR5</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  activeStep >= 3 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {activeStep === 3 ? (
                    <RotateCw className="w-3 h-3 animate-spin text-emerald-400" />
                  ) : activeStep > 3 ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  )}
                </div>
                <span className="text-slate-200">Erex Mobile Bridge synchronization</span>
                <span className="ml-auto font-mono text-[11px] text-emerald-400">
                  {activeStep >= 4 ? 'Synced' : 'Binding...'}
                </span>
              </div>
            </div>

            {/* Server & Order Credentials Card */}
            <div className="relative z-10 mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Payment Gateway</span>
                <span className="font-mono font-bold text-emerald-400">Paddle (Merchant of Record)</span>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Order Reference</span>
                <span className="font-mono font-bold text-slate-200">{orderId}</span>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Assigned Plan</span>
                <span className="font-bold text-emerald-400">{planName}</span>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">Cloud Infrastructure</span>
                <span className="font-mono text-xs text-slate-200">AWS EC2 / Hetzner / Contabo</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Server Address</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-200 font-semibold">{serverIp}</span>
                  <button
                    onClick={copyServerIp}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy server address"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons (Responsive Mobile Touch Targets) */}
            <div className="relative z-10 mt-8 space-y-3">
              {/* Primary: Return / Open Erex App */}
              <button
                id="open-erex-app-btn"
                onClick={handleOpenErexApp}
                className="w-full min-h-[50px] py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <Smartphone className="w-5 h-5 stroke-[2.2]" />
                <span>Return to Erex App</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary: Download APK in case on browser */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href={ANDROID_APK_URL}
                  download
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/90 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download APK ({APK_VERSION})</span>
                </a>

                <button
                  onClick={onBackToHome}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>Return to Home</span>
                </button>
              </div>

              {/* Deep Link Note */}
              {deepLinkAttempted && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 text-center leading-relaxed">
                  If the app didn't open automatically, open the <strong className="text-white">EREX app</strong> on your Android phone and check your active server list.
                </div>
              )}
            </div>
          </div>

          {/* Quick Support / Safe Guarantee Footer */}
          <div className="px-4 py-3 rounded-2xl bg-slate-900/50 border border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>72-hour refund guarantee applies automatically</span>
            </div>
            <a 
              href="mailto:support@erex.nx.kg"
              className="text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>support@erex.nx.kg</span>
            </a>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} EREX Hosting. Your server is managed via the EREX Android client.</p>
      </footer>
    </div>
  );
}
