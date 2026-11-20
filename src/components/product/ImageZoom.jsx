import Modal from '../ui/Modal'
import Thumbnail from './Thumbnail'

export default function ImageZoom({ images, activeIndex, onSelect, onClose }) {
  function showPrevious() {
    onSelect(activeIndex === 0 ? images.length - 1 : activeIndex - 1)
  }

  function showNext() {
    onSelect(activeIndex === images.length - 1 ? 0 : activeIndex + 1)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    }
  }

  return (
    <Modal title="Galeri gambar produk" onClose={onClose} onKeyDown={handleKeyDown}>
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        <button className="h-11 w-11 shrink-0 rounded-full border border-white text-3xl" type="button" aria-label="Gambar sebelumnya" onClick={showPrevious}>‹</button>
        <img className="zoom-image min-w-0 object-contain" src={images[activeIndex].src} alt={images[activeIndex].alt} />
        <button className="h-11 w-11 shrink-0 rounded-full border border-white text-3xl" type="button" aria-label="Gambar berikutnya" onClick={showNext}>›</button>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <p className="text-sm" aria-live="polite">{activeIndex + 1} / {images.length}</p>
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih gambar diperbesar">
          {images.map((image, index) => (
            <Thumbnail key={image.id} image={image} position={index + 1} isActive={index === activeIndex} onSelect={() => onSelect(index)} />
          ))}
        </div>
      </div>
    </Modal>
  )
}
