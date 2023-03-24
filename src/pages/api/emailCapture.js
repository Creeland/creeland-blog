export default async function emailCapture(req, res) {
  const { email } = req.body

  const formId = process.env.CONVERTKIT_FORM_ID
  const apiKey = process.env.CONVERTKIT_API_KEY_PUBLIC

  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ api_key: apiKey, email }),
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Failed to subscribe ${email}: ${response.statusText}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to subscribe user' })
  }
}
