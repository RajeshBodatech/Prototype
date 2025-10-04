/**
 * Express Proxy Server for Grok AI API
 * Securely handles API key and forwards requests to xAI
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Read API keys and mock flag once at startup
const GROK_API_KEY = process.env.GROK_API_KEY || process.env.VITE_GROK_API_KEY
const GROK_MOCK = (process.env.GROK_MOCK === 'true')
const RAPIDAPI_URL = process.env.RAPIDAPI_URL
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// Determine selected backend: if OPENAI_API_KEY is present, force OpenAI usage.
const SELECTED_BACKEND = GROK_MOCK ? 'mock' : (OPENAI_API_KEY ? 'openai' : (RAPIDAPI_URL ? 'rapidapi' : (GROK_API_KEY ? 'grok' : null)))

// Helper: map incoming model names (e.g. grok-2-1212) to an OpenAI-compatible model
function mapModelForOpenAI(modelName) {
  const fallback = 'gpt-4o-mini'
  if (!modelName) return fallback
  const m = String(modelName).toLowerCase()

  // If the client already provided an OpenAI-compatible model, use it
  if (m.startsWith('gpt-') || m.startsWith('gpt_') || m.includes('openai')) {
    return modelName
  }

  // Map grok-style names to a safe OpenAI default
  if (m.includes('grok')) return fallback

  // Unknown provider-specific model name: return a safe fallback
  return fallback
}

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Grok AI Proxy' })
})

// Grok API proxy endpoint
app.post('/api/grok', async (req, res) => {
  // If running in mock mode, return a safe canned reply for local development
  if (SELECTED_BACKEND === 'mock') {
    return res.json({
      id: 'mock-1',
      object: 'chat.completion',
      created: Date.now(),
      model: req.body?.model || 'grok-mock',
      choices: [
        { message: { role: 'assistant', content: '[MOCK] This is a local mock response. Your Grok account may need credits to get real responses.' } }
      ]
    })
  }
  // Validate that at least one backend is configured or mock mode is enabled
  if (!SELECTED_BACKEND) {
    return res.status(500).json({
      error: 'No AI backend configured. Please set OPENAI_API_KEY, GROK_API_KEY (or VITE_GROK_API_KEY), or RAPIDAPI_URL in your .env, or enable GROK_MOCK=true for local development.'
    })
  }

  try {
    const { messages, model = 'grok-2-1212', temperature = 0.7, max_tokens = 500 } = req.body

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Invalid request: messages array is required'
      })
    }

    // Route to the selected backend
    if (SELECTED_BACKEND === 'rapidapi') {
      // Use RapidAPI: user should set RAPIDAPI_URL and RAPIDAPI_KEY in .env
      const rapidHeaders = {
        'Content-Type': 'application/json'
      }
      if (RAPIDAPI_KEY) rapidHeaders['X-RapidAPI-Key'] = RAPIDAPI_KEY
      if (RAPIDAPI_HOST) rapidHeaders['X-RapidAPI-Host'] = RAPIDAPI_HOST

      const rapidResponse = await fetch(RAPIDAPI_URL, {
        method: 'POST',
        headers: rapidHeaders,
        body: JSON.stringify({ messages, model, temperature, max_tokens })
      })

      if (!rapidResponse.ok) {
        const errorText = await rapidResponse.text()
        console.error('RapidAPI Error:', errorText)
        return res.status(rapidResponse.status).json({ error: `RapidAPI error: ${rapidResponse.statusText}`, details: errorText })
      }

      const data = await rapidResponse.json()
      return res.json(data)
    }

    if (SELECTED_BACKEND === 'openai') {
      try {
        // Map incoming model names to an OpenAI-compatible model name
        const mappedModel = mapModelForOpenAI(model)

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({ messages, model: mappedModel, temperature, max_tokens })
        })

        if (!openaiResponse.ok) {
          const errorText = await openaiResponse.text()
          console.error('OpenAI Error:', errorText)

          // If OpenAI rejects the key (401/403), return a safe mock response so the UI keeps working.
          if (openaiResponse.status === 401 || openaiResponse.status === 403) {
            console.warn('OpenAI rejected the API key (invalid/disabled). Returning fallback mock response. Please rotate the OpenAI key.')
            return res.json({
              id: 'fallback-openai-mock',
              object: 'chat.completion',
              created: Date.now(),
              model: 'openai-fallback-mock',
              choices: [
                { message: { role: 'assistant', content: '[FALLBACK] OpenAI API key invalid or disabled. The server returned a fallback mock response so the UI keeps functioning. Please rotate your OpenAI API key.' } }
              ]
            })
          }

          return res.status(openaiResponse.status).json({ error: `OpenAI error: ${openaiResponse.statusText}`, details: errorText })
        }

        const data = await openaiResponse.json()
        return res.json(data)
      } catch (err) {
        console.error('OpenAI proxy error:', err)
        // On network/other errors, return a fallback mock as well to avoid frontend crashes
        return res.json({
          id: 'fallback-openai-error',
          object: 'chat.completion',
          created: Date.now(),
          model: 'openai-fallback-mock',
          choices: [
            { message: { role: 'assistant', content: '[FALLBACK] Unable to reach OpenAI service. Returning mock response to keep UI functional.' } }
          ]
        })
      }
    }

    // If selected backend is grok, forward request to xAI Grok API
    if (SELECTED_BACKEND === 'grok') {
      const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`
      },
      body: JSON.stringify({
        messages,
        model,
        temperature,
        max_tokens,
        stream: false
      })
    })

      if (!grokResponse.ok) {
        const errorText = await grokResponse.text()
        console.error('Grok API Error:', errorText)
        
        return res.status(grokResponse.status).json({
          error: `Grok API error: ${grokResponse.statusText}`,
          details: errorText
        })
      }

      const data = await grokResponse.json()
      
      // Return the response
      return res.json(data)
    }

    // If we reach here, selected backend was handled above (openai/rapidapi/grok/mock)
    // but as a safety net, return an error
    return res.status(500).json({ error: 'No valid backend route executed' })
  } catch (error) {
    console.error('Proxy Error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    })
  }
})

// Debug endpoint: shows whether mock mode is enabled and if a key is present (does not return the key)
app.get('/api/grok/debug', (req, res) => {
  res.json({
    mock: GROK_MOCK,
    hasGrokKey: !!GROK_API_KEY,
    hasOpenAIKey: !!OPENAI_API_KEY,
    hasRapidAPI: !!RAPIDAPI_URL,
    selectedBackend: SELECTED_BACKEND,
    note: GROK_MOCK ? 'Mock mode enabled. /api/grok returns canned responses.' : 'Proxy will forward to configured backend (RapidAPI/OpenAI/Grok) when key is present.'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Grok AI Proxy Server running on http://localhost:${PORT}`)
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🤖 Grok endpoint: http://localhost:${PORT}/api/grok`)
  
  if (OPENAI_API_KEY) {
    console.log('ℹ️  OpenAI API key present in environment (server will forward to OpenAI).')
  }
  if (RAPIDAPI_URL) {
    console.log('ℹ️  RapidAPI forwarding enabled (RAPIDAPI_URL present).')
  }
  if (!process.env.GROK_API_KEY && !process.env.VITE_GROK_API_KEY && !OPENAI_API_KEY && !RAPIDAPI_URL) {
    console.warn('⚠️  WARNING: No API key configured (GROK_API_KEY, OPENAI_API_KEY, or RAPIDAPI_URL).')
  }
})
