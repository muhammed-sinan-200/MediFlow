import React, { useContext, useEffect, useMemo } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { motion } from 'framer-motion'
import {
  HandCoins,
  UserRoundCheck,
  NotebookPen,
  Stethoscope,
  Activity,
  BadgeCheck,
} from 'lucide-react'

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  const summaryItems = useMemo(() => {
    if (!dashData) return []

    return [
      {
        title: 'Earnings',
        value: `₹${dashData.earnings}`,
        subtitle: 'Total income generated from your consultations',
        icon: HandCoins,
        textColor: 'text-emerald-700',
        bg: 'bg-emerald-50',
        iconBg: 'bg-emerald-100',
      },
      {
        title: 'Appointments',
        value: dashData.appointments,
        subtitle: 'Booked and managed patient appointments',
        icon: NotebookPen,
        textColor: 'text-violet-700',
        bg: 'bg-violet-50',
        iconBg: 'bg-violet-100',
      },
      {
        title: 'Patients',
        value: dashData.patients,
        subtitle: 'Patients you have consulted so far',
        icon: UserRoundCheck,
        textColor: 'text-sky-700',
        bg: 'bg-sky-50',
        iconBg: 'bg-sky-100',
      },
    ]
  }, [dashData])

  const quickStats = useMemo(() => {
    if (!dashData) {
      return {
        avgPerPatient: 0,
        avgPerAppointment: 0,
      }
    }

    const patients = Number(dashData.patients) || 0
    const appointments = Number(dashData.appointments) || 0
    const earnings = Number(dashData.earnings) || 0

    return {
      avgPerPatient: patients ? Math.round(earnings / patients) : 0,
      avgPerAppointment: appointments ? Math.round(earnings / appointments) : 0,
    }
  }, [dashData])

  return (
    dashData && (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className='w-full min-h-[calc(100vh-73px)] bg-gradient-to-br from-slate-50 via-[#faf7ff] to-slate-100 p-4 sm:p-5 lg:p-6'
      >
        <div className='mb-5'>
          <p className='inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 sm:text-sm'>
            <Stethoscope size={14} />
            Mediflow Doctor Overview
          </p>

          <h1 className='mt-3 text-2xl font-bold text-slate-900 sm:text-3xl'>
            Doctor Dashboard
          </h1>

          <p className='mt-1 text-sm text-slate-500'>
            Track your professional activity, appointments, and earnings from one place.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-5 xl:grid-cols-12'>
          <div className='xl:col-span-8 space-y-5'>
            <div className='rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h3 className='text-base font-semibold text-slate-900 sm:text-lg'>
                    Performance Summary
                  </h3>
                  <p className='mt-1 text-sm text-slate-500'>
                    A quick look at your core practice numbers.
                  </p>
                </div>

                <div className='rounded border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm'>
                  <p className='text-xs text-slate-500'>Total Activity</p>
                  <p className='text-lg font-bold text-slate-900'>
                    {dashData.appointments + dashData.patients}
                  </p>
                </div>
              </div>

              <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {summaryItems.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      className={`${item.bg} rounded border border-slate-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <p className='text-sm font-medium text-slate-500'>
                            {item.title}
                          </p>
                          <p className='mt-3 text-2xl font-bold text-slate-900 sm:text-3xl'>
                            {item.value}
                          </p>
                        </div>

                        <div className={`rounded-xl p-2.5 ${item.iconBg} shrink-0`}>
                          <Icon size={20} className={item.textColor} />
                        </div>
                      </div>

                      <p className='mt-4 text-xs leading-5 text-slate-500'>
                        {item.subtitle}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className='rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h3 className='text-lg font-semibold text-slate-900'>
                    Practice Highlights
                  </h3>
                  <p className='text-sm text-slate-500'>
                    A concise breakdown of your current performance metrics.
                  </p>
                </div>

                <div className='flex items-center gap-2 text-sm text-slate-500'>
                  <Activity size={16} />
                  <span>Live snapshot</span>
                </div>
              </div>

              <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='rounded border border-slate-200 bg-slate-50 p-4'>
                  <p className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                    Earnings Per Appointment
                  </p>
                  <p className='mt-2 text-2xl font-bold text-slate-900'>
                    ₹{quickStats.avgPerAppointment}
                  </p>
                  <p className='mt-2 text-sm text-slate-500'>
                    Average revenue generated from each appointment.
                  </p>
                </div>

                <div className='rounded border border-slate-200 bg-slate-50 p-4'>
                  <p className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                    Earnings Per Patient
                  </p>
                  <p className='mt-2 text-2xl font-bold text-slate-900'>
                    ₹{quickStats.avgPerPatient}
                  </p>
                  <p className='mt-2 text-sm text-slate-500'>
                    Average revenue relative to total patient count.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='xl:col-span-4 space-y-5'>
            <div className='rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
              <h3 className='text-lg font-semibold text-slate-900'>
                Professional Overview
              </h3>
              <p className='mt-1 text-sm text-slate-500'>
                Key doctor-side numbers at a glance.
              </p>

              <div className='mt-4 space-y-3'>
                <div className='flex items-center justify-between rounded bg-slate-50 p-4'>
                  <p className='text-sm text-slate-600'>Total Earnings</p>
                  <p className='font-bold text-slate-900'>₹{dashData.earnings}</p>
                </div>

                <div className='flex items-center justify-between rounded bg-slate-50 p-4'>
                  <p className='text-sm text-slate-600'>Appointments Managed</p>
                  <p className='font-bold text-slate-900'>{dashData.appointments}</p>
                </div>

                <div className='flex items-center justify-between rounded bg-slate-50 p-4'>
                  <p className='text-sm text-slate-600'>Patients Consulted</p>
                  <p className='font-bold text-slate-900'>{dashData.patients}</p>
                </div>
              </div>
            </div>

            <div className='rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
              <h3 className='text-lg font-semibold text-slate-900'>
                Quick Insights
              </h3>
              <p className='mt-1 text-sm text-slate-500'>
                A small operational snapshot of your practice.
              </p>

              <div className='mt-5 space-y-4'>
                <div className='rounded bg-slate-50 p-4'>
                  <div className='flex items-center gap-3'>
                    <div className='rounded bg-white p-2 shadow-sm'>
                      <BadgeCheck className='text-slate-700' size={18} />
                    </div>
                    <div>
                      <p className='text-sm text-slate-500'>Current Reach</p>
                      <p className='text-xl font-bold text-slate-900'>
                        {dashData.patients} Patients
                      </p>
                    </div>
                  </div>
                </div>

                <div className='rounded bg-slate-50 p-4 flex items-center justify-between'>
                  <p className='text-sm text-slate-600'>Appointment Load</p>
                  <p className='font-bold text-slate-900'>
                    {dashData.appointments > 0 ? 'Active' : 'Low'}
                  </p>
                </div>

                <div className='rounded bg-slate-50 p-4 flex items-center justify-between'>
                  <p className='text-sm text-slate-600'>Revenue Health</p>
                  <p className='font-bold text-slate-900'>
                    {dashData.earnings > 0 ? 'Positive' : 'Starting'}
                  </p>
                </div>

                <div className='rounded bg-slate-50 p-4 flex items-center justify-between'>
                  <p className='text-sm text-slate-600'>Practice Scale</p>
                  <p className='font-bold text-slate-900'>
                    {dashData.patients >= 20 ? 'Growing' : 'Emerging'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  )
}

export default DoctorDashboard