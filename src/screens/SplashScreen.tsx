import { useEffect, useState } from 'react'

interface Props {
  onDone: () => void
}

function FinivalLogo({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill="#1A2B5E" />
      <circle cx="40" cy="40" r="33" fill="#1E3370" />
      <circle cx="40" cy="26" r="5.5" fill="#C8922A" />
      <circle cx="27" cy="50" r="5.5" fill="#C8922A" />
      <circle cx="53" cy="50" r="5.5" fill="#C8922A" />
      <line x1="40" y1="26" x2="27" y2="50" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="40" y1="26" x2="53" y2="50" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="27" y1="50" x2="53" y2="50" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="40" cy="26" r="2.5" fill="#FEF3E2" />
      <circle cx="27" cy="50" r="2.5" fill="#FEF3E2" />
      <circle cx="53" cy="50" r="2.5" fill="#FEF3E2" />
    </svg>
  )
}

export default function SplashScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100)
    const t2 = setTimeout(() => {
      let p = 0
      const interval = setInterval(() => {
        p += 2
        setProgress(p)
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(onDone, 300)
        }
      }, 44)
      return () => clearInterval(interval)
    }, 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className="flex flex-col items-center justify-center h-full bg-surface relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(26,43,94,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Gold glow behind logo */}
      <div
        className="absolute"
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,146,42,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
        }}
      />

      <div
        className="flex flex-col items-center gap-5 relative z-10"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
      >
        <div className="animate-logo">
          <FinivalLogo size={88} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy tracking-tight">Finival</h1>
          <p className="text-sm text-muted font-medium mt-1 tracking-wide">AI Financial Advisor</p>
        </div>
      </div>

      {/* Loading bar */}
      <div
        className="absolute bottom-20 left-8 right-8"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.5s' }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted font-medium">Preparing your advisor…</span>
          <span className="text-xs text-navy font-semibold">{progress}%</span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Version */}
      <p className="absolute bottom-8 text-xs text-border font-medium">v1.0 · For advisory purposes only</p>
    </div>
  )
}
