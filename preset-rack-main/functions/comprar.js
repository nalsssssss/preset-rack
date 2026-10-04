// Cloudflare Pages Function — responde en /comprar
// Crea una preferencia de Mercado Pago con el mail del comprador y los presets elegidos.
// Los precios se definen ACÁ (no se confía en lo que manda el navegador).

const PRECIO_INDIVIDUAL = 15000;
const PRECIO_2X1 = 27000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const presets = Array.isArray(data.presets) ? data.presets.map(p => String(p).trim()).filter(Boolean) : [];
    const email = String(data.email || '').trim();

    if (presets.length < 1 || presets.length > 2) return json({ error: 'Elegí 1 o 2 presets' }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: 'Correo inválido' }, 400);

    const isCombo = presets.length === 2;
    const totalPrice = isCombo ? PRECIO_2X1 : PRECIO_INDIVIDUAL;
    const title = isCombo ? `2x1: ${presets[0]} + ${presets[1]}` : `Preset: ${presets[0]}`;

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.MP_TOKEN}`
      },
      body: JSON.stringify({
        items: [{ title, unit_price: totalPrice, quantity: 1, currency_id: 'ARS' }],
        payer: { email },
        // Separador "|" porque algunos presets llevan coma o paréntesis en el nombre
        metadata: { presets: presets.join('|'), email },
        back_urls: {
          success: 'https://nadirfl.xyz/',
          failure: 'https://nadirfl.xyz/',
          pending: 'https://nadirfl.xyz/'
        },
        auto_return: 'approved',
        notification_url: 'https://nadirfl.xyz/webhook'
      })
    });

    const mpData = await mpRes.json();

    if (!mpRes.ok) {
      console.error('MP error', JSON.stringify(mpData));
      return json({ error: 'No se pudo crear el pago' }, 502);
    }

    return json({ url: mpData.init_point });
  } catch (err) {
    console.error('comprar error', err.message);
    return json({ error: 'Error creando pago' }, 500);
  }
}
