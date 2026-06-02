import { useInView } from '../hooks/useInView'

export default function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
