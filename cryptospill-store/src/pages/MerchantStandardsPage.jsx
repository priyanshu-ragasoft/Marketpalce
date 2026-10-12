import React from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function MerchantStandardsPage() {
  const { navigate } = useRouter()

  const tiers = [
    { name: 'Silver Verified', volume: '$50,000 / mo', dispatchSLA: '24 Hours', releaseSpeed: 'Standard 48h Inspection', bond: '5,000 USDT' },
    { name: 'Gold Flagship', volume: '$250,000 / mo', dispatchSLA: '12 Hours', releaseSpeed: 'Priority 24h Release', bond: '20,000 USDT' },
    { name: 'Platinum Authorized', volume: '$1,000,000+ / mo', dispatchSLA: '6 Hours', releaseSpeed: 'Instant Delivery Telemetry Release', bond: '50,000 USDT' },
  ]

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
            <span className="text-slate-600">Merchant &amp; Trust</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Merchant Standards</span>
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
              Quality Control &amp; SLA
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Merchant Standards &amp; Quality SLA
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              CryptoSpill maintains institutional-grade seller criteria. All merchants are audited for authentic factory-sealed stock, climate-controlled warehousing, and rapid air dispatch SLAs.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Strict Zero-Counterfeit Enforcement Policy:</h4>
                <p className="text-xs leading-relaxed">
                  Every merchant undergoes quarterly cryptographic escrow audits and proof-of-inventory checks. Selling grey-market, open-box, or refurbished items results in immediate contract liquidation and forfeiture of on-chain security deposits.
                </p>
              </div>

              {/* Core Standards */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-base">Core Operational Standards</h4>
                
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block text-xs">1. Factory-Sealed Stock Only</strong>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Devices must possess authentic Apple shrink wrap or tamper-evident pull tabs with genuine retail packaging. Serial numbers must validate on Apple.com coverage before parcel handover.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block text-xs">2. Mandatory 24-Hour Air Dispatch SLA</strong>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Orders must be handed over to FedEx Priority or DHL Express within 24 hours of smart contract deposit confirmation. Late dispatch reduces merchant reliability rating.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block text-xs">3. Serial Number Pre-Registration</strong>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Merchants are required to photograph and log the barcode serial number into our order oracle API prior to box sealing for transparent customer auditability.
                  </p>
                </div>
              </div>

              {/* Merchant Tiers Table */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">Merchant Performance Tiers &amp; Incentives</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-900 font-bold">
                      <tr>
                        <th className="p-3 border-b border-slate-200">Merchant Tier</th>
                        <th className="p-3 border-b border-slate-200">Monthly Volume</th>
                        <th className="p-3 border-b border-slate-200">Dispatch SLA</th>
                        <th className="p-3 border-b border-slate-200">Security Bond</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {tiers.map((tier, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-bold text-slate-900">{tier.name}</td>
                          <td className="p-3 text-slate-600 font-mono">{tier.volume}</td>
                          <td className="p-3 text-emerald-600 font-semibold">{tier.dispatchSLA}</td>
                          <td className="p-3 text-slate-500 font-mono">{tier.bond}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="standards" />
          </div>
        </div>

      </div>
    </div>
  )
}
