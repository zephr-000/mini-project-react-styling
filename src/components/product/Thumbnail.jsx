export default function Thumbnail({ image, position, isActive, onSelect }) {
  const borderColor = isActive ? 'border-moss' : 'border-transparent'

  return (
    <button
      className={`h-16 w-16 shrink-0 overflow-hidden border-2 bg-paper p-0 ${borderColor}`}
      type="button"
      aria-label={`Tampilkan gambar ${position}`}
      aria-pressed={isActive}
      onClick={onSelect}
    >
      <img className="h-full w-full object-cover" src={image.src} alt="" />
    </button>
  )
}
