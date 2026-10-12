import React from 'react'
import logoImg from '../../assets/logo.png'
import { Link } from '../../router/RouterContext'

export default function BrandLogo({ size = 'default', isDarkBackground = false }) {
  const isLarge = size === 'large'
  const isSmall = size === 'small'

  const imgSize = isLarge
    ? 'w-10 h-10 sm:w-11 sm:h-11'
    : isSmall
      ? 'w-7 h-7 sm:w-8 sm:h-8'
      : 'w-8 h-8 sm:w-10 sm:h-10'

  const textSize = isLarge
    ? 'text-xl sm:text-3xl'
    : isSmall
      ? 'text-sm sm:text-lg'
      : 'text-lg sm:text-2xl'

  return (
    <Link to="/" className="inline-flex items-center gap-2 sm:gap-2.5 select-none group cursor-pointer no-underline">
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src={logoImg}
          alt="CryptoSpill Logo"
          className={`${imgSize} object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105`}
        />
      </div>

      <div className="flex items-center tracking-tight">
        <span className="flex min-w-0 items-baseline gap-0 select-none">
          <span className={`font-sans text-[18px] font-extrabold leading-none tracking-tight sm:text-[22px] lg:text-[26px] ${isDarkBackground ? 'text-white' : 'text-black'}`}>
            Crypto
          </span>
          <span 
            className="font-sans text-[18px] font-extrabold leading-none tracking-tight sm:text-[22px] lg:text-[26px]"
            style={{ color: '#D1A61B' }}
          >
            Spill
          </span>
        </span>
        <span className={`ml-1.5 sm:ml-2 text-[8.5px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full ${isDarkBackground
            ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
            : 'bg-yellow-100 text-amber-800 border border-yellow-300'
          }`}>
          STORE
        </span>
      </div>
    </Link>
  )
}
