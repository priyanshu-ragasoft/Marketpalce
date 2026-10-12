import appleWatchImg from '../../assets/apple-watch.jpg'
import appleIpadImg from '../../assets/apple-ipad.jpg'
import appleIPhone17ProImg from '../../assets/apple-iphone-17-pro.jpg'
import appleIPhone18ProImg from '../../assets/apple-iphone-18-pro.jpg'
import appleIPhone18ProMaxImg from '../../assets/apple-iphone-18-pro-max.jpg'
import appleIPhoneDuoImg from '../../assets/apple-iphone-duo.jpg'
import appleGiftCardImg from '../../assets/apple-gift-card.jpg'
import appleCarePlusImg from '../../assets/apple-care-plus.jpg'
import appleOnePassImg from '../../assets/apple-one-pass.jpg'
import finalCutProImg from '../../assets/final-cut-pro.jpg'

export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'digital', name: 'Digital & Gift Cards' },
  { id: 'software', name: 'Software & Licenses' },
  { id: 'watch', name: 'Apple Watch' },
  { id: 'ipad', name: 'iPad' },
  { id: 'iphone-17', name: 'iPhone 17 Pro' },
  { id: 'iphone-18', name: 'iPhone 18 Pro' },
  { id: 'iphone-18-max', name: 'iPhone 18 Pro Max' },
  { id: 'iphone-duo', name: 'iPhone Duo' },
]

export const MARKETPLACE_OFFERS = [
  { tag: 'FLASH SALE', title: 'Up to 50% Off on iPhone 18 Pro Max & Pro Series', code: 'LIMITED TIME' },
  { tag: 'CASHBACK', title: 'Flat 8% Instant Crypto Cashback on All Apple Hardware', code: 'CODE: SPILL8' },
  { tag: '0% ESCROW', title: 'Zero Escrow Fee on Multi-Sig Hardware Orders', code: '100% PROTECTED' },
  { tag: 'AIR SHIPPING', title: 'Free Insured Worldwide Apple Delivery on Orders > $500', code: 'FREE SHIP' },
  { tag: 'EXCLUSIVE', title: 'Apple Watch Ultra 2 with Free Titanium Ocean Band Bundle', code: 'HOT DEAL' },
  { tag: 'PRE-ORDER', title: 'Pre-Order Foldable iPhone Duo & Get 1-Year AppleCare+ Free', code: 'NEW LAUNCH' },
]

