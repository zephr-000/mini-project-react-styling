import { formatCurrency } from '../../utils/formatCurrency'

export default function CartItem({ item, product, onQuantityChange, onRemove }) {
  const variant = product.variants.find((option) => option.size === item.size)

  return (
    <li className="flex gap-4 border-b border-line py-5">
      <img className="h-24 w-20 shrink-0 object-cover" src={product.images[0].src} alt={product.images[0].alt} />
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-lg">{product.name}</h3>
        <p className="mt-1 text-sm text-muted">Ukuran {item.size} · {formatCurrency(product.price)}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex h-11 items-center border border-line" role="group" aria-label={`Jumlah ukuran ${item.size}`}>
            <button className="h-full w-10 text-lg disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={item.quantity <= 1} aria-label={`Kurangi ukuran ${item.size}`} onClick={() => onQuantityChange(item.size, item.quantity - 1)}>−</button>
            <span className="w-8 text-center text-sm" aria-live="polite">{item.quantity}</span>
            <button className="h-full w-10 text-lg disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={item.quantity >= variant.stock} aria-label={`Tambah ukuran ${item.size}`} onClick={() => onQuantityChange(item.size, item.quantity + 1)}>+</button>
          </div>
          <button className="py-2 text-sm text-muted underline hover:text-red-800" type="button" aria-label={`Hapus ukuran ${item.size}`} onClick={() => onRemove(item.size)}>Hapus</button>
        </div>
        <p className="mt-3 text-sm font-semibold">{formatCurrency(product.price * item.quantity)}</p>
        {item.quantity >= variant.stock && <p className="mt-1 text-xs text-muted">Jumlah sudah mencapai stok tersedia.</p>}
      </div>
    </li>
  )
}
