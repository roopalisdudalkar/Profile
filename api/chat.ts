export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body || {}
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt in request body' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured on the server' })
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
      }),
    })

    const data = await resp.json()

    if (!resp.ok) {
      console.error('OpenAI error', data)
      return res.status(resp.status).json({ error: data })
    }

    const reply = data.choices?.[0]?.message?.content ?? (data.error?.message ?? null)
    return res.json({ reply })
  } catch (err: any) {
    console.error('Handler error', err)
    return res.status(500).json({ error: err?.message ?? String(err) })
  }
}
