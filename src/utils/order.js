export function waitForRequest(delay = 1000) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
export function createOrder(product, size, quantity, freeShippingMinimum) {
  const variant = product.variants.find((item) => item.size === size)

  if (size === '') {
    throw new Error('Pilih ukuran dulu.')
  }
  if (!variant) {
    throw new Error('Ukuran tidak valid.')
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Jumlah harus bilangan bulat positif.')
  }
  if (!Number.isFinite(product.price) || product.price <= 0) {
    throw new Error('Harga produk belum tersedia.')
  }
  if (variant.stock === 0) {
    throw new Error('Ukuran ' + size + ' sedang habis.')
  }
  if (quantity > variant.stock) {
    throw new Error('Jumlah melebihi stok (sisa ' + variant.stock + ').')
  }

  const subtotal = product.price * quantity
  return {
    size,
    quantity,
    price: product.price,
    subtotal,
    freeShipping: subtotal >= freeShippingMinimum,
    shippingRemaining: Math.max(0, freeShippingMinimum - subtotal),
  }
}
