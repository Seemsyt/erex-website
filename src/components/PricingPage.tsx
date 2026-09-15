import { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Zap, 
  Shield, 
  Cpu, 
  Download, 
  Smartphone, 
  ChevronRight,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SERVER_PLANS, ANDROID_APK_URL, APK_VERSION } from '../data';
import { ServerPlan } from '../types';

interface PricingPageProps {
  onBackToHome: () => void;
  onOpenLegal?: (docId?: string) => void;
  onOpenSuccess?: (details?: { orderId?: string; planName?: string; ramAmount?: number; serverIp?: string }) => void;
}

export default function PricingPage({ onBackToHome, onOpenLegal, onOpenSuccess }: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [selectedPlanForInfo, setSelectedPlanForInfo] = useState<ServerPlan | null>(null);

  const getDiscountMultiplier = () => {
    if (billingCycle === 'quarterly') return 0.9; // 10% discount
    if (billingCycle === 'annual') return 0.8; // 20% discount
    return 1;
  };

  const calculatePrice = (basePrice: number) => {
    const discounted = basePrice * getDiscountMultiplier();
    return discounted.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-[#f1f5f9] flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#090e18]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">EREX</span>
              <span className="text-slate-600">/</span>
              <span className="text-emerald-400 font-medium">Pricing & Comparison</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => onOpenLegal && onOpenLegal('refund')}
              className="text-slate-400 hover:text-emerald-400 transition-colors hidden sm:inline-block cursor-pointer"
            >
              72-Hour Refund Guarantee
            </button>
            <a
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Download EREX App ({APK_VERSION})</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* High-Converting Advertising Hero */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-4 shadow-lg shadow-emerald-950/30">
            <Zap className="w-3.5 h-3.5" />
            <span>CHEAP SERVERS ON EREX • ZERO RIP-OFF MARKUPS</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Stop Wasting $15/Month for a Laggy 4GB Server.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 block sm:inline">
              Choose EREX for $10/Month.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Other hosts charge <span className="line-through text-red-400 font-semibold">$15 to $20/month</span> for overcrowded, ancient nodes that drop to 12 TPS when 5 friends explore. EREX delivers high-performance cloud compute across <strong className="text-white font-semibold">AWS EC2, Hetzner & Contabo</strong> nodes with genuine 20.0 TPS — all managed with one hand from the <strong className="text-emerald-300 font-bold">EREX Android App</strong>.
          </p>

          {/* Quick value props */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2GB for $5 • 4GB for $10 • 8GB for $20
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Secure Paddle Checkout
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Android App Control
            </span>
          </div>

          {/* Billing Cycle Selector */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Quarterly</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                billingCycle === 'quarterly' ? 'bg-slate-950/20 text-slate-900 font-bold' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                Save 10%
              </span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                billingCycle === 'annual' ? 'bg-slate-950/20 text-slate-900 font-bold' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Core Requested Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
          {SERVER_PLANS.map((plan) => {
            const isPopular = plan.popular;
            const price = calculatePrice(plan.priceMonthly);

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#0e1c2d] to-[#0a121e] border-2 border-emerald-500 shadow-2xl shadow-emerald-950/50 -translate-y-2'
                    : 'bg-[#0b101b] border border-slate-800 hover:border-slate-700 shadow-xl'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Best Value • 4GB for $10</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {plan.name}
                      </h3>
                      <div className="text-xs font-mono text-emerald-400 font-semibold mt-0.5">
                        {plan.ramGb} GB High-Speed DDR5 RAM
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono">
                      {plan.recommendedPlayers}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="pb-6 mb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white font-display">
                        ${price}
                      </span>
                      <span className="text-slate-400 text-xs font-medium">
                        / month
                      </span>
                    </div>
                    {plan.ramGb === 4 && (
                      <div className="text-[11px] text-emerald-300 font-medium mt-1.5 flex items-center gap-1">
                        <span>Save $60–$120/year compared to other $15–$20 hosts</span>
                      </div>
                    )}
                    {billingCycle !== 'monthly' && (
                      <div className="text-[11px] text-emerald-400 font-mono mt-1">
                        Billed as discounted {billingCycle} plan
                      </div>
                    )}
                  </div>

                  {/* Specifications Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Included Specifications
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {plan.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action - Directing to EREX Mobile App or Paddle Purchase */}
                <div className="space-y-2.5">
                  <a
                    href={ANDROID_APK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-[1.02]'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Get {plan.name} in App (${price}/mo)</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setSelectedPlanForInfo(plan)}
                    className="w-full py-1.5 text-center text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    How does payment & activation work?
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>Processed via Paddle • 72h Refund Guarantee</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Competitor Cost & Feature Comparison Table */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0b101b] border border-slate-800 mb-16 shadow-2xl overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>THE COLD HARD NUMBERS</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Why Are You Still Overpaying Other Minecraft Hosts?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Compare standard market pricing against EREX. See how much money you save every single year while getting superior single-thread CPU performance.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-3 px-4">Feature / Tier</th>
                  <th className="py-3 px-4 text-red-400 font-bold">Typical Other Hosts</th>
                  <th className="py-3 px-4 text-emerald-400 font-bold">EREX Hosting</th>
                  <th className="py-3 px-4 text-white font-bold">Your Direct Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="bg-emerald-950/10">
                  <td className="py-3.5 px-4 font-bold text-white">
                    4 GB Minecraft Server (Standard Community)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-red-400 line-through">
                    $15.00 – $20.00 / month
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-sm">
                    $10.00 / month
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-300">
                    Save $60 to $120 every year!
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    2 GB Minecraft Server (Starter)
                  </td>
                  <td className="py-3 px-4 font-mono text-red-400 line-through">
                    $8.00 – $10.00 / month
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    $5.00 / month
                  </td>
                  <td className="py-3 px-4 text-emerald-300">
                    Save up to 50%
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    8 GB Minecraft Server (Heavy Mods)
                  </td>
                  <td className="py-3 px-4 font-mono text-red-400 line-through">
                    $30.00 – $40.00 / month
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    $20.00 / month
                  </td>
                  <td className="py-3 px-4 text-emerald-300">
                    Save $120 to $240 every year!
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">Cloud Infrastructure</td>
                  <td className="py-3 px-4 text-red-300">Overloaded budget nodes & spinning HDDs</td>
                  <td className="py-3 px-4 text-white font-semibold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AWS EC2, Hetzner & Contabo</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">Tier-1 low latency routes & NVMe speeds</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">Mobile Control</td>
                  <td className="py-3 px-4 text-slate-400">Laggy desktop browser web panels</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Dedicated Native EREX Android App</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">Control console, players, TPS on mobile</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">DDoS Mitigation</td>
                  <td className="py-3 px-4 text-slate-400">Paid extra ($3–$5) or basic 10 Gbps</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">
                    3.2 Tbps CosmicGuard Included Free
                  </td>
                  <td className="py-3 px-4 text-slate-400">Zero extra fees</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-200">Auto-Sleep Power Saver</td>
                  <td className="py-3 px-4 text-slate-400">None (wasteful power)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">
                    Proprietary Wake-on-Connect Proxy
                  </td>
                  <td className="py-3 px-4 text-slate-400">Keeps prices permanently cheap</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works (Paddle Payment & Erex App) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="text-white font-bold text-base mb-1.5">
              Download the Free EREX App
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Install the official EREX Android APK ({APK_VERSION}) directly onto your phone or tablet to access your central server dashboard.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="text-white font-bold text-base mb-1.5">
              Secure Checkout via Paddle
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Payments are handled through Paddle (our Merchant of Record) with SSL encryption, supporting credit cards, PayPal, and Apple Pay.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="text-white font-bold text-base mb-1.5">
              Instant 60-Sec Activation
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Once paid, your server immediately activates in under 60 seconds and syncs right into your EREX Android app.
            </p>
          </div>
        </div>

        {/* Paddle Post-Payment Success Page Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <CreditCard className="w-3.5 h-3.5" />
              <span>PADDLE POST-PAYMENT REDIRECT</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Paddle Payment Success Page (/success)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              When a customer completes payment through Paddle, they are automatically redirected to our dark-themed confirmation page with their live server details and direct deep link back to the Erex app.
            </p>
          </div>

          {onOpenSuccess && (
            <button
              onClick={() => onOpenSuccess({
                orderId: 'PADDLE-94812',
                planName: 'Community Node (4GB)',
                ramAmount: 4,
                serverIp: 'smp-alpha.erex.nx.kg:25565'
              })}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Preview Paddle /success Page</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Policy & Trust Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>COMMITTED TO FAIR, TRANSPARENT POLICIES</span>
          </div>
          <p className="text-xs text-slate-300">
            EREX operates in strict compliance with Paddle merchant guidelines. Every purchase is backed by our clear 72-hour refund policy, privacy standards, and 99.9% network uptime SLA.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs pt-2">
            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="text-slate-400 hover:text-emerald-400 underline transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal('refund')}
              className="text-slate-400 hover:text-emerald-400 underline transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="text-slate-400 hover:text-emerald-400 underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal('aup')}
              className="text-slate-400 hover:text-emerald-400 underline transition-colors cursor-pointer"
            >
              Acceptable Use Policy
            </button>
          </div>
        </div>
      </main>

      {/* Info Modal when user clicks "How does payment & activation work?" */}
      {selectedPlanForInfo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1422] border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-white font-bold text-base">
                How to Get {selectedPlanForInfo.name}
              </div>
              <button
                onClick={() => setSelectedPlanForInfo(null)}
                className="text-slate-400 hover:text-white text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                <strong>Price:</strong> ${calculatePrice(selectedPlanForInfo.priceMonthly)}/mo for {selectedPlanForInfo.ramGb}GB DDR5 RAM
              </div>

              <p>
                All server configuration and management is handled 100% through the official <strong>EREX Android App</strong> to provide you with low latency, instant push notifications, and mobile RCON console control.
              </p>

              <ol className="list-decimal list-inside space-y-2 text-slate-400 pl-1">
                <li>Download and install the free EREX Android APK.</li>
                <li>Tap <strong>Get Server</strong> inside the app.</li>
                <li>Complete the quick, secure checkout via Paddle.</li>
                <li>Your server immediately activates within 60 seconds.</li>
              </ol>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href={ANDROID_APK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs text-center shadow-lg shadow-emerald-500/20"
              >
                Download EREX App ({APK_VERSION})
              </a>
              <button
                onClick={() => setSelectedPlanForInfo(null)}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
