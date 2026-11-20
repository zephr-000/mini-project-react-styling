export const store = {
  brand: 'Escentric Molecules',
  freeShippingMinimum: 300000,
}

export const product = {
  id: 'kemeja-linen-biru',
  name: 'Kemeja Linen Biru',
  price: 150000,
  intro: 'Kemeja linen biru yang adem dan ringan untuk hari yang panas.',
  description: 'Kemeja linen biru dengan potongan santai. Bahannya adem, cepat kering, dan cocok dipakai kerja maupun jalan-jalan.',
  variants: [
    { size: 'S', stock: 5 },
    { size: 'M', stock: 3 },
    { size: 'L', stock: 0 },
  ],
  images: [
    {
      id: 'linen-1',
      src: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?w=1200&q=80&auto=format&fit=crop',
      alt: 'Foto produk Kemeja Linen Biru — gambar 1',
    },
    {
      id: 'linen-2',
      src: 'https://images.unsplash.com/photo-1713881842156-3d9ef36418cc?w=1200&q=80&auto=format&fit=crop',
      alt: 'Foto produk Kemeja Linen Biru — gambar 2',
    },
    {
      id: 'linen-3',
      src: 'https://images.unsplash.com/photo-1713881649391-a1c8ddaf83cd?w=1200&q=80&auto=format&fit=crop',
      alt: 'Foto produk Kemeja Linen Biru — gambar 3',
    },
  ],
}
