/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppShowcase from './components/AppShowcase';
import PerformanceGrid from './components/PerformanceGrid';
import SoftwareGrid from './components/SoftwareGrid';
import PingTester from './components/PingTester';
import PricingCalculator from './components/PricingCalculator';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import LegalPortal from './components/LegalPortal';
import PricingPage from './components/PricingPage';
import PaymentSuccess from './components/PaymentSuccess';
import { LEGAL_DOCS } from './legalData';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'legal' | 'pricing' | 'success'>('landing');
  const [activeLegalDocId, setActiveLegalDocId] = useState<string>('terms');
  const [successParams, setSuccessParams] = useState<{
    orderId?: string;
    planName?: string;
    ramAmount?: number;
    serverIp?: string;
  }>({});

  // Check URL pathname and hash on initial mount and history changes
  useEffect(() => {
    const evaluateRoute = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase();

      // Check if URL path is /success or /success/ or hash is #success
      if (pathname.includes('/success') || hash === 'success' || hash === 'payment-success') {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('order') || urlParams.get('order_id') || 'ERX-94821';
        const plan = urlParams.get('plan') || 'Community Node (4GB)';
        const ram = Number(urlParams.get('ram')) || 4;
        const ip = urlParams.get('ip') || 'smp-alpha.erex.nx.kg:25565';

        setSuccessParams({
          orderId,
          planName: plan,
          ramAmount: ram,
          serverIp: ip
        });
        setCurrentView('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash === 'plans' || hash === 'pricing-page' || hash === 'pricing-details') {
        setCurrentView('pricing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const matchedDoc = LEGAL_DOCS.find(d => 
        d.id === hash || 
        d.file.toLowerCase().replace('.md', '') === hash ||
        (hash === 'terms' && d.id === 'terms') ||
        (hash === 'privacy' && d.id === 'privacy') ||
        (hash === 'refund' && d.id === 'refund') ||
        (hash === 'license' && d.id === 'license-erex') ||
        (hash === 'licenses' && d.id === 'license-erex') ||
        (hash === 'policies' && d.id === 'terms')
      );

      if (matchedDoc) {
        setActiveLegalDocId(matchedDoc.id);
        setCurrentView('legal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (!hash && (pathname === '/' || pathname === '')) {
        setCurrentView('landing');
      }
    };

    evaluateRoute();
    window.addEventListener('hashchange', evaluateRoute);
    window.addEventListener('popstate', evaluateRoute);
    return () => {
      window.removeEventListener('hashchange', evaluateRoute);
      window.removeEventListener('popstate', evaluateRoute);
    };
  }, []);

  const openLegalDoc = (docId: string = 'terms') => {
    setActiveLegalDocId(docId);
    setCurrentView('legal');
    window.location.hash = docId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPricingPage = () => {
    setCurrentView('pricing');
    window.location.hash = 'plans';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSuccessPage = (details?: { orderId?: string; planName?: string; ramAmount?: number; serverIp?: string }) => {
    if (details) {
      setSuccessParams(details);
    }
    setCurrentView('success');
    window.location.hash = 'success';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToLanding = () => {
    setCurrentView('landing');
    if (window.location.pathname.includes('/success')) {
      history.pushState('', document.title, '/');
    } else if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'legal') {
    return (
      <LegalPortal
        initialDocId={activeLegalDocId}
        onBackToHome={backToLanding}
      />
    );
  }

  if (currentView === 'pricing') {
    return (
      <PricingPage
        onBackToHome={backToLanding}
        onOpenLegal={openLegalDoc}
        onOpenSuccess={openSuccessPage}
      />
    );
  }

  if (currentView === 'success') {
    return (
      <PaymentSuccess
        onBackToHome={backToLanding}
        orderId={successParams.orderId}
        planName={successParams.planName}
        ramAmount={successParams.ramAmount}
        serverIp={successParams.serverIp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f1f5f9] flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
      {/* Navigation */}
      <Navbar onOpenLegal={openLegalDoc} onOpenPricing={openPricingPage} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenPricing={openPricingPage} />
        <AppShowcase />
        <PerformanceGrid />
        <SoftwareGrid />
        <PingTester />
        <PricingCalculator onOpenPricingPage={openPricingPage} />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={openLegalDoc} onOpenPricing={openPricingPage} />
    </div>
  );
}


