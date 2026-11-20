import Spinner from './Spinner'

export default function Button({ children, type = 'button', isLoading = false, disabled = false, onClick, isSaved = false, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className="flex min-h-12 w-full items-center justify-between gap-4 border border-moss bg-moss px-4 py-3 text-sm text-white transition-colors hover:bg-acid hover:text-ink disabled:cursor-wait disabled:opacity-60"
    >
      {isLoading ? 'Memproses…' : children}
      {isLoading ? <Spinner /> : <span aria-hidden="true">{isSaved ? '✓' : '↗'}</span>}
    </button>
  )
}
