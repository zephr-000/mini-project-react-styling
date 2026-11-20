import SizeSelector from './SizeSelector'
import QuantityStepper from './QuantityStepper'
import StockBadge from './StockBadge'
import Button from '../ui/Button'
import Alert from '../ui/Alert'

export default function PurchaseForm({ variants, selectedSize, selectedVariant, quantity, isLoading, error, savedItem, submitButtonRef, onSizeChange, onQuantityChange, onStep, onSubmit }) {
  const isSaved = Boolean(savedItem && savedItem.quantity === Number(quantity) && !isLoading)

  return (
    <form className="mt-6" onSubmit={onSubmit} noValidate aria-label="Pilihan pembelian" aria-busy={isLoading}>
      <div className="purchase-options grid items-start gap-4">
        <SizeSelector variants={variants} selectedSize={selectedSize} isLoading={isLoading} onSizeChange={onSizeChange} />
        <QuantityStepper quantity={quantity} stock={selectedVariant?.stock} isLoading={isLoading} hasError={Boolean(error)} onQuantityChange={onQuantityChange} onStep={onStep} />
      </div>
      <StockBadge variant={selectedVariant} />
      <Button type="submit" isLoading={isLoading} isSaved={isSaved} buttonRef={submitButtonRef}>Update Pilihan</Button>
      {savedItem && !isLoading && (
        <p className={isSaved ? 'mt-3 rounded border border-green-200 bg-green-50 p-3 text-sm text-moss' : 'mt-3 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900'} role="status">
          {isSaved
            ? `✓ Ukuran ${savedItem.size} · ${savedItem.quantity} barang sudah di tas.`
            : `Di tas: ukuran ${savedItem.size} · ${savedItem.quantity} barang. Klik Update Pilihan untuk menyimpan jumlah baru.`}
        </p>
      )}
      <span className="sr-only" role="status">{isLoading ? 'Memproses pilihan, tunggu sebentar.' : ''}</span>
      <Alert message={error} />
    </form>
  )
}
