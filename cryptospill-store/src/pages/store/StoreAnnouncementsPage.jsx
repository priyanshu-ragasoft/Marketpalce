import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  listStoreAnnouncements,
  createStoreAnnouncement,
  getStoreAnnouncementDetails,
  updateStoreAnnouncement,
  deleteStoreAnnouncement
} from '../../services/storeAnnouncementService'

export default function StoreAnnouncementsPage({ onShowToast }) {
  // ----------------------------------------------------
  // LIST & FILTER STATE
  // ----------------------------------------------------
  const [rows, setRows] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [searchKey, setSearchKey] = useState('')
  // activeFilter: 'all' | 'active' | 'inactive'
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortColumn] = useState('sortOrder')
  const [sortDirection] = useState('desc')
  const [isLoadingList, setIsLoadingList] = useState(false)
  const [listError, setListError] = useState('')
  const [listSuccess, setListSuccess] = useState('')

  // ----------------------------------------------------
  // MODAL STATE (CREATE & EDIT IN ONE MODAL)
  // ----------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create') // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null)
  const [initialEditValues, setInitialEditValues] = useState(null)

  // Form Fields
  const [formMessage, setFormMessage] = useState('')
  const [formLinkUrl, setFormLinkUrl] = useState('')
  const [formIsActive, setFormIsActive] = useState(true)
  const [formSortOrder, setFormSortOrder] = useState(0)

  // Form Field Validation & Submission State
  const [formErrors, setFormErrors] = useState({})
  const [formGeneralError, setFormGeneralError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  // Toast / notification helper
  const notify = useCallback((msg) => {
    if (onShowToast) onShowToast(msg)
  }, [onShowToast])

  // ----------------------------------------------------
  // FETCH LIST FROM API
  // ----------------------------------------------------
  const fetchList = useCallback(async (targetPage = page, search = searchKey, filter = activeFilter) => {
    setIsLoadingList(true)
    setListError('')
    try {
      // All sends no isActive.
      // Active sends isActive=true.
      // Inactive sends isActive=false.
      let isActiveParam = ''
      if (filter === 'active') isActiveParam = 'true'
      if (filter === 'inactive') isActiveParam = 'false'

      const res = await listStoreAnnouncements({
        page: targetPage,
        limit,
        search_key: search,
        isActive: isActiveParam,
        sort_column: sortColumn,
        sort_direction: sortDirection
      })

      setRows(res.rows || [])
      setTotalCount(res.totalCount || 0)
    } catch (err) {
      console.error('Failed to fetch announcements list:', err)
      setListError(err.message || 'Failed to load announcements.')
    } finally {
      setIsLoadingList(false)
    }
  }, [page, limit, searchKey, activeFilter, sortColumn, sortDirection])

  // Initial load
  useEffect(() => {
    fetchList(page, searchKey, activeFilter)
  }, [page, activeFilter])

  // Debounced search effect
  const searchTimeoutRef = useRef(null)
  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchKey(val)
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => {
      setPage(1)
      fetchList(1, val, activeFilter)
    }, 350)
  }

  // ----------------------------------------------------
  // OPEN MODAL FOR CREATE
  // ----------------------------------------------------
  const handleOpenCreateModal = () => {
    setModalMode('create')
    setEditingId(null)
    setInitialEditValues(null)
    setFormMessage('')
    setFormLinkUrl('')
    setFormIsActive(true)
    setFormSortOrder(0)
    setFormErrors({})
    setFormGeneralError('')
    setIsModalOpen(true)
  }

  // ----------------------------------------------------
  // OPEN MODAL FOR EDIT (GET /store/announcement/details/:id)
  // ----------------------------------------------------
  const handleOpenEditModal = async (announcementId) => {
    setModalMode('edit')
    setEditingId(announcementId)
    setFormErrors({})
    setFormGeneralError('')
    setIsLoadingDetails(true)
    setIsModalOpen(true)

    try {
      const res = await getStoreAnnouncementDetails(announcementId)
      const data = res.data || {}

      const msg = data.message || ''
      const link = data.linkUrl || ''
      const active = data.isActive !== undefined ? Boolean(data.isActive) : true
      const sort = data.sortOrder !== undefined ? Number(data.sortOrder) : 0

      setFormMessage(msg)
      setFormLinkUrl(link)
      setFormIsActive(active)
      setFormSortOrder(sort)

      // Store initial values to only send changed fields
      setInitialEditValues({
        message: msg,
        linkUrl: link,
        isActive: active,
        sortOrder: sort
      })
    } catch (err) {
      // 400 means this announcement does not belong to the logged-in store. Do not show it.
      if (err.is400 || err.status === 400 || err.code === 400) {
        setIsModalOpen(false)
        setListError('This announcement does not belong to your store.')
        notify('Announcement does not belong to this store.')
      } else {
        setFormGeneralError(err.message || 'Could not load announcement details.')
      }
    } finally {
      setIsLoadingDetails(false)
    }
  }

  // ----------------------------------------------------
  // MODAL SUBMISSION (CREATE OR EDIT)
  // ----------------------------------------------------
  const handleModalSubmit = async (e) => {
    e.preventDefault()
    setFormErrors({})
    setFormGeneralError('')

    // Client-side quick check
    if (!formMessage.trim()) {
      setFormErrors({ message: 'Announcement message is required.' })
      return
    }

    setIsSubmitting(true)

    try {
      if (modalMode === 'create') {
        // POST /store/announcement/create
        const payload = {
          message: formMessage.trim(),
          linkUrl: formLinkUrl.trim(),
          isActive: formIsActive,
          sortOrder: Number(formSortOrder) || 0
        }

        const res = await createStoreAnnouncement(payload)
        const successMsg = res.message || 'Announcement created successfully'
        setIsModalOpen(false)
        setListSuccess(successMsg)
        notify(successMsg)
        window.dispatchEvent(new CustomEvent('cryptospill_announcements_updated'))
        setTimeout(() => setListSuccess(''), 4000)
        // Close the modal and reload the list
        fetchList(1, searchKey, activeFilter)
      } else {
        // PUT /store/announcement/update/:announcement_id
        // Send only the changed fields
        const changedFields = {}
        const prev = initialEditValues || {}

        if (formMessage.trim() !== prev.message) {
          changedFields.message = formMessage.trim()
        }
        if (formLinkUrl.trim() !== prev.linkUrl) {
          changedFields.linkUrl = formLinkUrl.trim()
        }
        if (formIsActive !== prev.isActive) {
          changedFields.isActive = formIsActive
        }
        if (Number(formSortOrder) !== Number(prev.sortOrder)) {
          changedFields.sortOrder = Number(formSortOrder) || 0
        }

        // If no fields changed, simply close modal
        if (Object.keys(changedFields).length === 0) {
          setIsModalOpen(false)
          notify('No fields were changed.')
          return
        }

        const res = await updateStoreAnnouncement(editingId, changedFields)
        const successMsg = res.message || 'Announcement updated successfully'
        setIsModalOpen(false)
        setListSuccess(successMsg)
        notify(successMsg)
        window.dispatchEvent(new CustomEvent('cryptospill_announcements_updated'))
        setTimeout(() => setListSuccess(''), 4000)
        // Reload list
        fetchList(page, searchKey, activeFilter)
      }
    } catch (err) {
      console.error('Modal submit error:', err)
      // 417 means the form is invalid. Show message on the field area.
      if (err.is417 || err.status === 417 || err.code === 417) {
        const msg = err.message || 'Validation failed for the submitted fields.'
        setFormErrors({ general: msg, fieldArea: msg })
      } else if (err.is400 || err.status === 400) {
        setFormGeneralError('This announcement does not belong to the logged-in store.')
      } else {
        setFormGeneralError(err.message || 'An error occurred while saving the announcement.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // ----------------------------------------------------
  // DELETE ANNOUNCEMENT
  // DELETE /store/announcement/delete/:announcement_id
  // ----------------------------------------------------
  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this announcement:\n\n"${row.message}"?`)
    if (!confirmDelete) return

    try {
      const res = await deleteStoreAnnouncement(row._id)
      const successMsg = res.message || 'Announcement deleted successfully'
      // On code 200, remove that row
      setRows((prev) => prev.filter((item) => item._id !== row._id))
      setTotalCount((prev) => Math.max(0, prev - 1))
      setListSuccess(successMsg)
      notify(successMsg)
      window.dispatchEvent(new CustomEvent('cryptospill_announcements_updated'))
      setTimeout(() => setListSuccess(''), 4000)
    } catch (err) {
      const errorMsg = err.message || 'Failed to delete announcement.'
      setListError(errorMsg)
      notify(errorMsg)
    }
  }

  // ----------------------------------------------------
  // FILTER TAB SWITCH
  // ----------------------------------------------------
  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setPage(1)
  }

  return (
    <div className="space-y-6 animate-fadeIn font-['Plus_Jakarta_Sans',sans-serif] text-slate-800">
      {/* Top Banner Alert / Success */}
      {listSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{listSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setListSuccess('')}
            className="text-emerald-700 hover:text-emerald-950 font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Banner Error */}
      {listError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{listError}</span>
          </div>
          <button
            type="button"
            onClick={() => setListError('')}
            className="text-rose-700 hover:text-rose-950 font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* HEADER & CONTROLS ABOVE THE TABLE */}
      <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Store Announcements
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 border border-yellow-300 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
                {totalCount} Total
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Manage promotional messages and announcements for your store. Only visible to your store console.
            </p>
          </div>

          {/* New Announcement Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm shadow-yellow-400/25 active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Announcement</span>
            </button>

            <button
              type="button"
              onClick={() => fetchList(page, searchKey, activeFilter)}
              disabled={isLoadingList}
              title="Refresh announcement list"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition cursor-pointer"
            >
              <svg className={`w-4 h-4 ${isLoadingList ? 'animate-spin text-yellow-600' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Box & Active / Inactive / All Filter (Above the table) */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box (sends search_key) */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchKey}
              onChange={handleSearchChange}
              placeholder="Search announcements by message..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-yellow-400 focus:bg-white transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchKey && (
              <button
                type="button"
                onClick={() => {
                  setSearchKey('')
                  fetchList(1, '', activeFilter)
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Active / Inactive / All Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'active'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Active</span>
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('inactive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'inactive'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Inactive</span>
            </button>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      {/* Table columns: message, link, active or inactive, sort order, Edit, Delete */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Message</th>
                <th className="py-3.5 px-4">Link</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Sort Order</th>
                <th className="py-3.5 px-4 text-center">Edit</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {isLoadingList && rows.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg className="w-6 h-6 animate-spin text-yellow-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="text-xs font-semibold">Loading announcements from API...</span>
                    </div>
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-14 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 max-w-sm mx-auto text-slate-400">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-slate-700">No announcements found</p>
                      <p className="text-xs text-slate-400">
                        {searchKey || activeFilter !== 'all'
                          ? 'Try adjusting your search terms or filter.'
                          : 'Create your first store announcement to display promo notices.'}
                      </p>
                      <button
                        type="button"
                        onClick={handleOpenCreateModal}
                        className="mt-1 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        Create Announcement
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Column 1: message */}
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900 max-w-xs break-words">
                      <div>{row.message}</div>
                      {row.createdAt && (
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {new Date(row.createdAt).toLocaleDateString()} {new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </td>

                    {/* Column 2: link */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-[200px] truncate">
                      {row.linkUrl ? (
                        <a
                          href={row.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-800 hover:text-amber-950 font-medium underline inline-flex items-center gap-1 text-xs truncate max-w-full"
                          title={row.linkUrl}
                        >
                          <span className="truncate">{row.linkUrl}</span>
                          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>

                    {/* Column 3: active or inactive */}
                    <td className="py-3.5 px-4">
                      {row.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>Inactive</span>
                        </span>
                      )}
                    </td>

                    {/* Column 4: sort order */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs">
                        {row.sortOrder ?? 0}
                      </span>
                    </td>

                    {/* Column 5: Edit */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(row._id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                      >
                        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                      </button>
                    </td>

                    {/* Column 6: Delete */}
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleDelete(row)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition cursor-pointer inline-flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer if total rows exceed limit */}
        {totalCount > limit && (
          <div className="py-3 px-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {rows.length} of {totalCount} announcements
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || isLoadingList}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-lg border border-slate-200 font-bold disabled:opacity-40 cursor-pointer bg-white hover:bg-slate-100"
              >
                Previous
              </button>
              <span className="font-bold text-slate-700">Page {page}</span>
              <button
                type="button"
                disabled={rows.length < limit || isLoadingList}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded-lg border border-slate-200 font-bold disabled:opacity-40 cursor-pointer bg-white hover:bg-slate-100"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* ONE MODAL FOR BOTH CREATE AND EDIT */}
      {/* ==================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn relative"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Top Accent Header */}
            <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />

            <div className="p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      {modalMode === 'create' ? 'Create New Announcement' : 'Edit Store Announcement'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {modalMode === 'create'
                        ? 'Fill details to publish an announcement for this store.'
                        : 'Update announcement details. Only changed fields will be submitted.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* General Error Banner */}
              {formGeneralError && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2">
                  <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{formGeneralError}</span>
                </div>
              )}

              {/* 417 Validation Message in Field Area */}
              {formErrors.fieldArea && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-bold">Form Validation (417):</div>
                    <div>{formErrors.fieldArea}</div>
                  </div>
                </div>
              )}

              {/* Loading Details State */}
              {isLoadingDetails ? (
                <div className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-6 h-6 animate-spin text-yellow-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="text-xs font-medium">Fetching announcement details from API...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="mt-4 space-y-4">
                  {/* Field 1: Message (Required) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Announcement Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows="3"
                      value={formMessage}
                      onChange={(e) => {
                        setFormMessage(e.target.value)
                        if (formErrors.message) {
                          setFormErrors((prev) => ({ ...prev, message: '' }))
                        }
                      }}
                      placeholder="e.g. Store sale today - Flat 20% off on all items"
                      required
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                        formErrors.message ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-200 focus:border-yellow-400'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-[11px] font-semibold text-rose-600">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Link URL (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Link URL <span className="text-slate-400 font-normal normal-case">(optional, leave empty for plain text)</span>
                    </label>
                    <input
                      type="url"
                      value={formLinkUrl}
                      onChange={(e) => setFormLinkUrl(e.target.value)}
                      placeholder="https://cryptospill.io or leave empty"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-400 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Field 3: Status (isActive) & Field 4: Sort Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Sort Order */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Sort Order <span className="text-slate-400 font-normal normal-case">(default 0)</span>
                      </label>
                      <input
                        type="number"
                        value={formSortOrder}
                        onChange={(e) => setFormSortOrder(e.target.value)}
                        placeholder="0"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-yellow-400 focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Active Status */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Status
                      </label>
                      <label className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition">
                        <input
                          type="checkbox"
                          checked={formIsActive}
                          onChange={(e) => setFormIsActive(e.target.checked)}
                          className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          {formIsActive ? 'Active (Visible)' : 'Inactive (Hidden)'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      disabled={isSubmitting}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm shadow-yellow-400/25 disabled:opacity-50 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin text-slate-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>{modalMode === 'create' ? 'Create Announcement' : 'Save Changes'}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
