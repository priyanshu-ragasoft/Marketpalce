import React from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function PrivacyPolicyPage() {
  const { navigate } = useRouter()

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80 text-xs">
          <nav className="flex items-center gap-2 text-slate-500 font-medium">
            <Link to="/" className="hover:text-amber-600 transition flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Legal &amp; Compliance</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Privacy Policy</span>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-yellow-400 text-slate-700 hover:text-black font-bold text-xs flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Store Catalog</span>
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <div className="max-w-3xl">
            <span 
              className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-xs border border-yellow-300 inline-block mb-3"
              style={{ backgroundColor: '#facc15', color: '#000000' }}
            >
              Web3 Privacy Manifesto
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Privacy Policy &amp; Data Rights
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              We respect decentralized digital sovereignty. Zero tracking cookies, zero sale of personal data to marketing brokers, and automated 14-day cryptographic purging of shipping records.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              
              {/* Highlight Banner */}
              <div className="p-6 rounded-3xl bg-slate-950 text-white space-y-2.5 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h4 className="font-bold text-yellow-400 text-sm sm:text-base">Decentralized Sovereignty Pledge</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Traditional web stores monetize your browsing sessions and sell customer demographics to advertising brokerages. CryptoSpill operates on a zero-telemetry philosophy. What hardware you purchase with your crypto is strictly your private business.
                </p>
              </div>

              {/* Data We Handle */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">1. Information We Temporarily Process</h4>
                <p>
                  To fulfill physical Apple shipments via international air couriers (FedEx &amp; DHL), we process only the bare minimum data necessary:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="text-slate-900 block mb-1">Encrypted Delivery Address</strong>
                    <p className="text-slate-500 leading-relaxed">Used strictly to generate the courier air waybill. Encrypted using AES-256 and GPG public keys at rest.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="text-slate-900 block mb-1">On-Chain Transaction Hash</strong>
                    <p className="text-slate-500 leading-relaxed">Public blockchain receipt used by the smart contract escrow oracle to verify payment confirmation.</p>
                  </div>
                </div>
              </div>

              {/* 14-Day Purge Rule */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">2. Automated 14-Day Ephemeral Data Purge</h4>
                <p>
                  Once the courier confirms delivery and our 14-Day Replacement Policy expires with escrow release, physical recipient names, delivery street addresses, and phone numbers are automatically deleted from active production databases.
                </p>
                <p className="text-xs text-slate-500">
                  Only the irreversible cryptographic order ID and blockchain transaction receipt persist on-chain for accounting integrity.
                </p>
              </div>

              {/* Zero Ad Tracking */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">3. Zero Advertising Pixels &amp; No Marketing Cookies</h4>
                <p>
                  CryptoSpill does not load Google Analytics, Meta Pixel, TikTok Pixel, or any third-party behavioral monitoring scripts. We do not engage in retargeting advertisements or behavioral fingerprinting.
                </p>
              </div>

              {/* Non-Custodial Wallet */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">4. Non-Custodial Security &amp; Key Safety</h4>
                <p>
                  When connecting your Web3 wallet (MetaMask, Phantom, WalletConnect), our frontend communicates directly with standard JSON-RPC endpoints. We will never ask for your private key, seed phrase, or off-chain credentials. Always ensure you are on <strong className="text-slate-900">cryptospill.store</strong> before signing smart contract escrow approvals.
                </p>
              </div>

            </div>
          </div>

          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="privacy" />
          </div>
        </div>

      </div>
    </div>
  )
}
