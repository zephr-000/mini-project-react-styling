import { formatCurrency } from '../../utils/formatCurrency'

export default function Header({ store, itemCount, onOpenCart, cartButtonRef, isLoading }) {
  return (
    <>
      <div className="flex items-center justify-center gap-2 bg-moss px-4 py-2 text-center text-xs text-white">
        Gratis ongkir untuk belanja minimal {formatCurrency(store.freeShippingMinimum)}
        <span className="text-acid" aria-hidden="true">✳</span>
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="page-container flex flex-wrap items-center justify-between gap-4 py-5">
          <a className="w-28 text-xs font-bold uppercase leading-tight" href="#top" aria-label={`${store.brand}, beranda`}>
            {store.brand}
          </a>
          <nav className="order-3 flex w-full gap-6 text-sm sm:order-none sm:w-auto" aria-label="Navigasi utama">
            <a className="hover:underline" href="#detail">Produk</a>
            <a className="hover:underline" href="#cerita">Tentang produk</a>
          </nav>
          <button ref={cartButtonRef} disabled={isLoading} className="flex min-h-11 items-center gap-2 text-sm hover:text-moss" type="button" aria-label={`Tas belanja, ${itemCount} item`} aria-haspopup="dialog" onClick={onOpenCart}>
            Tas <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-xs">{itemCount}</span>
          </button>
        </div>
      </header>
    </>
  )
}
