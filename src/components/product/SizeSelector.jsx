export default function SizeSelector({ variants, selectedSize, isLoading, onSizeChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs uppercase text-muted">Ukuran</legend>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          let colors = 'border-line text-ink hover:border-moss'
          if (selectedSize === variant.size) colors = 'border-moss bg-moss text-white'
          if (variant.stock === 0) colors = 'border-line border-dashed text-muted'

          return (
            <button
              key={variant.size}
              className={`h-12 w-12 rounded-full border text-sm disabled:cursor-not-allowed ${colors}`}
              type="button"
              disabled={isLoading || variant.stock === 0}
              aria-label={`Ukuran ${variant.size}${variant.stock === 0 ? ', habis' : ''}`}
              aria-pressed={selectedSize === variant.size}
              onClick={() => onSizeChange(variant.size)}
            >
              {variant.size}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
