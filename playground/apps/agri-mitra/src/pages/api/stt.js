export default async function handler(req, res) {
  const url = 'https://api.dhruva.ai4bharat.org/services/inference/asr?serviceId=ai4bharat%2Fconformer-multilingual-indo_aryan-gpu--t4';
  const headers = {
    'Content-Type': 'application/json',
    authorization: process.env.NEXT_PUBLIC_DHRUVA_AUTH,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      console.error('Error:', response.status);
      res.status(response.status).json({ error: 'API request failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
