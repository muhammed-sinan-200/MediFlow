import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { FileQuestion } from 'lucide-react'

const NotFound = () => {
  const { aToken } = useContext(AdminContext)
  const location = useLocation()

  const homePath = aToken ? '/admin-dashboard' : '/doctor-dashboard'
  const homeLabel = aToken ? 'Go to Admin Dashboard' : 'Go to Doctor Dashboard'

  return (
    <div className='flex min-h-[calc(100vh-64px)] items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-lg rounded-2xl border border-purple-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10'>
        <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-700'>
          <FileQuestion size={28} />
        </div>

        <p className='mt-5 text-sm font-semibold uppercase tracking-wide text-purple-600'>
          404
        </p>
        <h1 className='mt-2 text-2xl font-bold text-slate-900 sm:text-3xl'>
          Page not found
        </h1>
        <p className='mt-3 text-sm leading-6 text-slate-500 sm:text-base'>
          The page{' '}
          <span className='break-all font-medium text-slate-700'>
            {location.pathname}
          </span>{' '}
          does not exist or is no longer available.
        </p>

        <Link
          to={homePath}
          className='mt-8 inline-flex items-center justify-center rounded-full bg-purple-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-800'
        >
          {homeLabel}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
