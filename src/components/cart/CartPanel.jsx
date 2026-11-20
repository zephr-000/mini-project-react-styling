import { useState } from 'react'
import Modal from '../ui/Modal'
import Toast from '../ui/Toast'
import Button from '../ui/Button'
import Alert from '../ui/Alert'
import CartItem from './CartItem'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartPanel({ items, product, totals, message, error, storageWarning, onClose, onQuantityChange, onRemove, onClear }) {
  const [checkoutToast, setCheckoutToast] = useState(null)

  return (
    <Modal title="Tas belanja" variant="cart" closeLabel="Tutup tas belanja" onClose={onClose}>
      <div className="flex min-h-0 flex-1 flex-col">
        {storageWarning && <p className="mb-3 bg-amber-50 p-3 text-sm text-amber-900" role="status">Browser tidak mengizinkan penyimpanan. Tas tetap bisa dipakai selama halaman ini terbuka.</p>}
        {message && <p className="mb-3 bg-green-100 p-3 text-sm text-moss" role="status">{message}</p>}
        <Alert id="cart-error" message={error} />
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center">
            <p className="font-serif text-3xl">Tas masih kosong</p>
            <p className="max-w-xs text-sm leading-relaxed text-muted">Pilih ukuran dan jumlah, lalu klik Update Pilihan untuk menyimpannya ke tas.</p>
            <Button onClick={onClose}>Lanjut belanja</Button>
          </div>
        ) : (
          <>
            <div className="mt-2 flex items-center justify-between gap-4 text-sm">
              <p aria-live="polite">{totals.quantity} barang · {items.length} ukuran</p>
              <button className="py-2 text-muted underline" type="button" onClick={onClear}>Kosongkan tas</button>
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto" aria-label="Daftar barang dalam tas">
              {items.map((item) => (
                <CartItem key={`${item.productId}-${item.size}`} item={item} product={product} onQuantityChange={onQuantityChange} onRemove={onRemove} />
              ))}
            </ul>
            <div className="shrink-0 border-t border-line pt-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm">Subtotal</h3>
                <p className="font-serif text-2xl" aria-live="polite">{formatCurrency(totals.subtotal)}</p>
              </div>
              <p className={totals.freeShipping ? 'mt-2 text-sm font-semibold text-moss' : 'mt-2 text-sm text-amber-900'}>
                {totals.freeShipping ? 'Gratis ongkir!' : `Tambah ${formatCurrency(totals.shippingRemaining)} lagi untuk gratis ongkir`}
              </p>
              <p className="mt-2 mb-4 text-xs leading-relaxed text-muted">Simulasi belanja. Belum ada pembayaran atau pengiriman nyata.</p>
              <Button onClick={() => setCheckoutToast({ text: 'Demo: halaman pembayaran belum tersedia.' })}>Lanjutkan Pembayaran</Button>
            </div>
          </>
        )}
      </div>
      <Toast message={checkoutToast} onClose={setCheckoutToast} />
    </Modal>
  )
}
