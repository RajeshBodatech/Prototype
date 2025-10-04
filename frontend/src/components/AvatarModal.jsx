
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Avatar3D from './Avatar3D'
import { PhonemeAnalyzer, ExpressionAnalyzer } from '../utils/phonemeAnalyzer'
import { askGrok } from '../services/grokClient'
import './AvatarModal.css'

export default function AvatarModal({ open, onClose, avatarUrl }) {
  const [inputText, setInputText] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPhoneme, setCurrentPhoneme] = useState('default')
  const [expression, setExpression] = useState('neutral')
  const [use3DAvatar, setUse3DAvatar] = useState(true)
  const [showGreeting, setShowGreeting] = useState(false)
  const greetingTimerRef = useRef(null)
  const [showSplash, setShowSplash] = useState(false)
  const splashTimerRef = useRef(null)
  
  const utterRef = useRef(null)
  const recognitionRef = useRef(null)
  const phonemeAnalyzerRef = useRef(new PhonemeAnalyzer())
  const expressionAnalyzerRef = useRef(new ExpressionAnalyzer())
  
  // permanent avatar image served from public folder
  const [avatarSrc, setAvatarSrc] = useState(avatarUrl || '/WhatsApp_Image_2025-10-01_at_22.17.03_65aa4584-removebg-preview.png')

  useEffect(() => {
    return () => {
      // cleanup on unmount: stop any speaking/recognition and clear intervals
      if (utterRef.current) {
        clearInterval(utterRef.current)
        utterRef.current = null
      }
      if (recognitionRef.current && recognitionRef.current.stop) recognitionRef.current.stop()
      if (window.speechSynthesis) window.speechSynthesis.cancel()
        if (greetingTimerRef.current) {
          clearTimeout(greetingTimerRef.current)
          greetingTimerRef.current = null
        }
        if (splashTimerRef.current) {
          clearTimeout(splashTimerRef.current)
          splashTimerRef.current = null
        }
    }
  }, [])

    // Show a one-time greeting the first time the modal is opened
    useEffect(() => {
      if (!open) return
      try {
        const seen = localStorage.getItem('lonso_avatar_seen')
        if (!seen) {
          setShowGreeting(true)
          localStorage.setItem('lonso_avatar_seen', '1')
          // auto-hide after 3.5s
          greetingTimerRef.current = setTimeout(() => setShowGreeting(false), 3500)
        }
      } catch (e) {
        // ignore storage errors
      }
      return () => {
        if (greetingTimerRef.current) {
          clearTimeout(greetingTimerRef.current)
          greetingTimerRef.current = null
        }
      }
    }, [open])

    // Show a short splash every time the modal opens, then reveal avatar UI
    useEffect(() => {
      if (!open) return
      setShowSplash(true)
      // show splash for at least 5 seconds
      splashTimerRef.current = setTimeout(() => setShowSplash(false), 5000)
      return () => {
        if (splashTimerRef.current) {
          clearTimeout(splashTimerRef.current)
          splashTimerRef.current = null
        }
      }
    }, [open])

  const speak = (text) => {
    if (!text.trim()) return
    if (!('speechSynthesis' in window)) {
      setError('Text-to-speech not supported in this browser')
      return
    }
    window.speechSynthesis.cancel()
    
    // Analyze expression from text (enhanced version)
    const expressionData = expressionAnalyzerRef.current.analyzeText(text)
    const detectedExpression = typeof expressionData === 'string' ? expressionData : expressionData.emotion
    setExpression(detectedExpression)
    
    // Generate enhanced phoneme sequence with timing
    const phonemeData = phonemeAnalyzerRef.current.textToPhonemes(text)
    const phonemes = phonemeData.map(p => p.shape || p)
    
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 1.05
    u.pitch = 1.0
    u.volume = 1.0
    
    u.onstart = () => {
      setIsSpeaking(true)
      
      // Phoneme-based lip sync
      let phonemeIndex = 0
      if (!utterRef.current) {
        utterRef.current = setInterval(() => {
          if (phonemeIndex < phonemes.length) {
            setCurrentPhoneme(phonemes[phonemeIndex])
            setMouthOpen(phonemes[phonemeIndex] !== '_')
            phonemeIndex++
          } else {
            phonemeIndex = 0 // Loop
          }
        }, 80) // Adjust timing for speech rate
      }
    }
    
    u.onend = () => {
      setIsSpeaking(false)
      setMouthOpen(false)
      setCurrentPhoneme('default')
      setExpression('neutral')
      if (utterRef.current) {
        clearInterval(utterRef.current)
        utterRef.current = null
      }
    }
    
    window.speechSynthesis.speak(u)
  }

  // Handle user input and get Grok response
  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return
    
    const userMessage = inputText.trim()
    setInputText('') // Clear input immediately
    setError(null)
    setIsLoading(true)
    setExpression('thinking')
    
    try {
      // Get response from Grok AI
      const grokResponse = await askGrok(userMessage)
      
      // Speak the response with lip sync and expressions
      speak(grokResponse)
    } catch (err) {
      console.error('Grok Error:', err)
      const msg = err.message || 'Failed to get AI response'
      // Detect common Forbidden / no-credits cases and provide actionable guidance
      if (msg.toLowerCase().includes('credit') || msg.toLowerCase().includes('forbidden')) {
        setError('Grok access denied: your x.ai team may not have credits or permission. See details: ' + msg)
      } else {
        setError(msg)
      }
      setExpression('sad')

      // Speak error message
      speak('Sorry, I encountered an error. Please check the AI configuration or your account.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser')
      return
    }
    
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
      return
    }
    
    const r = new SpeechRecognition()
    r.lang = 'en-US'
    r.interimResults = false
    r.continuous = false
    
    r.onstart = () => {
      setIsListening(true)
      setError(null)
    }
    
    r.onresult = async (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join(' ')
      setInputText(t)
      
      // Get Grok response for voice input
      setIsLoading(true)
      setExpression('thinking')
      
      try {
        const grokResponse = await askGrok(t)
        speak(grokResponse)
      } catch (err) {
        console.error('Grok Error:', err)
        const msg = err.message || 'Failed to get AI response'
        if (msg.toLowerCase().includes('credit') || msg.toLowerCase().includes('forbidden')) {
          setError('Grok access denied: your x.ai team may not have credits or permission. See details: ' + msg)
        } else {
          setError(msg)
        }
        speak('Sorry, I encountered an error. Please check the AI configuration or your account.')
      } finally {
        setIsLoading(false)
      }
    }
    
    r.onerror = () => {
      setIsListening(false)
    }
    
    r.onend = () => { 
      recognitionRef.current = null
      setIsListening(false)
    }
    
    recognitionRef.current = r
    r.start()
  }

  const handleClose = () => {
    // ensure any TTS/intervals/recognition are stopped before closing
    if (utterRef.current) {
      clearInterval(utterRef.current)
      utterRef.current = null
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    if (recognitionRef.current && recognitionRef.current.stop) recognitionRef.current.stop()
    setIsSpeaking(false)
    setMouthOpen(false)
    setIsListening(false)
    if (onClose) onClose()
  }

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  // Stop speaking
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    if (utterRef.current) {
      clearInterval(utterRef.current)
      utterRef.current = null
    }
    setIsSpeaking(false)
    setMouthOpen(false)
    setCurrentPhoneme('default')
    setExpression('neutral')
  }

  if (!open) return null

  return (
    <div className="avatar-modal-overlay" role="dialog" aria-modal="true">
      <div className="avatar-modal-backdrop" onClick={handleClose} />

      <div className="avatar-modal-card">
        <button className="avatar-close" onClick={handleClose} aria-label="Close">✕</button>

          <div className="avatar-modal-content">
          {/* Splash screen shown briefly on each open */}
          {showSplash && (
            <div className="avatar-splash" aria-hidden={!showSplash}>
              <div className="avatar-splash-card">
                <div className="splash-title">Hello — meet Lonso</div>
                <div className="splash-sub">Your AI companion is starting...</div>
                <div className="splash-emojis">
                  <span className="emoji e1">✨</span>
                  <span className="emoji e2">🤖</span>
                  <span className="emoji e3">👋</span>
                </div>
              </div>
            </div>
          )}
          {/* One-time greeting */}
          {showGreeting && (
            <div className="lonso-greeting" role="status">
              <div className="lonso-greeting-card">
                <strong>Hello — meet our AI Lonso avatar</strong>
                <button className="lonso-greeting-close" onClick={() => setShowGreeting(false)} aria-label="Dismiss">×</button>
              </div>
            </div>
          )}
          {/* Left side - Background (60% width) */}
            <div className="avatar-stage">
            <div className="avatar-background" />
            
            {/* Center - Avatar Character */}
            <div className="avatar-character">
              {use3DAvatar ? (
                <div className="avatar-3d-container">
                  <Avatar3D 
                    isSpeaking={isSpeaking}
                    currentPhoneme={currentPhoneme}
                    expression={expression}
                    avatarSrc={avatarSrc}
                  />
                </div>
              ) : (
                <div className="real-avatar-container">
                  {/* Real Avatar Image */}
                  {avatarSrc ? (
                    <motion.img 
                      src={avatarSrc} 
                      alt="avatar" 
                      className="avatar-image"
                      animate={isSpeaking ? {
                        scale: mouthOpen ? 1.01 : 1,
                        y: mouthOpen ? 2 : 0,
                      } : {
                        scale: 1,
                        y: 0
                      }}
                      transition={{
                        duration: 0.08,
                        ease: "easeInOut"
                      }}
                    />
                  ) : (
                    <div className="avatar-placeholder">Your Avatar</div>
                  )}

                  {/* Lip Sync Mouth Overlay */}
                  <AnimatePresence>
                    {isSpeaking && mouthOpen && (
                      <motion.div 
                        className="mouth-overlay-real"
                        initial={{ scaleY: 0.2, opacity: 0 }}
                        animate={{ 
                          scaleY: currentPhoneme === 'a' ? 1.2 : 
                                  currentPhoneme === 'o' ? 1.0 : 
                                  currentPhoneme === 'e' ? 0.8 : 
                                  currentPhoneme === 'i' ? 0.6 : 
                                  currentPhoneme === 'u' ? 0.9 : 0.7,
                          scaleX: currentPhoneme === 'o' || currentPhoneme === 'u' ? 0.8 : 1,
                          opacity: 0.85,
                        }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ duration: 0.06, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hand Gestures - Left */}
                  <AnimatePresence>
                    {isSpeaking && (
                      <motion.div 
                        className="hand-gesture-left"
                        initial={{ x: -150, y: 0, opacity: 0, rotate: -30 }}
                        animate={{ 
                          x: [-80, -70, -85, -80],
                          y: [0, -20, -10, 0],
                          rotate: [-20, -35, -15, -20],
                          opacity: [0.8, 1, 0.9, 0.8]
                        }}
                        exit={{ x: -150, opacity: 0 }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="hand-emoji">👋</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hand Gestures - Right */}
                  <AnimatePresence>
                    {isSpeaking && (
                      <motion.div 
                        className="hand-gesture-right"
                        initial={{ x: 150, y: 0, opacity: 0, rotate: 30 }}
                        animate={{ 
                          x: [80, 85, 70, 80],
                          y: [0, -25, -12, 0],
                          rotate: [20, 35, 15, 20],
                          opacity: [0.8, 1, 0.9, 0.8]
                        }}
                        exit={{ x: 150, opacity: 0 }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.4
                        }}
                      >
                        <span className="hand-emoji">👋</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Removed external emoji overlays - expressions are now in avatar itself */}
                </div>
              )}
            </div>
          </div>

          {/* Bottom - Input Controls */}
          <div className="avatar-controls">
            {/* Error Message */}
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ⚠️ {error}
              </motion.div>
            )}
            
            {/* Loading Indicator */}
            {isLoading && (
              <motion.div 
                className="loading-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="loading-spinner"></div>
                <span>Thinking...</span>
              </motion.div>
            )}
            
            <div className="input-container">
              <textarea 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="avatar-input" 
                placeholder="Ask me anything about F1 or chat with me..."
                rows={2}
                disabled={isLoading || isSpeaking}
              />
              <div className="button-group">
                {isSpeaking && (
                  <button 
                    onClick={stopSpeaking}
                    className="stop-button"
                    aria-label="Stop speaking"
                  >
                    ⏹️
                  </button>
                )}
                <button 
                  onClick={startRecognition} 
                  className={`mic-button ${isListening ? 'listening' : ''}`}
                  aria-label="Voice input"
                  disabled={isLoading || isSpeaking}
                >
                  🎙️
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="send-button"
                  aria-label="Send message"
                  disabled={isLoading || isSpeaking || !inputText.trim()}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
