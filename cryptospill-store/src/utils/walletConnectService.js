// WalletConnect v2 Service for CryptoSpill Store
// Official EthereumProvider with QR Modal and Project ID

const PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ||
  'a161795d1950320fabc1655255a31172'

const METADATA = {
  name: 'CryptoSpill Store',
  description: 'CryptoSpill Decentralized Escrow Marketplace',
  url: import.meta.env.VITE_WALLETCONNECT_URL || 'https://cryptospill.io',
  icons: ['https://cryptospill.io/favicon.ico'],
}

const rawWalletIds =
  import.meta.env.VITE_WALLETCONNECT_RECOMMENDED_WALLET_IDS ||
  'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96,4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0,971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709,38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662,1ae92b26df02f0ffd630424b7900ed8022ebd9e10f669048ee3c32024124f21d,fd20dc426fb3704d1669236413dc8370377e2023a9b139366e0474a89669528e'

const RECOMMENDED_WALLET_IDS = rawWalletIds
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

let providerInstance = null

async function getEthereumProviderClass() {
  if (typeof window === 'undefined') return null

  if (window.WalletConnectEthereumProvider) {
    return window.WalletConnectEthereumProvider.EthereumProvider || window.WalletConnectEthereumProvider
  }

  try {
    const mod = await import('https://esm.sh/@walletconnect/ethereum-provider@2.18.0?bundle')
    return mod.EthereumProvider || mod.default?.EthereumProvider || mod.default
  } catch (err1) {
    try {
      const mod = await import('https://cdn.jsdelivr.net/npm/@walletconnect/ethereum-provider@2.18.0/+esm')
      return mod.EthereumProvider || mod.default?.EthereumProvider || mod.default
    } catch (err2) {
      console.warn('Could not load WalletConnect via ESM CDN:', err1, err2)
      return null
    }
  }
}

async function initProvider(EthereumProvider) {
  return await EthereumProvider.init({
    projectId: PROJECT_ID,
    showQrModal: true,
    qrModalOptions: {
      themeMode: 'light',
      explorerRecommendedWalletIds: RECOMMENDED_WALLET_IDS,
      themeVariables: {
        '--wcm-z-index': '99999',
        '--wcm-accent-color': '#3B99FC',
      },
    },
    chains: [1],
    optionalChains: [1, 56, 137, 42161],
    rpcMap: {
      1: 'https://cloudflare-eth.com',
      56: 'https://bsc-dataseed.binance.org',
      137: 'https://polygon-rpc.com',
      42161: 'https://arb1.arbitrum.io/rpc',
    },
    metadata: METADATA,
  })
}

/**
 * Connect via official WalletConnect modal
 */
export async function connectWithWalletConnect() {
  const EthereumProvider = await getEthereumProviderClass()

  if (!EthereumProvider) {
    throw new Error(
      'WalletConnect could not be loaded. Please check your internet connection.'
    )
  }

  // Helper to run connection on a clean or existing instance
  const runConnect = async (provider) => {
    // If already connected with active session
    if (provider.session && provider.accounts?.length > 0) {
      return {
        address: provider.accounts[0],
        provider,
        walletName: 'WalletConnect',
      }
    }

    await provider.connect()

    if (!provider.accounts || provider.accounts.length === 0) {
      throw new Error('No accounts selected in WalletConnect')
    }

    return {
      address: provider.accounts[0],
      provider,
      walletName: 'WalletConnect',
    }
  }

  try {
    if (!providerInstance) {
      providerInstance = await initProvider(EthereumProvider)
    }
    return await runConnect(providerInstance)
  } catch (error) {
    console.warn('WalletConnect initial attempt failed:', error?.message)

    // Handle "Connection request reset" or stale pairing by resetting and retrying once cleanly
    const isReset =
      error?.message?.includes('Connection request reset') ||
      error?.message?.includes('reset') ||
      error?.message?.includes('already pending') ||
      error?.message?.includes('Pairing')

    if (isReset) {
      try {
        if (providerInstance) {
          await providerInstance.disconnect()
        }
      } catch (_) {}
      providerInstance = null

      // Clean retry
      try {
        providerInstance = await initProvider(EthereumProvider)
        return await runConnect(providerInstance)
      } catch (retryError) {
        if (retryError?.message?.includes('User closed modal')) {
          throw new Error('Connection closed by user.')
        }
        throw retryError
      }
    }

    if (error?.message?.includes('User closed modal')) {
      throw new Error('Connection closed by user.')
    }

    throw error
  }
}

/**
 * Disconnects active WalletConnect session
 */
export async function disconnectWalletConnect() {
  if (providerInstance) {
    try {
      await providerInstance.disconnect()
    } catch (e) {
      // ignore
    }
    providerInstance = null
  }
}
