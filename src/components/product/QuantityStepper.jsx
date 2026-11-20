export default function QuantityStepper({ quantity, stock, isLoading, hasError, onQuantityChange, onStep }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase text-muted" htmlFor="quantity">Jumlah</label>
      <div className="flex h-12 border border-line">
        <button className="w-10 shrink-0 text-lg hover:bg-stone-200 disabled:cursor-wait" type="button" aria-label="Kurangi jumlah" disabled={isLoading} onClick={() => onStep(-1)}>−</button>
        <input
          className="min-w-0 w-full border-x border-line bg-transparent px-1 text-center text-sm"
          id="quantity"
          type="number"
          min="1"
          max={stock}
          step="1"
          required
          disabled={isLoading}
          value={quantity}
          aria-invalid={hasError}
          aria-describedby={hasError ? 'form-error' : undefined}
          onChange={(event) => onQuantityChange(event.target.value)}
        />
        <button className="w-10 shrink-0 text-lg hover:bg-stone-200 disabled:cursor-wait" type="button" aria-label="Tambah jumlah" disabled={isLoading} onClick={() => onStep(1)}>+</button>
      </div>
    </div>
  )
}
