import { useEffect, useRef } from 'react'

export default function Modal({ title, onClose, onKeyDown, children, variant = 'gallery', closeLabel = 'Tutup galeri gambar' }) {
  const dialogRef = useRef(null)
  const isCart = variant === 'cart'
  const dialogStyle = isCart
    ? 'cart-dialog fixed inset-y-0 right-0 left-auto m-0 h-full max-h-full w-full max-w-md flex-col overflow-y-auto bg-paper p-5 text-ink sm:p-6'
    : 'zoom-dialog fixed inset-0 m-0 h-full w-full max-h-full max-w-full overflow-y-auto bg-ink p-4 text-white sm:p-8'

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={dialogStyle}
      aria-label={title}
      onCancel={onClose}
      onClose={() => {
        if (!dialogRef.current.open) onClose()
      }}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="mb-6 flex shrink-0 items-center justify-between gap-4">
        <h2 className={isCart ? 'font-serif text-3xl' : 'text-sm'}>{title}</h2>
        <button className="h-11 w-11 rounded-full border border-current text-2xl" type="button" aria-label={closeLabel} autoFocus onClick={onClose}>×</button>
      </div>
      {children}
    </dialog>
  )
}
