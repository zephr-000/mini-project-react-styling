import { useEffect } from 'react'

export default function CartFlight({ flight, onFinish }) {
  useEffect(() => {
    if (!flight) return
    const timer = setTimeout(() => onFinish(null), 850)
    return () => clearTimeout(timer)
  }, [flight, onFinish])

  if (!flight) return null
  const distanceX = flight.endX - flight.startX
  const distanceY = flight.endY - flight.startY

  return (
    <span
      key={flight.id}
      className="cart-flight"
      aria-hidden="true"
      onAnimationEnd={() => onFinish(null)}
      style={{
        left: flight.startX - 8,
        top: flight.startY - 8,
        '--end-x': `${distanceX}px`,
        '--end-y': `${distanceY}px`,
        '--mid-x': `${distanceX / 2}px`,
        '--mid-y': `${distanceY / 2 - 80}px`,
      }}
    />
  )
}
