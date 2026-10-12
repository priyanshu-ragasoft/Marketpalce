import React, { useState, useEffect } from 'react'
import {
  getStoredAnnouncements,
  saveStoredAnnouncements,
  MARKETPLACE_OFFERS
} from '../../components/marketplace/marketplaceData'

export default function StoreAnnouncementsManager({ onShowToast }) {
  const [announcements, setAnnouncements] = useState(() => getStoredAnnouncements())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTag, setNewTag] = useState('FLASH SALE')
  const [newTitle, setNewTitle] = useState('')
  const [newCode, setNewCode] = useState('LIMITED TIME')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Sync state if storage changes externally
  useEffect(() => {
    const handleSync = () => {
      setAnnouncements(getStoredAnnouncements())
    }
    window.addEventListener('cryptospill_announcements_updated', handleSync)
    window.addEventListener('storage', handleSync)
    return () => {
      window.removeEventListener('cryptospill_announcements_updated', handleSync)
      window.removeEventListener('storage', handleSync)
    }
  }, [])

  const notify = (msg) => {
    if (onShowToast) onShowToast(msg)
  }

  // Handle inline change for a specific field
  const handleFieldChange = (index, field, value) => {
    const updated = [...announcements]
    updated[index] = {
      ...updated[index],
      [field]: value
    }
    setAnnouncements(updated)
    setHasUnsavedChanges(true)
  }

  // Save changes to storage and trigger broadcast
  const handleSaveAll = () => {
    saveStoredAnnouncements(announcements)
    setHasUnsavedChanges(false)
    notify('Announcements updated & live on storefront ticker!')
  }

  // Delete announcement
  const handleDelete = (index) => {
    if (announcements.length <= 1) {
      notify('At least one announcement is recommended for the store ticker.')
    }
    const updated = announcements.filter((_, idx) => idx !== index)
    setAnnouncements(updated)
    saveStoredAnnouncements(updated)
    notify('Announcement removed from live ticker.')
  }

  // Add new announcement submit
  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) {
      notify('Please enter an announcement title.')
      return
    }

    const item = {
      tag: (newTag.trim() || 'OFFER').toUpperCase(),
      title: newTitle.trim(),
      code: (newCode.trim() || 'CLAIM NOW').toUpperCase()
    }

    const updated = [item, ...announcements]
    setAnnouncements(updated)
    saveStoredAnnouncements(updated)
    setIsAddModalOpen(false)
    setNewTitle('')
    setNewTag('FLASH SALE')
    setNewCode('LIMITED TIME')
    notify('New announcement published to live storefront!')
  }

  // Reset to default presets
  const handleResetDefaults = () => {
    if (window.confirm('Reset announcements to default CryptoSpill marketplace offers?')) {
      setAnnouncements(MARKETPLACE_OFFERS)
      saveStoredAnnouncements(MARKETPLACE_OFFERS)
      notify('Reset announcements to default offers.')
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn text-slate-800">
      {/* Top Action & Control Header */}
      <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Store Announcements &amp; Ticker
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 border border-yellow-300 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
              {announcements.length} Active
            </span>
            {hasUnsavedChanges && (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-[10px] font-bold animate-pulse">
                Unsaved changes
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Edit the real-time announcement ticker running at the top of the CryptoSpill customer storefront. Changes sync instantly across the app.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {hasUnsavedChanges && (
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm shadow-emerald-600/25"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Save Changes</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm shadow-yellow-400/25"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Announcement</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            title="Reset to default offers"
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Live Storefront Ticker Preview */}
      <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
            Live Storefront Marquee Ticker Preview
          </span>
          <span className="text-[11px] font-mono text-emerald-600 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Broadcast Active
          </span>
        </div>

        <div className="w-full bg-[#121212] border border-neutral-800 rounded-xl py-3 px-4 overflow-hidden relative shadow-inner">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs text-white">
            {announcements.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 shrink-0">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#D1A61B] text-black">
                  {item.tag}
                </span>
                <span className="font-bold text-slate-100">{item.title}</span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-neutral-800 text-yellow-300 border border-neutral-700">
                  {item.code}
                </span>
                <span className="text-neutral-600 mx-1">&bull;</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcement Items Editor List */}
      <div className="space-y-3">
        {announcements.map((item, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-yellow-400/60 transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4"
          >
            {/* Number + Badge Tag Input */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Tag Badge
                </span>
                <input
                  type="text"
                  value={item.tag}
                  onChange={(e) => handleFieldChange(index, 'tag', e.target.value.toUpperCase())}
                  placeholder="TAG"
                  className="w-28 px-2.5 py-1.5 rounded-lg bg-yellow-50 border border-yellow-300 text-amber-900 text-xs font-black uppercase tracking-wider focus:outline-none focus:border-yellow-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Announcement Title Input */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                Announcement Message
              </span>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                placeholder="Announcement message or promotion headline..."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:border-yellow-400 focus:bg-white transition"
              />
            </div>

            {/* Code / Callout + Action Buttons */}
            <div className="flex items-end gap-2.5 shrink-0 justify-between md:justify-end">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                  Code / Action
                </span>
                <input
                  type="text"
                  value={item.code}
                  onChange={(e) => handleFieldChange(index, 'code', e.target.value.toUpperCase())}
                  placeholder="CODE"
                  className="w-32 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase focus:outline-none focus:border-yellow-400 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-1.5 pb-0.5">
                <button
                  type="button"
                  onClick={() => {
                    saveStoredAnnouncements(announcements)
                    setHasUnsavedChanges(false)
                    notify(`Announcement #${index + 1} saved & published!`)
                  }}
                  title="Save this announcement"
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  title="Delete announcement"
                  className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: ADD NEW ANNOUNCEMENT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-900 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 border border-yellow-300 text-amber-900 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Add Store Announcement</h3>
                  <p className="text-xs text-slate-500">Live promotion banner for customer storefront</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Tag Presets */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Quick Tag Presets
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['FLASH SALE', 'EXCLUSIVE', 'SPECIAL OFFER', 'NEW ARRIVAL', 'ESCROW DROP', 'DISCOUNT'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setNewTag(preset)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition cursor-pointer ${
                      newTag === preset
                        ? 'bg-yellow-400 text-slate-950 shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Tag Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Badge Tag (e.g. FLASH SALE, OFFER)
                </label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value.toUpperCase())}
                  placeholder="TAG NAME"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-xs uppercase tracking-wider focus:outline-none focus:border-yellow-400 focus:bg-white transition"
                />
              </div>

              {/* Title / Headline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Announcement Message / Headline
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Up to 40% Off on Selected Hardware Drops"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold focus:outline-none focus:border-yellow-400 focus:bg-white transition"
                />
              </div>

              {/* Code / Callout */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Promo Code or Action Button Text
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SPILL40 or CLAIM NOW"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs font-bold uppercase focus:outline-none focus:border-yellow-400 focus:bg-white transition"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shadow-sm shadow-yellow-400/25"
                >
                  <span>Publish Announcement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
