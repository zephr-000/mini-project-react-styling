import Button from '../ui/Button'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CheckoutSummary({ items, product, totals, onOpenCart }) {
  const units = []
  for (const item of items) {
    for (let unit = 1; unit <= item.quantity; unit += 1) {
      units.push(<li key={`${item.size}-${unit}`} className="rounded-full border border-line bg-white px-3 py-1 text-xs">{item.size} · Unit {unit}</li>)
    }
  }

  return (
    <aside className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper shadow-lg" aria-label="Ringkasan pesanan">
      <div className="page-container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="mb-1 text-xs uppercase tracking-wide text-muted">Ringkasan pesanan</h2>
          <p className="text-sm" aria-live="polite">{items.map((item) => `${item.size} × ${item.quantity}`).join(' · ')} · {totals.quantity} barang</p>
          <p className="mt-1 text-xs text-moss">✓ Tersimpan di tas · {formatCurrency(product.price)} per barang</p>
          <ul className="mt-2 flex max-h-16 flex-wrap gap-2 overflow-y-auto" aria-label="Rincian unit">{units}</ul>
        </div>
        <div className="lg:text-right">
          <p className="text-xs uppercase text-muted">Subtotal</p>
          <p className="font-serif text-2xl">{formatCurrency(totals.subtotal)}</p>
          <p className={totals.freeShipping ? 'text-xs font-semibold text-moss' : 'text-xs text-amber-900'}>
            {totals.freeShipping ? 'Gratis ongkir!' : `Tambah ${formatCurrency(totals.shippingRemaining)} lagi untuk gratis ongkir`}
          </p>
        </div>
        <div className="lg:shrink-0">
          <Button onClick={onOpenCart}>Lihat Tas</Button>
        </div>
      </div>
    </aside>
  )
}
