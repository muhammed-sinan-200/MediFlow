import { Loader2 } from 'lucide-react'

const PageLoader = ({ label = 'Loading...' }) => {
  return (
    <div className='flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-6'>
      <div className='flex flex-col items-center gap-3 text-purple-700'>
        <Loader2 className='h-8 w-8 animate-spin' aria-hidden='true' />
        <p className='text-sm font-medium text-slate-600'>{label}</p>
      </div>
    </div>
  )
}

export default PageLoader
