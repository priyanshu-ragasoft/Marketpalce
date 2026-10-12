import React, { useState } from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function ReplacementPolicyPage() {
  const { navigate } = useRouter()
  const [claimOrderId, setClaimOrderId] = useState('')
  const [claimIssueType, setClaimIssueType] = useState('doa')
  const [claimDetails, setClaimDetails] = useState('')
  const [claimSubmitted, setClaimSubmitted] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)

  const handleClaimSubmit = (e) => {
    e.preventDefault()
    setClaimSubmitted(true)
    setTimeout(() => {
      setClaimSubmitted(false)
      setClaimOrderId('')
      setClaimDetails('')
    }, 6000)
  }

  const replacementFaqs = [
    {
      q: 'Does opening the factory shrink wrap void the replacement policy?',
      a: 'No. If the device has a factory hardware defect, screen malfunction, or fails to power on (DOA), opening the outer wrap does NOT void your replacement guarantee. However, the device must be free from accidental physical drops, water ingress, or unauthorized third-party modifications.',
    },
    {
      q: 'Who pays for international return courier charges?',
      a: 'CryptoSpill covers 100% of return shipping expenses. When an RMA (Return Merchandise Authorization) is issued, our desk generates a prepaid FedEx International Priority or DHL Express air waybill with scheduled courier doorstep pickup.',
    },
    {
      q: 'What if I already paired my Apple ID or enabled Find My iPhone?',
      a: 'For security and privacy reasons, Apple devices locked to an iCloud account or Apple ID cannot be processed for replacement by authorized centers. You must disable "Find My" and sign out of your Apple ID before handing the unit to the courier. Our team provides step-by-step remote de-linking instructions.',
    },
    {
      q: 'How long does the advance replacement turnaround take?',
      a: 'As soon as the returned parcel is scanned at the carrier origin facility, the merchant releases the brand-new sealed replacement unit from the nearest regional vault (San Francisco, Frankfurt, or Singapore) within 24 hours.',
    },
    {
      q: 'What if the identical color or storage capacity is out of stock?',
      a: 'If exact replacement stock is unavailable, you have the option to receive an upgraded model at no extra charge, or request an immediate 100% escrow refund in your original cryptocurrency (ETH, BTC, SOL, USDT) directly back to your deposit wallet.',
    },
  ]

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
            <span className="text-slate-900 font-bold">14-Day Replacement Policy</span>
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
              Hassle-Free Protection
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              14-Day Advance Replacement &amp; Return Policy
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Every physical Apple hardware product purchased on CryptoSpill includes a comprehensive 14-day warranty backing. If your device arrives defective or damaged, we swap it with brand-new sealed stock at zero expense to you.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Policy Overview Pill */}
            <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/90 text-amber-950 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <h3 className="font-extrabold text-sm sm:text-base text-amber-950">
                  Decentralized Buyer Reassurance Guarantee
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                Buying electronics with cryptocurrency should carry zero fear of receiving substandard merchandise. On CryptoSpill, all merchant payouts remain locked in autonomous smart contracts until you inspect your sealed Apple box. If any issue arises within 14 calendar days of delivery, our escrow protocol enforces immediate advance replacement or a 100% full crypto refund.
              </p>
            </div>

            {/* 2. Key Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-lg mb-3">
                    ⚡
                  </div>
                  <h4 className="font-bold text-slate-950 text-sm mb-1">DOA Advance Swap</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    If your sealed iPhone or Mac exhibits hardware failure out of the box, an identical replacement unit is dispatched within 24 hours of RMA verification.
                  </p>
                </div>
                <span className="mt-4 text-[10px] font-black uppercase text-amber-700 tracking-wider">Zero Transit Downtime</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-lg mb-3">
                    ✈️
                  </div>
                  <h4 className="font-bold text-slate-950 text-sm mb-1">Prepaid Air Waybill</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    FedEx International Priority or DHL Express pickup is scheduled right at your home or office. You never pay customs duties or return courier shipping.
                  </p>
                </div>
                <span className="mt-4 text-[10px] font-black uppercase text-amber-700 tracking-wider">100% Free Shipping</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-lg mb-3">
                    🔒
                  </div>
                  <h4 className="font-bold text-slate-950 text-sm mb-1">Full Crypto Refund</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    If replacement stock is unavailable, 100% of your escrowed cryptocurrency (ETH, BTC, SOL, USDT) is refunded back to your deposit wallet address with zero fees.
                  </p>
                </div>
                <span className="mt-4 text-[10px] font-black uppercase text-amber-700 tracking-wider">Smart Contract Safety</span>
              </div>
            </div>

            {/* 3. Step-by-Step 4-Stage Replacement Process */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  Step-by-Step Replacement Workflow
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  How our decentralized logistics and multi-sig escrow handle returns in 4 simple stages:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-yellow-400 font-black flex items-center justify-center shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">Submit Claim via Form or Email</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Enter your Order ID (e.g. CS-89421) in the interactive portal below or contact <span className="font-bold text-slate-900">support@cryptospill.store</span>. Attach a short 10-second unboxing video or photo showing the serial number on the retail box.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-yellow-400 font-black flex items-center justify-center shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">RMA Approval &amp; Waybill Dispatch (&lt; 3 Hours)</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Our escrow compliance team issues an authorized RMA ticket number and emails you a prepaid commercial invoice and barcoded FedEx / DHL air manifest.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-yellow-400 font-black flex items-center justify-center shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">Courier Doorstep Pickup &amp; Scanning</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Hand the safely packaged box to the courier driver. As soon as the first origin scanning telemetry registers in the global courier database, your replacement ticket is unlocked.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">Brand-New Replacement Dispatch</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      The merchant immediately dispatches an identical factory-sealed unit with a new Apple serial number via FedEx Priority Air. New tracking details appear on your live dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Eligibility Matrix Table */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  Coverage &amp; Eligibility Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed breakdown of what is covered under our 14-day warranty vs standard manufacturer coverage:
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-900 font-bold">
                    <tr>
                      <th className="p-3.5 border-b border-slate-200">Issue / Scenario</th>
                      <th className="p-3.5 border-b border-slate-200">14-Day Coverage</th>
                      <th className="p-3.5 border-b border-slate-200">Resolution Offered</th>
                      <th className="p-3.5 border-b border-slate-200">Shipping Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Dead on Arrival (DOA) / Will not turn on</td>
                      <td className="p-3.5 text-emerald-600 font-black">100% Covered</td>
                      <td className="p-3.5 text-slate-600">Immediate Advance Replacement Unit</td>
                      <td className="p-3.5 font-bold text-emerald-600">Free ($0)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Transit Damage / Crushed Box / Broken Glass</td>
                      <td className="p-3.5 text-emerald-600 font-black">100% Covered</td>
                      <td className="p-3.5 text-slate-600">Instant Replacement or Full Escrow Refund</td>
                      <td className="p-3.5 font-bold text-emerald-600">Free ($0)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Factory Screen Bleed / Dead Pixels / Lens Flare</td>
                      <td className="p-3.5 text-emerald-600 font-black">100% Covered</td>
                      <td className="p-3.5 text-slate-600">Replacement or Apple Genius Bar Repair</td>
                      <td className="p-3.5 font-bold text-emerald-600">Free ($0)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Wrong Storage Tier / Color dispatched</td>
                      <td className="p-3.5 text-emerald-600 font-black">100% Covered</td>
                      <td className="p-3.5 text-slate-600">Priority swap with correct specification</td>
                      <td className="p-3.5 font-bold text-emerald-600">Free ($0)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Accidental liquid damage / Dropped on concrete</td>
                      <td className="p-3.5 text-amber-700 font-bold">AppleCare+ Only</td>
                      <td className="p-3.5 text-slate-600">Referral to Apple Official Service Desk</td>
                      <td className="p-3.5 text-slate-400">Buyer Expense</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Digital Gift Card / Software Key (Already Redeemed)</td>
                      <td className="p-3.5 text-rose-600 font-bold">Non-Returnable</td>
                      <td className="p-3.5 text-slate-600">Proof of prior redemption check via Oracle</td>
                      <td className="p-3.5 text-slate-400">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. Important Security Notice: iCloud Locks */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">⚠️</span>
                <h4 className="font-bold text-yellow-400 text-sm sm:text-base">
                  Critical Requirement: iCloud &amp; Activation Lock Removal
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Under official Apple manufacturer compliance, authorized repair centers and distributor vaults cannot accept or replace any iPhone, iPad, Mac, or Apple Watch that is bound to an active Apple ID or iCloud Activation Lock.
              </p>
              <div className="p-4 rounded-2xl bg-white/10 text-xs text-slate-200 space-y-1">
                <p className="font-bold text-white">Before packing your device for collection:</p>
                <p>1. Go to <strong className="text-yellow-300">Settings &rarr; [Your Name] &rarr; Find My</strong> and toggle &ldquo;Find My iPhone&rdquo; OFF.</p>
                <p>2. Tap <strong className="text-yellow-300">Sign Out</strong> at the bottom of your Apple ID profile.</p>
                <p>3. If the device cannot power on, remove it remotely via <strong className="text-yellow-300">icloud.com/find</strong> &rarr; All Devices &rarr; Remove from Account.</p>
              </div>
            </div>

            {/* 6. Interactive Replacement Claim Ticket Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-5">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  Submit a Replacement or RMA Ticket
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Have an active order that needs inspection? Enter your details below to generate a replacement request:
                </p>
              </div>

              {claimSubmitted ? (
                <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">Replacement Request Registered!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Ticket #RMA-{Math.floor(10000 + Math.random() * 90000)} has been created for order <span className="font-bold">{claimOrderId || 'CS-ACTIVE'}</span>. Our escrow arbitrator will review your serial records and email the prepaid FedEx return waybill within 3 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleClaimSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">CryptoSpill Order ID *</label>
                      <input
                        type="text"
                        required
                        value={claimOrderId}
                        onChange={(e) => setClaimOrderId(e.target.value)}
                        placeholder="e.g. CS-98214"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">Issue Category *</label>
                      <select
                        value={claimIssueType}
                        onChange={(e) => setClaimIssueType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      >
                        <option value="doa">Dead on Arrival (Hardware will not boot)</option>
                        <option value="damaged">Transit Damage / Broken Packaging</option>
                        <option value="screen">Display Malfunction / Pixel Defect</option>
                        <option value="wrong_item">Incorrect Spec / Color Dispatched</option>
                        <option value="other">Other Hardware Defect</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">Detailed Description &amp; Serial Number *</label>
                    <textarea
                      rows={3}
                      required
                      value={claimDetails}
                      onChange={(e) => setClaimDetails(e.target.value)}
                      placeholder="Please specify your Apple serial number (printed on box) and describe what symptom occurred during unboxing..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-slate-900 hover:bg-yellow-400 hover:text-black text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                  >
                    Generate Replacement RMA Ticket &rarr;
                  </button>
                </form>
              )}
            </div>

            {/* 7. Dedicated Replacement FAQ */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  Replacement Policy FAQs
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Frequently asked questions regarding replacement lead times, refunds, and couriers:
                </p>
              </div>

              <div className="space-y-3">
                {replacementFaqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx
                  return (
                    <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-100 transition cursor-pointer"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-700 font-bold shrink-0 text-xs">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Sidebar Area (4 Cols) */}
          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="replacement-policy" />
          </div>

        </div>

      </div>
    </div>
  )
}
