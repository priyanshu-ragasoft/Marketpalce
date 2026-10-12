import React, { useState } from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function BecomeMerchantPage() {
  const { navigate } = useRouter()
  const [merchantForm, setMerchantForm] = useState({
    businessName: '',
    corporateEmail: '',
    telegramHandle: '',
    inventoryCategory: 'hardware',
    monthlyVolume: '$100,000 – $250,000',
    fulfillmentDepot: 'sfo',
    inventoryProof: '',
  })
  const [merchantSubmitted, setMerchantSubmitted] = useState(false)

  const handleMerchantSubmit = (e) => {
    e.preventDefault()
    setMerchantSubmitted(true)
    setTimeout(() => {
      setMerchantSubmitted(false)
      setMerchantForm({
        businessName: '',
        corporateEmail: '',
        telegramHandle: '',
        inventoryCategory: 'hardware',
        monthlyVolume: '$100,000 – $250,000',
        fulfillmentDepot: 'sfo',
        inventoryProof: '',
      })
    }, 6000)
  }

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
            <span className="text-slate-600">Merchant &amp; Trust</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Become a Merchant</span>
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
              Enterprise Merchant Guild
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Become an Authorized Merchant Partner
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Unlock millions in global cryptocurrency purchasing power. Sell factory-sealed Apple hardware and verified digital codes with instant blockchain settlement, zero payment chargeback risk, and low 0.5% &ndash; 1.5% commissions.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Merchant Economics: CryptoSpill vs Traditional Marketplaces */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-black text-slate-950 mb-2">
                Merchant Economics: Why High-Volume Sellers Migrate to CryptoSpill
              </h2>
              <p className="text-slate-500 text-xs mb-6">
                Traditional payment processors and retail marketplaces burden electronics sellers with chargebacks, rolling reserve holds, and exorbitant fees.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-bold">
                      <th className="p-3.5 border-b border-slate-200">Merchant Metric</th>
                      <th className="p-3.5 border-b border-slate-200 text-amber-900">CryptoSpill Marketplace</th>
                      <th className="p-3.5 border-b border-slate-200 text-slate-500">Amazon / eBay</th>
                      <th className="p-3.5 border-b border-slate-200 text-slate-500">Stripe / Credit Cards</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Platform Commission</td>
                      <td className="p-3.5 font-black text-emerald-700 bg-emerald-50/50">0.5% &ndash; 1.5% Flat</td>
                      <td className="p-3.5 text-slate-600">8% &ndash; 15% Category Fee</td>
                      <td className="p-3.5 text-slate-600">2.9% + $0.30 per swipe</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Payment Chargeback Risk</td>
                      <td className="p-3.5 font-black text-emerald-700 bg-emerald-50/50">0.00% (Cryptographic Escrow)</td>
                      <td className="p-3.5 text-rose-600 font-semibold">High (Friendly Fraud common)</td>
                      <td className="p-3.5 text-rose-600 font-semibold">$15 &ndash; $25 fee per dispute</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Settlement Payout Speed</td>
                      <td className="p-3.5 font-black text-emerald-700 bg-emerald-50/50">Instant on Escrow Release (&lt; 60s)</td>
                      <td className="p-3.5 text-slate-600">14 &ndash; 30 Days Hold</td>
                      <td className="p-3.5 text-slate-600">2 &ndash; 7 Business Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Rolling Capital Reserve</td>
                      <td className="p-3.5 font-black text-emerald-700 bg-emerald-50/50">Zero Rolling Reserve</td>
                      <td className="p-3.5 text-slate-600">Up to 20% held for 90 days</td>
                      <td className="p-3.5 text-slate-600">Up to 10% rolling reserve</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Merchant Qualification Standards */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-slate-950">
                Merchant Admission Standards &amp; Mandatory Criteria
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                To protect our global shoppers and maintain the highest rating on crypto consumer forums, our compliance desk enforces strict onboarding barriers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-sm mb-3">
                    01
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Verifiable Inventory</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Merchants must provide proof of authorized Apple distributor invoicing or volume wholesale purchase orders with verifiable serial number batches.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-sm mb-3">
                    02
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Escrow Collateral Bond</h3>
                  <p className="text-slate-500 leading-relaxed">
                    A minimum security collateral deposit of 5,000 USDT or 1.5 ETH must be deposited into the multi-sig staking contract to guarantee shipping SLA compliance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-sm mb-3">
                    03
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">24H Air Dispatch SLA</h3>
                  <p className="text-slate-500 leading-relaxed">
                    All hardware orders must be packed and scanned by FedEx International Priority or DHL Express Aviation within 24 hours of blockchain transaction confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Apply for Merchant Onboarding
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Submit your organization profile. Our compliance team responds via encrypted Telegram within 24 business hours.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                  Applications Open Q4 2026
                </span>
              </div>

              {merchantSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">Merchant Application Logged!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Your application for <strong>{merchantForm.businessName || 'Your Business'}</strong> has been assigned Ticket <span className="font-mono font-bold">#MC-4910</span>. Our compliance auditor will reach out to Telegram handle <span className="font-mono font-bold">@{merchantForm.telegramHandle || 'handle'}</span> to initiate sample serial verification.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMerchantSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Business / Corporate Entity Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={merchantForm.businessName}
                        onChange={(e) => setMerchantForm({ ...merchantForm, businessName: e.target.value })}
                        placeholder="e.g. Apex Tech Wholesale LLC"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Corporate Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={merchantForm.corporateEmail}
                        onChange={(e) => setMerchantForm({ ...merchantForm, corporateEmail: e.target.value })}
                        placeholder="merchants@yourdomain.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Telegram Desk Handle *
                      </label>
                      <input
                        type="text"
                        required
                        value={merchantForm.telegramHandle}
                        onChange={(e) => setMerchantForm({ ...merchantForm, telegramHandle: e.target.value })}
                        placeholder="@merchant_rep"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Inventory Category
                      </label>
                      <select
                        value={merchantForm.inventoryCategory}
                        onChange={(e) => setMerchantForm({ ...merchantForm, inventoryCategory: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400"
                      >
                        <option value="hardware">Apple Hardware (iPhones, Macs, iPads)</option>
                        <option value="digital">Apple Gift Cards &amp; Digital Passes</option>
                        <option value="hybrid">Both Physical &amp; Digital Inventory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Estimated Monthly Turnover
                      </label>
                      <select
                        value={merchantForm.monthlyVolume}
                        onChange={(e) => setMerchantForm({ ...merchantForm, monthlyVolume: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400"
                      >
                        <option value="$50,000 – $100,000">$50,000 &ndash; $100,000 / month</option>
                        <option value="$100,000 – $250,000">$100,000 &ndash; $250,000 / month</option>
                        <option value="$250,000 – $1,000,000">$250,000 &ndash; $1,000,000 / month</option>
                        <option value="$1,000,000+">$1,000,000+ / month (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Supply Chain &amp; Inventory Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={merchantForm.inventoryProof}
                      onChange={(e) => setMerchantForm({ ...merchantForm, inventoryProof: e.target.value })}
                      placeholder="Specify your fulfillment regional hubs (SFO, FRA, DXB, SIN) and inventory stocking frequency..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-yellow-400 hover:text-black text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                    >
                      Submit Merchant Onboarding Application
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="become-merchant" />
          </div>

        </div>

      </div>
    </div>
  )
}
