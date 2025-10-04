/**
 * AURA-C PITWALL - AI-Powered F1 Fan Engagement Platform
 * 
 * Dynamic Features Implemented:
 * - Interactive hover effects on all feature cards
 * - Live updating metrics and progress bars
 * - Clickable NFT badges with selection states
 * - Real-time ESG impact tracking with auto-incrementing values
 * - Interactive voting system for sustainability initiatives
 * - Live race telemetry simulation with pause/play controls
 * - Dynamic VR moment selection with visual feedback
 * - Animated counters and progress indicators throughout
 * - Smooth transitions and pulse animations on active elements
 */

import { useState, useEffect, useRef } from 'react'
import './App.css'
import AvatarModal from './components/AvatarModal'

function App() {
  const [activeFeature, setActiveFeature] = useState('home')
  const [avatarOpen, setAvatarOpen] = useState(false)

  const features = [
    { id: 'home', name: 'Home', icon: '🏁' },
    { id: 'nft', name: 'NFT Rewards', icon: '🏆' },
    { id: 'esg', name: 'ESG Impact', icon: '🌱' },
    { id: 'haptic', name: 'Race Sync', icon: '⚡' },
    { id: 'vr', name: 'Time Travel', icon: '🕰️' },
    { id: 'commentary', name: 'AI Commentary', icon: '🎙️' },
    { id: 'copilot', name: 'Co-Pilot', icon: '🤝' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950 w-full overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-red-500/30 backdrop-blur-sm bg-black/50 sticky top-0 z-50 w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl sm:text-4xl">🏎️</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  AURA-C PITWALL
                </h1>
                <p className="text-xs text-gray-400">AI-Powered F1 Fan Engagement Platform</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400 text-xs sm:text-sm font-semibold cursor-pointer">🌱 ESG Active</span>
              </div>
              <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg">
                <button onClick={() => setAvatarOpen(true)} className="text-blue-400 text-xs sm:text-sm font-semibold cursor-pointer">🤖 AI AVATAR</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/30 backdrop-blur-sm sticky top-[89px] sm:top-[73px] z-40 w-full shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {features.map(feature => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 text-sm ${
                  activeFeature === feature.id
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/50'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full box-border">
        {activeFeature === 'home' && <HomeView />}
        {activeFeature === 'nft' && <NFTRewardsView />}
        {activeFeature === 'esg' && <ESGImpactView />}
        {activeFeature === 'haptic' && <RaceSyncView />}
        {activeFeature === 'vr' && <VRTimeTravelView />}
        {activeFeature === 'commentary' && <AICommentaryView />}
        {activeFeature === 'copilot' && <CoPilotView />}
      </main>

  <AvatarModal open={avatarOpen} onClose={() => setAvatarOpen(false)} avatarUrl={null} />

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 mt-16 w-full shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <p className="text-gray-500 text-sm">AURA-C PITWALL © 2025 | Revolutionizing F1 Fan Experience with AI & Sustainability</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
              <span>🏆 10M+ Active Fans</span>
              <span>🌱 2.5M Tons CO₂ Offset</span>
              <span>🎯 500K+ NFTs Earned</span>
              <span>⚡ Real-time AI Analytics</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Home View Component
function HomeView() {
  const [activeFans, setActiveFans] = useState(10000000)
  const [nftsEarned, setNftsEarned] = useState(500000)
  const [co2Offset, setCo2Offset] = useState(2.5)
  const [aiAccuracy, setAiAccuracy] = useState(98.7)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFans(prev => prev + Math.floor(Math.random() * 100))
      setNftsEarned(prev => prev + Math.floor(Math.random() * 10))
      setCo2Offset(prev => Math.min(prev + 0.001, 3.0))
      setAiAccuracy(prev => Math.min(prev + 0.001, 99.5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  
  const showAlert = (message) => {
    setNotificationText(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }
  
  return (
    <div className="space-y-10 w-full relative">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-6 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <span className="font-semibold">{notificationText}</span>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center shadow-2xl" style={{background: 'linear-gradient(to right, #229971, #1a7a5a, #229971)'}}>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">Welcome to the Future of F1</h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            AURA-C PITWALL revolutionizes Formula 1 fan engagement through AI-powered predictions, 
            NFT rewards, and measurable ESG impact. Join millions of fans shaping the future of motorsport.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <button 
              onClick={() => showAlert('🎮 Quick Start Guide Launched!')}
              className="px-6 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              🚀 Get Started
            </button>
            <button 
              onClick={() => showAlert('📺 Live Race Feed Connected!')}
              className="px-6 py-3 bg-black/30 text-white border-2 border-white rounded-lg font-bold hover:bg-black/50 transition-all hover:scale-105"
            >
              🔴 Watch Live
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all cursor-pointer hover:scale-105">
              <div className="text-2xl sm:text-3xl font-bold text-white animate-pulse">{(activeFans / 1000000).toFixed(1)}M+</div>
              <div className="text-xs sm:text-sm text-white/80">Active Fans</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all cursor-pointer hover:scale-105">
              <div className="text-2xl sm:text-3xl font-bold text-white animate-pulse">{(nftsEarned / 1000).toFixed(0)}K+</div>
              <div className="text-xs sm:text-sm text-white/80">NFTs Earned</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all cursor-pointer hover:scale-105">
              <div className="text-2xl sm:text-3xl font-bold text-white animate-pulse">{co2Offset.toFixed(1)}M</div>
              <div className="text-xs sm:text-sm text-white/80">Tons CO₂ Offset</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all cursor-pointer hover:scale-105">
              <div className="text-2xl sm:text-3xl font-bold text-white animate-pulse">{aiAccuracy.toFixed(1)}%</div>
              <div className="text-xs sm:text-sm text-white/80">AI Accuracy</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all cursor-pointer hover:scale-105 col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-white">A+</div>
              <div className="text-xs sm:text-sm text-white/80">FIA Green Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-700 w-full shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button 
            onClick={() => showAlert('🎯 Prediction Challenge Started!')}
            className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-xl hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
          >
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-white font-bold text-sm">Make Prediction</div>
          </button>
          <button 
            onClick={() => showAlert('🏆 NFT Rewards Panel Opened!')}
            className="bg-gradient-to-br from-yellow-600 to-orange-600 p-6 rounded-xl hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
          >
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-white font-bold text-sm">Claim NFT</div>
          </button>
          <button 
            onClick={() => showAlert('🌱 ESG Impact Dashboard Loaded!')}
            className="bg-gradient-to-br from-green-600 to-emerald-600 p-6 rounded-xl hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
          >
            <div className="text-4xl mb-2">🌱</div>
            <div className="text-white font-bold text-sm">Track Impact</div>
          </button>
          <button 
            onClick={() => showAlert('🥽 VR Experience Loading...')}
            className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
          >
            <div className="text-4xl mb-2">🥽</div>
            <div className="text-white font-bold text-sm">Launch VR</div>
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        <FeatureCard
          icon="🏆"
          title="NFT Prediction Rewards"
          description="Earn exclusive NFT badges through race predictions and fan engagement. Progress from Rookie to Legendary status, unlock VIP paddock access, limited merchandise, and exclusive team content. Blockchain-verified achievements with real-world benefits."
          gradient="from-yellow-500 to-orange-600"
        />
        <FeatureCard
          icon="🌱"
          title="ESG Strategic Impact"
          description="Every prediction, quiz, and VR session contributes to carbon offset initiatives. Track your environmental impact with real-time metrics: trees planted, renewable energy supported, and CO₂ neutralized. Vote on F1 sustainability policies and earn Green Pioneer badges."
          gradient="from-green-500 to-emerald-600"
        />
        <FeatureCard
          icon="⚡"
          title="Neuro-Haptic Race Sync"
          description="Experience races like never before with multi-sensory feedback. Feel G-forces during corners, vibrations from engine RPM, and temperature changes in the cockpit. Sync with gaming controllers, smartwatches, and racing seats for ultimate immersion."
          gradient="from-blue-500 to-purple-600"
        />
        <FeatureCard
          icon="🕰️"
          title="Memory Forge VR"
          description="Travel through F1 history in immersive VR. Relive Senna vs Prost (1988), Hamilton's first title (2008), and the Abu Dhabi 2021 finale. Sit in legendary cockpits: McLaren MP4/4, Ferrari F2004, Red Bull RB9. 360° 4K quality experiences."
          gradient="from-purple-500 to-pink-600"
        />
        <FeatureCard
          icon="🎙️"
          title="AI Commentary"
          description="AURA, your personal AI commentator, delivers real-time race analysis tailored to your preferences. Get predictive insights on pit strategies, overtake probabilities, and weather impacts. Choose from professional, casual, or data-driven commentary styles with 98.7% prediction accuracy."
          gradient="from-red-500 to-pink-600"
        />
        <FeatureCard
          icon="🤝"
          title="Global Co-Pilot"
          description="Join 2.8M+ fans in real-time collaborative strategy sessions. Vote on team decisions, share race insights, and compete on global leaderboards. Top co-pilots achieve 98.5% prediction accuracy and influence actual team strategies through collective intelligence."
          gradient="from-cyan-500 to-blue-600"
        />
      </div>
    </div>
  )
}

// NFT Rewards View
function NFTRewardsView() {
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [progress, setProgress] = useState(65)
  
  const badges = [
    { name: 'Green Pioneer', level: 'Legendary', rarity: 'Ultra Rare', points: 15000, icon: '🌟', color: 'from-yellow-400 to-orange-500' },
    { name: 'Prediction Master', level: 'Pro', rarity: 'Rare', points: 8500, icon: '🎯', color: 'from-blue-400 to-purple-500' },
    { name: 'Race Prophet', level: 'Pro', rarity: 'Rare', points: 7200, icon: '🔮', color: 'from-purple-400 to-pink-500' },
    { name: 'Eco Warrior', level: 'Rookie', rarity: 'Common', points: 2500, icon: '🌿', color: 'from-green-400 to-emerald-500' }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 65 : prev + 0.5))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-10 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">NFT Prediction Reward Engine</h2>
        <p className="text-gray-400 text-sm sm:text-base">Earn, Collect, and Unlock Exclusive Access</p>
      </div>

      {/* Progress Tracker */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-700 w-full shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Your Journey</h3>
        <div className="w-full mb-4">
          <div className="w-full">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Rookie</span>
              <span>Pro</span>
              <span>Legendary</span>
            </div>
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 rounded-full transition-all duration-300 animate-pulse" style={{width: `${progress}%`}}></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 w-full">
          <div className="bg-black/50 p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">🥉</div>
            <div className="text-sm text-gray-400">Current Level</div>
            <div className="text-xl font-bold text-white">Pro</div>
          </div>
          <div className="bg-black/50 p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-sm text-gray-400">Total Points</div>
            <div className="text-xl font-bold text-yellow-400">33,200</div>
          </div>
          <div className="bg-black/50 p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-sm text-gray-400">NFTs Owned</div>
            <div className="text-xl font-bold text-orange-400">24</div>
          </div>
        </div>
      </div>

      {/* NFT Collection */}
      <div className="w-full">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Your NFT Collection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {badges.map((badge, idx) => (
            <div 
              key={idx} 
              className={`bg-gray-800 rounded-xl overflow-hidden border transition-all duration-300 hover:scale-105 cursor-pointer ${selectedBadge === idx ? 'border-orange-500 shadow-2xl shadow-orange-500/50' : 'border-gray-700 hover:border-orange-500'}`}
              onClick={() => setSelectedBadge(selectedBadge === idx ? null : idx)}
            >
              <div className={`h-32 bg-gradient-to-br ${badge.color} flex items-center justify-center relative overflow-hidden`}>
                <div className={`text-6xl transition-transform duration-300 ${selectedBadge === idx ? 'scale-125 rotate-12' : ''}`}>{badge.icon}</div>
                {selectedBadge === idx && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white">{badge.name}</h4>
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded animate-pulse">{badge.rarity}</span>
                </div>
                <div className="text-sm text-gray-400 mb-3">Level: {badge.level}</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Points</span>
                  <span className="text-sm font-bold text-yellow-400">{badge.points.toLocaleString()}</span>
                </div>
                {selectedBadge === idx && (
                  <button className="mt-3 w-full py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg text-sm font-semibold hover:from-orange-700 hover:to-red-700 transition-all">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusive Access */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 sm:p-8 border border-purple-500/30 w-full shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">🔓 Unlocked Exclusive Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="text-2xl mb-2">🎫</div>
            <div className="font-semibold text-white">VIP Paddock Pass</div>
            <div className="text-sm text-gray-400 mt-1">Virtual access to team garages</div>
          </div>
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="text-2xl mb-2">👕</div>
            <div className="font-semibold text-white">Limited Merch</div>
            <div className="text-sm text-gray-400 mt-1">Exclusive team merchandise</div>
          </div>
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="text-2xl mb-2">🎮</div>
            <div className="font-semibold text-white">Early Features</div>
            <div className="text-sm text-gray-400 mt-1">Beta access to new tools</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ESG Impact View
function ESGImpactView() {
  const [carbonOffset, setCarbonOffset] = useState(2.4)
  const [treesPlanted, setTreesPlanted] = useState(48)
  const [renewableEnergy, setRenewableEnergy] = useState(320)
  const [votingStatus, setVotingStatus] = useState({ biofuel: true, zeroWaste: false, carbonNeutral: false })
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonOffset(prev => Math.min(prev + 0.01, 3.5))
      setTreesPlanted(prev => Math.min(prev + 1, 75))
      setRenewableEnergy(prev => Math.min(prev + 2, 500))
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="space-y-10 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">ESG Strategic Integration Engine</h2>
        <p className="text-gray-400 text-sm sm:text-base">Your Actions Drive Real Environmental Impact</p>
      </div>

      {/* Impact Pipeline */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 sm:p-8 border border-green-500/30 w-full shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Impact Pipeline</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          <div className="text-center">
            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-blue-500">
              <span className="text-2xl">👤</span>
            </div>
            <div className="font-semibold text-white">Fan Action</div>
            <div className="text-xs text-gray-400 mt-1">Predictions, Quizzes, VR Sessions</div>
          </div>
          <div className="text-center">
            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-purple-500">
              <span className="text-2xl">📊</span>
            </div>
            <div className="font-semibold text-white">Metrics</div>
            <div className="text-xs text-gray-400 mt-1">Track engagement & impact</div>
          </div>
          <div className="text-center">
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-green-500">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="font-semibold text-white">ESG Contribution</div>
            <div className="text-xs text-gray-400 mt-1">Carbon offset, sustainability</div>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-yellow-500">
              <span className="text-2xl">💼</span>
            </div>
            <div className="font-semibold text-white">Business Impact</div>
            <div className="text-xs text-gray-400 mt-1">FIA ratings, brand value</div>
          </div>
        </div>
      </div>

      {/* Impact Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Your Environmental Impact</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Carbon Offset</span>
                <span className="text-green-400 font-bold animate-pulse">{carbonOffset.toFixed(2)} tons CO₂</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500" style={{width: `${(carbonOffset / 3.5) * 100}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Trees Planted</span>
                <span className="text-green-400 font-bold animate-pulse">{treesPlanted} trees</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500" style={{width: `${(treesPlanted / 75) * 100}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Renewable Energy</span>
                <span className="text-green-400 font-bold animate-pulse">{renewableEnergy} kWh</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500" style={{width: `${(renewableEnergy / 500) * 100}%`}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Sustainability Voting Rights</h3>
          <div className="space-y-3">
            <div 
              className={`bg-gray-900 p-4 rounded-lg cursor-pointer transition-all ${votingStatus.biofuel ? 'border-l-4 border-green-500' : 'hover:bg-gray-800'}`}
              onClick={() => setVotingStatus({...votingStatus, biofuel: !votingStatus.biofuel})}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Biofuel Adoption</span>
                <span className={`text-sm ${votingStatus.biofuel ? 'text-green-400' : 'text-gray-400'}`}>
                  {votingStatus.biofuel ? '✓ Voted' : 'Click to Vote'}
                </span>
              </div>
              <div className="text-xs text-gray-400">Support 100% sustainable fuel by 2026</div>
            </div>
            <div 
              className={`bg-gray-900 p-4 rounded-lg cursor-pointer transition-all ${votingStatus.zeroWaste ? 'border-l-4 border-yellow-500' : 'hover:bg-gray-800'}`}
              onClick={() => setVotingStatus({...votingStatus, zeroWaste: !votingStatus.zeroWaste})}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Zero Waste Circuits</span>
                <span className={`text-sm ${votingStatus.zeroWaste ? 'text-yellow-400 animate-pulse' : 'text-gray-400'}`}>
                  {votingStatus.zeroWaste ? '⏳ Active' : 'Click to Vote'}
                </span>
              </div>
              <div className="text-xs text-gray-400">Eliminate single-use plastics at all venues</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg opacity-50 cursor-not-allowed">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Carbon Neutral Teams</span>
                <span className="text-gray-500 text-sm">🔒 Locked</span>
              </div>
              <div className="text-xs text-gray-400">Requires Pro level to unlock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Metrics */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-700 w-full shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Impact Comparison</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full">
          <div>
            <h4 className="text-lg font-semibold text-red-400 mb-4">❌ Before AURA-C</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Limited fan engagement tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">No measurable ESG contribution</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Zero carbon offset initiatives</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">No sustainability voting power</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-4">✓ After AURA-C</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">2.5M tons CO₂ offset globally</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">500K+ fans actively contributing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">FIA Green Rating: A+ achieved</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Democratic sustainability decisions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIA Green Rating */}
      <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 rounded-2xl p-6 sm:p-8 border border-green-500/30 text-center w-full shadow-2xl">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-3xl font-bold text-white mb-2">FIA Green Rating: A+</h3>
        <p className="text-green-400 text-lg">Industry-leading sustainability performance</p>
        <div className="mt-6 flex justify-center gap-8">
          <div>
            <div className="text-3xl font-bold text-white">98%</div>
            <div className="text-sm text-gray-400">Carbon Neutrality</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">15M</div>
            <div className="text-sm text-gray-400">Trees Planted</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-400">Renewable Energy</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Race Sync View
function RaceSyncView() {
  const [currentLap, setCurrentLap] = useState(45)
  const [speed, setSpeed] = useState(287)
  const [throttle, setThrottle] = useState(94)
  const [brake, setBrake] = useState(12)
  const [heartRate, setHeartRate] = useState(168)
  const [isLive, setIsLive] = useState(true)
  
  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setSpeed(prev => 200 + Math.random() * 120)
      setThrottle(prev => Math.random() * 100)
      setBrake(prev => Math.random() * 30)
      setHeartRate(prev => 150 + Math.random() * 40)
      if (Math.random() > 0.95) setCurrentLap(prev => Math.min(prev + 1, 78))
    }, 1000)
    return () => clearInterval(interval)
  }, [isLive])
  
  return (
    <div className="space-y-10 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Neuro-Haptic Race Sync</h2>
        <p className="text-gray-400 text-sm sm:text-base">Feel Every Moment of the Race</p>
      </div>

      {/* Live Race Simulation */}
      <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-6 sm:p-8 border border-red-500/30 w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">🔴 LIVE: Monaco Grand Prix</h3>
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${isLive ? 'bg-red-600 animate-pulse' : 'bg-gray-600'}`}
            >
              <span className="text-white">{isLive ? `LAP ${currentLap}/78` : 'PAUSED'}</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="bg-black/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Sensory Feedback Active</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">💨 G-Force Simulation</span>
                <span className="text-green-400 font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">🎵 Engine Audio Sync</span>
                <span className="text-green-400 font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">📳 Vibration Haptics</span>
                <span className="text-green-400 font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">🌡️ Temperature Feedback</span>
                <span className="text-yellow-400 font-bold">STANDBY</span>
              </div>
            </div>
          </div>

          <div className="bg-black/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Driver Telemetry</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Speed</span>
                  <span className="text-white font-bold animate-pulse">{Math.round(speed)} km/h</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300" style={{width: `${(speed / 340) * 100}%`}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Throttle</span>
                  <span className="text-white font-bold animate-pulse">{Math.round(throttle)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300" style={{width: `${throttle}%`}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Brake Pressure</span>
                  <span className="text-white font-bold animate-pulse">{Math.round(brake)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-300" style={{width: `${brake}%`}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Heart Rate</span>
                  <span className="text-white font-bold animate-pulse">{Math.round(heartRate)} BPM</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse transition-all duration-300" style={{width: `${(heartRate / 200) * 100}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Haptic Events */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Recent Haptic Events</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border-l-4 border-red-500">
            <span className="text-2xl">⚡</span>
            <div className="flex-1">
              <div className="font-semibold text-white">Hard Braking - Turn 1</div>
              <div className="text-sm text-gray-400">Intense vibration feedback</div>
            </div>
            <span className="text-xs text-gray-500">2s ago</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border-l-4 border-yellow-500">
            <span className="text-2xl">🏎️</span>
            <div className="flex-1">
              <div className="font-semibold text-white">DRS Activated</div>
              <div className="text-sm text-gray-400">Speed surge sensation</div>
            </div>
            <span className="text-xs text-gray-500">8s ago</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border-l-4 border-blue-500">
            <span className="text-2xl">🌀</span>
            <div className="flex-1">
              <div className="font-semibold text-white">Chicane Navigation</div>
              <div className="text-sm text-gray-400">Lateral G-force simulation</div>
            </div>
            <span className="text-xs text-gray-500">15s ago</span>
          </div>
        </div>
      </div>

      {/* Device Connection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30 text-center">
          <div className="text-4xl mb-3">🎮</div>
          <h4 className="font-bold text-white mb-2">Gaming Controller</h4>
          <div className="text-green-400 text-sm">✓ Connected</div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border border-blue-500/30 text-center">
          <div className="text-4xl mb-3">⌚</div>
          <h4 className="font-bold text-white mb-2">Smart Watch</h4>
          <div className="text-green-400 text-sm">✓ Connected</div>
        </div>
        <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-xl p-6 border border-orange-500/30 text-center">
          <div className="text-4xl mb-3">🪑</div>
          <h4 className="font-bold text-white mb-2">Racing Seat</h4>
          <div className="text-yellow-400 text-sm">⏳ Pairing...</div>
        </div>
      </div>
    </div>
  )
}

// VR Time Travel View
function VRTimeTravelView() {
  const [selectedMoment, setSelectedMoment] = useState(null)
  const [vrExperiences, setVrExperiences] = useState(127)
  const [vrTime, setVrTime] = useState(45)
  const [isVRActive, setIsVRActive] = useState(false)
  const [isARActive, setIsARActive] = useState(false)
  const [vrProgress, setVrProgress] = useState(0)
  const [selectedCar, setSelectedCar] = useState(null)
  
  const historicMoments = [
    { year: 1988, title: "Senna vs Prost", location: "Monaco", icon: "🏆", color: "from-yellow-500 to-orange-600" },
    { year: 2008, title: "Hamilton's First Title", location: "Brazil", icon: "👑", color: "from-green-500 to-emerald-600" },
    { year: 2013, title: "Vettel's Dominance", location: "India", icon: "⚡", color: "from-blue-500 to-purple-600" },
    { year: 2021, title: "Abu Dhabi Finale", location: "Yas Marina", icon: "🔥", color: "from-red-500 to-pink-600" }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVrExperiences(prev => Math.min(prev + 1, 200))
      setVrTime(prev => Math.min(prev + 0.5, 100))
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  const launchVR = (momentIndex) => {
    setIsVRActive(true)
    setVrProgress(0)
    const interval = setInterval(() => {
      setVrProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }
  
  const launchAR = (carName) => {
    setIsARActive(true)
    setSelectedCar(carName)
    setTimeout(() => setIsARActive(false), 5000)
  }

  return (
    <div className="space-y-10 w-full relative">
      {/* VR Loading Overlay */}
      {isVRActive && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-lg">
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce">🥽</div>
            <h3 className="text-3xl font-bold text-white">Entering VR Experience...</h3>
            <div className="w-96 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                style={{width: `${vrProgress}%`}}
              ></div>
            </div>
            <p className="text-gray-400">{vrProgress}% Complete</p>
            {vrProgress === 100 && (
              <div className="space-y-4">
                <p className="text-green-400 text-xl font-bold animate-pulse">✓ VR Ready!</p>
                <button 
                  onClick={() => setIsVRActive(false)}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-bold hover:from-red-700 hover:to-orange-700"
                >
                  Exit VR
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* AR Overlay */}
      {isARActive && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-6xl animate-pulse">📱</div>
            <h3 className="text-3xl font-bold text-white">AR Mode Active</h3>
            <p className="text-xl text-cyan-400">Viewing: {selectedCar}</p>
            <div className="text-gray-400">Point your device at a flat surface</div>
            <div className="flex gap-4 justify-center mt-6">
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                📸 Capture
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                🔄 Rotate
              </button>
              <button 
                onClick={() => setIsARActive(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                ✕ Exit AR
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Memory Forge & VR Time Traveller</h2>
        <p className="text-gray-400 text-sm sm:text-base">Relive Iconic F1 Moments</p>
      </div>

      {/* VR Experience Selector */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 sm:p-8 border border-purple-500/30 w-full shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Choose Your Experience</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="bg-black/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer">
            <div className="text-4xl mb-4">🕰️</div>
            <h4 className="text-xl font-bold text-white mb-2">Historic Moments</h4>
            <p className="text-gray-400 text-sm mb-4">Experience legendary races from F1 history in immersive VR</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">VR Ready</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">4K Quality</span>
            </div>
          </div>
          <div className="bg-black/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer">
            <div className="text-4xl mb-4">🏎️</div>
            <h4 className="text-xl font-bold text-white mb-2">Classic Cockpits</h4>
            <p className="text-gray-400 text-sm mb-4">Sit in legendary F1 cars and feel the authentic driving experience</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">AR Compatible</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">360° View</span>
            </div>
          </div>
        </div>
      </div>

      {/* Historic Moments Gallery */}
      <div className="w-full">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Iconic Moments Library</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {historicMoments.map((moment, idx) => (
            <div 
              key={idx} 
              className={`bg-gray-800 rounded-xl overflow-hidden border transition-all duration-300 hover:scale-105 cursor-pointer ${selectedMoment === idx ? 'border-purple-500 shadow-2xl shadow-purple-500/50 scale-105' : 'border-gray-700 hover:border-orange-500'}`}
              onClick={() => setSelectedMoment(selectedMoment === idx ? null : idx)}
            >
              <div className={`h-32 bg-gradient-to-br ${moment.color} flex items-center justify-center relative overflow-hidden`}>
                <div className={`text-6xl transition-all duration-300 ${selectedMoment === idx ? 'scale-125 animate-pulse' : ''}`}>{moment.icon}</div>
                {selectedMoment === idx && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-400 mb-1">{moment.year}</div>
                <h4 className="font-bold text-white mb-1">{moment.title}</h4>
                <div className="text-sm text-gray-500">{moment.location}</div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    if (selectedMoment === idx) launchVR(idx)
                  }}
                  className={`mt-3 w-full py-2 rounded-lg text-sm font-semibold transition-all ${selectedMoment === idx ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 animate-pulse' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'} text-white`}
                >
                  {selectedMoment === idx ? '🥽 Launch VR Experience' : 'Select & Enter VR'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classic Cars */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full">
        <h3 className="text-xl font-bold text-white mb-6">Classic Cockpit Collection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-3xl mb-2">🏎️</div>
            <div className="font-semibold text-white">McLaren MP4/4</div>
            <div className="text-sm text-gray-400 mt-1">Senna's Championship Car (1988)</div>
            <div className="mt-3 flex gap-2">
              <button 
                onClick={() => launchVR(0)}
                className="flex-1 py-2 bg-purple-600 text-white rounded text-xs font-semibold hover:bg-purple-700 transition-all hover:scale-105"
              >
                🥽 VR View
              </button>
              <button 
                onClick={() => launchAR('McLaren MP4/4')}
                className="flex-1 py-2 bg-cyan-600 text-white rounded text-xs font-semibold hover:bg-cyan-700 transition-all hover:scale-105"
              >
                📱 AR Mode
              </button>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-3xl mb-2">🏎️</div>
            <div className="font-semibold text-white">Ferrari F2004</div>
            <div className="text-sm text-gray-400 mt-1">Schumacher's Dominant Era (2004)</div>
            <div className="mt-3 flex gap-2">
              <button 
                onClick={() => launchVR(1)}
                className="flex-1 py-2 bg-purple-600 text-white rounded text-xs font-semibold hover:bg-purple-700 transition-all hover:scale-105"
              >
                🥽 VR View
              </button>
              <button 
                onClick={() => launchAR('Ferrari F2004')}
                className="flex-1 py-2 bg-cyan-600 text-white rounded text-xs font-semibold hover:bg-cyan-700 transition-all hover:scale-105"
              >
                📱 AR Mode
              </button>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-3xl mb-2">🏎️</div>
            <div className="font-semibold text-white">Red Bull RB9</div>
            <div className="text-sm text-gray-400 mt-1">Vettel's Record Season (2013)</div>
            <div className="mt-3 flex gap-2">
              <button 
                onClick={() => launchVR(2)}
                className="flex-1 py-2 bg-purple-600 text-white rounded text-xs font-semibold hover:bg-purple-700 transition-all hover:scale-105"
              >
                🥽 VR View
              </button>
              <button 
                onClick={() => launchAR('Red Bull RB9')}
                className="flex-1 py-2 bg-cyan-600 text-white rounded text-xs font-semibold hover:bg-cyan-700 transition-all hover:scale-105"
              >
                📱 AR Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VR Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30 text-center">
          <div className="text-3xl font-bold text-white mb-1 animate-pulse">{vrExperiences}</div>
          <div className="text-sm text-gray-400">Moments Experienced</div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border border-blue-500/30 text-center">
          <div className="text-3xl font-bold text-white mb-1 animate-pulse">{Math.round(vrTime)}h</div>
          <div className="text-sm text-gray-400">VR Time Logged</div>
        </div>
        <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-xl p-6 border border-orange-500/30 text-center">
          <div className="text-3xl font-bold text-white mb-1">23</div>
          <div className="text-sm text-gray-400">Cars Explored</div>
        </div>
        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-500/30 text-center">
          <div className="text-3xl font-bold text-white mb-1">98%</div>
          <div className="text-sm text-gray-400">Immersion Score</div>
        </div>
      </div>
    </div>
  )
}

// AI Commentary View
function AICommentaryView() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(false)
  const [speechRate, setSpeechRate] = useState(1.2)
  const [voiceVolume, setVoiceVolume] = useState(1)
  const [commentary, setCommentary] = useState([])
  const [isLive, setIsLive] = useState(false)
  const commentaryEndRef = useRef(null)

  // All possible commentary updates
  const allCommentaryUpdates = [
    { text: "Race start! Lights out and away we go! Verstappen gets a great launch from pole position!", color: "red" },
    { text: "Verstappen is showing incredible pace through Sector 2. Based on his current tire degradation and fuel load, I predict he'll pit within the next 3 laps.", color: "blue" },
    { text: "Hamilton is closing the gap! The DRS zone is coming up, and with his superior straight-line speed, an overtake attempt is highly likely.", color: "purple" },
    { text: "Weather update: Light rain detected 5km from the circuit. Teams are preparing wet weather strategies. This could shake up the entire race!", color: "green" },
    { text: "Leclerc sets the fastest lap! That's a 1:23.456, absolutely blistering pace from the Ferrari driver!", color: "yellow" },
    { text: "Pit stop for Verstappen! Red Bull crew executes a 2.3 second stop - that's championship-winning speed!", color: "orange" },
    { text: "Sainz is under investigation for track limits violation at Turn 4. Stewards reviewing the incident now.", color: "red" },
    { text: "Virtual Safety Car deployed! Debris on track at Turn 7. This could shake up the strategy completely!", color: "yellow" },
    { text: "Hamilton makes his move! Brilliant overtake into Turn 1, he's now up to P2!", color: "cyan" },
    { text: "Tire temperature analysis shows medium compounds performing better than expected. Teams adjusting strategies accordingly.", color: "blue" },
    { text: "Perez reports gearbox issues! Red Bull engineers working on a solution. This could be critical for his race.", color: "red" },
    { text: "Norris is flying! Setting purple sectors left and right. McLaren looking strong in the midfield battle.", color: "orange" },
    { text: "Safety Car is out! Incident between Alonso and Stroll at Turn 12. Both cars appear to be okay.", color: "yellow" },
    { text: "Race control announces 5-second penalty for Magnussen for unsafe release. Haas team not happy with that decision.", color: "red" },
    { text: "Verstappen extends his lead to 8.5 seconds! Absolutely dominant performance from the championship leader.", color: "blue" },
    { text: "Hamilton's engineer: 'Box box, box box!' Mercedes calling him in for fresh rubber.", color: "cyan" },
    { text: "Track evolution is significant! Lap times dropping by half a second as more rubber goes down.", color: "green" },
    { text: "Albon makes an incredible save! Massive oversteer through the chicane but he keeps it on track. Brilliant car control!", color: "purple" },
    { text: "Final 10 laps! This is where the race really begins. Tire management will be crucial now.", color: "red" },
    { text: "Leclerc is hunting down Hamilton! Gap down to 1.2 seconds and he's got DRS. This could be spectacular!", color: "yellow" }
  ]

  // Start live commentary
  const startLiveCommentary = () => {
    setIsLive(true)
    setCommentary([])
    let index = 0
    
    const interval = setInterval(() => {
      if (index < allCommentaryUpdates.length) {
        const newUpdate = {
          ...allCommentaryUpdates[index],
          time: "Just now",
          id: Date.now() + index
        }
        
        setCommentary(prev => {
          const updated = [...prev, newUpdate]
          // Auto-speak if enabled
          if (autoSpeak) {
            speak(newUpdate.text)
          }
          return updated
        })
        
        index++
      } else {
        clearInterval(interval)
        setIsLive(false)
      }
    }, 3000) // New update every 3 seconds

    return () => clearInterval(interval)
  }

  // Stop live commentary
  const stopLiveCommentary = () => {
    setIsLive(false)
  }

  // Auto-scroll to bottom when new commentary arrives
  useEffect(() => {
    if (commentaryEndRef.current) {
      commentaryEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [commentary])

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = speechRate // Fast speech rate
      utterance.pitch = 1.1
      utterance.volume = voiceVolume
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    } else {
      alert('Text-to-speech is not supported in your browser.')
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const speakAll = () => {
    const allText = commentary.map(c => c.text).join('. ')
    speak(allText)
  }

  return (
    <div className="space-y-10 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Interactive AI Commentary & Prediction</h2>
        <p className="text-gray-400 text-sm sm:text-base">Personalized Race Analysis Powered by AI with Voice</p>
      </div>

      {/* Live Commentary with TTS */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 sm:p-8 border border-blue-500/30 w-full shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎙️</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">AI Commentator: AURA</h3>
              <p className="text-sm text-gray-400">Adaptive • Real-time • Voice Enabled</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="px-4 py-2 bg-red-600 rounded-lg animate-pulse">
              <span className="text-white font-bold text-sm">🔴 LIVE</span>
            </div>
            {isSpeaking && (
              <div className="px-4 py-2 bg-green-600 rounded-lg animate-pulse">
                <span className="text-white font-bold text-sm">🔊 Speaking</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Commentary Controls */}
        <div className="bg-black/30 rounded-xl p-4 mb-4">
          <div className="flex flex-wrap gap-3 items-center">
            {!isLive ? (
              <button 
                onClick={startLiveCommentary}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg text-sm font-bold hover:from-red-700 hover:to-orange-700 flex items-center gap-2 animate-pulse"
              >
                <span>▶️</span> Start Live Commentary
              </button>
            ) : (
              <button 
                onClick={stopLiveCommentary}
                className="px-6 py-3 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 flex items-center gap-2"
              >
                <span>⏹️</span> Stop Live Feed
              </button>
            )}

            {commentary.length > 0 && (
              <>
                <button 
                  onClick={speakAll}
                  disabled={isSpeaking || commentary.length === 0}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>🔊</span> Listen to All
                </button>
                
                {isSpeaking && (
                  <button 
                    onClick={stopSpeaking}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center gap-2"
                  >
                    <span>⏹️</span> Stop Voice
                  </button>
                )}
              </>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs text-gray-400">Speed:</label>
              <select 
                value={speechRate} 
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-xs border border-gray-700"
              >
                <option value="0.8">Slow</option>
                <option value="1.0">Normal</option>
                <option value="1.2">Fast</option>
                <option value="1.5">Very Fast</option>
                <option value="2.0">Ultra Fast</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Volume:</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={voiceVolume}
                onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-xs text-gray-400">{Math.round(voiceVolume * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Live Commentary Feed */}
        <div className="bg-black/50 rounded-xl p-6 h-96 overflow-y-auto space-y-4">
          {commentary.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🎙️</div>
              <h4 className="text-xl font-bold text-white mb-2">No Live Commentary Yet</h4>
              <p className="text-gray-400 text-sm">Click "Start Live Commentary" to begin receiving race updates</p>
            </div>
          ) : (
            <>
              {commentary.map((item, idx) => (
                <div key={item.id} className="flex gap-4 group animate-slide-up">
                  <div className={`w-2 h-2 bg-${item.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                  <div className="flex-1">
                    <div className="text-white mb-1">"{item.text}"</div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-gray-500">{item.time}</div>
                      <button 
                        onClick={() => speak(item.text)}
                        disabled={isSpeaking}
                        className="text-xs text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                      >
                        🔊 Listen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={commentaryEndRef} />
            </>
          )}
        </div>

        {isLive && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-semibold">Live Commentary Active - Updates every 3 seconds</span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">Ask AURA</button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-600">Adjust Tone</button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-semibold hover:bg-gray-600">Focus Driver</button>
          <button 
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`px-4 py-2 ${autoSpeak ? 'bg-green-600' : 'bg-gray-700'} text-white rounded-lg text-sm font-semibold hover:opacity-90`}
          >
            {autoSpeak ? '🔊 Auto-Speak ON' : '🔇 Auto-Speak OFF'}
          </button>
        </div>
      </div>

      {/* Prediction Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Race Outcome Predictions</h3>
          <div className="space-y-3">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">🥇 Race Winner</span>
                <span className="text-yellow-400 font-bold">87%</span>
              </div>
              <div className="text-sm text-gray-400">Max Verstappen (Red Bull)</div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" style={{width: '87%'}}></div>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">⚡ Fastest Lap</span>
                <span className="text-blue-400 font-bold">72%</span>
              </div>
              <div className="text-sm text-gray-400">Charles Leclerc (Ferrari)</div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">🏁 Safety Car</span>
                <span className="text-orange-400 font-bold">45%</span>
              </div>
              <div className="text-sm text-gray-400">Probability in next 10 laps</div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Your Predictions</h3>
          <div className="space-y-3">
            <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-green-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Podium Finish</span>
                <span className="text-green-400 text-sm">✓ Correct</span>
              </div>
              <div className="text-sm text-gray-400">Predicted: Verstappen, Hamilton, Leclerc</div>
              <div className="text-xs text-green-400 mt-1">+500 points earned</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Pit Stop Strategy</span>
                <span className="text-yellow-400 text-sm">⏳ Pending</span>
              </div>
              <div className="text-sm text-gray-400">Predicted: 2-stop for Verstappen</div>
              <div className="text-xs text-gray-500 mt-1">Result in 12 laps</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-red-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Overtake Attempt</span>
                <span className="text-red-400 text-sm">✗ Incorrect</span>
              </div>
              <div className="text-sm text-gray-400">Predicted: Hamilton overtakes Lap 32</div>
              <div className="text-xs text-red-400 mt-1">Better luck next time!</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-700 w-full shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">AI Strategic Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <div className="bg-black/50 p-4 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-white mb-2">Tire Strategy Analysis</div>
            <div className="text-sm text-gray-400">Medium compound showing 15% better degradation than predicted. Soft tires viable for final stint.</div>
          </div>
          <div className="bg-black/50 p-4 rounded-lg">
            <div className="text-2xl mb-2">🌤️</div>
            <div className="font-semibold text-white mb-2">Weather Impact</div>
            <div className="text-sm text-gray-400">Track temperature rising 2°C. Expect increased tire wear and potential overheating issues.</div>
          </div>
          <div className="bg-black/50 p-4 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold text-white mb-2">Setup Optimization</div>
            <div className="text-sm text-gray-400">High downforce setup paying dividends in Sector 2. Low-drag teams struggling through corners.</div>
          </div>
        </div>
      </div>

      {/* Personalization Settings */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full">
        <h3 className="text-xl font-bold text-white mb-4">Commentary Preferences</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Commentary Style</label>
            <select className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700">
              <option>Professional & Technical</option>
              <option>Casual & Entertaining</option>
              <option>Data-Driven Analysis</option>
              <option>Beginner Friendly</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Focus Driver</label>
            <select className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700">
              <option>All Drivers</option>
              <option>Max Verstappen</option>
              <option>Lewis Hamilton</option>
              <option>Charles Leclerc</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// Co-Pilot View
function CoPilotView() {
  return (
    <div className="space-y-10 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Global Fan Co-Pilot System</h2>
        <p className="text-gray-400 text-sm sm:text-base">Collaborate with Fans Worldwide</p>
      </div>

      {/* Active Session */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-6 sm:p-8 border border-cyan-500/30 w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">🌍 Active Co-Pilot Session</h3>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-green-600 rounded-lg">
              <span className="text-white font-bold text-sm">2,847 Fans Online</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="bg-black/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Team Strategy Vote</h4>
            <div className="space-y-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm">2-Stop Strategy</span>
                  <span className="text-cyan-400 font-bold">58%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{width: '58%'}}></div>
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm">1-Stop Strategy</span>
                  <span className="text-purple-400 font-bold">42%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{width: '42%'}}></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700">Cast Your Vote</button>
          </div>

          <div className="bg-black/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Live Fan Insights</h4>
            <div className="space-y-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs">MK</div>
                  <span className="text-white text-sm font-semibold">MaxKing47</span>
                </div>
                <div className="text-xs text-gray-400">"Verstappen should pit now before traffic!"</div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-green-400">👍 234</span>
                  <span className="text-xs text-gray-500">2m ago</span>
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-xs">SF</div>
                  <span className="text-white text-sm font-semibold">ScuderiaFan</span>
                </div>
                <div className="text-xs text-gray-400">"Rain incoming! Switch to intermediates?"</div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-green-400">👍 189</span>
                  <span className="text-xs text-gray-500">5m ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Collective Prediction</h4>
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-white mb-1">87%</div>
              <div className="text-sm text-gray-400">Accuracy Rate</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-sm text-white font-semibold mb-1">Next Pit Stop</div>
              <div className="text-xs text-gray-400">Verstappen - Lap 42 (92% confidence)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Leaderboard */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Top Co-Pilots This Season</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500/30">
            <div className="text-3xl">🥇</div>
            <div className="flex-1">
              <div className="font-bold text-white">StrategyMaster99</div>
              <div className="text-sm text-gray-400">15,847 accurate predictions</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-yellow-400">98.5%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
            <div className="text-3xl">🥈</div>
            <div className="flex-1">
              <div className="font-bold text-white">RacingOracle</div>
              <div className="text-sm text-gray-400">14,203 accurate predictions</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-300">97.8%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
            <div className="text-3xl">🥉</div>
            <div className="flex-1">
              <div className="font-bold text-white">F1Prophet</div>
              <div className="text-sm text-gray-400">13,956 accurate predictions</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-orange-400">97.2%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
            <div className="text-2xl">👤</div>
            <div className="flex-1">
              <div className="font-bold text-white">You</div>
              <div className="text-sm text-gray-400">8,432 accurate predictions</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-cyan-400">94.7%</div>
              <div className="text-xs text-gray-400">Rank: #47</div>
            </div>
          </div>
        </div>
      </div>

      {/* Collaboration Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-bold text-white mb-4">Strategy Room</h3>
          <div className="space-y-3">
            <div className="bg-black/30 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">Red Bull Strategy</div>
                <div className="text-xs text-gray-400">847 fans collaborating</div>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold">Join</button>
            </div>
            <div className="bg-black/30 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">Ferrari Tactics</div>
                <div className="text-xs text-gray-400">623 fans collaborating</div>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold">Join</button>
            </div>
            <div className="bg-black/30 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">Mercedes Planning</div>
                <div className="text-xs text-gray-400">512 fans collaborating</div>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold">Join</button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-xl font-bold text-white mb-4">Your Contributions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-white mb-1">1,247</div>
              <div className="text-xs text-gray-400">Insights Shared</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-white mb-1">8,432</div>
              <div className="text-xs text-gray-400">Votes Cast</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-white mb-1">342</div>
              <div className="text-xs text-gray-400">Strategies Created</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-white mb-1">15.2K</div>
              <div className="text-xs text-gray-400">Upvotes Received</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Chat */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Global Fan Chat</h3>
        <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto mb-4 space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-xs font-bold">VR</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">VerstappenRules</span>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
              <div className="text-sm text-gray-300">Max is flying! 🚀 This is going to be an easy win</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">LH</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">LH44Forever</span>
                <span className="text-xs text-gray-500">1m ago</span>
              </div>
              <div className="text-sm text-gray-300">Don't count Hamilton out yet! He's gaining every lap 💪</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold">RP</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">RacePredictor</span>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>
              <div className="text-sm text-gray-300">Weather radar shows rain in 15 minutes. Game changer! 🌧️</div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Share your insights with the world..."
            className="flex-1 bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
          />
          <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700">Send</button>
        </div>
      </div>
    </div>
  )
}

// Feature Card Component with dynamic hover effects
function FeatureCard({ icon, title, description, gradient }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 animate-pulse pointer-events-none" />
      )}
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-3xl mb-4 flex-shrink-0 shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed flex-grow">{description}</p>
      {isHovered && (
        <button className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold text-sm hover:from-orange-700 hover:to-red-700 transition-all">
          Explore Feature →
        </button>
      )}
    </div>
  )
}

export default App
