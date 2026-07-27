import { useState } from 'react'
import { ChevronRight, Bell, Shield, FileText, HelpCircle, LogOut, Edit2, Check } from 'lucide-react'

interface Props {
  userName: string
  onLogout: () => void
}

const GOALS = ['Retirement', 'House Purchase', 'Emergency Fund', 'Child Education', 'Car Purchase', 'Travel', 'Business', 'Wealth Creation']

export default function ProfileScreen({ userName, onLogout }: Props) {
  const [goals, setGoals] = useState<string[]>(['Emergency Fund', 'Wealth Creation'])
  const [notifications, setNotifications] = useState(true)
  const [marketAlerts, setMarketAlerts] = useState(false)
  const [risk, setRisk] = useState<'Conservative' | 'Moderate' | 'Aggressive'>('Moderate')

  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1)
  const initials = displayName.slice(0, 2).toUpperCase()

  function toggleGoal(g: string) {
    setGoals((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g])
  }

  const riskColors = { Conservative: '#059669', Moderate: '#C8922A', Aggressive: '#1A2B5E' }

  const stats = [
    { label: 'Monthly SIPs', value: '3 Active' },
    { label: 'Platforms', value: '2 Connected' },
    { label: 'AI Advice', value: '14 Received' },
    { label: 'Member Since', value: 'Jul 2026' },
  ]

  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="h-12 bg-surface" />

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {/* Profile header */}
        <div className="px-5 pb-5">
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md"
                  style={{ background: 'linear-gradient(135deg, #1A2B5E, #243870)' }}
                >
                  {initials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gold border-2 border-white flex items-center justify-center">
                  <Edit2 size={9} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-navy">{displayName}</h1>
                <p className="text-xs text-muted">Moderate Investor · Verified</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-xs text-success font-medium">Premium Member</span>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-sm font-bold text-navy">{s.value}</p>
                  <p className="text-xs text-muted leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Goals */}
        <Section title="Investment Goals" subtitle="Select what you're saving for">
          <div className="flex flex-wrap gap-2 px-4 pb-4">
            {GOALS.map((g) => {
              const active = goals.includes(g)
              return (
                <button
                  key={g}
                  onClick={() => toggleGoal(g)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border active:scale-95"
                  style={{
                    background: active ? '#EEF1FA' : '#F7F8FC',
                    borderColor: active ? '#1A2B5E' : '#E8EAF0',
                    color: active ? '#1A2B5E' : '#6B7280',
                  }}
                >
                  {active && <Check size={10} />}
                  {g}
                </button>
              )
            })}
          </div>
        </Section>

        {/* Risk Tolerance */}
        <Section title="Risk Profile" subtitle="Your investment risk tolerance">
          <div className="px-4 pb-4 space-y-2">
            {(['Conservative', 'Moderate', 'Aggressive'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRisk(r)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all"
                style={{
                  borderColor: risk === r ? riskColors[r] : '#E8EAF0',
                  background: risk === r ? `${riskColors[r]}08` : '#fff',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: riskColors[r] }}>
                    {risk === r && <div className="w-2 h-2 rounded-full" style={{ background: riskColors[r] }} />}
                  </div>
                  <span className="text-sm font-semibold text-navy">{r}</span>
                </div>
                <div
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: riskColors[r], background: `${riskColors[r]}15` }}
                >
                  {r === 'Conservative' ? '9–11% p.a.' : r === 'Moderate' ? '12–15% p.a.' : '15–20% p.a.'}
                </div>
              </button>
            ))}
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <div className="px-4 pb-4 space-y-3">
            <ToggleRow
              icon={<Bell size={15} />}
              label="AI Recommendations"
              desc="Get daily investment advice"
              value={notifications}
              onChange={setNotifications}
            />
            <ToggleRow
              icon={<Bell size={15} />}
              label="Market Alerts"
              desc="Big market moves & news"
              value={marketAlerts}
              onChange={setMarketAlerts}
            />
          </div>
        </Section>

        {/* More */}
        <Section title="More">
          <div className="divide-y divide-border">
            {[
              { icon: <Shield size={15} />, label: 'Privacy & Security' },
              { icon: <FileText size={15} />, label: 'Terms of Service' },
              { icon: <HelpCircle size={15} />, label: 'Help & Support' },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface transition-colors">
                <span className="text-muted">{item.icon}</span>
                <span className="flex-1 text-sm font-medium text-navy text-left">{item.label}</span>
                <ChevronRight size={14} className="text-muted" />
              </button>
            ))}
          </div>
        </Section>

        {/* Logout */}
        <div className="px-5 pb-2 mt-2">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-border text-sm font-semibold text-muted active:scale-95 transition-transform hover:border-red-200 hover:text-red-500 hover:bg-red-50"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted px-8 pb-6 leading-relaxed">
          Finival provides financial education and suggestions only. Not a SEBI-registered investment advisor. All investments carry risk.
        </p>
      </div>
    </div>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="px-5 mb-3">
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-sm font-bold text-navy">{title}</h2>
          {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}

function ToggleRow({
  icon,
  label,
  desc,
  value,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  desc: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-navy-light flex items-center justify-center text-navy flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-navy">{label}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className="w-11 h-6 rounded-full transition-all flex-shrink-0 flex items-center px-1"
        style={{ background: value ? '#1A2B5E' : '#E8EAF0' }}
      >
        <div
          className="w-4 h-4 rounded-full bg-white shadow-sm transition-all"
          style={{ transform: value ? 'translateX(20px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  )
}
