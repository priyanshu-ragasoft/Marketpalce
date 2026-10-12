import React from 'react'

export default function BackgroundSplit({ isDark = false }) {
  if (isDark) {
    return (
      <>
        {/* Dark right side background with subtle warm yellow matrix */}
        <div className="absolute inset-0 z-0 bg-[#060606] bg-[radial-gradient(#eab30825_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Desktop Diagonal Midnight Slate Half on the Left */}
        <div 
          className="hidden lg:block absolute inset-0 z-0 bg-black transition-all"
          style={{
            clipPath: 'polygon(0 0, 62% 0, 42% 100%, 0 100%)',
            background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 55%, #121212 100%)'
          }}
        >
          {/* Warm gold ambient volumetric light glow */}
          <div className="absolute top-[20%] left-[24%] w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/15 blur-[140px] pointer-events-none" />
          
          {/* Subtle decorative grid lines on dark side */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_40%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        </div>

        {/* Mobile / Tablet fallback */}
        <div className="lg:hidden absolute inset-0 z-0 bg-black" />
      </>
    )
  }

  return (
    <>
      {/* Light right side background with warm subtle dot matrix */}
      <div className="absolute inset-0 z-0 bg-[#f8fafc] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Desktop Diagonal Midnight Slate Half on the Left */}
      <div 
        className="hidden lg:block absolute inset-0 z-0 bg-slate-950 transition-all"
        style={{
          clipPath: 'polygon(0 0, 62% 0, 42% 100%, 0 100%)',
          background: 'linear-gradient(135deg, #090e17 0%, #0f172a 55%, #1e293b 100%)'
        }}
      >
        {/* Warm gold ambient volumetric light glow */}
        <div className="absolute top-[20%] left-[24%] w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[140px] pointer-events-none" />
        
        {/* Subtle decorative grid lines on dark side */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_40%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Mobile / Tablet Deep Slate gradient fallback */}
      <div className="lg:hidden absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-900 to-[#f8fafc]" />
    </>
  )
}
