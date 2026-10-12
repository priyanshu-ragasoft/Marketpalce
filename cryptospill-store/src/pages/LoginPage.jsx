import React from 'react'
import { useRouter } from '../router/RouterContext'
import BackgroundSplit from '../components/auth/BackgroundSplit'
import HeroSection from '../components/auth/HeroSection'
import LoginCard from '../components/auth/LoginCard'

export default function LoginPage({ onLoginSuccess }) {
  const { navigate } = useRouter()

  const handleBackToStore = () => {
    navigate('/')
  }

  const handleSuccess = (user) => {
    if (onLoginSuccess) {
      onLoginSuccess(user)
    } else {
      navigate('/')
    }
  }

  return (
    <main className="min-h-screen w-full relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] select-none flex flex-col justify-between bg-black text-white">
      {/* Background Split Layout with Black, Yellow & White accents */}
      <BackgroundSplit />

      {/* Top Navigation Bar on Login Page */}
      <div className="absolute top-5 left-0 right-0 z-30 px-6 sm:px-12 max-w-[1440px] mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={handleBackToStore}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Marketplace Store</span>
        </button>

        <span className="text-xs text-yellow-400 font-mono hidden sm:inline-block bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full">
          SECURE PROTOCOL LOGIN
        </span>
      </div>

      {/* Main Login View Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-12">
        <HeroSection />
        <LoginCard onLoginSuccess={handleSuccess} />
      </div>
    </main>
  )
}
