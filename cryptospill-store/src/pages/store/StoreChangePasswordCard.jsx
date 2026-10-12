import React, { useState } from 'react'
import { changeStorePassword } from '../../services/storeAuthService'

export default function StoreChangePasswordCard() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [apiMessage, setApiMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiMessage('')
    setIsSuccess(false)

    if (!oldPassword) {
      setApiMessage('Please enter your current password.')
      setIsSuccess(false)
      return
    }

    if (!newPassword) {
      setApiMessage('Please enter your new password.')
      setIsSuccess(false)
      return
    }

    if (newPassword.length < 6) {
      setApiMessage('New password must be at least 6 characters long.')
      setIsSuccess(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setApiMessage('New password and confirmation password do not match.')
      setIsSuccess(false)
      return
    }

    setIsLoading(true)

    try {
      const res = await changeStorePassword({
        old_password: oldPassword,
        new_password: newPassword
      })

      // Show the API message. On success, clear the password inputs.
      setIsSuccess(true)
      setApiMessage(res.message || 'Password changed successfully.')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      // If it fails, stay on the page and show the API message
      setIsSuccess(false)
      setApiMessage(err.message || 'Failed to update store password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-yellow-300 text-amber-700 flex items-center justify-center font-bold">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-black text-slate-900">Change Store Password</h3>
          <p className="text-xs text-slate-500">
            POST /store/auth/change_password (Bearer store access_token)
          </p>
        </div>
      </div>

      {/* API Message Display */}
      {apiMessage && (
        <div
          className={`mb-6 p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 animate-fadeIn ${
            isSuccess
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {isSuccess ? (
            <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <div className="flex-1 font-medium leading-relaxed">{apiMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Old Password */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Current (Old) Password
          </label>
          <div className="relative">
            <input
              type={showOld ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-yellow-400 transition pr-14"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              {showOld ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (min. 6 characters)"
              autoComplete="new-password"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-yellow-400 transition pr-14"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              {showNew ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-yellow-400 transition pr-14"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              {showConfirm ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-yellow-400/25"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Update Password</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
