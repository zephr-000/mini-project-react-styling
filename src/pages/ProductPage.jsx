import { useEffect, useRef, useState } from 'react'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import Breadcrumbs from '../components/layouts/Breadcrumbs'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import CheckoutSummary from '../components/product/CheckoutSummary'
import CartPanel from '../components/cart/CartPanel'
import { createOrder, waitForRequest } from '../utils/order'
import { loadCart, saveCart, setCartSelection, getCartTotals, updateCartQuantity, removeCartItem } from '../utils/cart'
import CartFlight from '../components/ui/CartFlight'

export default function ProductPage({ product, store }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [cart, setCart] = useState(() => loadCart(product))
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartMessage, setCartMessage] = useState('')
  const [cartError, setCartError] = useState('')
  const [storageWarning, setStorageWarning] = useState(false)
  const [flight, setFlight] = useState(null)
  const cartButtonRef = useRef(null)
  const submitButtonRef = useRef(null)
  const animationFrameRef = useRef(null)
  const flightIdRef = useRef(0)
  const cartTotals = getCartTotals(cart, product, store.freeShippingMinimum)
  const savedItem = cart.find((item) => item.size === selectedSize)

  useEffect(() => {
    return () => cancelAnimationFrame(animationFrameRef.current)
  }, [])
  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setStorageWarning(!saveCart(cart))
  }, [cart])
  const isSubmitting = useRef(false)
  const selectedVariant = product.variants.find((item) => item.size === selectedSize)

  function clearResult() {
    setError('')
  }

  function handleSizeChange(size) {
    if (isSubmitting.current) return
    setSelectedSize(size)
    clearResult()
    const variant = product.variants.find((item) => item.size === size)
    const itemInCart = cart.find((item) => item.size === size)
    if (itemInCart) {
      setQuantity(String(itemInCart.quantity))
    } else if (Number(quantity) > variant.stock) {
      setQuantity(String(variant.stock))
    }
  }

  function handleQuantityChange(value) {
    if (isSubmitting.current) return
    setQuantity(value)
    clearResult()
  }

  function handleStep(change) {
    if (isSubmitting.current) return
    clearResult()
    const current = Number(quantity)
    if (!selectedVariant && change > 0) {
      setError('Pilih ukuran dulu.')
    } else if (!Number.isInteger(current) || current < 1) {
      setQuantity('1')
    } else if (change < 0 && current <= 1) {
      setError('Jumlah minimal 1.')
    } else if (change > 0 && current >= selectedVariant.stock) {
      setError('Maksimal ' + selectedVariant.stock + ', sesuai stok.')
    } else {
      setQuantity(String(current + change))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting.current) return
    isSubmitting.current = true
    setIsLoading(true)
    clearResult()

    try {
      await waitForRequest()
      const result = createOrder(product, selectedSize, Number(quantity), store.freeShippingMinimum)
      setCart((currentCart) => setCartSelection(currentCart, product, result))
      setCartError('')
      setCartMessage(`Ukuran ${result.size} · ${result.quantity} barang sudah tersimpan di tas.`)
      launchCartFlight()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Pilihan gagal diperbarui. Coba lagi.')
    } finally {
      setIsLoading(false)
      isSubmitting.current = false
    }
  }

  function openCart() {
    setCartMessage('')
    setCartError('')
    setIsCartOpen(true)
  }

  function launchCartFlight() {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    cancelAnimationFrame(animationFrameRef.current)
    animationFrameRef.current = requestAnimationFrame(() => {
      if (!submitButtonRef.current || !cartButtonRef.current) return
      const start = submitButtonRef.current.getBoundingClientRect()
      const end = cartButtonRef.current.getBoundingClientRect()
      flightIdRef.current += 1
      setFlight({
        id: flightIdRef.current,
        startX: start.left + start.width / 2,
        startY: start.top + start.height / 2,
        endX: end.left + end.width / 2,
        endY: end.top + end.height / 2,
      })
    })
  }

  function handleCartQuantity(size, nextQuantity) {
    setCartMessage('')
    setCartError('')
    try {
      setCart(updateCartQuantity(cart, product, size, nextQuantity))
      if (size === selectedSize) {
        setQuantity(String(nextQuantity))
        setError('')
      }
    } catch (cartProblem) {
      setCartError(cartProblem.message)
    }
  }

  function handleRemoveItem(size) {
    setCart(removeCartItem(cart, product.id, size))
    if (size === selectedSize) {
      setQuantity('1')
      setError('')
    }
    setCartError('')
    setCartMessage(`Ukuran ${size} dihapus dari tas.`)
  }

  function handleClearCart() {
    setCart([])
    setQuantity('1')
    setError('')
    setCartError('')
    setCartMessage('Tas sudah dikosongkan.')
  }

  let pageSpacing = ''
  if (cart.length > 0) pageSpacing = 'pb-96 sm:pb-72 lg:pb-44'

  return (
    <div className={pageSpacing}>
      <a className="fixed -top-20 left-4 z-50 bg-moss px-4 py-3 text-white focus:top-4" href="#detail">
        Langsung ke detail produk
      </a>
      <Header store={store} itemCount={cartTotals.quantity} onOpenCart={openCart} cartButtonRef={cartButtonRef} isLoading={isLoading} />
      <main id="top" className="page-container">
        <Breadcrumbs productName={product.name} />
        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16 xl:grid-cols-5" aria-labelledby="product-title">
          <div className="min-w-0 xl:col-span-3">
            <ProductGallery images={product.images} />
          </div>
          <div className="min-w-0 xl:col-span-2">
            <ProductInfo
              product={product}
              freeShippingMinimum={store.freeShippingMinimum}
              selectedSize={selectedSize}
              selectedVariant={selectedVariant}
              quantity={quantity}
              isLoading={isLoading}
              error={error}
              savedItem={savedItem}
              submitButtonRef={submitButtonRef}
              onSizeChange={handleSizeChange}
              onQuantityChange={handleQuantityChange}
              onStep={handleStep}
              onSubmit={handleSubmit}
            />
          </div>
        </section>
      </main>
      <Footer brand={store.brand} />
      {cart.length > 0 && !isLoading && <CheckoutSummary items={cart} product={product} totals={cartTotals} onOpenCart={openCart} />}
      <CartFlight flight={flight} onFinish={setFlight} />
      {isCartOpen && (
        <CartPanel
          items={cart}
          product={product}
          totals={cartTotals}
          message={cartMessage}
          error={cartError}
          storageWarning={storageWarning}
          onClose={() => setIsCartOpen(false)}
          onQuantityChange={handleCartQuantity}
          onRemove={handleRemoveItem}
          onClear={handleClearCart}
        />
      )}
    </div>
  )
}
