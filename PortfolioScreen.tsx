import { useState } from 'react'
import { Check, Plus, Sparkles, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

interface Props {
  onAskAI: (prompt: string) => void
}

interface Platform {
  id: string
  name: string
  color: string
  textColor: string
  initial: string
  desc: string
  holdings?: Holding[]
}

interface Holding {
  name: string
  type: string
  invested: number
  current: number
}

const PLATFORMS: Platform[] = [
  {
    id: 'zerodha',
    name: 'Zerodha',
    color: '#387ED1',
    textColor: '#fff',
    initial: 'Z',
    desc: 'Stocks, F&O, Mutual Funds',
    holdings: [
      { name: 'HDFC Bank', type: 'Stock', invested: 25000, current: 28500 },
      { name: 'Infosys', type: 'Stock', invested: 15000, current: 13200 },
      { name: 'Nifty 50 Index SIP', type: 'Mutual Fund', invested: 36000, current: 42000 },
    ],
  },
  {
    id: 'groww',
    name: 'Groww',
    color: '#5367FF',
    textColor: '#fff',
    initial: 'G',
    desc: 'Mutual Funds, Stocks',
    holdings: [
      { name: 'Parag Parikh Flexi Cap', type: 'Mutual Fund', invested: 24000, current: 29800 },
      { name: 'Mirae Asset Liquid Fund', type: 'Liquid Fund', invested: 50000, current: 52100 },
    ],
  },
  {
    id: 'kuvera',
    name: 'Kuvera',
    color: '#00A86B',
    textColor: '#fff',
    initial: 'K',
    desc: 'Mutual Funds, US Stocks',
  },
  {
    id: 'coin',
    name: 'Coin',
    color: '#FF7A00',
    textColor: '#fff',
    initial: 'C',
    desc: 'Zerodha Mutual Funds',
  },
  {
    id: 'paytm',
    name: 'Paytm Money',
    color: '#1C2F7E',
    textColor: '#fff',
    initial: 'P',
    desc: 'Mutual Funds, NPS, Stocks',
  },
]

const AI_INSIGHTS = [
  {
    icon: '⚠️',
    type: 'Risk',
    color: '#C8922A',
    bg: '#FEF3E2',
    title: 'Infosys holding is -12% — consider rebalancing',
    desc: 'Your Infosys position has underperformed Nifty IT by 8% over 6 months. Consider switching to a Nifty IT ETF for broader exposure.',
  },
  {
    icon: '✅',
    type: 'Positive',
    color: '#059669',
    bg: '#ECFDF5',
    title: 'HDFC Bank holding looks strong',
    desc: 'HDFC Bank is up 14%. It still has room to grow — consider holding and not booking profits early.',
  },
  {
    icon: '💡',
    type: 'Suggestion',
    color: '#1A2B5E',
    bg: '#EEF1FA',
    title: 'Increase SIP by ₹2,000 this month',
    desc: 'Markets corrected 3.2% last week. This is an ideal time to increase your Nifty 50 SIP by ₹2,000 to average down costs.',
  },
]

export default function PortfolioScreen({ onAskAI }: Props) {
  const [connected, setConnected] = useState<string[]>(['zerodha', 'groww'])
  const [connecting, setConnecting] = useState<string | null>(null)

  const connectedPlatforms = PLATFORMS.filter((p) => connected.includes(p.id))
  const totalInvested = connectedPlatforms.flatMap((p) => p.holdings || []).reduce((s, h) => s + h.invested, 0)
  const totalCurrent = connectedPlatforms.flatMap((p) => p.holdings || []).reduce((s, h) => s + h.current, 0)
  const totalPnL = totalCurrent - totalInvested
  const pnlPct = ((totalPnL / totalInvested) * 100).toFixed(1)

  function toggleConnect(id: string) {
    if (connected.includes(id)) {
      setConnected(connected.filter((c) => c !== id))
      return
    }
    setConnecting(id)
    setTimeout(() => {
      setConnected([...connected, id])
      setConnecting(null)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="h-12 bg-surface" />
      <div className="px-5 pb-4">
        <h1 className="text-xl font-bold text-navy">Portfolio</h1>
        <p className="text-sm text-muted mt-0.5">Connect platforms · Get AI analysis</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 space-y-4 px-5">
        {/* Portfolio Summary */}
        {connected.length > 0 && (
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A2B5E, #243870)', boxShadow: '0 8px 24px rgba(26,43,94,0.25)' }}
          >
            <div className="absolute top-0 right-0 w-28 h-28 opacity-10" style={{ background: 'radial-gradient(circle, #C8922A, transparent)' }} />
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Connected Portfolio</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-white/50 text-xs">Invested</p>
                <p className="text-white text-base font-bold">₹{(totalInvested / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">Current</p>
                <p className="text-white text-base font-bold">₹{(totalCurrent / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">P&L</p>
                <div className="flex items-center gap-1">
                  {totalPnL >= 0 ? <TrendingUp size={12} className="text-success" /> : <TrendingDown size={12} style={{ color: '#EF4444' }} />}
                  <p className="text-base font-bold" style={{ color: totalPnL >= 0 ? '#34D399' : '#F87171' }}>
                    {totalPnL >= 0 ? '+' : ''}₹{Math.abs(totalPnL / 1000).toFixed(1)}K
                  </p>
                </div>
                <p className="text-xs" style={{ color: totalPnL >= 0 ? '#34D399' : '#F87171' }}>
                  ({totalPnL >= 0 ? '+' : ''}{pnlPct}%)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights */}
        {connected.length > 0 && (
          <div className="bg-white rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-navy flex items-center justify-center">
                <Sparkles size={12} className="text-gold" />
              </div>
              <h2 className="text-sm font-bold text-navy">AI Portfolio Insights</h2>
            </div>
            <div className="space-y-2.5">
              {AI_INSIGHTS.map((insight, i) => (
                <div key={i} className="rounded-xl border p-3" style={{ background: insight.bg, borderColor: `${insight.color}25` }}>
                  <div className="flex items-start gap-2.5">
                    <span className="text-base mt-0.5">{insight.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-navy leading-snug mb-0.5">{insight.title}</p>
                      <p className="text-xs text-muted leading-relaxed">{insight.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onAskAI('Analyze my connected portfolio and give me detailed rebalancing advice for each holding')}
              className="w-full mt-3 py-3 rounded-xl bg-navy text-white text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Sparkles size={13} /> Full AI Analysis
            </button>
          </div>
        )}

        {/* Holdings breakdown */}
        {connectedPlatforms.map((platform) =>
          platform.holdings ? (
            <div key={platform.id} className="bg-white rounded-2xl border border-border p-4">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: platform.color }}>
                  {platform.initial}
                </div>
                <h3 className="text-sm font-bold text-navy">{platform.name}</h3>
              </div>
              <div className="space-y-2">
                {platform.holdings.map((h, i) => {
                  const pnl = h.current - h.invested
                  const pnlP = ((pnl / h.invested) * 100).toFixed(1)
                  return (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-surface last:border-0">
                      <div>
                        <p className="text-xs font-semibold text-navy">{h.name}</p>
                        <p className="text-xs text-muted">{h.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-navy">₹{h.current.toLocaleString('en-IN')}</p>
                        <div className="flex items-center gap-1 justify-end">
                          {pnl >= 0 ? <TrendingUp size={10} className="text-success" /> : <TrendingDown size={10} style={{ color: '#EF4444' }} />}
                          <p className="text-xs font-semibold" style={{ color: pnl >= 0 ? '#059669' : '#EF4444' }}>
                            {pnl >= 0 ? '+' : ''}{pnlP}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null
        )}

        {/* Platforms */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <h2 className="text-sm font-bold text-navy mb-1">Connect Platforms</h2>
          <p className="text-xs text-muted mb-3 flex items-center gap-1">
            <AlertCircle size={11} /> Your data is read-only. We never execute trades.
          </p>
          <div className="space-y-2.5">
            {PLATFORMS.map((p) => {
              const isConnected = connected.includes(p.id)
              const isConnecting = connecting === p.id
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm" style={{ background: p.color }}>
                    {p.initial}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{p.name}</p>
                    <p className="text-xs text-muted">{p.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleConnect(p.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
                    style={{
                      background: isConnected ? '#ECFDF5' : isConnecting ? '#EEF1FA' : '#F7F8FC',
                      color: isConnected ? '#059669' : isConnecting ? '#1A2B5E' : '#6B7280',
                      border: `1.5px solid ${isConnected ? '#059669' : isConnecting ? '#1A2B5E' : '#E8EAF0'}`,
                    }}
                  >
                    {isConnecting ? (
                      <div className="w-3 h-3 border-2 border-navy/30 border-t-navy rounded-full animate-spin-slow" />
                    ) : isConnected ? (
                      <Check size={12} />
                    ) : (
                      <Plus size={12} />
                    )}
                    {isConnecting ? 'Connecting' : isConnected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-navy-light">
          <AlertCircle size={14} className="text-navy flex-shrink-0 mt-0.5" />
          <p className="text-xs text-navy/70 leading-relaxed">
            Finival uses secure OAuth connections. We never store your credentials or access trading features. Read-only access only.
          </p>
        </div>
      </div>
    </div>
  )
}
