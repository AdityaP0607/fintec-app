import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Info, ChevronRight, Sparkles } from 'lucide-react'

interface Props {
  onAskAI: (prompt: string) => void
}

type RiskLevel = 'Conservative' | 'Moderate' | 'Aggressive'

const RISK_CONFIGS: Record<RiskLevel, {
  allocation: { name: string; pct: number; color: string; icon: string; desc: string }[]
  label: string
  color: string
  bg: string
}> = {
  Conservative: {
    label: 'Conservative',
    color: '#059669',
    bg: '#ECFDF5',
    allocation: [
      { name: 'Emergency Fund', pct: 25, color: '#6B7280', icon: '🛡️', desc: 'Liquid Fund / Savings Account' },
      { name: 'Fixed Deposit', pct: 30, color: '#059669', icon: '🏦', desc: 'Bank FD / RD — 7–8% p.a.' },
      { name: 'Debt Mutual Fund', pct: 25, color: '#10B981', icon: '📄', desc: 'Corporate Bond Fund' },
      { name: 'Large Cap Index', pct: 15, color: '#1A2B5E', icon: '📈', desc: 'Nifty 50 Index Fund' },
      { name: 'Gold ETF', pct: 5, color: '#C8922A', icon: '🥇', desc: 'Sovereign Gold Bond' },
    ],
  },
  Moderate: {
    label: 'Moderate',
    color: '#C8922A',
    bg: '#FEF3E2',
    allocation: [
      { name: 'Emergency Fund', pct: 15, color: '#6B7280', icon: '🛡️', desc: 'Liquid Fund / Savings Account' },
      { name: 'Large Cap Index', pct: 35, color: '#1A2B5E', icon: '📈', desc: 'Nifty 50 Index Fund' },
      { name: 'Mid Cap Index', pct: 20, color: '#243870', icon: '🚀', desc: 'Nifty Midcap 150 Index' },
      { name: 'Debt Fund', pct: 15, color: '#059669', icon: '📄', desc: 'Corporate Bond Fund' },
      { name: 'Gold ETF', pct: 10, color: '#C8922A', icon: '🥇', desc: 'Sovereign Gold Bond' },
      { name: 'International', pct: 5, color: '#8B5CF6', icon: '🌍', desc: 'Nasdaq 100 ETF' },
    ],
  },
  Aggressive: {
    label: 'Aggressive',
    color: '#1A2B5E',
    bg: '#EEF1FA',
    allocation: [
      { name: 'Large Cap', pct: 30, color: '#1A2B5E', icon: '📈', desc: 'Nifty 50 Index Fund' },
      { name: 'Mid & Small Cap', pct: 30, color: '#243870', icon: '🚀', desc: 'Nifty Midcap + Smallcap' },
      { name: 'International', pct: 15, color: '#8B5CF6', icon: '🌍', desc: 'Nasdaq 100 ETF' },
      { name: 'Sectoral', pct: 10, color: '#0EA5E9', icon: '⚡', desc: 'IT / Banking Sectoral Funds' },
      { name: 'Gold', pct: 5, color: '#C8922A', icon: '🥇', desc: 'Sovereign Gold Bond' },
      { name: 'Emergency', pct: 10, color: '#6B7280', icon: '🛡️', desc: 'Liquid Fund' },
    ],
  },
}

function formatINR(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}

