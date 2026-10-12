import React, { useState, useMemo } from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function FaqPage() {
  const { navigate } = useRouter()
  const [activeFaq, setActiveFaq] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqs = [
    // Escrow & Crypto Payments
    {
      id: 1,
      cat: 'crypto',
      q: 'How does CryptoSpill guarantee authenticity on Apple hardware?',
      a: 'All merchants on CryptoSpill are verified authorized distributors and audited volume sellers. Every device shipped is 100% factory-sealed with authentic verifiable serial numbers. Furthermore, funds remain locked inside the decentralized smart contract escrow until you unbox and verify coverage on Apple.com.',
    },
    {
      id: 2,
      cat: 'crypto',
      q: 'Which cryptocurrencies are supported at checkout?',
      a: 'We accept Bitcoin (BTC), Ethereum (ETH), USDT (ERC-20, TRC-20, Arbitrum, Polygon), USDC, Solana (SOL), and native SPILL tokens. Shoppers can connect MetaMask, Phantom, Coinbase Wallet, WalletConnect, or transfer directly to unique smart contract deposit addresses.',
    },
    {
      id: 3,
      cat: 'crypto',
      q: 'How does the 30-Minute Crypto Price Lock protect me against volatility?',
      a: 'Cryptocurrency markets are volatile. When you start checkout, our Pyth Network and Chainlink decentralized oracle feeds lock the exchange rate for exactly 30 minutes. The crypto amount shown at review is the exact quantity deducted, even if spot prices fluctuate violently during block confirmation.',
    },
    {
      id: 4,
      cat: 'crypto',
      q: 'Are there any hidden escrow fees or withdrawal surcharges?',
      a: 'Shoppers pay 0% escrow fee. The price you see on the product page in USD and crypto is the exact amount deducted. Marketplace commissions (0.5% – 1.5%) are paid solely by merchants upon successful order completion.',
    },
    {
      id: 5,
      cat: 'crypto',
      q: 'How do I release escrow funds once I receive my device?',
      a: 'Once your parcel arrives, you have a 48-hour inspection window. Simply navigate to your order receipt, review the device serial, and click "Release Escrow". If no dispute is filed within 48 hours, the smart contract automatically executes payout.',
    },
    
    // Shipping & Delivery
    {
      id: 6,
      cat: 'shipping',
      q: 'What happens if my parcel is lost or damaged in transit?',
      a: 'Every shipment via FedEx Priority Air or DHL Express is insured for 100% replacement value under our bonded cargo underwriting fund. If the carrier report indicates loss or in-transit damage, the smart contract escrow releases a full 100% refund in your original cryptocurrency or dispatches an immediate advance replacement unit.',
    },
    {
      id: 7,
      cat: 'shipping',
      q: 'Do I have to pay import customs duties or VAT upon delivery?',
      a: 'No. All shipments to the USA, Canada, European Union, United Kingdom, UAE, and Singapore are dispatched under DDP (Delivered Duty Paid) terms. All customs duties, VAT, and broker handling fees are prepaid by the merchant. The courier will never demand cash on delivery.',
    },
    {
      id: 8,
      cat: 'shipping',
      q: 'Are parcels shipped discreetly for personal security?',
      a: 'Yes. All hardware is packed in heavy-duty unbranded cartons with tamper-evident serialized holographic void tape. The external shipping manifest carries generic electronic terminology and contains zero references to cryptocurrency, Bitcoin, or Apple logos.',
    },
    {
      id: 9,
      cat: 'shipping',
      q: 'Are lithium-ion batteries safe to ship by international air freight?',
      a: 'All Apple devices containing lithium-ion batteries are certified under IATA Section II of Packing Instruction 967 (UN3481). Devices are state-of-charge compliant (< 30% battery capacity) and packed in ESD anti-static fire-retardant enclosures safe for commercial passenger and cargo air transport.',
    },

    // Apple Hardware & Warranty
    {
      id: 10,
      cat: 'hardware',
      q: 'Is the 1-Year Apple Warranty valid worldwide at any Apple Store?',
      a: 'Yes. Apple hardware includes an official 1-Year Limited Worldwide Warranty registered in Apple GSX (Global Service Exchange). You can bring your device to any official Apple Store (Genius Bar) or Apple Authorized Service Provider (AASP) in any country without presenting a printed paper receipt.',
    },
    {
      id: 11,
      cat: 'hardware',
      q: 'Can I purchase AppleCare+ for my device?',
      a: 'Yes. Because our units are authentic, unactivated sealed stock, you can purchase AppleCare+ directly through your iOS device (under Settings > General > About > AppleCare+ Coverage Available) or via apple.com within 60 days of initial power-on setup.',
    },
    {
      id: 12,
      cat: 'hardware',
      q: 'How does the 14-Day Advance Replacement guarantee work?',
      a: 'If your hardware arrives defective (DOA), screen glitched, or cosmetically damaged in transit, you can initiate an RMA within 14 days. We provide a prepaid FedEx Express return waybill, and a brand-new sealed unit is dispatched within 24 hours of tracking scan.',
    },
    {
      id: 13,
      cat: 'hardware',
      q: 'How fast are Apple Gift Cards and digital license keys delivered?',
      a: 'Digital products (such as $500 Apple Gift Cards, Apple One Family Passes, and Final Cut Pro licenses) are dispatched automatically within 60 seconds of blockchain transaction confirmation to your registered email address and on-screen receipt.',
    },

    // Merchant & Trust
    {
      id: 14,
      cat: 'merchant',
      q: 'What is the 2-of-3 Multi-Signature escrow architecture?',
      a: 'Every transaction creates an isolated cryptographic smart contract vault with 3 keys: Buyer Key, Merchant Key, and CryptoSpill Arbiter Key. To move funds, 2 signatures are mandatory. When satisfied, Buyer + Merchant sign and funds release. The Arbiter only signs if a dispute is raised.',
    },
    {
      id: 15,
      cat: 'merchant',
      q: 'What standards must merchants meet to sell Apple hardware?',
      a: 'Merchants must submit audited wholesale inventory manifests, lock a security deposit bond in multi-sig escrow, maintain an air dispatch SLA under 24 hours, and maintain a dispute rate strictly below 0.3%. Counterfeit attempts result in immediate bond confiscation.',
    },
    {
      id: 16,
      cat: 'merchant',
      q: 'How does CryptoSpill handle buyer privacy and shipping addresses?',
      a: 'Customer delivery addresses are stored in temporary RAM encrypted with merchant public PGP keys. Upon carrier delivery confirmation and 14-day warranty completion, delivery details are cryptographically shredded and expunged from all logs.',
    },
  ]

  // Filtered FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.cat === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = !query || item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query)
      return matchesCat && matchesSearch
    })
  }, [faqs, selectedCategory, searchQuery])

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
            <span className="text-slate-600">Help &amp; Escrow</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Frequently Asked Questions</span>
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
              Knowledge Base &amp; FAQ
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Frequently Asked Questions &amp; Support Guide
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Explore in-depth documentation on smart contract escrow mechanics, crypto payment volatility locks, air shipping insurance, customs clearance, and Apple worldwide warranties.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main FAQ Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search Bar & Filter Controls */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g., escrow, customs, applecare, refund, fedex)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-700 font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold">
                {[
                  { id: 'all', label: 'All Topics', count: faqs.length },
                  { id: 'crypto', label: 'Crypto & Escrow', count: faqs.filter(f => f.cat === 'crypto').length },
                  { id: 'shipping', label: 'Shipping & Customs', count: faqs.filter(f => f.cat === 'shipping').length },
                  { id: 'hardware', label: 'Hardware & Warranty', count: faqs.filter(f => f.cat === 'hardware').length },
                  { id: 'merchant', label: 'Merchant & Security', count: faqs.filter(f => f.cat === 'merchant').length },
                ].map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === category.id
                        ? 'bg-amber-400 text-black shadow-xs font-black'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{category.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === category.id ? 'bg-black/15 text-black' : 'bg-white text-slate-500'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

            </div>

            {/* Questions List */}
            {filteredFaqs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
                <span className="text-3xl">🔍</span>
                <h3 className="text-base font-bold text-slate-900">No matching questions found</h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your search terms or select "All Topics" to browse all entries.
                </p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-yellow-400 hover:text-black transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((f, i) => {
                  const isOpen = activeFaq === f.id
                  return (
                    <div 
                      key={f.id} 
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : f.id)}
                        className="w-full p-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                      >
                        <span className="pr-4 leading-snug flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black flex items-center justify-center shrink-0">
                            Q
                          </span>
                          {f.q}
                        </span>
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold shrink-0 transition-transform ${
                          isOpen ? 'bg-amber-400 text-black rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 pt-4 leading-relaxed animate-fadeIn">
                          <p>{f.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Live Support Escalation Card */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 block mb-1">
                  Need Personalized Help?
                </span>
                <h3 className="text-base font-bold text-white">
                  Have a specific question about your active order?
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Our live escrow desk and carrier logistics dispatchers are on standby 24/7.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs transition"
                >
                  💬 Telegram Desk
                </a>
                <Link
                  to="/help/track-order"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700"
                >
                  Track Order
                </Link>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="faq" />
          </div>

        </div>

      </div>
    </div>
  )
}
