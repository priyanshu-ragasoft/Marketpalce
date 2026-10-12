import React, { useState } from 'react'
import { useRouter, Link } from '../router/RouterContext'

export default function MyOrdersPage() {
  const { navigate } = useRouter()
  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'escrow' | 'delivered' | 'vault'
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null)
  const [releaseSuccessId, setReleaseSuccessId] = useState(null)

  // Retrieve current logged in user from localStorage if available
  const currentUser = (() => {
    try {
      const stored = localStorage.getItem('currentUser')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })()

  const walletAddr = currentUser?.wallet_address || '0xa35af7955e383c49962f5402dce801f429aa6e8e'
  const shortWallet = `${walletAddr.slice(0, 6)}...${walletAddr.slice(-4)}`
  const displayName = currentUser?.display_name || currentUser?.user_name || 'Tab'

  // Comprehensive Orders Data with Escrow & Vault state
  const orders = [
    {
      id: 'CS-89421',
      date: 'Oct 08, 2026',
      title: 'Apple iPhone 18 Pro Max 1TB (Natural Titanium)',
      category: 'Smartphones',
      amountCrypto: '0.425 ETH',
      amountUSD: '$1,480.00',
      status: 'In Transit',
      statusDetail: 'Air Freight — Customs Cleared at LHR',
      escrowState: 'Locked in 2-of-3 Multi-Sig',
      escrowFundsLocked: true,
      carrier: 'FedEx International Priority Air',
      trackingCode: 'FX-8821903412',
      serialNumber: 'F17XJ892KP9Q',
      appleCareStatus: 'AppleCare+ Active (2 Years)',
      vaultHash: '0x89fc32a90184b912c019d45e039bf1029c882190',
      merchant: 'Cupertino Direct Depot',
      estimatedDelivery: 'Tomorrow by 14:00 GMT',
      canRelease: false,
    },
    {
      id: 'CS-73204',
      date: 'Oct 07, 2026',
      title: 'Apple Watch Ultra 3 (Titanium GPS + Cellular 49mm)',
      category: 'Wearables',
      amountCrypto: '799 USDT',
      amountUSD: '$799.00',
      status: 'Out for Delivery',
      statusDetail: 'Courier En Route with Direct Signature Required',
      escrowState: 'Locked in Multi-Sig (Inspection Pending)',
      escrowFundsLocked: true,
      carrier: 'FedEx Priority Overnight',
      trackingCode: 'FX-4401928390',
      serialNumber: 'G6TZ89LM001A',
      appleCareStatus: 'AppleCare+ Enrolled',
      vaultHash: '0x71a4290fb9102c892b19283904419283a0491823',
      merchant: 'Spill Official Store',
      estimatedDelivery: 'Today by 16:30 EST',
      canRelease: true,
    },
    {
      id: 'CS-55102',
      date: 'Sep 29, 2026',
      title: 'Apple iPad Pro 13" M4 OLED 512GB (Space Black)',
      category: 'Tablets',
      amountCrypto: '0.380 ETH',
      amountUSD: '$1,299.00',
      status: 'Delivered',
      statusDetail: 'Inspection Window Completed — Ownership Bound',
      escrowState: 'Released to Merchant Vault',
      escrowFundsLocked: false,
      carrier: 'DHL Express Worldwide',
      trackingCode: 'DHL-3901924190',
      serialNumber: 'D89XLL1209PQ',
      appleCareStatus: 'AppleCare+ Active',
      vaultHash: '0x3918290ab9102381928340192840192840192834',
      merchant: 'Express Tech Logistics',
      estimatedDelivery: 'Delivered on Oct 02',
      canRelease: false,
    },
  ]

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'escrow') return o.escrowFundsLocked
    if (activeFilter === 'delivered') return !o.escrowFundsLocked
    return true
  })

  const handleReleaseEscrow = (orderId) => {
    const confirmed = window.confirm(
      `Confirm delivery for Order ${orderId}? This will cryptographically sign the multi-sig release and transfer funds to the verified merchant.`
    )
    if (confirmed) {
      setReleaseSuccessId(orderId)
      setTimeout(() => setReleaseSuccessId(null), 4000)
    }
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 pb-20">
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/" className="hover:text-slate-900 transition flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-slate-400">Account</span>
            <span>/</span>
            <span className="text-slate-900 font-bold">My Orders &amp; Vault</span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-900 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D1A61B] animate-pulse" />
              <span>Verified Web3 Shopper Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Orders &amp; Digital Asset Vault
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Track your pending hardware shipments, verify your 2-of-3 multi-sig escrow locks, and inspect immutable hardware ownership certificates stored in your wallet.
            </p>
          </div>

          {/* Connected Account Mini-Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm uppercase shadow-xs shrink-0"
              style={{ backgroundColor: '#D1A61B', color: '#000000' }}
            >
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-extrabold text-slate-900 text-sm">{displayName}</p>
                <span 
                  style={{ backgroundColor: '#D1A61B', color: '#000000' }}
                  className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase leading-none"
                >
                  PRO
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-slate-600">{shortWallet}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">3 Total Orders • 100% Escrow Protected</p>
            </div>
          </div>
        </div>

        {/* Success Alert Banner when Escrow is Released */}
        {releaseSuccessId && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-fadeIn">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              ✓
            </div>
            <div>
              <p className="font-bold text-sm">Escrow Released Successfully for Order {releaseSuccessId}!</p>
              <p className="text-xs text-emerald-700">Funds have been cryptographically transferred to the verified merchant. Your digital ownership NFT is now bound to your wallet.</p>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Purchases</p>
            <p className="text-2xl font-black text-slate-900 mt-1">3 Devices</p>
            <p className="text-[11px] text-slate-500 mt-0.5">$3,578.00 USD Equivalent</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Funds in Escrow</p>
            <p className="text-2xl font-black text-amber-600 mt-1">0.425 ETH</p>
            <p className="text-[11px] text-slate-500 mt-0.5">+ 799 USDT in Multi-Sig</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Shipments</p>
            <p className="text-2xl font-black text-blue-600 mt-1">2 In Transit</p>
            <p className="text-[11px] text-slate-500 mt-0.5">FedEx Priority Air Freight</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Escrow Fee</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">0% Free</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Guaranteed by Multi-Sig Vault</p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Purchases (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('escrow')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'escrow'
                ? 'bg-amber-500 text-black shadow-xs font-black'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>Active in Escrow (2)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('delivered')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeFilter === 'delivered'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Completed &amp; Released (1)</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/account/escrow')}
            className="ml-auto px-4 py-2 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Inspect Escrow Vault Architecture</span>
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200"
            >
              {/* Order Card Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-800 text-sm">
                    📦
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-slate-900">{order.id}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">{order.date}</span>
                    </div>
                    <p className="text-xs text-slate-400">Sold by: <span className="font-semibold text-slate-600">{order.merchant}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-black text-slate-900 text-base">{order.amountCrypto}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{order.amountUSD}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${
                    order.status === 'In Transit'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : order.status === 'Out for Delivery'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Body */}
              <div className="py-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Product & Shipping Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {order.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span>Status: <strong className="text-slate-800">{order.statusDetail}</strong></span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Carrier &amp; Air Bill</p>
                      <p className="font-medium text-slate-800 mt-0.5">{order.carrier}</p>
                      <p className="font-mono text-slate-500 font-bold mt-0.5">{order.trackingCode}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Hardware Serial (Apple GSX)</p>
                      <p className="font-mono text-slate-800 font-bold mt-0.5">{order.serialNumber}</p>
                      <p className="text-emerald-600 font-medium mt-0.5">{order.appleCareStatus}</p>
                    </div>
                  </div>
                </div>

                {/* Right Col: Escrow & Multi-Sig Vault Status Box */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col justify-between border border-slate-800">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] uppercase font-black tracking-wider text-[#D1A61B] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D1A61B] animate-pulse" />
                        0% Escrow Vault
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">2-of-3 Multi-Sig</span>
                    </div>

                    <p className="text-xs font-bold text-slate-200">
                      {order.escrowState}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {order.escrowFundsLocked 
                        ? 'Funds are held in decentralized smart contract. Payment is guaranteed until 48h after you inspect the device.'
                        : 'Inspection window completed. Escrow has successfully released payment to merchant vault.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Est. Delivery:</span>
                    <strong className="text-white">{order.estimatedDelivery}</strong>
                  </div>
                </div>
              </div>

              {/* Order Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Vault Hash:</span>
                  <span className="text-slate-600 truncate max-w-[160px] sm:max-w-[240px]">{order.vaultHash}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Track Order Direct Link */}
                  <button
                    type="button"
                    onClick={() => navigate('/help/track-order')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Track Shipment</span>
                  </button>

                  {/* Release Escrow Action Button */}
                  {order.canRelease ? (
                    <button
                      type="button"
                      onClick={() => handleReleaseEscrow(order.id)}
                      style={{ backgroundColor: '#D1A61B', color: '#000000' }}
                      className="px-4 py-2 hover:brightness-105 active:brightness-95 text-xs font-black uppercase rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Confirm &amp; Release Escrow</span>
                    </button>
                  ) : order.escrowFundsLocked ? (
                    <button
                      type="button"
                      onClick={() => navigate('/account/escrow')}
                      className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Vault Locked (Inspection Active)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => alert(`Warranty Ownership Token: ${order.vaultHash}\nIssued for Apple Serial: ${order.serialNumber}`)}
                      className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>✓ Ownership NFT Bound</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Asset & Warranty Proof Explanation Card */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">How the CryptoSpill Digital Hardware Vault Protects You</h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Every purchase made with crypto generates cryptographic proof of hardware authenticity and factory warranty.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/help/warranty')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition cursor-pointer shrink-0"
            >
              View Apple Care+ Policy
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-slate-600">
            <div className="space-y-1.5">
              <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold text-xs">1</span>
                <span>Zero Escrow Fee (0%)</span>
              </p>
              <p className="leading-relaxed text-slate-500">
                100% of your crypto is locked in the smart contract until your package is safely delivered and inspected. No cut is taken from your guarantee.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold text-xs">2</span>
                <span>48-Hour Inspection Window</span>
              </p>
              <p className="leading-relaxed text-slate-500">
                You have 48 hours after courier signature to test battery health, screen condition, and Apple serial bindings before releasing funds.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold text-xs">3</span>
                <span>Cryptographic Ownership Receipt</span>
              </p>
              <p className="leading-relaxed text-slate-500">
                Each completed order issues an on-chain ownership certificate proving legitimate purchase date and warranty eligibility worldwide.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
