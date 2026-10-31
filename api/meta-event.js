export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return res.status(503).json({ error: 'Meta server events are not configured' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const eventName = String(body.event_name || 'PageView');
    const eventId = String(body.event_id || `${eventName}-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    const payload = {
      data: [{ event_name: eventName, event_time: Math.floor(Date.now() / 1000), event_id: eventId, action_source: 'website', event_source_url: String(body.event_source_url || ''), user_data: {} }]
    };
    const response = await fetch(`https://graph.facebook.com/v20.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    return res.status(response.ok ? 200 : response.status).json(result);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid event payload' });
  }
}
