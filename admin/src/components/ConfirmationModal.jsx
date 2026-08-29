import { Loader2 } from 'lucide-react'

const ConfirmationModal = ({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null

  const confirmClasses =
    confirmVariant === 'success'
      ? 'bg-emerald-600 hover:bg-emerald-700'
      : 'bg-rose-600 hover:bg-rose-700'

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
      <button
        type='button'
        aria-label='Close dialog backdrop'
        className='absolute inset-0 bg-black/40'
        onClick={loading ? undefined : onCancel}
        disabled={loading}
      />

      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='confirmation-modal-title'
        aria-describedby='confirmation-modal-message'
        className='relative z-10 w-full max-w-md rounded-2xl border border-purple-100 bg-white p-5 shadow-xl sm:p-6'
      >
        <h2
          id='confirmation-modal-title'
          className='text-lg font-semibold text-slate-900'
        >
          {title}
        </h2>
        <p
          id='confirmation-modal-message'
          className='mt-2 text-sm leading-6 text-slate-600'
        >
          {message}
        </p>

        <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
          <button
            type='button'
            onClick={onCancel}
            disabled={loading}
            className='rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {cancelLabel}
          </button>

          <button
            type='button'
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70 ${confirmClasses}`}
          >
            {loading && <Loader2 size={16} className='animate-spin' />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
