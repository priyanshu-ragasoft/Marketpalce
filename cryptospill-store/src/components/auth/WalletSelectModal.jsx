import React, { useState, useEffect } from 'react'
import { connectWithWalletConnect } from '../../utils/walletConnectService'

// Official Inline Brand Icons for 100% reliability
export function WalletConnectBrandIcon({ className = "w-full h-full" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#3B99FC" />
      <path
        d="M9.8 12.8c3.4-3.4 9-3.4 12.4 0l.4.4a.4.4 0 010 .6l-1.4 1.4a.3.3 0 01-.4 0l-.6-.6c-2.4-2.4-6.2-2.4-8.6 0l-.6.6a.3.3 0 01-.4 0L9.4 13.8a.4.4 0 010-.6l.4-.4zm15.4 3l1.2 1.2a.4.4 0 010 .6l-5.6 5.6a.4.4 0 01-.6 0l-4-4a.3.3 0 00-.4 0l-4 4a.4.4 0 01-.6 0l-5.6-5.6a.4.4 0 010-.6l1.2-1.2a.4.4 0 01.6 0l4 4a.3.3 0 00.4 0l4-4a.4.4 0 01.6 0l4 4a.3.3 0 00.4 0l4-4a.4.4 0 01.6 0z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

const WalletBrandIcon = ({ id, name, iconUrl }) => {
  if (id === 'walletconnect') {
    return <WalletConnectBrandIcon />
  }

  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={name}
        className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    )
  }

  switch (id) {
    case 'trust':
      return (
        <svg className="w-5 h-5 text-[#0500FF]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 5.5v5.5c0 5.5 3.5 10.5 8 12 4.5-1.5 8-6.5 8-12V5.5L12 2zm0 2.2l6 2.6v4.7c0 4.3-2.6 8.3-6 9.8-3.4-1.5-6-5.5-6-9.8V6.8l6-2.6z"/>
        </svg>
      )
    case 'phantom':
      return (
        <svg className="w-5 h-5 text-[#AB9FF2]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 12c0-4.14-3.36-7.5-7.5-7.5S4.5 7.86 4.5 12c0 2.47 1.2 4.66 3.05 6.03.3.22.72.04.75-.33l.2-2.2c.04-.42.39-.75.81-.75h5.38c.42 0 .77.33.81.75l.2 2.2c.03.37.45.55.75.33A7.47 7.47 0 0019.5 12z"/>
        </svg>
      )
    case 'coinbase':
      return (
        <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
          <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="#FFFFFF" />
        </svg>
      )
    case 'okx':
      return (
        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'metamask':
      return (
        <svg className="w-full h-full object-contain" viewBox="0 0 318.6 318.6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#e2761b" stroke="#e2761b" strokeLinecap="round" strokeLinejoin="round" d="m274.1 35.5-99.5 73.9L194 65.4z"/>
          <path fill="#e4761b" stroke="#e4761b" strokeLinecap="round" strokeLinejoin="round" d="m44.4 35.5 98.7 74.6-18.4-44.7z"/>
          <path fill="#e4761b" stroke="#e4761b" strokeLinecap="round" strokeLinejoin="round" d="m238.3 206.8-25.7 39.5 62.1 17.1 17.8-60z"/>
          <path fill="#e4761b" stroke="#e4761b" strokeLinecap="round" strokeLinejoin="round" d="m26.1 203.4 17.7 60 62.1-17.1-25.7-39.5z"/>
          <path fill="#e4751f" stroke="#e4751f" strokeLinecap="round" strokeLinejoin="round" d="m80.3 138.8-19.1 28.7 68.6 3.1-2.4-53.7z"/>
          <path fill="#e4751f" stroke="#e4751f" strokeLinecap="round" strokeLinejoin="round" d="m238.3 138.8-47.5-22.3-2 54.1 68.6-3.1z"/>
          <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m142.9 110.1 5.3 64.9 2.3-64.9z"/>
          <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m80.3 138.8 49.5 35.4-2.4-53.7z"/>
          <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m188.8 120.5-2 54.1 49.5-35.4z"/>
          <path fill="#c0ad9e" stroke="#c0ad9e" strokeLinecap="round" strokeLinejoin="round" d="m177.9 205.6-37.2 1.3 3.6 29.8h29.9z"/>
          <path fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" d="m159.3 268.2-31.5-16.7 22.8-11.4 8.7 28.1z"/>
          <path fill="#763d16" stroke="#763d16" strokeLinecap="round" strokeLinejoin="round" d="m159.3 268.2 8.7-28.1 22.8 11.4z"/>
          <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m212.6 246.3 25.7-39.5-34.4-2.8 8.7 42.3z"/>
          <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m80.3 206.8 25.7 39.5 8.7-42.3-34.4 2.8z"/>
          <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m159.3 175-31.9-20.7-21.4 52.5 74.7.1-21.4-52.5z"/>
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      )
  }
}

// Known popular browser extension wallets
const KNOWN_WALLETS = [
  {
    id: 'trust',
    name: 'Trust Wallet',
    description: 'Leading multi-chain mobile & browser Web3 wallet',
    iconUrl: 'https://trustwallet.com/assets/images/media/assets/trust_platform.svg',
    installUrl: 'https://trustwallet.com/browser-extension',
    getProvider: () => {
      if (typeof window === 'undefined') return null
      if (window.trustwallet) return window.trustwallet
      if (window.ethereum?.isTrust) return window.ethereum
      if (window.ethereum?.providers) {
        return window.ethereum.providers.find((p) => p.isTrust) || null
      }
      return null
    },
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Connect with MetaMask browser extension or mobile app',
    iconUrl: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
    installUrl: 'https://metamask.io/download/',
    getProvider: () => {
      if (typeof window === 'undefined') return null
      if (window.ethereum?.isMetaMask && !window.ethereum?.isTrust) return window.ethereum
      if (window.ethereum?.providers) {
        return window.ethereum.providers.find((p) => p.isMetaMask && !p.isTrust) || null
      }
      return null
    },
  },
  {
    id: 'phantom',
    name: 'Phantom',
    description: 'Multi-chain wallet for Ethereum, Solana & Polygon',
    iconUrl: 'https://phantom.app/img/phantom-logo.svg',
    installUrl: 'https://phantom.app/download',
    getProvider: () => {
      if (typeof window === 'undefined') return null
      return window.phantom?.ethereum || null
    },
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    description: 'Secure self-custody wallet by Coinbase',
    iconUrl: 'https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowbloOPpLl/ab8cdfafd8321dafb2a13860c5eb6959/Coinbase-Icon-Circle-1.svg',
    installUrl: 'https://www.coinbase.com/wallet',
    getProvider: () => {
      if (typeof window === 'undefined') return null
      if (window.coinbaseWalletExtension) return window.coinbaseWalletExtension
      if (window.ethereum?.isCoinbaseWallet) return window.ethereum
      if (window.ethereum?.providers) {
        return window.ethereum.providers.find((p) => p.isCoinbaseWallet) || null
      }
      return null
    },
  },
  {
    id: 'okx',
    name: 'OKX Wallet',
    description: 'Universal decentralized Web3 portal & wallet',
    iconUrl: 'https://static.okx.com/cdn/assets/imgs/247/E7C20165CD2964C3.png',
    installUrl: 'https://www.okx.com/web3',
    getProvider: () => {
      if (typeof window === 'undefined') return null
      return window.okxwallet || null
    },
  },
  {
    id: 'injected',
    name: 'Browser Wallet',
    description: 'Any default EVM wallet installed in your browser',
    iconUrl: null,
    installUrl: null,
    getProvider: () => {
      if (typeof window === 'undefined') return null
      return window.ethereum || null
    },
  },
]

export default function WalletSelectModal({ isOpen, onClose, onSelectAddress }) {
  const [eip6963Providers, setEip6963Providers] = useState([])
  const [connectingWalletId, setConnectingWalletId] = useState(null)
  const [errorNotice, setErrorNotice] = useState('')

  // 1. Listen for EIP-6963 Wallets (Standard multi-wallet discovery)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleAnnouncement = (event) => {
      if (!event.detail) return
      setEip6963Providers((prev) => {
        const exists = prev.some((p) => p.info.uuid === event.detail.info.uuid)
        if (exists) return prev
        return [...prev, event.detail]
      })
    }

    window.addEventListener('eip6963:announceProvider', handleAnnouncement)
    window.dispatchEvent(new Event('eip6963:requestProvider'))

    return () => {
      window.removeEventListener('eip6963:announceProvider', handleAnnouncement)
    }
  }, [])

  if (!isOpen) return null

  // 2. Official WalletConnect Handler (QR Code Modal for 300+ Wallets)
  const handleWalletConnect = async () => {
    setErrorNotice('')
    setConnectingWalletId('walletconnect')

    try {
      const res = await connectWithWalletConnect()
      if (res && res.address) {
        onSelectAddress({
          address: res.address,
          walletName: 'WalletConnect',
          walletIcon: null,
          provider: res.provider,
        })
        onClose()
      }
    } catch (err) {
      setErrorNotice(err.message || 'Failed to connect via WalletConnect.')
    } finally {
      setConnectingWalletId(null)
    }
  }

  // 3. Browser Extension / Injected Wallet Connect Handler
  const handleConnect = async (walletInfo, provider) => {
    if (!provider) {
      if (walletInfo.installUrl) {
        window.open(walletInfo.installUrl, '_blank', 'noopener,noreferrer')
      } else {
        setErrorNotice(`Please install ${walletInfo.name} or use a Web3 browser.`)
      }
      return
    }

    setErrorNotice('')
    setConnectingWalletId(walletInfo.id || walletInfo.name)

    try {
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      })

      if (accounts && accounts.length > 0) {
        const address = accounts[0]
        onSelectAddress({
          address,
          walletName: walletInfo.name,
          walletIcon: walletInfo.icon || walletInfo.iconUrl,
          provider,
        })
        onClose()
      } else {
        setErrorNotice('No accounts returned from wallet. Please try again.')
      }
    } catch (err) {
      if (err.code === 4001) {
        setErrorNotice('Connection rejected by user in wallet.')
      } else {
        setErrorNotice(err.message || 'Failed to connect wallet.')
      }
    } finally {
      setConnectingWalletId(null)
    }
  }

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Centering Wrapper */}
      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 z-20 text-left animate-scaleIn text-slate-900 my-auto"
        >
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span>Connect a Wallet</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  WalletConnect
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Scan QR code with ANY mobile app or choose browser wallet
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 transition text-2xl font-light cursor-pointer leading-none p-1"
              title="Close"
            >
              &times;
            </button>
          </div>

          {/* Error Notice */}
          {errorNotice && (
            <div className="px-6 py-2.5 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Wallet Options List */}
          <div className="p-4 sm:p-5 space-y-2.5 max-h-[62vh] overflow-y-auto">
            {/* 1. FEATURED: Official WalletConnect (QR Code Scan for 300+ Wallets) */}
            <button
              type="button"
              onClick={handleWalletConnect}
              disabled={connectingWalletId === 'walletconnect'}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border-2 border-blue-500/40 bg-gradient-to-r from-blue-50/80 via-blue-50/30 to-white hover:border-blue-500 hover:bg-blue-50 text-slate-900 transition-all cursor-pointer group shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border border-blue-200 shrink-0">
                  <WalletConnectBrandIcon />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition">
                      WalletConnect
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white tracking-wider">
                      QR Modal
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Scan with ANY mobile app (Trust, MetaMask, CryptoSpill)
                  </p>
                </div>
              </div>

              {connectingWalletId === 'walletconnect' ? (
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connecting...
                </span>
              ) : (
                <span className="text-xs font-extrabold text-blue-600 bg-blue-100 group-hover:bg-blue-600 group-hover:text-white px-2.5 py-1.5 rounded-lg transition-all">
                  Scan QR &rarr;
                </span>
              )}
            </button>

            {/* Divider */}
            <div className="relative py-1 flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Or Connect Browser Extension
              </span>
            </div>

            {/* 2. EIP-6963 Auto-Detected Wallets */}
            {eip6963Providers.map(({ info, provider }) => {
              const isConnecting = connectingWalletId === info.name
              return (
                <button
                  key={info.uuid}
                  type="button"
                  onClick={() => handleConnect({ name: info.name, icon: info.icon, id: info.uuid }, provider)}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 text-slate-900 transition cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={info.icon}
                      alt={info.name}
                      className="w-9 h-9 rounded-lg object-contain bg-white p-1 border border-slate-200 shrink-0 shadow-2xs"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition">
                          {info.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-200/80 text-emerald-900">
                          Detected
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">Ready to connect directly</p>
                    </div>
                  </div>

                  {isConnecting ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Connecting...
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                      Connect &rarr;
                    </span>
                  )}
                </button>
              )
            })}

            {/* 3. Popular Wallets (Trust Wallet, MetaMask, Phantom, Coinbase, OKX) */}
            {KNOWN_WALLETS.filter((w) => {
              return !eip6963Providers.some((ep) => ep.info.name.toLowerCase().includes(w.id.toLowerCase()))
            }).map((wallet) => {
              const provider = wallet.getProvider()
              const isInstalled = !!provider
              const isConnecting = connectingWalletId === wallet.id

              return (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={() => handleConnect(wallet, provider)}
                  disabled={isConnecting}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition cursor-pointer group ${
                    isInstalled
                      ? 'border-slate-200 bg-white hover:bg-slate-50 hover:border-[#D1A61B]/60 shadow-2xs'
                      : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/70 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
                      <WalletBrandIcon id={wallet.id} name={wallet.name} iconUrl={wallet.iconUrl} />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-amber-800 transition">
                          {wallet.name}
                        </span>
                        {isInstalled ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Installed
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight line-clamp-1">
                        {isInstalled ? wallet.description : 'Click to install / open'}
                      </p>
                    </div>
                  </div>

                  {isConnecting ? (
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Connecting...
                    </span>
                  ) : isInstalled ? (
                    <span className="text-xs font-bold text-amber-600 group-hover:translate-x-0.5 transition-transform">
                      Connect &rarr;
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600">
                      Install &#x2197;
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Project ID Configured
            </span>
            <span className="text-slate-400">300+ Wallets Supported</span>
          </div>
        </div>
      </div>
    </div>
  )
}
