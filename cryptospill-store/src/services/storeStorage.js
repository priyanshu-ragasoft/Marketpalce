// Store-specific storage isolated completely from platform admin and customer keys.
// NEVER read or write admin or customer tokens here.

const STORE_ACCESS_TOKEN_KEY = 'cryptospill_store_access_token'
const STORE_REFRESH_TOKEN_KEY = 'cryptospill_store_refresh_token'
const STORE_PROFILE_KEY = 'cryptospill_store_profile'

export function getStoreAccessToken() {
  try {
    return localStorage.getItem(STORE_ACCESS_TOKEN_KEY) || null
  } catch {
    return null
  }
}

export function getStoreRefreshToken() {
  try {
    return localStorage.getItem(STORE_REFRESH_TOKEN_KEY) || null
  } catch {
    return null
  }
}

export function getStoreProfile() {
  try {
    const raw = localStorage.getItem(STORE_PROFILE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoreTokens(accessToken, refreshToken) {
  try {
    if (accessToken) {
      localStorage.setItem(STORE_ACCESS_TOKEN_KEY, accessToken)
    }
    if (refreshToken) {
      localStorage.setItem(STORE_REFRESH_TOKEN_KEY, refreshToken)
    }
  } catch (err) {
    console.error('Failed to store store tokens', err)
  }
}

export function setStoreProfile(profile) {
  try {
    if (profile) {
      localStorage.setItem(STORE_PROFILE_KEY, JSON.stringify(profile))
    }
  } catch (err) {
    console.error('Failed to store store profile', err)
  }
}

export function clearStoreAuth() {
  try {
    localStorage.removeItem(STORE_ACCESS_TOKEN_KEY)
    localStorage.removeItem(STORE_REFRESH_TOKEN_KEY)
    localStorage.removeItem(STORE_PROFILE_KEY)
  } catch (err) {
    console.error('Failed to clear store auth', err)
  }
}

export function hasStoreAuth() {
  return Boolean(getStoreAccessToken())
}
