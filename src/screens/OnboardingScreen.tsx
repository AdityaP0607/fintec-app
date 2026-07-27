import { useState } from 'react'
import { ArrowRight, Brain, TrendingUp, Plug } from 'lucide-react'

interface Props {
  onDone: () => void
}

const slides = [
  {
    icon: Brain,
    accent: '#1A2B5E',
    accentLight: '#EEF1FA',
    title: 'Your AI Financial Guide',
    subtitle: 'Finival analyzes your income, expenses, and goals — then gives you personalized investment advice, instantly.',
    visual: (
      <div className="relative flex items-center justify-center w-full h-48">
        <div className="absolute w-36 h-36 rounded-full bg-navy-light flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center shadow-lg">
            <Brain size={36} color="#C8922A" />
          </div>
        </div>
        {/* Orbit dots */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gold"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateX(72px) translateY(-50%)`,
              opacity: 0.4 + i * 0.12,
            }}
          />
        ))}
        {/* Label chips */}
        <div className="absolute top-4 right-4 bg-white shadow-sm border border-border rounded-xl px-3 py-1.5 text-xs font-semibold text-navy">AI-Powered</div>
        <div className="absolute bottom-4 left-4 bg-gold-light border border-gold/20 rounded-xl px-3 py-1.5 text-xs font-semibold text-gold">Personalized</div>
      </div>
    ),
  },
  {
    icon: TrendingUp,
    accent: '#059669',
    accentLight: '#ECFDF5',
    title: 'Know Your Investment Capacity',
    subtitle: 'Tell us what you earn and spend. We calculate exactly how much you can invest each month — safely and smartly.',
    visual: (
      <div className="relative flex items-center justify-center w-full h-48">
        <div className="bg-white border border-border rounded-2xl p-4 shadow-sm w-64">
          <div className="text-xs text-muted font-medium mb-3">Monthly Capacity</div>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-navy">₹15,000</span>
            <span className="text-xs text-success-600 font-semibold mb-1">investable</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Equity SIP', pct: 40, color: '#1A2B5E' },
              { label: 'Gold ETF', pct: 20, color: '#C8922A' },
              { label: 'Fixed Deposit', pct: 25, color: '#059669' },
              { label: 'Emergency', pct: 15, color: '#6B7280' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
                <span className="text-xs text-muted font-medium w-8 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Plug,
    accent: '#C8922A',
    accentLight: '#FEF3E2',
    title: 'Connect & Get Smarter Advice',
    subtitle: 'Link your existing investment platforms like Zerodha, Groww, or Kuvera. Finival reviews your portfolio and suggests what to fix.',
    visual: (
      <div className="relative flex items-center justify-center w-full h-48">
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Central Finival node */}
          <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div className="flex gap-4 items-center">
            {[
              { name: 'Zerodha', color: '#387ED1', initial: 'Z' },
              { name: 'Groww', color: '#5367FF', initial: 'G' },
              { name: 'Kuvera', color: '#00A86B', initial: 'K' },
            ].map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm" style={{ background: p.color }}>
                  {p.initial}
                </div>
                <span className="text-xs text-muted font-medium">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 bg-success-light border border-success/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-xs font-semibold text-success">Connected & Analyzed</span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function OnboardingScreen({ onDone }: Props) {
  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1)
    else onDone()
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Skip */}
      <div className="flex justify-end px-6 pt-14 pb-2">
        <button onClick={onDone} className="text-sm text-muted font-semibold hover:text-navy transition-colors">
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4">
        {/* Visual */}
        <div className="w-full mb-8 animate-fade-in" key={`vis-${current}`}>
          {slide.visual}
        </div>

        {/* Text */}
        <div className="text-center animate-fade-in" key={`txt-${current}`}>
          <h2 className="text-2xl font-bold text-navy leading-tight mb-3">{slide.title}</h2>
          <p className="text-sm text-muted leading-relaxed">{slide.subtitle}</p>
        </div>
      </div>

      {/* Dots + CTA */}
      <div className="px-6 pb-12 space-y-6">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? '#1A2B5E' : '#E8EAF0',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={next}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-navy text-white font-semibold text-base active:scale-95 transition-transform shadow-lg"
          style={{ boxShadow: '0 8px 24px rgba(26,43,94,0.25)' }}
        >
          {current < slides.length - 1 ? (
            <>Next <ArrowRight size={18} /></>
          ) : (
            <>Get Started <ArrowRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  )
}
