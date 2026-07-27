import { useState } from 'react'
import { Sparkles, TrendingUp, TrendingDown, Bell, ChevronRight, ArrowUpRight } from 'lucide-react'

interface Props {
  userName: string
  onAskAI: (prompt?: string) => void
}

const marketData = [
  { name: 'Sensex', value: '81,453', change: '+0.84%', up: true },
  { name: 'Nifty 50', value: '24,832', change: '+1.12%', up: true },
  { name: 'Gold', value: '₹72,140', change: '-0.31%', up: false },
]

const adviceCards = [
  {
    tag: 'SIP Recommendation',
    tagColor: '#1A2B5E',
    tagBg: '#EEF1FA',
    title: 'Start a ₹5,000/mo Nifty Index SIP',
    desc: 'Based on your ₹45,000 income and moderate risk profile, a Nifty 50 Index Fund SIP offers the best risk-adjusted return for your profile.',
    time: '2 mins ago',
    icon: '📈',
  },
  {
    tag: 'Emergency Alert',
    tagColor: '#C8922A',
    tagBg: '#FEF3E2',
    title: 'Build your emergency fund first',
    desc: 'You have only ₹8,000 saved. Aim for 3 months of expenses (₹75,000) in a liquid fund before investing in equity.',
    time: '1 hour ago',
    icon: '🛡️',
  },
  {
    tag: 'Market Update',
    tagColor: '#059669',
    tagBg: '#ECFDF5',
    title: 'IT Sector showing strong signals',
    desc: 'Nifty IT index up 3.2% this week. If you have risk appetite, a Motilal Oswal Nasdaq 100 ETF can give global IT exposure.',
    time: 'Yesterday',
    icon: '💡',
  },
]

const quickPrompts = [
  'Where should I invest ₹10,000?',
  'Is now a good time to buy stocks?',
  'How much should I save monthly?',
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function HomeScreen({ userName, onAskAI }: Props) {
  const [askText, setAskText] = useState('')

  const handleAsk = () => {
    if (askText.trim()) {
      onAskAI(askText.trim())
      setAskText('')
    }
  }

  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1)

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Status bar placeholder */}
      <div className="h-12 bg-surface" />

      {/* Header */}
      <div className="px-5 pb-4 bg-surface">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted font-medium">{getGreeting()},</p>
            <h1 className="text-xl font-bold text-navy">{displayName} 👋</h1>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center">
              <Bell size={18} className="text-navy" />
            </div>
            <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-gold border-2 border-surface" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {/* Capacity Card */}
        <div className="px-5 mb-4">
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1A2B5E 0%, #243870 60%, #1E3370 100%)',
              boxShadow: '0 12px 32px rgba(26,43,94,0.3)',
            }}
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 80% 20%, #C8922A 0%, transparent 50%)',
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Monthly Investment Capacity</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-bold text-white">₹15,000</span>
                    <span className="text-success text-sm font-semibold mb-1">+12% vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <TrendingUp size={22} className="text-gold" />
                </div>
              </div>
              <div className="h-px bg-white/10 mb-4" />
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Income', value: '₹45,000' },
                  { label: 'Expenses', value: '₹30,000' },
                  { label: 'Investable', value: '₹15,000' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-white/50 text-xs font-medium">{item.label}</p>
                    <p className="text-white text-sm font-semibold mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Ask Bar */}
        <div className="px-5 mb-5">
          <div className="bg-white border border-border rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-lg bg-navy-light flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-navy" />
              </div>
              <input
                type="text"
                placeholder="Ask your AI advisor anything…"
                value={askText}
                onChange={(e) => setAskText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="flex-1 text-sm text-navy placeholder-muted outline-none bg-transparent font-medium"
              />
              <button
                onClick={handleAsk}
                className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
              >
                <ArrowUpRight size={14} className="text-white" />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => onAskAI(p)}
                  className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full bg-navy-light text-navy border border-navy/10 hover:bg-navy hover:text-white transition-all active:scale-95"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Market Pulse */}
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-navy">Market Pulse</h2>
            <span className="text-xs text-muted">Live</span>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {marketData.map((m) => (
              <div key={m.name} className="flex-shrink-0 bg-white rounded-xl border border-border p-3 min-w-28">
                <p className="text-xs text-muted font-medium mb-1">{m.name}</p>
                <p className="text-sm font-bold text-navy">{m.value}</p>
                <div className={`flex items-center gap-1 mt-1`}>
                  {m.up ? <TrendingUp size={11} className="text-success" /> : <TrendingDown size={11} style={{ color: '#EF4444' }} />}
                  <span className="text-xs font-semibold" style={{ color: m.up ? '#059669' : '#EF4444' }}>{m.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Advice */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-navy">AI Recommendations</h2>
            <button className="text-xs text-gold font-semibold flex items-center gap-1">
              See all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {adviceCards.map((card, i) => (
              <button
                key={i}
                onClick={() => onAskAI(`Tell me more about: ${card.title}`)}
                className="w-full bg-white rounded-2xl border border-border p-4 text-left hover:shadow-md transition-shadow active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{card.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: card.tagColor, background: card.tagBg }}
                      >
                        {card.tag}
                      </span>
                      <span className="text-xs text-muted">{card.time}</span>
                    </div>
                    <p className="text-sm font-semibold text-navy leading-snug mb-1">{card.title}</p>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">{card.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-border flex-shrink-0 mt-0.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
