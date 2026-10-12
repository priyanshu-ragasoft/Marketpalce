import React from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function TermsPage() {
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
            <span className="text-slate-900 font-bold">Terms of Service</span>
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
              User Agreement &amp; Protocol Rules
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Marketplace Terms of Service &amp; Sale
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Last updated: October 2026 &bull; Official rules governing on-chain decentralized escrow, crypto transactions, price lock validity, and hardware dispatch agreements.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              
              {/* Section 1 */}
              <div className="space-y-2 pb-6 border-b border-slate-100">
                <span className="text-[10.5px] font-black uppercase text-amber-700 tracking-wider">Section 1.0</span>
                <h3 className="text-base font-bold text-slate-950">Acceptance of Decentralized Protocols</h3>
                <p>
                  By accessing, browsing, connecting a Web3 wallet, or submitting an order through the CryptoSpill Decentralized Marketplace, you explicitly agree to be bound by these Terms of Sale. If you do not accept these terms in their entirety, you must discontinue platform use immediately.
                </p>
                <p className="text-slate-500 text-xs">
                  All transactions initiated through the store are executed via audited on-chain smart contracts. You acknowledge that blockchain transactions are irreversible once confirmed on the consensus ledger, subject to the escrow conditions outlined herein.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-2 pb-6 border-b border-slate-100">
                <span className="text-[10.5px] font-black uppercase text-amber-700 tracking-wider">Section 2.0</span>
                <h3 className="text-base font-bold text-slate-950">Cryptocurrency Quotations &amp; 30-Minute Price Lock</h3>
                <p>
                  Marketplace goods are denominated in United States Dollars (USD) and converted in real-time to supported cryptocurrencies (Bitcoin, Ethereum, Solana, USDT, USDC, SPILL) using decentralized price oracles (Chainlink and Pyth Network).
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1">
                  <p className="font-bold">The 30-Minute Volatility Guarantee:</p>
                  <p className="text-xs">
                    Upon clicking &ldquo;Proceed to Crypto Checkout&rdquo;, the exact token exchange rate is locked for exactly 30 minutes. If the on-chain deposit is confirmed within this 30-minute window, the merchant must honor the order regardless of market price fluctuations. Transactions submitted past the 30-minute expiration may require rate recalculation.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-2 pb-6 border-b border-slate-100">
                <span className="text-[10.5px] font-black uppercase text-amber-700 tracking-wider">Section 3.0</span>
                <h3 className="text-base font-bold text-slate-950">Smart Contract Escrow Mechanics &amp; Multi-Sig Governance</h3>
                <p>
                  Funds deposited for hardware or digital services do NOT flow directly into merchant possession. Instead, 100% of the principal is locked inside an EVM-compatible 2-of-3 multi-signature escrow vault contract.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
                  <li><strong className="text-slate-900">Shopper Release:</strong> The buyer possesses the primary cryptographic key to release payout following unboxing and serial verification.</li>
                  <li><strong className="text-slate-900">Merchant Consent:</strong> Authorized sellers can execute cancellation refunds if inventory is depleted or export embargoes apply.</li>
                  <li><strong className="text-slate-900">Arbitration Desk:</strong> CryptoSpill escrow arbitrators hold the third key, exercised strictly in contested carrier non-delivery claims.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-2 pb-6 border-b border-slate-100">
                <span className="text-[10.5px] font-black uppercase text-amber-700 tracking-wider">Section 4.0</span>
                <h3 className="text-base font-bold text-slate-950">Authenticity Guarantee &amp; Serial Logging</h3>
                <p>
                  Merchants warrant and guarantee that all Apple devices fulfilled are genuine, factory-sealed, un-activated units with active 1-Year Apple Worldwide Manufacturer Warranty. Prior to handing over parcels to FedEx or DHL Express, the merchant is required to register the box serial number to the cryptographic order receipt.
                </p>
                <p className="text-xs text-slate-500">
                  Any merchant found attempting to fulfill open-box, refurbished, or modified stock faces immediate contract termination, forfeiture of performance bond, and blacklisting across decentralized trade networks.
                </p>
              </div>

              {/* Section 5 */}
              <div className="space-y-2 pb-6 border-b border-slate-100">
                <span className="text-[10.5px] font-black uppercase text-amber-700 tracking-wider">Section 5.0</span>
                <h3 className="text-base font-bold text-slate-950">Inspection Period &amp; Automated Finality</h3>
                <p>
                  Upon official carrier delivery scan (FedEx / DHL door delivery timestamp), the buyer is granted a <strong className="text-slate-900">48-Hour Inspection Window</strong>. During this window, the buyer can inspect the sealed package and verify coverage on Apple.com.
                </p>
                <p className="text-xs text-slate-500">
                  If the buyer neither confirms release nor lodges a dispute ticket within the 48-hour window, the smart contract automatically executes payout release to the merchant to prevent indefinite seller liquidity lockups.
                </p>
              </div>

              {/* Section 6 */}
              <div className="space-y-2">
                <span className="text-[10.5px] font-black uppercase text-amber-700 tracking-wider">Section 6.0</span>
                <h3 className="text-base font-bold text-slate-950">Dispute Resolution &amp; Independent Carrier Audits</h3>
                <p>
                  In the event of lost transit, damaged parcel exterior, or defective merchandise, dispute resolution is governed by official courier inspection manifests and Apple serial status records. CryptoSpill does not charge shoppers for dispute mediation.
                </p>
              </div>

            </div>
          </div>

          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="terms" />
          </div>
        </div>

      </div>
    </div>
  )
}
