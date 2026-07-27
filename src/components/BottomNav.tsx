import { Home, Sparkles, BarChart2, Briefcase, UserCircle } from 'lucide-react'

export type NavTab = 'home' | 'chat' | 'analysis' | 'portfolio' | 'profile'

interface Props {
  active: NavTab
  onChange: (tab: NavTab) => void
}

const TABS: { id: NavTab; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'analysis', label: 'Analyze', icon: BarChart2 },
  { id: 'chat', label: 'Advisor', icon: Sparkles },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'profile', label: 'Profile', icon: UserCircle },
]

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-border px-2 py-2 z-50"
      style={{ boxShadow: '0 -4px 24px rgba(26,43,94,0.07)' }}
    >
      <div className="flex items-center justify-around">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          const isCenter = id === 'chat'
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all active:scale-90 ${isCenter ? '-mt-4' : ''}`}
            >
              {isCenter ? (
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #1A2B5E, #243870)',
                    boxShadow: '0 6px 20px rgba(26,43,94,0.35)',
                  }}
                >
                  <Icon size={20} color="#C8922A" />
                </div>
              ) : (
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: isActive ? '#EEF1FA' : 'transparent' }}
                >
                  <Icon size={18} color={isActive ? '#1A2B5E' : '#9CA3AF'} strokeWidth={isActive ? 2.2 : 1.8} />
                </div>
              )}
              {!isCenter && (
                <span
                  className="text-xs font-semibold transition-colors"
                  style={{ color: isActive ? '#1A2B5E' : '#9CA3AF' }}
                >
                  {label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
