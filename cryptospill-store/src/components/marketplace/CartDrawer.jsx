import React, { useState } from 'react'

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  if (!isOpen) return null

  const subtotalUSD = cartItems.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0)
  const subtotalETH = (subtotalUSD / 3480).toFixed(4)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      setCheckoutSuccess(true)
      setTimeout(() => {
        onClearCart()
        setCheckoutSuccess(false)
        onClose()
      }, 2500)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col justify-between shadow-2xl h-full">
          
          {/* Drawer Header with Yellow Dot */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_6px_#facc15]" />
              <h2 className="text-lg font-black text-slate-900">Your Marketplace Cart</h2>
              <span className="text-xs bg-yellow-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold border border-yellow-300">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Checkout Success Screen */}
          {checkoutSuccess ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Escrow Order Secured!</h3>
              <p className="text-sm text-slate-500 max-w-xs mb-4">
                Smart contract escrow transaction broadcasted to CryptoSpill Mainnet.
              </p>
              <p className="text-xs font-mono text-amber-600 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200 font-bold">
                TX: 0x9f8c...3b4a2e
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              {cartItems.length > 0 ? (
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3.5"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-14 h-14 object-contain rounded-lg bg-white p-1 border border-slate-200 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                        <p className="text-xs font-bold text-slate-900 mt-0.5">
                          ${item.priceUSD.toFixed(2)}
                        </p>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer border border-slate-200 shadow-2xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold px-1.5 text-slate-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center cursor-pointer border border-slate-200 shadow-2xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 cursor-pointer"
                        title="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                  <svg className="w-14 h-14 mx-auto mb-3 opacity-40 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-sm font-semibold text-slate-700">Your cart is empty</p>
                  <p className="text-xs text-slate-400 mt-1">Explore verified products and add them here</p>
                </div>
              )}

              {/* Drawer Footer with Totals and Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-200 bg-slate-50/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${subtotalUSD.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <span>Escrow Protection Fee</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">0% FREE</span>
                    </span>
                    <span className="font-semibold text-emerald-600">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200 font-bold">
                    <span className="text-slate-900">Total Amount</span>
                    <div className="text-right">
                      <p className="text-lg font-black text-slate-950">${subtotalUSD.toFixed(2)}</p>
                      <p className="text-xs text-amber-500 font-bold">≈ {subtotalETH} ETH</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-yellow-400 hover:text-black active:bg-yellow-500 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isCheckingOut ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Confirming Escrow Lock...</span>
                      </>
                    ) : (
                      <>
                        <span>Checkout with Escrow Vault</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span>Protected by Multi-Sig Smart Contract</span>
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-slate-500 hover:text-rose-600 transition cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  )
}
