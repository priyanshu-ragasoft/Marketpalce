import React from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function EscrowGuidePage() {
  const { navigate } = useRouter()

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80 text-xs">
          <nav className="flex items-center gap-2 text-slate-500 font-medium">
            <Link to="/" className="hover:text-amber-600 transition flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Help &amp; Escrow</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">How Escrow Protects You</span>
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

        {/* Hero Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <div className="max-w-3xl">
            <span 
              className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-xs border border-yellow-300 inline-block mb-3"
              style={{ backgroundColor: '#facc15', color: '#000000' }}
            >
              Smart Contract Vault
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              How Escrow Protects You
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Zero shopper fees. Your cryptocurrency payment is held in an autonomous decentralized smart contract vault until you receive, inspect, and approve your factory-sealed Apple device.
            </p>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
              
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
                <strong className="font-bold text-slate-900">0% Buyer Escrow Guarantee:</strong> Unlike traditional marketplaces that add 3-5% processing fees, CryptoSpill does not charge buyers any escrow fees. 100% of your funds are locked safely on-chain.
              </div>

              {/* 4-Step Visual Lifecycle */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4">The 4-Step Escrow Lifecycle</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="w-8 h-8 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-sm mb-3">1</span>
                    <h4 className="font-bold text-slate-900 mb-1">Buyer Funds the Escrow</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You select your device and send ETH, BTC, SOL, or USDT. The transaction locks your funds inside the smart contract vault. The merchant cannot touch the funds.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="w-8 h-8 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-sm mb-3">2</span>
                    <h4 className="font-bold text-slate-900 mb-1">Merchant Dispatches Goods</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The authorized Apple dealer logs the factory box serial number and dispatches the sealed device via FedEx / DHL Priority Air within 24 hours.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="w-8 h-8 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-sm mb-3">3</span>
                    <h4 className="font-bold text-slate-900 mb-1">48-Hour Inspection Window</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You receive the package and check serial validity on Apple.com coverage. You have 48 hours to confirm condition before escrow can be finalized.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="w-8 h-8 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-sm mb-3">4</span>
                    <h4 className="font-bold text-slate-900 mb-1">Instant Multi-Sig Release</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You click &ldquo;Release Funds&rdquo; to pay the merchant. If any shipping damage occurs, 24/7 arbitrators issue a 100% full crypto refund.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-3">Traditional Checkout vs CryptoSpill Escrow</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-900 font-bold">
                      <tr>
                        <th className="p-3">Feature</th>
                        <th className="p-3">Traditional Credit Card</th>
                        <th className="p-3 bg-yellow-400/20 text-slate-950 font-black">CryptoSpill Escrow</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">Buyer Protection</td>
                        <td className="p-3 text-slate-500">60-90 Day Bank Dispute</td>
                        <td className="p-3 font-bold text-emerald-600 bg-amber-50/40">Immediate On-Chain Smart Contract</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">Escrow Fee</td>
                        <td className="p-3 text-slate-500">3% to 5% Intermediation</td>
                        <td className="p-3 font-bold text-emerald-600 bg-amber-50/40">0% Completely Free</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-800">Identity / KYC</td>
                        <td className="p-3 text-slate-500">SSN, Passport, Credit History</td>
                        <td className="p-3 font-bold text-emerald-600 bg-amber-50/40">Decentralized Web3 Wallet Sign</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="escrow-guide" />
          </div>
        </div>

      </div>
    </div>
  )
}
