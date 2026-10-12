import React, { useState } from 'react'
import { useRouter } from '../../router/RouterContext'
import BrandLogo from '../../components/common/BrandLogo'
import BackgroundSplit from '../../components/auth/BackgroundSplit'
import { loginStore } from '../../services/storeAuthService'

export default function AdminLoginPage({ onAdminLoginSuccess }) {
  const { navigate } = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password.trim()) {
      setErrorMessage('Please provide both administrator email and master password.')
      return
    }

    setIsLoading(true)
    setLoadingStep('Verifying store administrator credentials against backend...')

    try {
      const response = await loginStore({
        email: trimmedEmail,
        password: password
      })

      setIsLoading(false)
      const adminSession = {
        role: 'STORE_ADMIN',
        email: trimmedEmail,
        name: response.profile?.full_name || 'Store Administrator',
        loginTime: new Date().toISOString()
      }

      if (onAdminLoginSuccess) {
        onAdminLoginSuccess(adminSession)
      } else {
        sessionStorage.setItem('cryptospill_admin_session', JSON.stringify(adminSession))
        navigate('/store/dashboard')
      }
    } catch (err) {
      setIsLoading(false)
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.')
    }
  }

  return (
    <main className="min-h-screen w-full relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] select-none flex flex-col justify-between bg-black text-white">
      {/* 2-Column Background Split Layout - Full Signature Black & Gold */}
      <BackgroundSplit isDark={true} />

      {/* Main 2-Column Layout Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-12">

        {/* COLUMN 1 (LEFT SIDE): WRITTEN INFO / HERO CONTENT ("ek side likha huwa") */}
        <section className="relative z-10 w-full lg:w-[54%] flex flex-col justify-between self-stretch lg:pr-10 py-4 lg:py-6 text-left">

          {/* Top Brand Logo */}
          <div className="pt-2">
            <BrandLogo size="default" isDarkBackground={true} />
          </div>

          {/* Center Informational Content */}
          <div className="my-auto py-8 lg:py-12 max-w-xl">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.18] tracking-tight mb-5">
              Manage marketplace orders, escrow releases &amp; verified merchants.
            </h1>

            {/* Description Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Decentralized administration workstation for CryptoSpill Mainnet. Supervise multi-sig escrow contracts, resolve buyer disputes, review staked merchant applications, and control catalog inventory.
            </p>
          </div>

        </section>


        {/* COLUMN 2 (RIGHT SIDE): LOGIN CARD - Signature Black & Yellow */}
        <section className="relative z-10 w-full lg:w-[44%] flex items-center justify-center lg:justify-end py-6 lg:py-0">
          <div className="w-full max-w-[440px] bg-[#0c0c0c] rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-800 transition-all text-white relative overflow-hidden">
            {/* Subtle top gold accent glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500" />

            {/* Card Header with Brand Logo */}
            <div className="mb-6">
              <div className="mb-2.5">
                <BrandLogo size="default" isDarkBackground={true} />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight mt-3">Admin Authentication</h2>
              <p className="text-neutral-400 text-xs sm:text-[13px] font-normal leading-normal mt-0.5">
                Sign in to manage escrow transactions, merchants, and platform operations.
              </p>
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2.5">
                <svg className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* MASTER ADMIN LOGIN FORM */}
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Admin Work Email / ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email or ID"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm font-medium focus:bg-black focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
                  />
                  <div className="absolute right-3.5 top-3.5 text-neutral-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-yellow-400 text-xs font-bold uppercase tracking-wider">
                    Master Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-yellow-400 hover:text-yellow-300 font-bold transition cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-neutral-800 text-white placeholder-neutral-500 text-xs sm:text-sm font-medium focus:bg-black focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
                  />
                  <div className="absolute right-3.5 top-3.5 text-neutral-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-400 hover:text-white">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-700 bg-neutral-900 text-yellow-400 focus:ring-0 cursor-pointer"
                  />
                  <span>Remember secure workstation</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black font-black text-sm hover:brightness-105 active:scale-[0.99] transition shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="text-xs font-bold">{loadingStep || 'Authenticating Admin...'}</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Console</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>



              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-xs text-neutral-400 hover:text-white transition font-medium cursor-pointer"
                >
                  &larr; Return to Public Store
                </button>
              </div>
            </form>

          </div>
        </section>

      </div>

      {/* Mobile Footer */}
      <footer className="lg:hidden relative z-20 py-4 px-6 text-center text-xs text-slate-400 border-t border-white/10">
        &copy; {new Date().getFullYear()} CryptoSpill Protocol Governance &bull; 256-bit AES Multi-Sig
      </footer>
    </main>
  )
}
