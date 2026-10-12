import React from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function EscrowRulesPage() {
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
            <span className="text-slate-600">Merchant &amp; Trust</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Escrow Rules &amp; Multi-Sig</span>
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
              Cryptographic Protocol Architecture
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Escrow Rules &amp; Multi-Sig Protocol
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Technical specification for CryptoSpill&rsquo;s 2-of-3 multi-signature smart contract vaults, timelocks, decentralized oracle milestones, and dispute resolution logic.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h4 className="font-bold text-yellow-400 text-sm sm:text-base">Non-Custodial Escrow Vaults</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Neither CryptoSpill nor the merchant can unilaterally withdraw escrow funds. Payout release or refund execution mathematically requires a threshold of at least 2 independent cryptographic signatures.
                </p>
              </div>

              {/* 3 Keys */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">The 3 Cryptographic Keys</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-950 text-sm">Key 1: Buyer Key (Client Signer)</strong>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Held in Shopper Web3 Wallet</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Signed when the shopper inspects their delivered Apple package and clicks &ldquo;Release Escrow&rdquo;, or when cancelling prior to merchant warehouse dispatch.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-950 text-sm">Key 2: Merchant Key (Dealer Signer)</strong>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">Authorized Dealer Node</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Signed to accept order fulfillment, record the serial number, or voluntarily execute a full return refund if the customer requests cancellation before flight dispatch.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-950 text-sm">Key 3: Arbitration Oracle Key</strong>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">Independent Multi-Sig Node</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Invoked strictly if a conflict occurs (e.g. carrier transit loss or damaged shipment). Backed by cryptographically signed carrier delivery proofs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timelock Rules */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">Timelock &amp; Expiry Logic</h4>
                <ul className="list-disc list-inside space-y-2 text-xs text-slate-700">
                  <li>
                    <strong className="text-slate-900">48-Hour Inspection Window:</strong> Begins the minute FedEx / DHL logs a confirmed delivery checkpoint. The buyer has 48 hours to file an RMA claim.
                  </li>
                  <li>
                    <strong className="text-slate-900">Automatic Finality Expiry:</strong> If 48 hours elapse with no dispute ticket submitted, the contract automatically signs key 3 with key 2 to disburse merchant payout, preventing malicious buyer lockups.
                  </li>
                  <li>
                    <strong className="text-slate-900">72-Hour Dispatch Deadline:</strong> If a merchant fails to input valid flight tracking telemetry within 72 hours of escrow deposit, the buyer can unilaterally reclaim 100% of their cryptocurrency.
                  </li>
                </ul>
              </div>

              {/* Smart Contract Security Audits */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">Security &amp; Re-Entrancy Audits</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our escrow smart contract repository is audited against re-entrancy vulnerabilities, arithmetic overflows, and flash-loan manipulation. OpenZeppelin standard templates are utilized for all token transfers and signature recoveries.
                </p>
              </div>

            </div>
          </div>

          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="escrow-rules" />
          </div>
        </div>

      </div>
    </div>
  )
}
