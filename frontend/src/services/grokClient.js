/**
 * Grok AI Client Service
 * Handles communication with xAI's Grok API through a secure proxy
 */

const API_ENDPOINT = '/api/grok' // Proxy endpoint

/**
 * Send a message to Grok AI and get a response
 * @param {string} prompt - User's message/question
 * @param {Object} options - Optional configuration
 * @returns {Promise<string>} - Grok's response text
 */
export async function askGrok(prompt, options = {}) {
  const {
    model = 'grok-2-1212', // Latest Grok model
    temperature = 0.7,
    maxTokens = 500,
    systemPrompt = 'You are a helpful AI assistant integrated into an F1 racing platform avatar. Keep responses concise, engaging, and relevant to Formula 1 when appropriate. Use natural conversational language suitable for text-to-speech.'
  } = options

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model,
        temperature,
        max_tokens: maxTokens,
        stream: false // We'll add streaming support later
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const statusMsg = errorData.error || `API request failed: ${response.status}`
      const details = errorData.details || ''
      // Throw an error including status and any proxy-provided details to aid debugging
      throw new Error(`${statusMsg} ${details ? `- details: ${details}` : ''}`)
    }

    const data = await response.json()
    
    // Extract the response text from Grok's response format
    const replyText = data.choices?.[0]?.message?.content || data.reply || ''
    
    if (!replyText) {
      throw new Error('Empty response from Grok')
    }

    return replyText.trim()
  } catch (error) {
    console.error('Grok API Error:', error)
    
    // Return user-friendly error messages
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to AI service. Please check your connection.')
    }
    
    throw error
  }
}

/**
 * Stream responses from Grok (for future implementation)
 * @param {string} prompt - User's message
 * @param {Function} onChunk - Callback for each text chunk
 * @param {Object} options - Optional configuration
 */
export async function askGrokStream(prompt, onChunk, options = {}) {
  // TODO: Implement streaming for real-time responses
  // This will enable progressive TTS and lip sync
  throw new Error('Streaming not yet implemented')
}

/**
 * Test connection to Grok API
 * @returns {Promise<boolean>} - True if connection successful
 */
export async function testGrokConnection() {
  try {
    const response = await askGrok('Hello', { maxTokens: 10 })
    return response.length > 0
  } catch (error) {
    console.error('Connection test failed:', error)
    return false
  }
}
