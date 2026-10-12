import React, { useState } from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function ShippingCoveragePage() {
  const { navigate } = useRouter()

  // Interactive transit calculator state
  const [selectedRegion, setSelectedRegion] = useState('na')
  const [shippingMethod, setShippingMethod] = useState('express')

  const regionsData = {
    na: {
      name: 'North America (USA & Canada)',
      carrier: 'FedEx International Priority Air',
      depot: 'San Francisco Hub (SFO)',
      transitStandard: '24 – 48 Hours',
      transitExpress: 'Next-Day Priority (18 – 24 Hours)',
      customs: 'DDP (Delivered Duty Paid) – Zero Import Fees',
      lithiumCompliance: 'IATA Section II PI 967 Compliant',
      insurance: '100% Full Escrow Value Insured by Lloyd’s of London syndicate',
    },
    eu: {
      name: 'European Union & United Kingdom',
      carrier: 'DHL Express Aviation (Air Freight)',
      depot: 'Frankfurt Central Depot (FRA)',
      transitStandard: '24 – 48 Hours',
      transitExpress: 'Next-Day Express (24 Hours)',
      customs: 'Pre-cleared Intra-EU Transit (Zero VAT Surprises at Doorstep)',
      lithiumCompliance: 'IATA PI 967 Certified Battery Packaging',
      insurance: '100% Escrow Transit Bonded',
    },
    gulf: {
      name: 'Middle East & GCC (UAE, Saudi Arabia, Qatar)',
      carrier: 'FedEx Priority Air / Emirates SkyCargo',
      depot: 'Dubai South Air Logistics Depot (DXB)',
      transitStandard: '48 – 72 Hours',
      transitExpress: 'Express Air Courier (36 – 48 Hours)',
      customs: 'DDP Clearance via Dubai Logistics City Hub',
      lithiumCompliance: 'IATA UN3481 Class 9 Certified',
      insurance: '100% Full Declared Value Coverage',
    },
    apac: {
      name: 'Asia-Pacific (Singapore, Hong Kong, Japan, Australia)',
      carrier: 'DHL Express Worldwide / Singapore Post Air',
      depot: 'Singapore Changi Changi Cargo Complex (SIN)',
      transitStandard: '48 – 72 Hours',
      transitExpress: 'Air Priority Courier (36 – 48 Hours)',
      customs: 'Free-Trade DDP Express Clearance',
      lithiumCompliance: 'Strict Lithium Metal/Ion Flight Pack standard',
      insurance: '100% Smart Contract Backed Insurance',
    },
    latam: {
      name: 'Latin America & Caribbean',
      carrier: 'DHL Express Aviation Priority',
      depot: 'Miami Transit Logistics Hub (MIA)',
      transitStandard: '3 – 5 Business Days',
      transitExpress: 'Priority Air Express (2 – 3 Days)',
      customs: 'Formal Broker Customs Entry with Prepaid Duties',
      lithiumCompliance: 'UN3481 Built-in Battery Certified',
      insurance: '100% Escrow Collateral Policy',
    },
  }

  const currentInfo = regionsData[selectedRegion]

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
            <span className="text-slate-900 font-bold">Shipping Coverage</span>
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
              Priority Aviation Logistics
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Global Air Freight &amp; Shipping Coverage
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Every Apple device order is fulfilled from temperature-controlled authorized bonded vaults via FedEx Priority and DHL Express Aviation with 100% full-value crypto escrow transit insurance.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive Transit Calculator & SLA Tool */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Live Transit &amp; Route Estimator
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Select your destination zone to inspect dispatch origin, carrier partner, and customs terms.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Air Hubs Operational 24/7
                </span>
              </div>

              {/* Region Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
                {[
                  { id: 'na', label: 'North America', flag: '🇺🇸 / 🇨🇦' },
                  { id: 'eu', label: 'Europe / UK', flag: '🇪🇺 / 🇬🇧' },
                  { id: 'gulf', label: 'Middle East', flag: '🇦🇪 / 🇸🇦' },
                  { id: 'apac', label: 'Asia-Pacific', flag: '🇸🇬 / 🇯🇵' },
                  { id: 'latam', label: 'Latin America', flag: '🇧🇷 / 🇲🇽' },
                ].map((reg) => (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => setSelectedRegion(reg.id)}
                    className={`p-3 rounded-2xl border text-left transition text-xs font-bold cursor-pointer ${
                      selectedRegion === reg.id
                        ? 'border-yellow-400 bg-amber-50/70 text-slate-950 ring-2 ring-yellow-400/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-sm mb-1">{reg.flag}</div>
                    <div className="leading-tight">{reg.label}</div>
                  </button>
                ))}
              </div>

              {/* Service Level Option */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl mb-6 text-xs">
                <span className="font-bold text-slate-700">Freight Class:</span>
                <button
                  type="button"
                  onClick={() => setShippingMethod('express')}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition ${
                    shippingMethod === 'express'
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-black'
                  }`}
                >
                  ⚡ Priority Air Express (Recommended)
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod('standard')}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition ${
                    shippingMethod === 'standard'
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-black'
                  }`}
                >
                  ✈️ Standard Air Cargo
                </button>
              </div>

              {/* Active Route Telemetry Card */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-white space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Region</span>
                    <h3 className="text-base font-black text-slate-900">{currentInfo.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Flight Transit</span>
                    <span className="text-sm font-black text-amber-700">
                      {shippingMethod === 'express' ? currentInfo.transitExpress : currentInfo.transitStandard}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-400 font-bold block mb-0.5">Assigned Primary Air Carrier</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {currentInfo.carrier}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-400 font-bold block mb-0.5">Origin Bonded Vault</span>
                    <span className="font-bold text-slate-900">{currentInfo.depot}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-400 font-bold block mb-0.5">Customs Protocol</span>
                    <span className="font-bold text-emerald-700">{currentInfo.customs}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-slate-400 font-bold block mb-0.5">Flight Battery Safety Rule</span>
                    <span className="font-bold text-slate-800">{currentInfo.lithiumCompliance}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950 font-medium">
                  <span className="text-base leading-none">🛡️</span>
                  <div>
                    <strong>100% Escrow Transit Guarantee:</strong> {currentInfo.insurance}. If a shipment is flagged as lost or damaged by carrier tracking telemetry, 100% of escrow funds are immediately unlocked for buyer refund or immediate swap.
                  </div>
                </div>
              </div>

            </div>

            {/* Carrier SLA Table */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-black text-slate-950 mb-2">
                International Air Freight Matrix &amp; Delivery SLA
              </h2>
              <p className="text-slate-500 text-xs mb-6">
                All physical hardware ships exclusively via premium priority aviation channels. Never ground cargo or postal drops.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-bold">
                      <th className="p-3.5 border-b border-slate-200">Destination Zone</th>
                      <th className="p-3.5 border-b border-slate-200">Carrier &amp; Service</th>
                      <th className="p-3.5 border-b border-slate-200">Dispatch Window</th>
                      <th className="p-3.5 border-b border-slate-200">Flight Transit SLA</th>
                      <th className="p-3.5 border-b border-slate-200">Customs Clearance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">🇺🇸 United States (Domestic 50 States)</td>
                      <td className="p-3.5 font-medium text-slate-700">FedEx Priority Overnight / 2-Day Air</td>
                      <td className="p-3.5 text-slate-600">&lt; 12 Hours</td>
                      <td className="p-3.5 font-bold text-amber-700">18 &ndash; 24 Hours</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Pre-Cleared (US Depot)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">🇨🇦 Canada (Provinces &amp; Major Metros)</td>
                      <td className="p-3.5 font-medium text-slate-700">FedEx International Priority</td>
                      <td className="p-3.5 text-slate-600">&lt; 24 Hours</td>
                      <td className="p-3.5 font-bold text-amber-700">24 &ndash; 48 Hours</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">DDP (GST/PST Prepaid)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">🇪🇺 EU (Germany, France, Italy, Spain, etc.)</td>
                      <td className="p-3.5 font-medium text-slate-700">DHL Express Worldwide Aviation</td>
                      <td className="p-3.5 text-slate-600">&lt; 24 Hours</td>
                      <td className="p-3.5 font-bold text-amber-700">24 &ndash; 48 Hours</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Zero Customs (Frankfurt Vault)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">🇬🇧 United Kingdom (London &amp; Regional)</td>
                      <td className="p-3.5 font-medium text-slate-700">DHL Express UK Air Priority</td>
                      <td className="p-3.5 text-slate-600">&lt; 24 Hours</td>
                      <td className="p-3.5 font-bold text-amber-700">24 &ndash; 48 Hours</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">DDP (HMRC Duty Paid)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">🇦🇪 UAE &amp; GCC (Dubai, Abu Dhabi, Riyadh)</td>
                      <td className="p-3.5 font-medium text-slate-700">FedEx Priority / Emirates SkyCargo</td>
                      <td className="p-3.5 text-slate-600">&lt; 24 Hours</td>
                      <td className="p-3.5 font-bold text-amber-700">36 &ndash; 48 Hours</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">DDP Dubai Free Zone Cleared</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">🇸🇬 Singapore, 🇭🇰 Hong Kong, 🇯🇵 Japan</td>
                      <td className="p-3.5 font-medium text-slate-700">DHL Aviation Asia Air</td>
                      <td className="p-3.5 text-slate-600">&lt; 24 Hours</td>
                      <td className="p-3.5 font-bold text-amber-700">36 &ndash; 48 Hours</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Pre-cleared Direct Delivery</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">🇦🇺 Australia &amp; New Zealand</td>
                      <td className="p-3.5 font-medium text-slate-700">FedEx International Priority Air</td>
                      <td className="p-3.5 text-slate-600">&lt; 24 Hours</td>
                      <td className="p-3.5 font-bold text-amber-700">48 &ndash; 72 Hours</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">DDP Formal Broker Entry</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Packaging, Privacy & Tamper-Evident Protocols */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-slate-950">
                Discreet Packaging &amp; Tamper-Evident Security Standards
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-sm mb-3">
                    01
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                    Unbranded Outer Cartons
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Cartons carry zero logos, zero Apple branding, and zero cryptocurrency references on the external air waybill to prevent transit theft.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-sm mb-3">
                    02
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                    Holographic Security Tape
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Every package is sealed with tamper-void serialized holographic tape. Any unauthorized opening attempt leaves visible void patterns.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-sm mb-3">
                    03
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                    Direct Signature Required
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Couriers are legally barred from leaving parcels at doorsteps or unmonitored mailboxes. In-person photo ID verification is required.
                  </p>
                </div>
              </div>

              {/* Lithium Flight Safety Box */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-wider">
                  <span>✈️ IATA Lithium-Ion Compliance (UN3481)</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Aviation Safety Regulations for iPhone, iPad, MacBook &amp; Watch
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  All devices containing rechargeable lithium batteries are shipped strictly according to <strong>IATA Section II of Packing Instruction 967</strong>. Batteries are state-of-charge certified at 30% or less for passenger &amp; cargo aircraft safety, sealed in anti-static ESD flame-retardant outer chambers.
                </p>
              </div>
            </div>

            {/* Insurance & Claims Protocol */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-slate-950">
                100% Escrow Transit Marine &amp; Air Cargo Insurance
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed">
                Traditional couriers offer limited liability of only $100 for lost parcels. On CryptoSpill, every single shipment is backed by our dedicated <strong>Escrow Transit Underwriting Fund</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <h4 className="font-bold text-emerald-950 mb-1">In-Transit Loss or Damage</h4>
                  <p className="text-emerald-800 leading-relaxed">
                    If carrier tracking indicates non-delivery past 7 business days or damaged packaging upon delivery scan, the smart contract automatically approves a 100% wallet refund or dispatches a replacement.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <h4 className="font-bold text-emerald-950 mb-1">Customs Impound / Border Delay</h4>
                  <p className="text-emerald-800 leading-relaxed">
                    Because shipments are processed as DDP (Delivery Duty Paid), customs duties are prepaid. In the rare event of a border delay over 96 hours, buyer may trigger full escrow cancelation.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="shipping-coverage" />
          </div>

        </div>

      </div>
    </div>
  )
}
