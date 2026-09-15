import { useState } from 'react';
import { Check, Zap, Sparkles, Smartphone, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVER_PLANS, ANDROID_APK_URL, APK_VERSION } from '../data';

interface PricingCalculatorProps {
  onOpenPricingPage?: () => void;
}

export default function PricingCalculator({ onOpenPricingPage }: PricingCalculatorProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [customRam, setCustomRam] = useState(8);

  const discountMultiplier = billingCycle === 'quarterly' ? 0.85 : 1.0;

  // Custom slider calculations
  const customPrice = Math.round(customRam * 2.5 * discountMultiplier * 100) / 100;
  const customCores = customRam <= 2 ? '1 vCPU' : customRam <= 4 ? '2 vCPUs' : '4 vCPUs';
  const customPlayers = customRam <= 2 ? '1-8' : customRam <= 4 ? '8-25' : customRam <= 8 ? '25-60' : '60+';
  const customStorage = `${customRam * 18} GB NVMe`;

  return (
    <section
      id="pricing"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#090d16]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>CHEAP MINECRAFT SERVERS ON EREX</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Stop Wasting $15/mo for a Laggy 4GB Server.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 block sm:inline">
              Choose EREX for $10/mo.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Other hosts charge $15–$20 for sluggish shared nodes. EREX delivers high-performance compute backed by AWS EC2, Hetzner & Contabo for rock-solid 20.0 TPS — managed effortlessly through the{' '}
            <strong className="text-emerald-300 font-semibold">EREX Android App</strong>.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Quarterly (Save 15%)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-400 text-slate-950 font-bold">
                15% OFF
              </span>
            </button>
          </div>
        </div>

        {/* 3 Core Requested Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SERVER_PLANS.map((plan) => {
            const finalPrice = Math.round(plan.priceMonthly * discountMultiplier * 100) / 100;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#0e1728] via-[#0d1424] to-[#090e18] border-2 border-emerald-500 shadow-2xl shadow-emerald-950/50 glow-emerald -translate-y-1'
                    : 'bg-[#0d1320] border border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-mono font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <span className="text-xs px-2.5 py-1 rounded font-mono font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                      {plan.ramGb} GB RAM
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 min-h-[32px] leading-relaxed mb-4">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-slate-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white">
                        ${finalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ month</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Rec. for: <strong className="text-slate-300">{plan.recommendedPlayers}</strong>
                    </div>
                  </div>

                  {/* Specs List */}
                  <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
                    {plan.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="space-y-2">
                  <button
                    onClick={() => onOpenPricingPage ? onOpenPricingPage() : null}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                    }`}
                  >
                    <span>Choose {plan.name} (${finalPrice.toFixed(2)}/mo)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={ANDROID_APK_URL}
                    className="w-full py-1.5 text-center text-[11px] text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Smartphone className="w-3 h-3 text-emerald-400" />
                    <span>Manage 100% on Android App</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Pricing Page Banner */}
        {onOpenPricingPage && (
          <div className="mb-16 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold text-sm sm:text-base">
                Want to see our full savings comparison and server specifications?
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Compare EREX vs other hosts, view hardware specs, and see why thousands of players switched to save $60+/year.
              </p>
            </div>
            <button
              onClick={onOpenPricingPage}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>View Full Pricing & Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Interactive Custom RAM Slider Configurator */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0c121e] border border-emerald-500/20 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CUSTOM INSTANCE CONFIGURATOR</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Need a Custom Size for Massive Modpacks?
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Slide to configure exactly how much RAM your world needs. Perfectly tuned for
                All The Mods 9, Vault Hunters, Pixelmon, or high-concurrency bungee proxies.
              </p>

              {/* Slider Control */}
              <div className="pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400">Allocated Memory:</span>
                  <span className="font-mono text-xl font-black text-emerald-400">
                    {customRam} GB DDR5 RAM
                  </span>
                </div>

                <input
                  id="custom-ram-slider"
                  type="range"
                  min="2"
                  max="48"
                  step="2"
                  value={customRam}
                  onChange={(e) => setCustomRam(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>2 GB</span>
                  <span>16 GB</span>
                  <span>32 GB</span>
                  <span>48 GB</span>
                </div>
              </div>
            </div>

            {/* Live Result Box */}
            <div className="lg:w-80 p-6 rounded-2xl bg-[#080d17] border border-slate-800 flex flex-col justify-between shrink-0">
              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase">Estimated Specs</div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Processor</span>
                  <span className="font-mono text-slate-200 font-semibold">{customCores} (5.7GHz)</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Fast Storage</span>
                  <span className="font-mono text-slate-200 font-semibold">{customStorage}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Player Capacity</span>
                  <span className="font-mono text-emerald-400 font-semibold">{customPlayers} Players</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-400">Mobile APK Access</span>
                  <span className="font-mono text-emerald-400 font-semibold">Included Free</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-mono font-black text-white">
                    ${customPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ month</span>
                </div>

                <a
                  href="#mobile-app"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <span>Build Custom Node</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
