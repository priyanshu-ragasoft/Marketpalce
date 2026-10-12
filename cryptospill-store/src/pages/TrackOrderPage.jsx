import React, { useState } from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function TrackOrderPage() {
  const { navigate } = useRouter()
  const [trackingInput, setTrackingInput] = useState('CS-89421')
  const [actionNotice, setActionNotice] = useState(null)

  // Realistic sample orders database
  const sampleOrders = {
    'CS-89421': {
      orderId: 'CS-89421',
      item: 'iPhone 18 Pro Max 1TB (Natural Titanium)',
      carrier: 'FedEx International Priority Air',
      trackingNumber: 'FX-8821903412',
      status: 'In Transit — Customs Pre-Cleared',
      currentStep: 3,
      origin: 'San Francisco Vault (SFO Air Cargo Hub)',
      destination: 'London Heathrow (LHR) & Regional Dispatch',
      estimatedDelivery: 'Tomorrow by 14:00 GMT',
      serialNumber: 'F17XJ892KP9Q (Apple GSX Verified)',
      escrowState: 'Locked in 2-of-3 Multi-Sig (0.425 ETH)',
      inspectionWindow: '48 Hours Starts Upon Signature Delivery',
      milestones: [
        { label: 'Escrow Funded', time: 'Oct 08, 09:15 UTC', detail: 'Smart contract received 0.425 ETH payment. Oracle locked rate.', done: true },
        { label: 'Depot Quality Check & Serial Bind', time: 'Oct 08, 11:30 UTC', detail: 'Factory seal inspected. Serial F17XJ892KP9Q verified on Apple GSX.', done: true },
        { label: 'Dispatched via FedEx Air Freight', time: 'Oct 08, 16:45 UTC', detail: 'Boarded flight FX-1104 SFO to Frankfurt/London cargo route.', done: true },
        { label: 'Out for Courier Delivery', time: 'Pending Arrival', detail: 'Local FedEx Express driver assigned for direct signature.', done: false },
        { label: 'Inspection Window & Escrow Release', time: 'Pending Delivery', detail: 'Buyer has 48h to verify device before funds release.', done: false },
      ],
    },
    'CS-73204': {
      orderId: 'CS-73204',
      item: 'Apple Watch Ultra 3 (Titanium GPS + Cellular)',
      carrier: 'FedEx Priority Overnight',
      trackingNumber: 'FX-4401928390',
      status: 'Out for Delivery — Direct Signature Required',
      currentStep: 4,
      origin: 'New York Regional Distribution Hub',
      destination: 'Manhattan, NY, United States',
      estimatedDelivery: 'Today by 16:30 EST',
      serialNumber: 'G6TZ89LM001A (Apple GSX Verified)',
      escrowState: 'Locked in Multi-Sig (799 USDT)',
      inspectionWindow: 'Inspection Timer ready to activate on courier scan',
      milestones: [
        { label: 'Escrow Funded', time: 'Oct 07, 14:00 UTC', detail: '799 USDT confirmed on Polygon PoS.', done: true },
        { label: 'Depot Quality Check & Serial Bind', time: 'Oct 07, 15:20 UTC', detail: 'Unopened box sealed with holographic tape.', done: true },
        { label: 'Dispatched via FedEx Air Freight', time: 'Oct 07, 21:00 UTC', detail: 'Departed JFK sorting terminal.', done: true },
        { label: 'Out for Courier Delivery', time: 'Oct 09, 08:30 EST', detail: 'Courier en route to recipient address.', done: true },
        { label: 'Inspection Window & Escrow Release', time: 'Pending Delivery', detail: 'Buyer signature triggers 48h countdown.', done: false },
      ],
    },
    'CS-91055': {
      orderId: 'CS-91055',
      item: 'MacBook Pro 16" M4 Max 64GB / 2TB Space Black',
      carrier: 'DHL Express Aviation (Air Freight)',
      trackingNumber: 'DHL-9920148811',
      status: 'Order Verified — Awaiting Flight Loading',
      currentStep: 2,
      origin: 'Frankfurt Central Depository (FRA Vault)',
      destination: 'Geneva, Switzerland',
      estimatedDelivery: 'In 2 Business Days',
      serialNumber: 'W909KL234P11 (Apple GSX Verified)',
      escrowState: 'Locked in Multi-Sig (1.18 ETH)',
      inspectionWindow: '48 Hours Starts Upon Signature Delivery',
      milestones: [
        { label: 'Escrow Funded', time: 'Oct 09, 04:12 UTC', detail: '1.18 ETH locked in multi-sig vault.', done: true },
        { label: 'Depot Quality Check & Serial Bind', time: 'Oct 09, 06:40 UTC', detail: 'Serial W909KL234P11 validated on Apple GSX.', done: true },
        { label: 'Dispatched via Air Freight', time: 'Estimated Oct 09, 18:00 UTC', detail: 'Air waybill generated, awaiting DHL flight scan.', done: false },
        { label: 'Out for Courier Delivery', time: 'Pending Arrival', detail: 'Assigned for local express distribution.', done: false },
        { label: 'Inspection Window & Escrow Release', time: 'Pending Delivery', detail: '48h countdown to inspect hardware.', done: false },
      ],
    },
  }

  // Active tracking state defaults to CS-89421
  const [activeOrder, setActiveOrder] = useState(sampleOrders['CS-89421'])

  const handleTrackSubmit = (e) => {
    e.preventDefault()
    const query = trackingInput.trim().toUpperCase()
    if (sampleOrders[query]) {
      setActiveOrder(sampleOrders[query])
      setActionNotice(null)
    } else {
      // Generate a dynamic tracked order for any custom ID
      setActiveOrder({
        orderId: query || 'CS-CUSTOM',
        item: 'Apple Hardware Order',
        carrier: 'FedEx International Priority Air',
        trackingNumber: 'FX-' + Math.floor(1000000000 + Math.random() * 9000000000),
        status: 'In Transit — Customs Cleared',
        currentStep: 3,
        origin: 'San Francisco Depot (Authorized Vault)',
        destination: 'Delivered via Escrow Protection',
        estimatedDelivery: 'Within 24 to 48 Hours',
        serialNumber: 'AUTOCONFIRMED-' + Math.floor(100000 + Math.random() * 900000),
        escrowState: 'Protected in 2-of-3 Multi-Sig Smart Contract',
        inspectionWindow: '48 Hours Active Upon Signature',
        milestones: [
          { label: 'Escrow Funded', time: 'Confirmed on Blockchain', detail: 'Escrow deposit verified.', done: true },
          { label: 'Depot Quality Check & Serial Bind', time: 'Verified', detail: 'Sealed box and serial validated.', done: true },
          { label: 'Dispatched via FedEx Air Freight', time: 'In Flight', detail: 'En route via priority air carrier.', done: true },
          { label: 'Out for Courier Delivery', time: 'Pending Regional Hub', detail: 'Local carrier dispatch.', done: false },
          { label: 'Inspection Window & Escrow Release', time: 'Pending Arrival', detail: '48h inspection period.', done: false },
        ],
      })
      setActionNotice(null)
    }
  }

  const handleReleaseEscrow = () => {
    setActionNotice({
      type: 'success',
      text: 'Simulated Action: Escrow funds approved for release! Merchant payout executed on blockchain rail.',
    })
  }

  const handleDispute = () => {
    setActionNotice({
      type: 'warning',
      text: 'Simulated Action: Dispute ticket created! 48-Hour timer paused and CryptoSpill arbiter assigned to inspect courier telemetry.',
    })
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
            <span className="text-slate-600">Help &amp; Escrow</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Track Active Order</span>
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
              Real-Time Escrow &amp; Flight Telemetry
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Track Active Order &amp; Multi-Sig Escrow
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Monitor live carrier flight tracking and smart contract milestones. Your cryptocurrency deposit remains locked in decentralized escrow until the 48-hour inspection period concludes.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Tracking Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search Input Box with Sample Order Buttons */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-base font-black text-slate-950">
                Lookup Active Consignment
              </h2>

              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter Order ID (e.g. CS-89421) or Tracking Number..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-yellow-400 hover:text-black text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0"
                >
                  Inspect Order
                </button>
              </form>

              {/* Sample Order Quick-Select Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-bold">Inspect Demo Orders:</span>
                {Object.keys(sampleOrders).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setTrackingInput(id)
                      setActiveOrder(sampleOrders[id])
                      setActionNotice(null)
                    }}
                    className={`px-3 py-1.5 rounded-xl border font-mono text-[11px] font-bold transition cursor-pointer ${
                      activeOrder.orderId === id
                        ? 'border-yellow-400 bg-amber-50 text-slate-950 ring-2 ring-yellow-400/30'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Feedback Banner */}
            {actionNotice && (
              <div className={`p-4 rounded-2xl border text-xs font-medium animate-fadeIn ${
                actionNotice.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                {actionNotice.text}
              </div>
            )}

            {/* Tracking Results Card */}
            {activeOrder && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Header Summary */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                        {activeOrder.orderId}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {activeOrder.status}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-950">
                      {activeOrder.item}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Carrier Tracking</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 block">
                      {activeOrder.trackingNumber}
                    </span>
                    <span className="text-[11px] text-amber-700 font-semibold">
                      {activeOrder.carrier}
                    </span>
                  </div>
                </div>

                {/* Logistics & Escrow Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-400 font-bold block mb-0.5">Estimated Delivery</span>
                    <span className="font-bold text-slate-900">{activeOrder.estimatedDelivery}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-400 font-bold block mb-0.5">Assigned Apple Serial</span>
                    <span className="font-mono font-bold text-amber-700">{activeOrder.serialNumber}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-400 font-bold block mb-0.5">Escrow Multi-Sig State</span>
                    <span className="font-bold text-emerald-700">{activeOrder.escrowState}</span>
                  </div>
                </div>

                {/* 5-Step Visual Timeline */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Milestone Progress Telemetry
                  </h4>

                  <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {activeOrder.milestones.map((m, idx) => (
                      <div key={idx} className="relative">
                        <span className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                          m.done 
                            ? 'bg-amber-400 text-black shadow-xs' 
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {m.done ? '✓' : idx + 1}
                        </span>

                        <div>
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {m.label}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {m.time}
                            </span>
                          </div>
                          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                            {m.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 48-Hour Inspection Escrow Actions */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider block">
                        48-Hour Escrow Protection Window
                      </span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {activeOrder.inspectionWindow}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleReleaseEscrow}
                        className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs transition cursor-pointer"
                      >
                        Release Escrow Fund
                      </button>
                      <button
                        type="button"
                        onClick={handleDispute}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-white font-bold text-xs transition border border-slate-700 cursor-pointer"
                      >
                        Raise Dispute
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="track-order" />
          </div>

        </div>

      </div>
    </div>
  )
}
