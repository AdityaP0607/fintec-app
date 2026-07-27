import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Sparkles, ChevronLeft, RotateCcw } from 'lucide-react'

interface Props {
  initialPrompt?: string
  onBack?: () => void
}

interface Message {
  id: string
  role: 'user' | 'ai'
  text: string
  time: string
  cards?: AdviceCard[]
}

interface AdviceCard {
  label: string
  value: string
  icon: string
  color: string
  bg: string
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function generateAIResponse(prompt: string): { text: string; cards?: AdviceCard[] } {
  const lower = prompt.toLowerCase()

  if (lower.includes('10,000') || lower.includes('10000') || lower.includes('where') && lower.includes('invest')) {
    return {
      text: `Great question! Based on your moderate risk profile and investment horizon, here's how I'd allocate ₹10,000 this month:\n\n**Recommended Allocation:**\n\nThis split balances growth potential with stability. The Nifty 50 Index Fund gives you broad market exposure at minimal cost, while the Digital Gold keeps you hedged against inflation. The liquid fund ensures you're not fully illiquid.`,
      cards: [
        { label: 'Nifty 50 Index Fund (SIP)', value: '₹5,000 · 50%', icon: '📈', color: '#1A2B5E', bg: '#EEF1FA' },
        { label: 'Digital Gold (Sovereign Bond)', value: '₹2,000 · 20%', icon: '🥇', color: '#C8922A', bg: '#FEF3E2' },
        { label: 'Mirae Asset Liquid Fund', value: '₹3,000 · 30%', icon: '💧', color: '#059669', bg: '#ECFDF5' },
      ],
    }
  }

  if (lower.includes('sip') || lower.includes('mutual fund')) {
    return {
      text: `For a beginner with a moderate risk profile, SIPs are the best starting point. Here's my advice:\n\n**Start with Index Funds** — They outperform 80% of actively managed funds over a 10-year horizon and charge <0.1% expense ratio.\n\n**Top 3 SIPs for your profile:**\n• Nifty 50 Index Fund (Nippon/UTI) — Core holding, 40%\n• Nifty Next 50 Index — Mid-cap growth, 30%\n• Parag Parikh Flexi Cap — Global diversification, 30%\n\n**When to start?** Today. Time in market beats timing the market every time.`,
    }
  }

  if (lower.includes('stock') || lower.includes('buy') || lower.includes('time')) {
    return {
      text: `The short answer: **right now is always a good time** to invest — if you're investing systematically via SIP rather than trying to time the market.\n\nHere's why:\n\n• **Market at highs** doesn't mean it stops going up. Nifty has been at "all-time highs" 300+ times and always recovered.\n• **Rupee-cost averaging** through SIPs automatically buys more units when markets fall.\n• **Your holding period matters more** than entry point. 10-year SIP returns have never been negative on Nifty 50.\n\n**My advice:** Start a ₹5,000/month Nifty 50 SIP today. Don't wait for a "correction" that may never come.`,
    }
  }

  if (lower.includes('emergency') || lower.includes('save') || lower.includes('saving')) {
    return {
      text: `Building an emergency fund is your **#1 financial priority** before any investment. Here's the framework:\n\n**Target:** 3–6 months of expenses\n• Your monthly expenses: ~₹30,000\n• Emergency fund target: ₹90,000–₹1,80,000\n\n**Where to keep it:**\n• Liquid Mutual Fund (e.g. Mirae Asset Liquid) — earns 7–7.5% and accessible in 24 hours\n• NOT in a savings bank account (3.5% interest loses to inflation)\n\n**Timeline to build it:** Save ₹10,000/month → reach ₹90,000 in 9 months\n\nOnce done, every rupee you invest after that can be genuinely long-term.`,
      cards: [
        { label: 'Current Savings', value: '₹8,000', icon: '🏦', color: '#6B7280', bg: '#F3F4F6' },
        { label: 'Target Emergency Fund', value: '₹90,000', icon: '🛡️', color: '#059669', bg: '#ECFDF5' },
        { label: 'Monthly Contribution', value: '₹10,000/mo', icon: '📅', color: '#C8922A', bg: '#FEF3E2' },
      ],
    }
  }

  if (lower.includes('portfolio') || lower.includes('existing') || lower.includes('review')) {
    return {
      text: `I'd need to see your connected portfolio to give a full review, but here's what I typically find for your age group (18–30):\n\n**Common issues I see:**\n• Too much in FDs and savings accounts (losing to inflation)\n• No international diversification\n• Missing the Nifty Next 50 / mid-cap exposure\n• Investing in high-expense-ratio active funds instead of index funds\n\n**Connect your Zerodha or Groww account** in the Portfolio tab and I'll do a full AI-powered analysis with specific rebalancing recommendations.`,
    }
  }

  return {
    text: `That's a great question! Let me give you a personalized answer based on your profile (moderate risk, ₹15,000/month investable amount):\n\n**The core principle:** Keep investing simple, consistent, and low-cost. For most young investors, a 3-fund portfolio covers 90% of what's needed:\n\n1. **Large Cap Index** (Nifty 50) — 50% of investments\n2. **Mid Cap Index** (Nifty Midcap 150) — 30% of investments\n3. **Debt Fund or FD** — 20% for stability\n\nDo you have a more specific question? I can dive deep into any investment topic — stocks, mutual funds, tax saving (ELSS), real estate, crypto, or your existing portfolio.`,
  }
}

const suggestedPrompts = [
  "Where to invest ₹10,000?",
  "Best SIPs for beginners",
  "Is it good time to buy stocks?",
  "How to build emergency fund?",
]

const welcomeMessage: Message = {
  id: 'welcome',
  role: 'ai',
  text: "Hi! I'm your AI Financial Advisor. I can help you figure out **where to invest**, **how much to invest**, and **when to invest** based on your financial profile.\n\nI analyze your income, expenses, risk tolerance, and market conditions to give you personalized advice. I'm here purely for guidance — not to execute trades.\n\nWhat would you like to explore today?",
  time: getTime(),
}

export default function ChatScreen({ initialPrompt, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [input, setInput] = useState(initialPrompt || '')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const didInitRef = useRef(false)

  useEffect(() => {
    if (initialPrompt && !didInitRef.current) {
      didInitRef.current = true
      sendMessage(initialPrompt)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed, time: getTime() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const resp = generateAIResponse(trimmed)
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', time: getTime(), ...resp }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1400 + Math.random() * 800)
  }

  function handleReset() {
    setMessages([welcomeMessage])
    setInput('')
    setIsTyping(false)
  }

  function renderText(text: string) {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-navy mt-2 mb-1">{line.slice(2, -2)}</p>
      }
      if (line.startsWith('• ')) {
        return (
          <div key={i} className="flex items-start gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
            <span>{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</span>
          </div>
        )
      }
      if (line.trim() === '') return <div key={i} className="h-1" />
      return (
        <p key={i} className="mt-1" dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        }} />
      )
    })
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-border pt-12 pb-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors">
                <ChevronLeft size={20} className="text-navy" />
              </button>
            )}
            <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center">
              <Sparkles size={16} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-navy">AI Finival Advisor</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <p className="text-xs text-muted">Always available · Advisory only</p>
              </div>
            </div>
          </div>
          <button onClick={handleReset} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors">
            <RotateCcw size={15} className="text-muted" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">
        {/* Suggested prompts (only show if just welcome message) */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pb-2">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="text-xs font-semibold px-3 py-2 rounded-full bg-white border border-border text-navy hover:bg-navy hover:text-white transition-all active:scale-95"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2.5`}>
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles size={12} className="text-gold" />
              </div>
            )}
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div
                className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={{
                  background: msg.role === 'user' ? '#1A2B5E' : '#FFFFFF',
                  color: msg.role === 'user' ? '#FFFFFF' : '#0F1629',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  border: msg.role === 'ai' ? '1px solid #E8EAF0' : 'none',
                  boxShadow: msg.role === 'ai' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                {msg.role === 'ai' ? renderText(msg.text) : <p>{msg.text}</p>}
              </div>

              {/* Advice cards */}
              {msg.cards && (
                <div className="w-full space-y-2 mt-1">
                  {msg.cards.map((card, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border p-3"
                      style={{ background: card.bg, borderColor: `${card.color}20` }}
                    >
                      <span className="text-lg">{card.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold" style={{ color: card.color }}>{card.label}</p>
                        <p className="text-sm font-bold text-navy">{card.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted px-1">{msg.time}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5 items-start">
            <div className="w-7 h-7 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
              <Sparkles size={12} className="text-gold" />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-border px-4 py-3 pb-safe">
        <div className="flex items-end gap-3">
          <div
            className="flex-1 flex items-center bg-surface rounded-2xl border border-border px-4 py-3 min-h-12"
            style={{ borderColor: input ? '#1A2B5E' : '#E8EAF0' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Ask about investments, markets, savings…"
              className="flex-1 bg-transparent text-sm text-navy placeholder-muted outline-none font-medium"
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
            style={{ background: input.trim() ? '#1A2B5E' : '#E8EAF0' }}
          >
            <ArrowUpRight size={18} style={{ color: input.trim() ? '#fff' : '#9CA3AF' }} />
          </button>
        </div>
        <p className="text-center text-xs text-muted mt-2">
          Advisory only · Not a registered investment platform
        </p>
      </div>
    </div>
  )
}