export const PRODUCTS = [
  {
    id: 1,
    title: 'Apple Watch Ultra Titanium (Cellular)',
    category: 'watch',
    priceUSD: 799.00,
    priceCrypto: '0.229 ETH',
    rating: 4.9,
    reviews: 420,
    badge: 'BEST SELLER',
    badgeColor: 'bg-slate-900 text-white',
    image: appleWatchImg,
    merchant: 'Apple Authorized Escrow Store',
    inStock: true,
    description: 'Rugged 49mm titanium case with dual-frequency GPS, 3000-nit sapphire crystal display, ocean dive grade water resistance, and high-performance ocean band.',
    specs: ['49mm Aerospace Titanium Case', 'Dual-Frequency High-Precision GPS', 'Up to 72 Hours Battery Life', 'Water Resistant to 100m']
  },
  {
    id: 2,
    title: 'iPad Pro 13-inch M4 Ultra OLED',
    category: 'ipad',
    priceUSD: 1299.00,
    priceCrypto: '0.373 ETH',
    rating: 5.0,
    reviews: 312,
    badge: 'NEW ARRIVAL',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: appleIpadImg,
    merchant: 'Apple Official Storefront',
    inStock: true,
    description: 'Impossibly thin 5.1mm design powered by the groundbreaking M4 chip, Ultra Retina XDR tandem OLED display, Apple Pencil Pro barrel roll and haptics.',
    specs: ['M4 Chip with Next-Gen Neural Engine', 'Ultra Retina XDR Tandem OLED', '5.1mm Ultra-Thin Aluminum', 'Supports Apple Pencil Pro']
  },
  {
    id: 3,
    title: 'iPhone 17 Pro Desert Titanium (256GB)',
    category: 'iphone-17',
    priceUSD: 1099.00,
    priceCrypto: '0.315 ETH',
    rating: 4.9,
    reviews: 640,
    badge: 'FLAGSHIP',
    badgeColor: 'bg-slate-900 text-white',
    image: appleIPhone17ProImg,
    merchant: 'Apple Verified Merchant',
    inStock: true,
    description: 'Forged in Grade 5 Desert Titanium with A19 Pro Bionic, customizable Action Button, 48MP Pro raw camera system with 5x optical telephoto lens.',
    specs: ['Grade 5 Titanium Enclosure', 'A19 Pro 3nm Silicon Processor', '48MP Triple Fusion Camera', 'Super Retina XDR with ProMotion']
  },
  {
    id: 4,
    title: 'iPhone 18 Pro Deep Titanium Blue (512GB)',
    category: 'iphone-18',
    priceUSD: 1299.00,
    priceCrypto: '0.373 ETH',
    rating: 5.0,
    reviews: 512,
    badge: 'REVOLUTIONARY',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: appleIPhone18ProImg,
    merchant: 'Apple Flagship Vault',
    inStock: true,
    description: 'The next era of mobile technology. Edge-to-edge micro-bezel display with under-panel Face ID, quad-lens periscope system, and A20 Neural Fusion.',
    specs: ['A20 Neural Fusion Bionic', 'Under-Display Zero-Bezel Face ID', 'Quad-Lens 48MP Periscope Array', 'Next-Gen Apple Intelligence Pro']
  },
  {
    id: 5,
    title: 'iPhone 18 Pro Max Natural Titanium (1TB)',
    category: 'iphone-18-max',
    priceUSD: 1599.00,
    priceCrypto: '0.459 ETH',
    rating: 5.0,
    reviews: 890,
    badge: 'ULTIMATE PERFORMANCE',
    badgeColor: 'bg-slate-900 text-white',
    image: appleIPhone18ProMaxImg,
    merchant: 'Apple Official Storefront',
    inStock: true,
    description: 'The ultimate iPhone experience. Massive 6.9-inch Tandem OLED display, 1TB high-speed NVMe storage, satellite communications, and all-day pro battery.',
    specs: ['6.9-inch Tandem OLED 120Hz', '1TB Ultra High-Speed Storage', '10x Optical Periscope Zoom', 'Air-Gapped Crypto Enclave Vault']
  },
  {
    id: 6,
    title: 'iPhone Duo Dual-Screen Foldable (512GB)',
    category: 'iphone-duo',
    priceUSD: 1899.00,
    priceCrypto: '0.545 ETH',
    rating: 5.0,
    reviews: 245,
    badge: 'WORLD EXCLUSIVE',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: appleIPhoneDuoImg,
    merchant: 'Apple Innovation Lab',
    inStock: true,
    description: 'Revolutionary dual-screen foldable iPhone featuring zero-crease titanium micro-gear hinge, multi-window iPadOS multitasking, and seamless ceramic OLED.',
    specs: ['Patented Titanium Zero-Crease Hinge', 'Dual Seamless Ceramic OLED Panels', 'Desktop Multitasking Mode', 'Apple Pencil Duo Support']
  },
  {
    id: 7,
    title: 'Apple Gift Card $500 (Instant Digital Delivery)',
    category: 'digital',
    priceUSD: 500.00,
    priceCrypto: '0.143 ETH',
    rating: 5.0,
    reviews: 1240,
    badge: 'INSTANT CODE',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: appleGiftCardImg,
    merchant: 'Apple Digital Code Vault',
    inStock: true,
    description: 'Official $500 Apple Gift Card code delivered instantly to your registered email upon escrow confirmation. Redeemable for App Store, iTunes, Apple Store hardware, and subscriptions.',
    specs: ['Instant Automated Escrow Dispatch', 'Valid Worldwide (No Expiration)', 'Redeemable on Apple.com & App Store', 'Protected by Multi-Sig Smart Contract']
  },
  {
    id: 8,
    title: 'Apple One Premier 1-Year Family Pass (Digital License)',
    category: 'digital',
    priceUSD: 399.00,
    priceCrypto: '0.114 ETH',
    rating: 5.0,
    reviews: 680,
    badge: 'PREMIER BUNDLE',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: appleOnePassImg,
    merchant: 'Apple Services Escrow Store',
    inStock: true,
    description: 'All of Apple in one subscription. 1 full year of Apple Music, Apple TV+, Apple Arcade, 2TB iCloud+ storage, Apple News+, and Apple Fitness+ shareable with up to 5 family members.',
    specs: ['12 Months Full Premier Access', 'Includes 2TB iCloud+ Cloud Storage', 'Shareable with 5 Family Members', 'Instant Activation Voucher Code']
  },
  {
    id: 9,
    title: 'AppleCare+ 2-Year Extended Protection Certificate',
    category: 'digital',
    priceUSD: 249.00,
    priceCrypto: '0.071 ETH',
    rating: 4.9,
    reviews: 820,
    badge: 'OFFICIAL WARRANTY',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: appleCarePlusImg,
    merchant: 'Apple Authorized Warranty Escrow',
    inStock: true,
    description: 'Official 2-year AppleCare+ plan certificate with unlimited accidental damage protection, express replacement service, and 24/7 priority support from Apple experts.',
    specs: ['2-Year Unlimited Accidental Protection', 'Genuine Apple Certified Parts & Repairs', 'Express Worldwide Replacement Service', 'Direct Serial Registration via Oracle']
  },
  {
    id: 10,
    title: 'Final Cut Pro & Logic Pro Studio Lifetime Suite',
    category: 'software',
    priceUSD: 499.00,
    priceCrypto: '0.143 ETH',
    rating: 5.0,
    reviews: 540,
    badge: 'LIFETIME LICENSE',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: finalCutProImg,
    merchant: 'Apple Pro Audio & Video Lab',
    inStock: true,
    description: 'The definitive creative suite for macOS. Lifetime professional license for Final Cut Pro, Logic Pro, Motion, and Compressor with all future minor and major updates included.',
    specs: ['Permanent Mac App Store License Key', 'Final Cut Pro 11 + Logic Pro 11 Included', 'Supports Apple Silicon M1/M2/M3/M4', 'Multi-Machine Family Sharing Enabled']
  },
  {
    id: 11,
    title: 'Apple Gift Card $1,000 High-Roller Vault Voucher',
    category: 'digital',
    priceUSD: 1000.00,
    priceCrypto: '0.287 ETH',
    rating: 5.0,
    reviews: 430,
    badge: 'HIGH ROLLER',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: appleGiftCardImg,
    merchant: 'Apple Digital Code Vault',
    inStock: true,
    description: 'Maximum tier $1,000 Apple Gift Card code. Ideal for buying unlocked iPhones, MacBooks, and hardware directly on Apple.com with instant escrow delivery.',
    specs: ['$1,000 Full Face Value (No Fees)', 'Zero Expiry Date & Global Redemption', 'Automated Email + SMS Code Release', 'Verified Cryptographic Hash Receipt']
  },
  {
    id: 12,
    title: 'Apple Developer Program 1-Year Enterprise Key',
    category: 'software',
    priceUSD: 299.00,
    priceCrypto: '0.086 ETH',
    rating: 4.9,
    reviews: 310,
    badge: 'ENTERPRISE ACCESS',
    badgeColor: 'bg-yellow-400 text-slate-950',
    image: appleOnePassImg,
    merchant: 'Apple Developer Portal Escrow',
    inStock: true,
    description: '1-Year access to the official Apple Developer Program. Publish apps on the App Store, access beta iOS/macOS releases, TestFlight, and advanced Apple Intelligence APIs.',
    specs: ['Unlimited App Store Distribution', 'TestFlight 10,000 External Testers', 'Access to iOS 19 & macOS Betas', 'Advanced CloudKit & SiriKit Access']
  }
]

