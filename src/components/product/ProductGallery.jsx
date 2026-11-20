import { useState } from 'react'
import Thumbnail from './Thumbnail'
import ImageZoom from './ImageZoom'

export default function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const activeImage = images[activeIndex]

  return (
    <>
      <div className="flex flex-col-reverse gap-4 lg:flex-row" aria-label="Galeri produk">
        <div className="flex flex-wrap gap-3 lg:flex-col" role="group" aria-label="Pilih gambar produk">
          {images.map((image, index) => (
            <Thumbnail key={image.id} image={image} position={index + 1} isActive={index === activeIndex} onSelect={() => setActiveIndex(index)} />
          ))}
        </div>
        <button className="product-photo relative min-w-0 flex-1 overflow-hidden bg-stone-200 p-0" type="button" aria-label="Perbesar gambar produk" onClick={() => setIsZoomOpen(true)}>
          <img className="h-full w-full object-cover" src={activeImage.src} alt={activeImage.alt} />
          <span className="absolute top-4 right-4 bg-paper px-3 py-2 text-xs">Perbesar +</span>
          <span className="absolute right-3 bottom-3 bg-paper px-2 py-1 text-xs" aria-live="polite">
            {activeIndex + 1} / {images.length}
          </span>
        </button>
      </div>
      {isZoomOpen && (
        <ImageZoom images={images} activeIndex={activeIndex} onSelect={setActiveIndex} onClose={() => setIsZoomOpen(false)} />
      )}
    </>
  )
}
