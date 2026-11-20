export default function Alert({ message, id = 'form-error' }) {
  if (!message) return null

  return (
    <p id={id} className="mt-3 border-l-4 border-red-700 bg-red-50 p-3 text-sm text-red-800" role="alert">
      {message}
    </p>
  )
}