export const PRESET_IMAGES = [
  { label: 'iPhone 18 Pro Max', src: appleIPhone18ProMaxImg },
  { label: 'iPhone 18 Pro', src: appleIPhone18ProImg },
  { label: 'iPhone 17 Pro', src: appleIPhone17ProImg },
  { label: 'iPhone Duo Foldable', src: appleIPhoneDuoImg },
  { label: 'Apple Watch Ultra', src: appleWatchImg },
  { label: 'iPad Pro M4 OLED', src: appleIpadImg },
  { label: 'Apple Gift Card', src: appleGiftCardImg },
  { label: 'AppleCare+ Certificate', src: appleCarePlusImg },
  { label: 'Apple One Pass', src: appleOnePassImg },
  { label: 'Final Cut Pro Suite', src: finalCutProImg },
]

export const DEFAULT_BANNERS = [
  {
    id: 1,
    brandName: 'CryptoSpill Apple Fest',
    offerText: '30-50% Off',
    offerSub: 'On iPhone 18 Pro Max & Pro Series',
    cashbackText: 'Upto 8% Crypto Cashback',
    cashbackTag: 'CS',
    image: appleIPhone18ProMaxImg,
    badgeText: 'THE BIG SPILL DAYS',
    badgeSub: 'LIVE NOW',
    gradient: 'from-[#0f172a] via-[#1e293b] to-[#020617]',
    badgeBg: 'bg-yellow-400 text-black',
    ribbonBg: 'bg-slate-950 text-yellow-300'
  },
  {
    id: 2,
    brandName: 'Apple Watch Ultra Days',
    offerText: 'Upto 45% Off',
    offerSub: 'Titanium Cellular & Ocean Loop Band',
    cashbackText: 'Upto 6% SPILL Rewards',
    cashbackTag: 'CS',
    image: appleWatchImg,
    badgeText: 'GREAT APPLE FESTIVAL',
    badgeSub: 'LIVE NOW',
    gradient: 'from-[#ff6f00] via-[#e65100] to-[#bf360c]',
    badgeBg: 'bg-yellow-400 text-orange-950',
    ribbonBg: 'bg-red-900 text-yellow-300'
  },
  {
    id: 3,
    brandName: 'World Exclusive Launch',
    offerText: '40-60% Off',
    offerSub: 'Revolutionary Foldable iPhone Duo',
    cashbackText: '0% Multi-Sig Escrow Fee',
    cashbackTag: 'CS',
    image: appleIPhoneDuoImg,
    badgeText: 'BIG INNOVATION FEST',
    badgeSub: 'LIVE NOW',
    gradient: 'from-[#7b1fa2] via-[#6a1b9a] to-[#4a148c]',
    badgeBg: 'bg-yellow-400 text-purple-950',
    ribbonBg: 'bg-fuchsia-950 text-yellow-300'
  },
  {
    id: 4,
    brandName: 'iPad Pro Studio Sale',
    offerText: 'Flat $350 Off',
    offerSub: 'Tandem OLED M4 & Apple Pencil Pro',
    cashbackText: 'Instant Worldwide Delivery',
    cashbackTag: 'CS',
    image: appleIpadImg,
    badgeText: 'PRO CREATIVE DAYS',
    badgeSub: 'LIVE NOW',
    gradient: 'from-[#00695c] via-[#004d40] to-[#00251a]',
    badgeBg: 'bg-yellow-400 text-emerald-950',
    ribbonBg: 'bg-emerald-950 text-yellow-300'
  },
  {
    id: 5,
    brandName: 'iPhone 17 Pro Flash Drop',
    offerText: '30-40% Off',
    offerSub: 'Desert Titanium A19 Pro Bionic',
    cashbackText: 'Insured Escrow Vault',
    cashbackTag: 'CS',
    image: appleIPhone17ProImg,
    badgeText: 'FLASH CRYPTO DEALS',
    badgeSub: 'LIVE NOW',
    gradient: 'from-[#1e293b] via-[#0f172a] to-[#020617]',
    badgeBg: 'bg-yellow-400 text-slate-950',
    ribbonBg: 'bg-slate-900 text-yellow-300'
  }
]

