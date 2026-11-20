export default function Breadcrumbs({ productName }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-3 py-5 text-xs text-muted">
        <li><a className="hover:underline" href="#top">Beranda</a></li>
        <li><span className="mr-3" aria-hidden="true">/</span><a className="hover:underline" href="#detail">Produk</a></li>
        <li className="text-ink" aria-current="page"><span className="mr-3 text-muted" aria-hidden="true">/</span>{productName}</li>
      </ol>
    </nav>
  )
}
