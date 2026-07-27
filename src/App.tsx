import { useState } from 'react'
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import AnalysisScreen from './screens/AnalysisScreen'
import PortfolioScreen from './screens/PortfolioScreen'
import ProfileScreen from './screens/ProfileScreen'
import BottomNav, { type NavTab } from './components/BottomNav'

type Screen = 'splash' | 'onboarding' | 'auth' | 'app'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [tab, setTab] = useState<NavTab>('home')
  const [userName, setUserName] = useState('')
  const [chatPrompt, setChatPrompt] = useState<string | undefined>()
  const [animating, setAnimating] = useState(false)

  function transition(to: Screen) {
    setAnimating(true)
    setTimeout(() => {
      setScreen(to)
      setAnimating(false)
    }, 180)
  }

  function handleAuth(name: string) {
    setUserName(name)
    transition('app')
  }

  function handleLogout() {
    setUserName('')
    setChatPrompt(undefined)
    transition('auth')
  }

  function openChat(prompt?: string) {
    setChatPrompt(prompt)
    setTab('chat')
  }

  function handleTabChange(t: NavTab) {
    if (t !== 'chat') setChatPrompt(undefined)
    setTab(t)
  }

  return (
    <div className="min-h-screen bg-[#DDE3EF] flex items-center justify-center">
      {/* Phone shell */}
      <div
        className="relative bg-surface overflow-hidden"
        style={{
          width: '100%',
          maxWidth: 430,
          height: '100dvh',
          maxHeight: 900,
          borderRadius: window.innerWidth > 430 ? 40 : 0,
          boxShadow: window.innerWidth > 430 ? '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        {/* Screen content */}
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{ opacity: animating ? 0 : 1 }}
        >
          {screen === 'splash' && (
            <SplashScreen onDone={() => transition('onboarding')} />
          )}
          {screen === 'onboarding' && (
            <OnboardingScreen onDone={() => transition('auth')} />
          )}
          {screen === 'auth' && (
            <AuthScreen onAuth={handleAuth} />
          )}
          {screen === 'app' && (
            <>
              <div className="absolute inset-0 overflow-hidden">
                {tab === 'home' && (
                  <HomeScreen userName={userName} onAskAI={openChat} />
                )}
                {tab === 'chat' && (
                  <ChatScreen key={chatPrompt || 'empty'} initialPrompt={chatPrompt} />
                )}
                {tab === 'analysis' && (
                  <AnalysisScreen onAskAI={openChat} />
                )}
                {tab === 'portfolio' && (
                  <PortfolioScreen onAskAI={openChat} />
                )}
                {tab === 'profile' && (
                  <ProfileScreen userName={userName} onLogout={handleLogout} />
                )}
              </div>
              <BottomNav active={tab} onChange={handleTabChange} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