export const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem('cryptospill_custom_products')
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error('Failed to parse products from localStorage', e)
  }
  return PRODUCTS
}

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem('cryptospill_custom_products', JSON.stringify(products))
    window.dispatchEvent(new Event('cryptospill_products_updated'))
  } catch (e) {
    console.error('Failed to save products', e)
  }
}

export const getStoredBanners = () => {
  try {
    const raw = localStorage.getItem('cryptospill_banners')
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error('Failed to parse banners from localStorage', e)
  }
  return DEFAULT_BANNERS
}

export const saveStoredBanners = (banners) => {
  try {
    localStorage.setItem('cryptospill_banners', JSON.stringify(banners))
    window.dispatchEvent(new Event('cryptospill_banners_updated'))
  } catch (e) {
    console.error('Failed to save banners', e)
  }
}

export const getStoredAnnouncements = () => {
  try {
    const raw = localStorage.getItem('cryptospill_announcements')
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error('Failed to parse announcements from localStorage', e)
  }
  return MARKETPLACE_OFFERS
}

export const saveStoredAnnouncements = (announcements) => {
  try {
    localStorage.setItem('cryptospill_announcements', JSON.stringify(announcements))
    window.dispatchEvent(new Event('cryptospill_announcements_updated'))
  } catch (e) {
    console.error('Failed to save announcements', e)
  }
}

export const getStoredCategories = () => {
  try {
    const raw = localStorage.getItem('cryptospill_categories')
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error('Failed to parse categories from localStorage', e)
  }
  return CATEGORIES
}

export const saveStoredCategories = (categories) => {
  try {
    localStorage.setItem('cryptospill_categories', JSON.stringify(categories))
    window.dispatchEvent(new Event('cryptospill_categories_updated'))
  } catch (e) {
    console.error('Failed to save categories', e)
  }
}
