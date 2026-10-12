import React, { useState, useEffect } from 'react'

export default function InfoPageModal({ pageKey, onClose, onSelectProduct }) {
  const [activeFaq, setActiveFaq] = useState(null)
  const [trackingInput, setTrackingInput] = useState('')
  const [trackingResult, setTrackingResult] = useState(null)
  
  // Merchant Application Form State
  const [merchantForm, setMerchantForm] = useState({
    businessName: '',
    email: '',
    telegram: '',
    inventoryType: 'hardware',
    monthlyVolume: '$50,000 - $100,000',
    notes: ''
  })
  const [merchantSubmitted, setMerchantSubmitted] = useState(false)

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!pageKey) return null

  const handleTrackSubmit = (e) => {
    e.preventDefault()
    if (trackingInput.trim()) {
      setTrackingResult({
        orderId: trackingInput.toUpperCase(),
        carrier: 'FedEx International Priority Air',
        trackingNumber: 'FX-' + Math.floor(10000000 + Math.random() * 90000000),
        status: 'In Transit — Customs Cleared',
        origin: 'San Francisco, CA (Authorized Depot)',
        destination: 'Delivered via Escrow Protection',
        estimatedDelivery: 'Within 48 Hours',
        currentStep: 3
      })
    }
  }

  const handleMerchantSubmit = (e) => {
    e.preventDefault()
    setMerchantSubmitted(true)
    setTimeout(() => {
      setMerchantSubmitted(false)
      setMerchantForm({
        businessName: '',
        email: '',
        telegram: '',
        inventoryType: 'hardware',
        monthlyVolume: '$50,000 - $100,000',
        notes: ''
      })
    }, 4000)
  }

  // Page Content Definitions
  const renderContent = () => {
    switch (pageKey) {
      
      // 1. TRACK ACTIVE ORDER
      case 'track':
        return (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs leading-relaxed">
              <strong className="font-bold">Real-Time Escrow Tracking:</strong> Every order on CryptoSpill is secured by smart contract escrow. Your tracking number updates live with FedEx / DHL air manifests and Apple serial verification.
            </div>

            <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter Order ID (e.g. CS-89421) or Wallet Hash..."
                required
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-yellow-400 hover:text-black text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0"
              >
                Track Shipment
              </button>
            </form>

            {/* Live Tracking Result Card */}
            {trackingResult && (
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400 text-black">
                      {trackingResult.carrier}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      Tracking: {trackingResult.trackingNumber}
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[11px] text-slate-500 font-medium">Status:</p>
                    <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 sm:justify-end">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {trackingResult.status}
                    </p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-900">Shipment Milestones:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                      <p className="font-bold">1. Escrow Locked</p>
                      <p className="text-[10.5px] text-emerald-700 mt-0.5">Smart contract funds deposited</p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                      <p className="font-bold">2. Serial Recorded</p>
                      <p className="text-[10.5px] text-emerald-700 mt-0.5">Official Apple warranty bound</p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-bold">
                      <p>3. In Air Transit</p>
                      <p className="text-[10.5px] font-normal text-amber-800 mt-0.5">FedEx Priority flight underway</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500">
                      <p className="font-semibold">4. Delivery &amp; Inspection</p>
                      <p className="text-[10.5px] mt-0.5">48-Hr buyer escrow release</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!trackingResult && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-slate-500 space-y-2">
                <svg className="w-8 h-8 text-slate-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a2 2 0 11-4 0m4 0h3m4-4h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 11-4 0m4 0h2" />
                </svg>
                <p className="text-xs font-semibold text-slate-700">Enter any test Order ID above to preview live tracking</p>
                <p className="text-[11px] text-slate-400">All deliveries require physical recipient signature and proof of identity.</p>
              </div>
            )}
          </div>
        )

      // 2. HOW ESCROW PROTECTS YOU
      case 'escrow-guide':
        return (
          <div className="space-y-6">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              CryptoSpill pioneers <strong>zero-risk shopping</strong> through 2-of-3 multi-signature smart contracts. Your funds never go directly to the merchant upfront; they remain safeguarded in an independent cryptographic vault until you confirm physical receipt of your genuine Apple device.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black font-black flex items-center justify-center text-xs">
                  01
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Buyer Locks Payment</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You check out with Bitcoin, ETH, Solana, or USDT. Funds enter a decentralized escrow vault. The seller cannot touch the funds.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black font-black flex items-center justify-center text-xs">
                  02
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Merchant Dispatches Hardware</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The verified merchant ships the authentic sealed Apple box with tracked express air courier and logs the official serial number.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black font-black flex items-center justify-center text-xs">
                  03
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">48-Hour Inspection Window</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You receive the package, unbox, and verify the Apple serial on Apple.com. You have 48 full hours to test everything thoroughly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black font-black flex items-center justify-center text-xs">
                  04
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Confirm &amp; Release</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Once satisfied, you confirm receipt in your dashboard. If any issue arises, our multi-sig arbitrator returns 100% of your funds.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Zero Escrow Fees for Shoppers
              </p>
              <p className="text-emerald-800 text-[11.5px]">
                Escrow smart contract gas fees are completely subsidized by CryptoSpill. You pay exactly the listed product price.
              </p>
            </div>
          </div>
        )

      // 3. 14-DAY REPLACEMENT POLICY
      case 'replacement':
        return (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Hassle-Free 14-Day Guarantee</h4>
              <p className="text-xs text-slate-500">
                All Apple hardware delivered through CryptoSpill qualifies for a 14-day direct replacement in case of transit damage, dead-on-arrival (DOA) units, or specification mismatch.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">Replacement Guidelines:</h4>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
                <li><strong>Dead on Arrival (DOA):</strong> If your device fails to boot or has display defects out of the box, request a swap within 48 hours for immediate advance dispatch.</li>
                <li><strong>Packaging Condition:</strong> Items must include all original Apple documentation, braided USB-C cables, and serial-matching boxes.</li>
                <li><strong>Prepaid Return Shipping:</strong> We provide an automated prepaid FedEx return air label. You do not incur any shipping charges.</li>
                <li><strong>Inspection Turnaround:</strong> Once the returned unit arrives at our escrow depot, the replacement unit ships out within 24 business hours.</li>
              </ul>
            </div>

            <div className="pt-2 text-xs text-slate-500">
              Need to initiate a replacement? Email <a href="mailto:support@cryptospill.store" className="text-amber-600 font-semibold underline">support@cryptospill.store</a> with your Order ID and photo of the serial number.
            </div>
          </div>
        )

      // 4. SHIPPING COVERAGE
      case 'shipping':
        return (
          <div className="space-y-6">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every shipment is dispatched via insured express air couriers. We partner directly with <strong>FedEx Priority</strong> and <strong>DHL Express</strong> with 100% declared value insurance.
            </p>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                  <tr>
                    <th className="p-3.5">Destination</th>
                    <th className="p-3.5">Courier</th>
                    <th className="p-3.5">Transit Time</th>
                    <th className="p-3.5">Insurance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900">United States &amp; Canada</td>
                    <td className="p-3.5">FedEx Priority Air</td>
                    <td className="p-3.5">2 &ndash; 3 Business Days</td>
                    <td className="p-3.5 text-emerald-600 font-bold">100% Full Value</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900">United Kingdom &amp; Europe</td>
                    <td className="p-3.5">DHL Express Air</td>
                    <td className="p-3.5">3 &ndash; 4 Business Days</td>
                    <td className="p-3.5 text-emerald-600 font-bold">100% Full Value</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900">UAE &amp; Middle East</td>
                    <td className="p-3.5">DHL Express Worldwide</td>
                    <td className="p-3.5">2 &ndash; 3 Business Days</td>
                    <td className="p-3.5 text-emerald-600 font-bold">100% Full Value</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-900">Asia &amp; Rest of World</td>
                    <td className="p-3.5">FedEx International</td>
                    <td className="p-3.5">4 &ndash; 6 Business Days</td>
                    <td className="p-3.5 text-emerald-600 font-bold">100% Full Value</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold">Signature Required:</p>
              <p className="text-amber-800 text-[11.5px]">
                To safeguard high-value Apple hardware, all deliveries strictly require an adult signature at the destination address. Couriers will not leave parcels unattended on porches.
              </p>
            </div>
          </div>
        )

      // 5. WARRANTY VERIFICATION
      case 'warranty':
        return (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Every hardware unit sold on CryptoSpill is <strong>100% authentic, brand-new factory sealed</strong>, and carries the official <strong>1-Year Apple Limited Warranty</strong> honored at any Apple Store worldwide.
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">How to Verify Your Apple Warranty:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600">
                <li>Locate the 12-character serial number on your device box or in <em>Settings &gt; General &gt; About</em>.</li>
                <li>Visit Apple&apos;s official check tool: <a href="https://checkcoverage.apple.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold underline">checkcoverage.apple.com</a>.</li>
                <li>Enter the serial number and captcha code to view your official warranty expiration date and AppleCare eligibility.</li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">AppleCare+ Add-on:</h4>
              <p className="text-xs text-slate-500">
                You can add 2 years of AppleCare+ directly during checkout on CryptoSpill, or register it within 60 days of delivery on Apple.com.
              </p>
            </div>
          </div>
        )

      // 6. FREQUENTLY ASKED QUESTIONS
      case 'faq':
        const faqs = [
          {
            q: 'How does 0% Escrow protect me?',
            a: 'When you purchase an item, your crypto payment is locked in a multi-sig smart contract vault. The merchant only receives the funds after you receive the item and confirm you are satisfied within the 48-hour inspection window.'
          },
          {
            q: 'Are all products brand-new and sealed in original Apple boxes?',
            a: 'Yes, 100%. We strictly prohibit refurbished or grey-market stock. All devices come in factory-sealed Apple retail packaging with intact pull-tabs and verifiable serial numbers.'
          },
          {
            q: 'What cryptocurrencies do you accept?',
            a: 'We accept Bitcoin (BTC), Ethereum (ETH), Solana (SOL), SPILL Token, USD Coin (USDC), and Tether (USDT), as well as direct Web3 wallet connections (MetaMask, Phantom, Coinbase Wallet).'
          },
          {
            q: 'What happens if my package is lost or damaged in transit?',
            a: 'Every parcel is insured for 100% of its declared value. If the courier loses or damages the parcel, our escrow vault instantly issues you a full refund or dispatches a brand-new replacement unit.'
          },
          {
            q: 'How are digital products like Gift Cards and AppleCare delivered?',
            a: 'Digital items are delivered instantly via automated cryptographic oracle to your registered email and dashboard upon smart contract payment confirmation.'
          }
        ]

        return (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-4 font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-base text-slate-400 font-light shrink-0">
                    {activeFaq === i ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === i && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )

      // 7. BECOME A MERCHANT
      case 'merchant':
        return (
          <div className="space-y-6">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Join CryptoSpill&apos;s verified merchant network. Sell authentic Apple hardware and digital subscriptions to verified global crypto shoppers with <strong>zero chargebacks</strong> and <strong>instant automated escrow settlements</strong>.
            </p>

            {merchantSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h4 className="text-sm font-bold text-emerald-900">Application Submitted!</h4>
                <p className="text-xs text-emerald-700">
                  Our merchant verification committee will review your store credentials and contact you on Telegram/Email within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMerchantSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Store Name *</label>
                    <input
                      type="text"
                      required
                      value={merchantForm.businessName}
                      onChange={(e) => setMerchantForm({ ...merchantForm, businessName: e.target.value })}
                      placeholder="e.g. Apex Tech Dealers LLC"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={merchantForm.email}
                      onChange={(e) => setMerchantForm({ ...merchantForm, email: e.target.value })}
                      placeholder="merchant@yourdomain.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Telegram Handle (for fast KYC)</label>
                    <input
                      type="text"
                      value={merchantForm.telegram}
                      onChange={(e) => setMerchantForm({ ...merchantForm, telegram: e.target.value })}
                      placeholder="@yourhandle"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Monthly Volume</label>
                    <select
                      value={merchantForm.monthlyVolume}
                      onChange={(e) => setMerchantForm({ ...merchantForm, monthlyVolume: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 cursor-pointer"
                    >
                      <option>$20,000 - $50,000</option>
                      <option>$50,000 - $100,000</option>
                      <option>$100,000 - $500,000</option>
                      <option>$500,000+</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-yellow-400 hover:text-black text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer mt-2"
                >
                  Submit Merchant Application &rarr;
                </button>
              </form>
            )}
          </div>
        )

      // 8. MERCHANT STANDARDS & GUIDELINES
      case 'seller-guidelines':
        return (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Quality Commitment:</h4>
              <p className="text-xs text-slate-500">
                To maintain our customer trust score, all approved sellers must adhere strictly to CryptoSpill Seller SLAs.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">Standard Seller Operating Procedures:</h4>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
                <li><strong>24-Hour Dispatch Requirement:</strong> All confirmed orders must be handed over to FedEx / DHL within 24 business hours.</li>
                <li><strong>Factory Sealed Only:</strong> Refurbished, open-box, or customer returns cannot be listed under new condition categories.</li>
                <li><strong>Serial Recording:</strong> The physical device serial number must be photographed and submitted to the multi-sig escrow contract before dispatch.</li>
                <li><strong>Minimum 98% Rating:</strong> Sellers whose rating drops below 98% positive reviews undergo automatic listing review.</li>
              </ul>
            </div>
          </div>
        )

      // 9. INSTANT PAYOUTS
      case 'payouts':
        return (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Traditional e-commerce platforms hold merchant funds for 14 to 30 days. On CryptoSpill, payouts are <strong>automated by smart contract</strong> the moment the buyer inspects and approves the delivered parcel.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-yellow-600">USDT / USDC</span>
                <h4 className="font-bold text-slate-900">Instant Stablecoin</h4>
                <p className="text-slate-500 text-[11px]">Direct transfer to your ERC-20 / Solana / TRC-20 wallet within 60 seconds.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-amber-600">ETH / BTC</span>
                <h4 className="font-bold text-slate-900">Native Crypto</h4>
                <p className="text-slate-500 text-[11px]">Payout directly in native crypto with zero conversion markups.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-black text-slate-900">FIAT WIRE</span>
                <h4 className="font-bold text-slate-900">Bank Wire / SEPA</h4>
                <p className="text-slate-500 text-[11px]">Direct same-day bank transfer available for corporate tier sellers.</p>
              </div>
            </div>
          </div>
        )

      // 10. ESCROW RULES & MULTI-SIG
      case 'escrow-rules':
        return (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400 text-black">
                SMART CONTRACT SPECIFICATION
              </span>
              <h4 className="text-sm font-bold text-white">2-of-3 Multi-Signature Escrow Architecture</h4>
              <p className="text-xs text-slate-300">
                Escrow funds are controlled by three cryptographic keys: Key A (Buyer), Key B (Seller), Key C (CryptoSpill Neutral Arbiter).
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">Arbitration Rules:</h4>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
                <li><strong>Happy Path:</strong> Buyer confirms receipt (Key A + Key B signed) &rarr; Funds release automatically to Seller.</li>
                <li><strong>7-Day Auto-Timeout:</strong> If the tracking confirms delivery and the buyer fails to respond within 7 days, funds release to the seller.</li>
                <li><strong>Dispute Resolution:</strong> If buyer claims damaged/missing parcel, Key C (Arbiter) reviews carrier photos and Apple serial records to return funds to buyer.</li>
              </ul>
            </div>
          </div>
        )

      // 11. PRIVACY POLICY
      case 'privacy':
        return (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              At CryptoSpill, we believe your shopping history and financial data belong to you. We strictly implement minimal data collection principles.
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">Our Privacy Principles:</h4>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
                <li><strong>No Data Brokering:</strong> We never sell, rent, or monetize shopper email addresses, physical addresses, or wallet history.</li>
                <li><strong>Encrypted Delivery Details:</strong> Physical shipping addresses are encrypted in transit and purged 30 days following successful escrow release.</li>
                <li><strong>Non-Custodial Web3:</strong> We never store private keys or seed phrases. All transactions are approved locally in your wallet.</li>
              </ul>
            </div>
          </div>
        )

      // 12. TERMS OF SERVICE
      case 'terms':
        return (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              By accessing CryptoSpill Marketplace Store, you agree to these Terms of Service and our Decentralized Escrow Protocol Rules.
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">Key Terms:</h4>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
                <li><strong>Price Lock Guarantee:</strong> Once you initiate checkout, crypto exchange rates are locked for 30 minutes to prevent slippage.</li>
                <li><strong>Authenticity Warranty:</strong> All items are guaranteed 100% genuine Apple. Any counterfeit claim results in 200% refund funded by the seller security bond.</li>
                <li><strong>Compliance:</strong> Shoppers must comply with local import laws and trade sanctions in their respective jurisdictions.</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Titles & Badges Map
  const pageMeta = {
    track: { title: 'Track Active Order', badge: 'REAL-TIME TRACKING', subtitle: 'Live FedEx & DHL air delivery milestones' },
    'escrow-guide': { title: 'How Escrow Protects You', badge: 'ZERO-RISK SHOPPING', subtitle: 'Step-by-step smart contract escrow breakdown' },
    replacement: { title: '14-Day Replacement Policy', badge: 'BUYER GUARANTEE', subtitle: 'Prepaid return shipping & advance dispatch' },
    shipping: { title: 'Worldwide Shipping Coverage', badge: 'EXPRESS AIR', subtitle: 'Transit times, couriers & full-value transit insurance' },
    warranty: { title: 'Apple Warranty Verification', badge: 'GENUINE APPLE', subtitle: 'Official serial verification & Apple Store eligibility' },
    faq: { title: 'Frequently Asked Questions', badge: 'HELP CENTER', subtitle: 'Common questions on crypto payments, escrow & delivery' },
    merchant: { title: 'Become a Verified Merchant', badge: 'SELLER ONBOARDING', subtitle: 'Sell authentic Apple hardware with 0% chargebacks' },
    'seller-guidelines': { title: 'Merchant Standards & SLAs', badge: 'MERCHANT RULES', subtitle: '24-hour dispatch & genuine serial recording standards' },
    payouts: { title: 'Instant Merchant Payouts', badge: 'AUTOMATED PAYOUTS', subtitle: 'Automated stablecoin & bank wire settlements' },
    'escrow-rules': { title: 'Escrow Protocol & Multi-Sig', badge: 'SMART CONTRACT', subtitle: 'Technical rules of the 2-of-3 multi-sig vault' },
    privacy: { title: 'Privacy Policy', badge: 'WEB3 PRIVACY', subtitle: 'Minimal data collection & encrypted delivery records' },
    terms: { title: 'Terms of Service', badge: 'MARKETPLACE TERMS', subtitle: 'Buyer protections & price lock guarantees' }
  }

  const meta = pageMeta[pageKey] || { title: 'Store Information', badge: 'INFO', subtitle: 'CryptoSpill Marketplace' }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dark Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog Container */}
      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative inline-block w-full max-w-2xl text-left bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden transform transition-all text-slate-900 animate-scaleIn"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-yellow-400 text-black shadow-xs">
                {meta.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {meta.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {meta.subtitle}
              </p>
            </div>

            {/* Close 'X' Button */}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer text-2xl font-light leading-none"
              title="Close"
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
            {renderContent()}
          </div>

          {/* Modal Footer */}
          <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Need assistance? Email <a href="mailto:support@cryptospill.store" className="text-slate-900 font-bold hover:text-amber-600 transition">support@cryptospill.store</a>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-yellow-400 hover:text-black text-white font-bold transition shadow-xs cursor-pointer"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
