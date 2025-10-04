// Enhanced Phoneme analyzer for accurate lip sync
// Maps text to phonemes with precise timing for mouth animation

export class PhonemeAnalyzer {
  constructor() {
    // Enhanced phoneme mapping with duration weights
    this.vowelPhonemes = {
      'a': { shape: 'a', duration: 1.2, openness: 0.9 },
      'e': { shape: 'e', duration: 1.0, openness: 0.6 },
      'i': { shape: 'i', duration: 0.9, openness: 0.4 },
      'o': { shape: 'o', duration: 1.1, openness: 0.8 },
      'u': { shape: 'u', duration: 1.0, openness: 0.5 }
    }

    this.consonantPhonemes = {
      'p': { shape: 'p', duration: 0.6, openness: 0.0 },
      'b': { shape: 'p', duration: 0.6, openness: 0.0 },
      'm': { shape: 'm', duration: 0.7, openness: 0.0 },
      'f': { shape: 'f', duration: 0.8, openness: 0.3 },
      'v': { shape: 'f', duration: 0.8, openness: 0.3 },
      's': { shape: 's', duration: 0.9, openness: 0.2 },
      'z': { shape: 's', duration: 0.9, openness: 0.2 },
      't': { shape: 's', duration: 0.5, openness: 0.2 },
      'd': { shape: 's', duration: 0.5, openness: 0.2 },
      'k': { shape: 'o', duration: 0.6, openness: 0.5 },
      'g': { shape: 'o', duration: 0.6, openness: 0.5 },
      'l': { shape: 'e', duration: 0.7, openness: 0.4 },
      'r': { shape: 'e', duration: 0.7, openness: 0.4 },
      'w': { shape: 'u', duration: 0.8, openness: 0.5 },
      'y': { shape: 'i', duration: 0.7, openness: 0.4 },
      'h': { shape: 'a', duration: 0.6, openness: 0.5 },
      'n': { shape: 'm', duration: 0.7, openness: 0.1 }
    }

    // Base timing in milliseconds per phoneme
    this.basePhonemeTime = 75
  }

  // Analyze text and return enhanced phoneme sequence with timing
  textToPhonemes(text) {
    const words = text.toLowerCase().split(/\s+/)
    const phonemes = []

    words.forEach((word, wordIndex) => {
      for (let i = 0; i < word.length; i++) {
        const char = word[i]
        
        if (this.isVowel(char)) {
          const phonemeData = this.vowelPhonemes[char]
          phonemes.push({
            shape: char,
            duration: phonemeData.duration,
            openness: phonemeData.openness,
            type: 'vowel'
          })
        } else if (this.isConsonant(char)) {
          const phonemeData = this.consonantPhonemes[char] || { shape: 'default', duration: 0.7, openness: 0.3 }
          phonemes.push({
            shape: phonemeData.shape,
            duration: phonemeData.duration,
            openness: phonemeData.openness,
            type: 'consonant'
          })
        }
      }
      
      // Add pause between words (except last word)
      if (wordIndex < words.length - 1) {
        phonemes.push({
          shape: '_',
          duration: 0.5,
          openness: 0,
          type: 'pause'
        })
      }
    })

    return phonemes
  }
  
  // Simple version for backward compatibility
  textToPhonemesSimple(text) {
    const phonemes = this.textToPhonemes(text)
    return phonemes.map(p => p.shape)
  }

  isVowel(char) {
    return 'aeiou'.includes(char)
  }

  isConsonant(char) {
    return /[bcdfghjklmnpqrstvwxyz]/.test(char)
  }

  mapConsonant(char) {
    // Map consonants to mouth shapes with phoneme data
    const phonemeData = this.consonantPhonemes[char]
    return phonemeData ? phonemeData.shape : 'default'
  }
  
  // Calculate accurate timing for each phoneme based on speech rate
  calculatePhonemeTimings(phonemes, speechRate = 1.0) {
    let currentTime = 0
    const timedPhonemes = []
    
    phonemes.forEach(phoneme => {
      const duration = (this.basePhonemeTime * phoneme.duration) / speechRate
      
      timedPhonemes.push({
        ...phoneme,
        startTime: currentTime,
        endTime: currentTime + duration,
        duration: duration
      })
      
      currentTime += duration
    })
    
    return timedPhonemes
  }

  // Generate timed phoneme sequence for speech
  generateTimedPhonemes(text, durationMs) {
    const phonemes = this.textToPhonemes(text)
    const timePerPhoneme = durationMs / phonemes.length
    
    return phonemes.map((phoneme, index) => ({
      phoneme,
      startTime: index * timePerPhoneme,
      duration: timePerPhoneme
    }))
  }

  // Real-time phoneme detection from audio (simplified)
  detectPhonemeFromAudio(audioData) {
    // This is a simplified version
    // In production, use Web Audio API for frequency analysis
    const frequency = this.analyzeFrequency(audioData)
    
    if (frequency < 500) return 'u'
    if (frequency < 1000) return 'o'
    if (frequency < 1500) return 'a'
    if (frequency < 2000) return 'e'
    return 'i'
  }

  analyzeFrequency(audioData) {
    // Placeholder for frequency analysis
    // In real implementation, use FFT
    return Math.random() * 2500
  }
}

// Enhanced sentiment analyzer for facial expressions
export class ExpressionAnalyzer {
  analyzeText(text) {
    const lowerText = text.toLowerCase()
    
    // Enhanced emotion detection with intensity
    const emotions = {
      happy: {
        keywords: ['happy', 'great', 'wonderful', 'excellent', 'amazing', 'love', 'joy', 'fantastic', 'perfect', 'awesome', 'glad', 'pleased'],
        intensity: 0
      },
      sad: {
        keywords: ['sad', 'sorry', 'unfortunately', 'bad', 'terrible', 'disappointed', 'upset', 'regret'],
        intensity: 0
      },
      excited: {
        keywords: ['excited', 'wow', 'awesome', 'incredible', 'amazing', 'fantastic', 'unbelievable'],
        intensity: 0
      },
      thinking: {
        keywords: ['hmm', 'think', 'consider', 'perhaps', 'maybe', 'wondering', 'curious', 'interesting'],
        intensity: 0
      },
      confident: {
        keywords: ['definitely', 'certainly', 'absolutely', 'sure', 'confident', 'know'],
        intensity: 0
      }
    }

    // Calculate intensity for each emotion
    Object.keys(emotions).forEach(emotion => {
      emotions[emotion].intensity = emotions[emotion].keywords.filter(
        word => lowerText.includes(word)
      ).length
    })

    // Check for exclamation marks (excitement indicator)
    const exclamationCount = (text.match(/!/g) || []).length
    if (exclamationCount > 0) {
      emotions.excited.intensity += exclamationCount
    }

    // Check for question marks (thinking indicator)
    const questionCount = (text.match(/\?/g) || []).length
    if (questionCount > 0) {
      emotions.thinking.intensity += questionCount * 0.5
    }

    // Find dominant emotion
    let dominantEmotion = 'neutral'
    let maxIntensity = 0

    Object.keys(emotions).forEach(emotion => {
      if (emotions[emotion].intensity > maxIntensity) {
        maxIntensity = emotions[emotion].intensity
        dominantEmotion = emotion
      }
    })

    return {
      emotion: dominantEmotion,
      intensity: Math.min(maxIntensity / 2, 1), // Normalize to 0-1
      allEmotions: emotions
    }
  }
  
  // Simple version for backward compatibility
  analyzeTextSimple(text) {
    const result = this.analyzeText(text)
    return result.emotion
  }
}
