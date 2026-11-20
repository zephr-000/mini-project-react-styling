export default function StockBadge({ variant }) {
  let message = ''
  let colors = 'bg-green-100 text-moss'
  if (variant) {
    message = variant.stock + ' tersedia'
    if (variant.stock <= 3) {
      message = 'Sisa ' + variant.stock + ', segera habis!'
      colors = 'bg-amber-100 text-amber-900'
    }
  }

  return (
    <div className="mt-2 min-h-8" role="status" aria-live="polite">
      {variant && <p className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colors}`}>{message}</p>}
    </div>
  )
}
