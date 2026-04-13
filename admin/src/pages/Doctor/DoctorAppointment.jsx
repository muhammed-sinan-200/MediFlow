import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'
import {
  Search,
  ArrowUpDown,
  CircleX,
  CircleCheckBig,
  Clock3,
  CalendarDays,
  Wallet,
  UserRound,
  BadgeCheck,
} from 'lucide-react'

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext)

  const { calculateAge, slotDateFormat } = useContext(AppContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('latest')

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const filteredAppointments = useMemo(() => {
    let data = [...appointments]

    data = data.filter((item) => {
      const patientName = item.userData?.name?.toLowerCase() || ''
      const query = searchTerm.toLowerCase().trim()

      const matchesSearch = patientName.includes(query)

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'pending'
            ? !item.cancelled && !item.isComplete
            : statusFilter === 'completed'
              ? item.isComplete
              : statusFilter === 'cancelled'
                ? item.cancelled
                : true

      return matchesSearch && matchesStatus
    })

    data.sort((a, b) => {
      if (sortOrder === 'latest') return b.date - a.date
      return a.date - b.date
    })

    return data
  }, [appointments, searchTerm, statusFilter, sortOrder])

  const statusOptions = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ]

  const getStatusBadge = (item) => {
    if (item.cancelled) {
      return (
        <span className='inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700'>
          <CircleX size={14} />
          Cancelled
        </span>
      )
    }

    if (item.isComplete) {
      return (
        <span className='inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700'>
          <CircleCheckBig size={14} />
          Completed
        </span>
      )
    }

    return (
      <span className='inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700'>
        <Clock3 size={14} />
        Pending
      </span>
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setSortOrder('latest')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className='w-full p-4 sm:p-5 lg:p-6'
    >
      <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 sm:text-sm'>
            <CalendarDays size={14} />
            Appointment Management
          </p>

          <h1 className='mt-3 text-2xl font-bold text-slate-900 sm:text-3xl'>
            My Appointments
          </h1>

          <p className='mt-1 text-sm text-slate-500'>
            Manage your scheduled consultations, update status, and review patient bookings.
          </p>
        </div>

        <div className='rounded border border-slate-200 bg-white px-4 py-3 shadow-sm'>
          <p className='text-xs text-slate-500'>Total Results</p>
          <p className='text-lg font-bold text-slate-900'>
            {filteredAppointments.length}
          </p>
        </div>
      </div>

      <div className='rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr_1fr_auto]'>
            <div className='relative'>
              <Search
                size={18}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
              />
              <input
                type='text'
                placeholder='Search by patient name'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full rounded border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-violet-400 focus:bg-white'
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white'
            >
              {statusOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className='relative'>
              <ArrowUpDown
                size={16}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
              />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className='w-full appearance-none rounded border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white'
              >
                <option value='latest'>Latest First</option>
                <option value='oldest'>Oldest First</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className='rounded border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50'
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className='mt-5 hidden lg:grid grid-cols-[60px_1.8fr_1fr_1fr_1.5fr_100px_140px_120px] gap-4 border-b border-slate-200 px-2 pb-3 text-sm font-semibold text-slate-600'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Gender / Age</p>
          <p>Schedule</p>
          <p>Fees</p>
          <p>Status</p>
          <p className='text-center'>Action</p>
        </div>

        <div className='mt-3 space-y-3'>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((item, index) => {
              const patientGender =
                item.userData?.gender && item.userData.gender !== 'Not selected'
                  ? item.userData.gender
                  : '--'

              const patientAge = item.userData?.dob
                ? calculateAge(item.userData.dob)
                : '--'

              return (
                <div
                  key={item._id}
                  className='rounded border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md'
                >
                  <div className='hidden lg:grid lg:grid-cols-[60px_1.8fr_1fr_1fr_1.5fr_100px_140px_120px] lg:items-center lg:gap-4'>
                    <p className='text-sm font-medium text-slate-500'>
                      {index + 1}
                    </p>

                    <div className='flex min-w-0 items-center gap-3'>
                      <div className='h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100'>
                        <img
                          src={item.userData?.image}
                          alt={item.userData?.name || 'Patient'}
                          className='h-full w-full object-cover'
                        />
                      </div>

                      <div className='min-w-0'>
                        <p className='truncate text-sm font-semibold text-slate-900'>
                          {item.userData?.name}
                        </p>
                        <p className='truncate text-xs text-slate-500'>
                          Patient record
                        </p>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          item.payment
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Wallet size={14} />
                        {item.payment ? 'Online' : 'Cash'}
                      </span>
                    </div>

                    <div className='min-w-0'>
                      <p className='text-sm font-medium text-slate-800'>
                        {patientGender}
                      </p>
                      <p className='text-xs text-slate-500'>Age: {patientAge}</p>
                    </div>

                    <div className='min-w-0'>
                      <p className='text-sm font-medium text-slate-800'>
                        {slotDateFormat(item.slotDate)}
                      </p>
                      <p className='text-xs text-slate-500'>{item.slotTime}</p>
                    </div>

                    <p className='text-sm font-semibold text-slate-900'>
                      ₹{item.amount}
                    </p>

                    <div>{getStatusBadge(item)}</div>

                    <div className='flex justify-center'>
                      {!item.cancelled && !item.isComplete ? (
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className='inline-flex items-center justify-center rounded border border-rose-200 bg-rose-50 p-2 transition hover:bg-rose-100'
                            title='Cancel appointment'
                          >
                            <img
                              src={assets.cancel_icon}
                              alt='Cancel'
                              className='h-5 w-5 object-contain'
                            />
                          </button>

                          <button
                            onClick={() => completeAppointment(item._id)}
                            className='inline-flex items-center justify-center rounded border border-emerald-200 bg-emerald-50 p-2 transition hover:bg-emerald-100'
                            title='Complete appointment'
                          >
                            <img
                              src={assets.tick_icon}
                              alt='Complete'
                              className='h-5 w-5 object-contain'
                            />
                          </button>
                        </div>
                      ) : (
                        <span className='text-xs font-medium text-slate-400'>
                          --
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='flex flex-col gap-4 lg:hidden'>
                    <div className='flex items-start justify-between gap-3'>
                      <div className='flex min-w-0 items-center gap-3'>
                        <div className='h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100'>
                          <img
                            src={item.userData?.image}
                            alt={item.userData?.name || 'Patient'}
                            className='h-full w-full object-cover'
                          />
                        </div>

                        <div className='min-w-0'>
                          <p className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                            Patient
                          </p>
                          <p className='truncate text-sm font-semibold text-slate-900'>
                            {item.userData?.name}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {patientGender} • {patientAge} yrs
                          </p>
                        </div>
                      </div>

                      <div className='shrink-0'>{getStatusBadge(item)}</div>
                    </div>

                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                      <div className='rounded bg-slate-50 p-3'>
                        <p className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                          Schedule
                        </p>
                        <p className='mt-1 text-sm font-semibold text-slate-900'>
                          {slotDateFormat(item.slotDate)}
                        </p>
                        <p className='text-xs text-slate-500'>{item.slotTime}</p>
                      </div>

                      <div className='rounded bg-slate-50 p-3'>
                        <p className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                          Payment
                        </p>
                        <p className='mt-1 text-sm font-semibold text-slate-900'>
                          {item.payment ? 'Online' : 'Cash'}
                        </p>
                        <p className='text-xs text-slate-500'>₹{item.amount}</p>
                      </div>

                      <div className='rounded bg-slate-50 p-3'>
                        <p className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                          Action
                        </p>

                        <div className='mt-2'>
                          {!item.cancelled && !item.isComplete ? (
                            <div className='flex flex-wrap items-center gap-2'>
                              <button
                                onClick={() => cancelAppointment(item._id)}
                                className='inline-flex items-center gap-2 rounded border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-100'
                              >
                                <img
                                  src={assets.cancel_icon}
                                  alt='Cancel'
                                  className='h-4 w-4 object-contain'
                                />
                                Cancel
                              </button>

                              <button
                                onClick={() => completeAppointment(item._id)}
                                className='inline-flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100'
                              >
                                <img
                                  src={assets.tick_icon}
                                  alt='Complete'
                                  className='h-4 w-4 object-contain'
                                />
                                Complete
                              </button>
                            </div>
                          ) : (
                            <span className='text-sm text-slate-400'>
                              No action
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='rounded border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center'>
              <p className='text-base font-semibold text-slate-700'>
                No appointments found
              </p>
              <p className='mt-1 text-sm text-slate-500'>
                Try changing the search term or filter options.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default DoctorAppointment