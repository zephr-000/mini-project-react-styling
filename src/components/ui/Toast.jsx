import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => onClose(null), 2500)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div className="fixed top-6 right-4 left-4 z-50 flex items-center justify-between gap-4 bg-moss p-4 text-sm text-white shadow-lg sm:left-auto sm:max-w-sm">
      <p role="status">{message.text}</p>
      <button className="p-2 text-xl" type="button" aria-label="Tutup notifikasi" onClick={() => onClose(null)}>×</button>
    </div>
  )
}