export default function AnalysisScreen({ onAskAI }: Props) {
  const [income, setIncome] = useState(45000)
  const [expenses, setExpenses] = useState(30000)
  const [risk, setRisk] = useState<RiskLevel>('Moderate')

  const investable = Math.max(0, income - expenses)
  const config = RISK_CONFIGS[risk]

  const pieData = useMemo(() =>
    config.allocation.map((a) => ({
      name: a.name,
      value: a.pct,
      color: a.color,
      amount: Math.round((investable * a.pct) / 100),
    })),
    [config, investable]
  )

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload
      return (
        <div className="bg-white border border-border rounded-xl px-3 py-2 shadow-lg text-xs">
          <p className="font-bold text-navy">{d.name}</p>
          <p className="text-muted">{d.value}% · {formatINR(d.amount)}</p>
        </div>
      )
    }
    return null
  }

  const expectedReturn = risk === 'Conservative' ? '9–11' : risk === 'Moderate' ? '12–15' : '15–20'
  const yearlyGrowth5 = Math.round(investable * 12 * (risk === 'Conservative' ? 10 : risk === 'Moderate' ? 13.5 : 17.5) / 100 * 5)

  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="h-12 bg-surface" />
      <div className="px-5 pb-4">
        <h1 className="text-xl font-bold text-navy">Investment Analysis</h1>
        <p className="text-sm text-muted mt-0.5">Understand your capacity & get AI advice</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-5 space-y-4">
        {/* Income & Expense */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <h2 className="text-sm font-bold text-navy mb-4">Your Monthly Finances</h2>
          <SliderInput
            label="Monthly Income"
            value={income}
            min={5000}
            max={200000}
            step={1000}
            onChange={setIncome}
            color="#1A2B5E"
          />
          <div className="mt-4">
            <SliderInput
              label="Monthly Expenses"
              value={expenses}
              min={2000}
              max={income}
              step={1000}
              onChange={setExpenses}
              color="#C8922A"
            />
          </div>
        </div>

        {/* Investable Amount */}
        <div
          className="rounded-2xl p-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A2B5E, #243870)', boxShadow: '0 8px 24px rgba(26,43,94,0.25)' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ background: 'radial-gradient(circle, #C8922A, transparent)' }} />
          <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Investable Each Month</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{formatINR(investable)}</p>
              <p className="text-white/60 text-xs mt-1">
                {investable > 0
                  ? `${Math.round((investable / income) * 100)}% of income · Well done!`
                  : 'Expenses exceed income — review spending'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs">Projected 5yr</p>
              <p className="text-gold text-lg font-bold">{formatINR(yearlyGrowth5)}</p>
            </div>
          </div>
        </div>

        {/* Risk Profile */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <h2 className="text-sm font-bold text-navy mb-3">Risk Tolerance</h2>
          <div className="flex gap-2">
            {(['Conservative', 'Moderate', 'Aggressive'] as RiskLevel[]).map((r) => {
              const cfg = RISK_CONFIGS[r]
              return (
                <button
                  key={r}
                  onClick={() => setRisk(r)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all"
                  style={{
                    background: risk === r ? cfg.bg : 'transparent',
                    borderColor: risk === r ? cfg.color : '#E8EAF0',
                    color: risk === r ? cfg.color : '#6B7280',
                  }}
                >
                  {r}
                </button>
              )
            })}
          </div>
          <div
            className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
            style={{ background: config.bg, color: config.color }}
          >
            <Info size={12} />
            <span className="font-medium">Expected return: {expectedReturn}% p.a. (historical)</span>
          </div>
        </div>

        {/* Allocation Chart */}
        {investable > 0 && (
          <div className="bg-white rounded-2xl border border-border p-4">
            <h2 className="text-sm font-bold text-navy mb-1">Recommended Allocation</h2>
            <p className="text-xs text-muted mb-4">How to split {formatINR(investable)}/month</p>

            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2.5">
              {config.allocation.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-base w-6">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-navy">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted">{item.pct}%</span>
                        <span className="text-xs font-bold text-navy">{formatINR(Math.round((investable * item.pct) / 100))}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                    <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI CTA */}
        <button
          onClick={() => onAskAI(`I earn ${formatINR(income)}/month with ${formatINR(expenses)} expenses. With a ${risk} risk profile and ${formatINR(investable)}/month to invest, what's your detailed investment advice?`)}
          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-navy bg-navy-light active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center">
              <Sparkles size={16} className="text-gold" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-navy">Get Personalized AI Advice</p>
              <p className="text-xs text-muted">Based on your exact numbers above</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-navy" />
        </button>
      </div>
    </div>
  )
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  color,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  color: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted">{label}</span>
        <span className="text-sm font-bold text-navy">₹{value.toLocaleString('en-IN')}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, #E8EAF0 ${((value - min) / (max - min)) * 100}%, #E8EAF0 100%)`,
          accentColor: color,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted">₹{(min / 1000).toFixed(0)}K</span>
        <span className="text-xs text-muted">₹{(max / 1000).toFixed(0)}K</span>
      </div>
    </div>
  )
}
