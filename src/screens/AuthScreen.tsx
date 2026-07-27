import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, ChevronRight } from 'lucide-react'

interface Props {
  onAuth: (name: string) => void
}

function FinivalLogoSmall() {
  return (
    <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill="#1A2B5E" />
      <circle cx="40" cy="26" r="5.5" fill="#C8922A" />
      <circle cx="27" cy="50" r="5.5" fill="#C8922A" />
      <circle cx="53" cy="50" r="5.5" fill="#C8922A" />
      <line x1="40" y1="26" x2="27" y2="50" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="40" y1="26" x2="53" y2="50" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="27" y1="50" x2="53" y2="50" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.5" />
    </svg>
  )
}

type RiskLevel = 'Conservative' | 'Moderate' | 'Aggressive'

export default function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [showPass, setShowPass] = useState(false)
  const [risk, setRisk] = useState<RiskLevel>('Moderate')

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '' })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onAuth(loginForm.email.split('@')[0] || 'Investor')
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    onAuth(signupForm.name || 'Investor')
  }

  const riskOptions: { label: RiskLevel; desc: string; color: string }[] = [
    { label: 'Conservative', desc: 'Lower risk, stable returns', color: '#059669' },
    { label: 'Moderate', desc: 'Balanced growth & safety', color: '#C8922A' },
    { label: 'Aggressive', desc: 'Higher risk, higher reward', color: '#1A2B5E' },
  ]

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="pt-16 pb-6 px-6 bg-surface border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <FinivalLogoSmall />
          <div>
            <h1 className="text-xl font-bold text-navy">Finival</h1>
            <p className="text-xs text-muted">AI Financial Advisor</p>
          </div>
        </div>
        {/* Tab */}
        <div className="flex bg-white border border-border rounded-xl p-1">
          {(['login', 'signup'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: mode === tab ? '#1A2B5E' : 'transparent',
                color: mode === tab ? '#fff' : '#6B7280',
              }}
            >
              {tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4 animate-fade-in">
            <div>
              <p className="text-xl font-bold text-navy mb-1">Welcome back</p>
              <p className="text-sm text-muted">Sign in to access your advisor</p>
            </div>
            <InputField
              icon={<Mail size={16} />}
              type="email"
              placeholder="Email address"
              value={loginForm.email}
              onChange={(v) => setLoginForm({ ...loginForm, email: v })}
            />
            <InputField
              icon={<Lock size={16} />}
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={loginForm.password}
              onChange={(v) => setLoginForm({ ...loginForm, password: v })}
              rightIcon={
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-muted hover:text-navy transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <button type="button" className="text-xs text-gold font-semibold text-right w-full">
              Forgot password?
            </button>
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-navy text-white font-semibold text-base mt-2 active:scale-95 transition-transform"
              style={{ boxShadow: '0 8px 24px rgba(26,43,94,0.25)' }}
            >
              Sign In
            </button>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted font-medium">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SocialButton label="Google" icon="G" color="#DB4437" />
              <SocialButton label="Apple" icon="⌘" color="#000" />
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4 animate-fade-in">
            <div>
              <p className="text-xl font-bold text-navy mb-1">Create your account</p>
              <p className="text-sm text-muted">Start your investment journey today</p>
            </div>
            <InputField
              icon={<User size={16} />}
              type="text"
              placeholder="Full name"
              value={signupForm.name}
              onChange={(v) => setSignupForm({ ...signupForm, name: v })}
            />
            <InputField
              icon={<Mail size={16} />}
              type="email"
              placeholder="Email address"
              value={signupForm.email}
              onChange={(v) => setSignupForm({ ...signupForm, email: v })}
            />
            <InputField
              icon={<Phone size={16} />}
              type="tel"
              placeholder="Phone number"
              value={signupForm.phone}
              onChange={(v) => setSignupForm({ ...signupForm, phone: v })}
            />
            <InputField
              icon={<Lock size={16} />}
              type={showPass ? 'text' : 'password'}
              placeholder="Create password"
              value={signupForm.password}
              onChange={(v) => setSignupForm({ ...signupForm, password: v })}
              rightIcon={
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-muted hover:text-navy transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* Risk profile */}
            <div>
              <p className="text-sm font-semibold text-navy mb-3">Risk Tolerance</p>
              <div className="space-y-2">
                {riskOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setRisk(opt.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all"
                    style={{
                      borderColor: risk === opt.label ? opt.color : '#E8EAF0',
                      background: risk === opt.label ? `${opt.color}08` : '#fff',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full border-2 flex items-center justify-center" style={{ borderColor: opt.color }}>
                        {risk === opt.label && <div className="w-1.5 h-1.5 rounded-full" style={{ background: opt.color }} />}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-navy">{opt.label}</div>
                        <div className="text-xs text-muted">{opt.desc}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-muted" />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-navy text-white font-semibold text-base active:scale-95 transition-transform"
              style={{ boxShadow: '0 8px 24px rgba(26,43,94,0.25)' }}
            >
              Create Account
            </button>
            <p className="text-xs text-muted text-center leading-relaxed">
              By creating an account, you agree to our{' '}
              <span className="text-navy font-semibold">Terms of Service</span> and{' '}
              <span className="text-navy font-semibold">Privacy Policy</span>.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function InputField({
  icon,
  type,
  placeholder,
  value,
  onChange,
  rightIcon,
}: {
  icon: React.ReactNode
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  rightIcon?: React.ReactNode
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-white transition-all"
      style={{ borderColor: focused ? '#1A2B5E' : '#E8EAF0', boxShadow: focused ? '0 0 0 3px rgba(26,43,94,0.08)' : 'none' }}
    >
      <span className="text-muted flex-shrink-0">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent text-sm text-navy placeholder-muted outline-none font-medium"
      />
      {rightIcon}
    </div>
  )
}

function SocialButton({ label, icon, color }: { label: string; icon: string; color: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-white text-sm font-semibold text-navy hover:bg-surface transition-colors active:scale-95"
    >
      <span className="font-bold" style={{ color }}>{icon}</span>
      {label}
    </button>
  )
}
