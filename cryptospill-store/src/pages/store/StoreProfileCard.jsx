import React, { useState } from 'react'
import StoreEditProfileModal from './StoreEditProfileModal'
import StoreChangePasswordModal from './StoreChangePasswordModal'

export default function StoreProfileCard({ profile, onRefreshProfile, onOpenChangePassword }) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)

  const firstName = profile?.first_name || 'Marketplace'
  const lastName = profile?.last_name || 'Admin'
  const fullName = profile?.full_name || `${firstName} ${lastName}`.trim()
  const email = profile?.email || 'marketplace@cryptospill.io'
  const countryCode = profile?.country_code || '+1'
  const phoneNumber = profile?.phone_number || 'N/A'
  const greetMsg = profile?.greet_msg || 'Official CryptoSpill Verified Merchant & Storefront Operations.'
  const profilePic = profile?.profile_pic || ''

  const handlePasswordClick = () => {
    if (onOpenChangePassword) {
      onOpenChangePassword()
    } else {
      setIsPasswordOpen(true)
    }
  }

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-800 overflow-hidden">
        {/* Card Header & Profile Banner */}
        <div className="p-4 sm:p-6 lg:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 bg-gradient-to-r from-amber-50/40 via-white to-white">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Avatar Profile Pic */}
            <div className="relative group shrink-0">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-amber-100 border-2 border-yellow-400/80 overflow-hidden flex items-center justify-center shadow-md shadow-amber-200/50">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt={fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex'
                      }
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-950 font-black text-xl sm:text-2xl items-center justify-center ${profilePic ? 'hidden' : 'flex'
                    }`}
                >
                  {firstName?.[0]?.toUpperCase() || 'M'}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border-2 border-white" title="Active Store Session" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 truncate">{fullName}</h2>
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300 text-amber-900 text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase shrink-0">
                  STORE VERIFIED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-mono mt-0.5 sm:mt-1 truncate">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-yellow-400/25"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Edit Profile</span>
            </button>


          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                First Name
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">{firstName}</div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Last Name
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">{lastName}</div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Full Name
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">{fullName}</div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Store Email
              </div>
              <div className="text-sm font-mono text-slate-900 truncate">{email}</div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Country Code
              </div>
              <div className="text-sm font-mono font-bold text-amber-700">{countryCode}</div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Phone Number
              </div>
              <div className="text-sm font-mono text-slate-900 truncate">{phoneNumber}</div>
            </div>
          </div>

          {/* Security & Credentials Strip */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-amber-50/30 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-yellow-300 text-amber-900 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900">Security & Credentials</div>
                <div className="text-[11px] text-slate-500">Manage and update your storefront administrator password</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePasswordClick}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <StoreEditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentProfile={profile}
        onProfileUpdated={(updated) => {
          if (onRefreshProfile) {
            onRefreshProfile(updated)
          }
        }}
      />

      {/* Change Password Modal */}
      <StoreChangePasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
      />
    </>
  )
}
