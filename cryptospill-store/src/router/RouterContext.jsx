import React, { createContext, useContext, useState, useEffect } from 'react'

const RouterContext = createContext()

// Helper to normalize and get clean route path from window location
export function getRouteFromLocation() {
  if (typeof window === 'undefined') return '/'

  const hash = window.location.hash || ''
  // If user has old hash like "#/admin" or "#/", convert to clean URL
  if (hash.startsWith('#/')) {
    const cleanFromHash = hash.slice(1) || '/'
    try {
      window.history.replaceState(null, '', cleanFromHash)
    } catch (e) {
      // ignore
    }
    return cleanFromHash.split('?')[0] || '/'
  } else if (hash === '#') {
    try {
      window.history.replaceState(null, '', window.location.pathname || '/')
    } catch (e) {
      // ignore
    }
  }

  const pathname = window.location.pathname || '/'
  if (pathname === '/index.html') return '/'
  return pathname
}

// Backward-compatible alias
export const getRouteFromHash = getRouteFromLocation

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(getRouteFromLocation)

  useEffect(() => {
    // Immediately clean up any existing hash in browser URL
    const hash = window.location.hash || ''
    if (hash.startsWith('#/')) {
      const cleanFromHash = hash.slice(1) || '/'
      try {
        window.history.replaceState(null, '', cleanFromHash)
        setCurrentPath(cleanFromHash.split('?')[0] || '/')
      } catch (e) {}
    } else if (hash === '#') {
      try {
        window.history.replaceState(null, '', window.location.pathname || '/')
      } catch (e) {}
    }

    const handleLocationChange = () => {
      const nextPath = getRouteFromLocation()
      setCurrentPath(nextPath)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const navigate = (to, options = {}) => {
    let cleanPath = to || '/'
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath
    }

    // Clean browser URL using HTML5 History API (no '#')
    try {
      if (options.replace) {
        window.history.replaceState(null, '', cleanPath)
      } else {
        window.history.pushState(null, '', cleanPath)
      }
    } catch (e) {
      // fallback
    }

    // Extract path without query parameters for route matching
    const pathOnly = cleanPath.split('?')[0]
    setCurrentPath(pathOnly)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Parse route parameters, e.g. /product/:id
  const matchRoute = (pattern) => {
    const active = currentPath.split('?')[0]
    if (pattern === active) return { match: true, params: {} }

    // Check dynamic pattern like /product/:id
    const patternParts = pattern.split('/').filter(Boolean)
    const currentParts = active.split('/').filter(Boolean)

    if (patternParts.length !== currentParts.length) {
      return { match: false, params: {} }
    }

    const params = {}
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const paramName = patternParts[i].slice(1)
        params[paramName] = currentParts[i]
      } else if (patternParts[i] !== currentParts[i]) {
        return { match: false, params: {} }
      }
    }

    return { match: true, params }
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate, matchRoute }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}

export function Link({ to, children, className = '', onClick, replace = false, ...props }) {
  const { navigate } = useRouter()

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    if (onClick) onClick(e)
    navigate(to, { replace })
  }

  const cleanHref = to ? (to.startsWith('/') ? to : '/' + to) : '/'

  return (
    <a href={cleanHref} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
