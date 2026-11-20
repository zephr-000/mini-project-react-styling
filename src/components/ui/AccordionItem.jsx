export default function AccordionItem({ id, title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-line">
      <h2>
        <button
          id={`${id}-button`}
          className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left text-sm"
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
        >
          {title}
          <span className={isOpen ? 'rotate-45 text-lg text-muted' : 'text-lg text-muted'} aria-hidden="true">+</span>
        </button>
      </h2>
      <div id={`${id}-panel`} aria-labelledby={`${id}-button`} hidden={!isOpen}>
        {children}
      </div>
    </div>
  )
}
