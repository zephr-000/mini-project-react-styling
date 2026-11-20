import ProductPage from './pages/ProductPage'
import { product, store } from './data/product'

export default function App() {
  return <ProductPage product={product} store={store} />
}
