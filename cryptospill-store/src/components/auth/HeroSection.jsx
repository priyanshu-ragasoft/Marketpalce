import React from 'react'
import BrandLogo from '../common/BrandLogo'

export default function HeroSection() {
  return (
    <section className="relative z-10 w-full lg:w-[54%] flex flex-col justify-between self-stretch lg:pr-8 py-2 lg:py-6">
      
      {/* Top Brand Logo */}
      <div className="pt-2">
        <BrandLogo size="default" isDarkBackground={true} />
      </div>

      {/* Center Hero Information */}
      <div className="my-auto py-10 lg:py-16 max-w-xl">
        
        {/* Eyebrow Label: MARKETPLACE STORE */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-xs font-bold tracking-[0.24em] uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span>MARKETPLACE STORE</span>
          </div>
        </div>

        {/* Main Marketplace Store Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.15] tracking-tight mb-6">
          Discover, buy and sell digital assets in one clean marketplace.
        </h1>

        {/* Description Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal mb-8">
          A modern crypto marketplace store built for the CryptoSpill ecosystem. Browse verified merchant stores, trade exclusive digital assets, and enjoy secure instant checkout.
        </p>

        {/* Live Platform Stats */}
        <div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 py-2.5 px-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="text-xs font-semibold text-white">Store Online</span>
          </div>
          
          <div className="w-px h-3.5 bg-slate-700 hidden sm:block" />
          
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Verified Stores:</span>
            <span className="text-xs font-bold text-yellow-400">1,420+</span>
          </div>

          <div className="w-px h-3.5 bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Network:</span>
            <span className="text-xs font-semibold text-slate-200">CryptoSpill Mainnet</span>
          </div>
        </div>
      </div>

      {/* Bottom Left Footer */}
      <div className="hidden lg:flex items-center gap-6 text-xs text-slate-400 font-medium">
        <span>&copy; {new Date().getFullYear()} CryptoSpill Marketplace Store</span>
        <span>&bull;</span>
        <a href="#store-terms" className="hover:text-white transition-colors">Store Terms</a>
        <span>&bull;</span>
        <a href="#merchant-policy" className="hover:text-white transition-colors">Merchant Policy</a>
        <span>&bull;</span>
        <a href="#buyer-protection" className="hover:text-white transition-colors">Buyer Protection</a>
      </div>

    </section>
  )
}
