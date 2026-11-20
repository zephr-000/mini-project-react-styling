import { useState } from 'react'

export default function WishlistButton() {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <button className="mb-4 flex items-center gap-2 text-sm text-muted hover:text-moss" type="button" aria-pressed={isSaved} onClick={() => setIsSaved(!isSaved)}>
      <span className="text-xl" aria-hidden="true">{isSaved ? '♥' : '♡'}</span>
      {isSaved ? 'Ditambahkan ke wishlist' : 'Tambah ke wishlist'}
    </button>
  )
}
