import React from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function InstantPayoutsPage() {
  const { navigate } = useRouter()

  const settlementRails = [
    { asset: 'USDT (Tether)', network: 'Arbitrum, Polygon, Ethereum', speed: '< 30 Seconds', fee: '$0.00 Platform Fee', min: '$50.00' },
    { asset: 'USDC (Circle)', network: 'Base, Solana, Ethereum', speed: '< 15 Seconds', fee: '$0.00 Platform Fee', min: '$50.00' },
    { asset: 'Bitcoin (BTC)', network: 'Native SegWit / Lightning', speed: '1 Block (~10 mins)', fee: 'Network Gas Only', min: '0.005 BTC' },
    { asset: 'Ethereum (ETH)', network: 'Ethereum Mainnet', speed: '< 1 Minute', fee: 'Network Gas Only', min: '0.05 ETH' },
    { asset: 'SEPA Direct Wire', network: 'European Banking (IBAN)', speed: 'Same Day / Next Morning', fee: '0.1% Banking Spread', min: '€1,000' },
    { asset: 'SWIFT International', network: 'Global Wire Transfer', speed: '24 - 48 Hours', fee: '$25 Flat Wire Fee', min: '$5,000' },
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
            <span className="text-slate-900 font-bold">Instant Payouts</span>
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
              Instant Liquidity Engine
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Merchant Payout Settlement Rails
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Eliminate multi-week merchant processing holds. Receive automated liquidity in stablecoins (USDT/USDC), native cryptocurrencies, or direct fiat wires the moment delivery is confirmed.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              
              <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
                <h4 className="font-bold text-sm sm:text-base">Why Merchants Choose CryptoSpill Settlement:</h4>
                <p className="text-xs leading-relaxed">
                  Traditional payment gateways like Stripe and PayPal frequently place high-volume consumer tech sellers on 10% rolling reserve holds for up to 180 days. On CryptoSpill, there are <strong className="text-slate-950">zero rolling reserves</strong>. When an escrow release occurs, 100% of the net transaction balance settles immediately to your configured wallet or bank account.
                </p>
              </div>

              {/* Settlement Rails Table */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">Supported Payout Rails &amp; Settlement Speeds</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-900 font-bold">
                      <tr>
                        <th className="p-3 border-b border-slate-200">Asset</th>
                        <th className="p-3 border-b border-slate-200">Network / Rail</th>
                        <th className="p-3 border-b border-slate-200">Settlement Time</th>
                        <th className="p-3 border-b border-slate-200">Min Threshold</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {settlementRails.map((rail, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-bold text-slate-900">{rail.asset}</td>
                          <td className="p-3 text-slate-600">{rail.network}</td>
                          <td className="p-3 font-semibold text-emerald-600">{rail.speed}</td>
                          <td className="p-3 text-slate-500 font-mono">{rail.min}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Automated Payout Trigger Mechanics */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">How Payouts Are Triggered</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h5 className="font-bold text-slate-900 mb-1">Scenario A: Buyer Approval</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Shopper signs on-chain approval upon unboxing and validating the Apple serial. Payout contract triggers automated smart contract transfer within 30 seconds.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h5 className="font-bold text-slate-900 mb-1">Scenario B: 48-Hour Timer Expiry</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Following confirmed carrier delivery, if no dispute claim is registered within 48 hours, the protocol oracle automatically releases funds to the merchant wallet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Invoicing & Accounting */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">Enterprise Merchant Reporting</h4>
                <p>
                  Every payout is accompanied by an immutable cryptographic receipt and a downloadable PDF VAT invoice containing full itemized transaction breakdowns, blockchain block heights, and currency conversion benchmarks for seamless corporate accounting.
                </p>
              </div>

            </div>
          </div>

          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="payouts" />
          </div>
        </div>

      </div>
    </div>
  )
}
