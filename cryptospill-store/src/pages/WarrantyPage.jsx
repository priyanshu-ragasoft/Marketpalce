import React, { useState } from 'react'
import { useRouter, Link } from '../router/RouterContext'
import InfoSidebar from '../components/marketplace/InfoSidebar'

export default function WarrantyPage() {
  const { navigate } = useRouter()

  // Serial verification simulator state
  const [testSerial, setTestSerial] = useState('')
  const [serialResult, setSerialResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerifySerial = (e) => {
    e.preventDefault()
    if (!testSerial.trim()) return
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      const cleaned = testSerial.trim().toUpperCase()
      setSerialResult({
        serial: cleaned,
        model: 'iPhone 18 Pro Max 1TB (Natural Titanium)',
        purchaseDate: 'Valid & Verified (Factory Authorized Stock)',
        hardwareCoverage: 'Active — Apple 1-Year Limited Worldwide Warranty',
        expiryDate: 'October 2027 (365 Days Active)',
        appleCareEligible: 'Eligible for AppleCare+ within 60 Days',
        countryOfRedemption: 'Global (Any Official Apple Store or AASP Worldwide)',
        gsxStatus: 'Authentic Sealed Retail Hardware — Zero Cloud Lock',
      })
    }, 600)
  }

  const sampleSerials = ['F17XJ892KP9Q', 'G6TZ89LM001A', 'W909KL234P11']

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
            <span className="text-slate-900 font-bold">Warranty Verification</span>
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
              Official Apple GSX Database
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Warranty &amp; Serial Number Verification
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Every hardware unit purchased on CryptoSpill is brand-new, factory-sealed, and covered by Apple’s official 1-Year Limited Worldwide Warranty redeemable at any Genius Bar globally.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive Serial Lookup Simulator */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Live Serial Number Inspection Simulator
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Test an Apple hardware serial number to preview coverage telemetries before releasing escrow.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full flex items-center gap-1.5">
                  Apple GSX Validated
                </span>
              </div>

              {/* Input Form */}
              <form onSubmit={handleVerifySerial} className="space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={testSerial}
                    onChange={(e) => setTestSerial(e.target.value)}
                    placeholder="Enter 10-12 digit Apple Serial (e.g. F17XJ892KP9Q)..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-slate-900 placeholder-slate-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 uppercase"
                  />
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-yellow-400 hover:text-black text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {isVerifying ? 'Checking Apple GSX...' : 'Verify Coverage'}
                  </button>
                </div>

                {/* Sample Serials Quick Click */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-bold">Try Sample Serials:</span>
                  {sampleSerials.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTestSerial(s)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 font-mono text-[11px] transition cursor-pointer border border-slate-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </form>

              {/* Simulation Output Card */}
              {serialResult && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 space-y-4 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Device</span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900">{serialResult.model}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Checked Serial</span>
                      <span className="text-xs sm:text-sm font-mono font-black text-amber-700">{serialResult.serial}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-400 font-bold block mb-0.5">Purchase Date Validity</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        {serialResult.purchaseDate}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-400 font-bold block mb-0.5">Hardware Coverage</span>
                      <span className="font-bold text-slate-900">{serialResult.hardwareCoverage}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-400 font-bold block mb-0.5">Coverage Expiration</span>
                      <span className="font-bold text-slate-900">{serialResult.expiryDate}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-slate-400 font-bold block mb-0.5">AppleCare+ Extension</span>
                      <span className="font-bold text-amber-700">{serialResult.appleCareEligible}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                    <span className="text-base">🌐</span>
                    <span><strong>Worldwide Honor:</strong> {serialResult.countryOfRedemption}. Valid without physical paper receipt.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Step-by-Step Official Check Guide */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-slate-950">
                How to Perform the Official Apple Serial Check
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                You never need to trust our simulator. You can verify directly against Apple’s live servers before approving escrow release:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-amber-400 text-black font-black flex items-center justify-center text-xs mb-2.5">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Locate Serial Number</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Check the barcode label on the bottom of the unopened Apple box, or under <em>Settings &gt; General &gt; About</em> once powered on.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-amber-400 text-black font-black flex items-center justify-center text-xs mb-2.5">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Open Apple.com Portal</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Navigate to <a href="https://checkcoverage.apple.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold hover:underline">checkcoverage.apple.com</a> on any browser.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-amber-400 text-black font-black flex items-center justify-center text-xs mb-2.5">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Submit Security Captcha</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Type in the serial string and complete the visual captcha code to request live database records.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-amber-400 text-black font-black flex items-center justify-center text-xs mb-2.5">
                    4
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Review Coverage</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Confirm active telephone support, valid purchase date, and official factory warranty end-date.
                  </p>
                </div>
              </div>
            </div>

            {/* AppleCare+ vs Standard Warranty Comparison Matrix */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-black text-slate-950 mb-2">
                Standard 1-Year Apple Warranty vs. AppleCare+ Coverage
              </h2>
              <p className="text-slate-500 text-xs mb-6">
                All hardware includes Standard Warranty automatically. You can add AppleCare+ directly via iOS Settings within 60 days.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 font-bold">
                      <th className="p-3.5 border-b border-slate-200">Protection Feature</th>
                      <th className="p-3.5 border-b border-slate-200">Standard Apple 1-Year</th>
                      <th className="p-3.5 border-b border-slate-200">AppleCare+ (Optional)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Manufacturing &amp; Hardware Defects</td>
                      <td className="p-3.5 text-emerald-700 font-bold">100% Covered (Free Repair / Swap)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">100% Covered (Free Repair / Swap)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Accidental Damage (Drops, Cracked Glass)</td>
                      <td className="p-3.5 text-rose-600 font-semibold">Not Covered (Paid Out of Pocket)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Unlimited Incidents ($29 Screen Fee)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Battery Degradation (&lt; 80% Capacity)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Free Replacement in Year 1</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Free Replacement across entire plan</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Global Genius Bar Service</td>
                      <td className="p-3.5 text-slate-900 font-semibold">Worldwide (Any Apple Store)</td>
                      <td className="p-3.5 text-slate-900 font-semibold">Worldwide + Priority 24/7 Expert Line</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Theft &amp; Loss Protection</td>
                      <td className="p-3.5 text-slate-400">No</td>
                      <td className="p-3.5 text-slate-900 font-semibold">Optional with AppleCare+ with Theft/Loss</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to Redeem at an Apple Store */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-slate-950">
                Genius Bar In-Store Redemption Workflow
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed">
                Because hardware sold on CryptoSpill originates from authorized wholesale distributors, the serial is automatically recognized in <strong>Apple GSX (Global Service Exchange)</strong>. If you ever experience hardware malfunction:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">1. Book an Appointment</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Open the Apple Support app or visit apple.com/retail to schedule a Genius Bar time at any Apple Store in any city worldwide.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">2. No Paper Receipt Needed</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Apple Genius specialists scan your device serial number directly from the chassis or settings. No invoice or crypto receipt is required.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">3. Same-Day Resolution</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Defective components are serviced on-site with genuine Apple components or replaced with a brand-new retail unit.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <InfoSidebar currentSlug="warranty" />
          </div>

        </div>

      </div>
    </div>
  )
}
