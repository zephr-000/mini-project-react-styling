import { createOrder } from './order.js'

export const CART_STORAGE_KEY = 'escentric-cart-v1'
export function normalizeCart(savedItems, product) {
  if (!Array.isArray(savedItems)) return []
  const items = []

  for (const saved of savedItems) {
    if (!saved || saved.productId !== product.id) continue
    if (!Number.isInteger(saved.quantity) || saved.quantity < 1) continue
    const variant = product.variants.find((item) => item.size === saved.size)
    if (!variant || variant.stock < 1) continue

    const existing = items.find((item) => item.size === saved.size)
    if (existing) {
      existing.quantity = Math.min(existing.quantity + saved.quantity, variant.stock)
    } else {
      items.push({ productId: product.id, size: saved.size, quantity: Math.min(saved.quantity, variant.stock) })
    }
  }
  return items
}

export function loadCart(product) {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    return normalizeCart(saved ? JSON.parse(saved) : [], product)
  } catch {
    return []
  }
}

export function saveCart(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

export function setCartSelection(items, product, order) {
  const existing = items.find((item) => item.productId === product.id && item.size === order.size)
  if (existing) {
    return items.map((item) => item === existing ? { ...item, quantity: order.quantity } : item)
  }
  return [...items, { productId: product.id, size: order.size, quantity: order.quantity }]
}

export function getCartTotals(items, product, freeShippingMinimum) {
  const quantity = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = quantity * product.price
  return {
    quantity,
    subtotal,
    freeShipping: subtotal >= freeShippingMinimum,
    shippingRemaining: Math.max(0, freeShippingMinimum - subtotal),
  }
}

export function updateCartQuantity(items, product, size, quantity) {
  createOrder(product, size, quantity, 0)
  return items.map((item) => item.productId === product.id && item.size === size ? { ...item, quantity } : item)
}

export function removeCartItem(items, productId, size) {
  return items.filter((item) => item.productId !== productId || item.size !== size)
}
