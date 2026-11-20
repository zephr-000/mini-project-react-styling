import { useState } from 'react'
import AccordionItem from '../ui/AccordionItem'

export default function ProductDetails({ description, variants }) {
  const [openSection, setOpenSection] = useState('description')
  const sections = [
    { id: 'description', title: 'Deskripsi', content: description },
    { id: 'sizes', title: 'Ukuran', content: variants.map((variant) => variant.size).join(' · ') },
    { id: 'shipping', title: 'Pengiriman & pengembalian', content: 'Informasi pada halaman ini adalah simulasi untuk pembelajaran. Pengiriman dan transaksi nyata tidak tersedia.' },
  ]

  return (
    <section className="scroll-mt-6 border-t border-line" id="cerita" aria-label="Informasi produk">
      {sections.map((section) => (
        <AccordionItem key={section.id} id={section.id} title={section.title} isOpen={openSection === section.id} onToggle={() => setOpenSection(openSection === section.id ? '' : section.id)}>
          <p className="pb-4 text-sm leading-relaxed text-muted">{section.content}</p>
        </AccordionItem>
      ))}
    </section>
  )
}
