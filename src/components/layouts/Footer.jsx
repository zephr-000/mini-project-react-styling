export default function Footer({ brand }) {
  return (
    <footer className="page-container mt-16 flex flex-col gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
      <span>{brand}</span>
      <span>Exploration through fragrance</span>
      <span>Product study · 2026</span>
    </footer>
  )
}
