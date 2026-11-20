import PurchaseForm from './PurchaseForm'
import WishlistButton from './WishlistButton'
import ProductDetails from './ProductDetails'
import { formatCurrency } from '../../utils/formatCurrency'

export default function ProductInfo({ product, freeShippingMinimum, selectedSize, selectedVariant, quantity, isLoading, error, savedItem, submitButtonRef, onSizeChange, onQuantityChange, onStep, onSubmit }) {
  const totalStock = product.variants.reduce((total, variant) => total + variant.stock, 0)

  return (
    <div className="scroll-mt-6 lg:pt-3" id="detail" tabIndex={-1}>
      <p className="mb-5 text-xs uppercase tracking-wide text-muted">Product collection · Product detail</p>
      <h1 id="product-title" className="font-serif text-5xl font-normal leading-none tracking-tight sm:text-6xl xl:text-7xl">{product.name}</h1>
      <p className="mt-6 mb-4 flex flex-wrap items-baseline gap-4 text-base">
        {formatCurrency(product.price)} <span className="text-xs text-muted">{totalStock} tersedia</span>
      </p>
      <p className="font-serif text-base leading-relaxed text-muted">{product.intro}</p>
      <PurchaseForm
        variants={product.variants}
        selectedSize={selectedSize}
        selectedVariant={selectedVariant}
        quantity={quantity}
        isLoading={isLoading}
        error={error}
        savedItem={savedItem}
        submitButtonRef={submitButtonRef}
        onSizeChange={onSizeChange}
        onQuantityChange={onQuantityChange}
        onStep={onStep}
        onSubmit={onSubmit}
      />
      <p className="mt-3 mb-7 text-xs leading-relaxed text-muted">
        <span className="mr-1" aria-hidden="true">✳</span> Gratis ongkir untuk belanja minimal {formatCurrency(freeShippingMinimum)}
      </p>
      <WishlistButton />
      <ProductDetails description={product.description} variants={product.variants} />
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Halaman demo pembelajaran. Tidak memproses pembayaran. Foto:{' '}
        <a className="underline" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>.
      </p>
    </div>
  )
}
