// Cloudflare Pages Function — responde en /comprar
// Llama directo a la API REST de Mercado Pago con fetch (no usa el SDK de npm,
// para evitar problemas de compatibilidad con el runtime de Cloudflare).

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const presets = data.presets;
    const isCombo = presets.length === 2;
    const totalPrice = isCombo ? 15000 : 8500;
    const title = isCombo
      ? `2x1: ${presets[0]} + ${presets[1]}`
      : `Preset: ${presets[0]}`;

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.MP_TOKEN}`
      },
      body: JSON.stringify({
        items: [{ title, unit_price: totalPrice, quantity: 1 }],
        payer: { email: data.email },
        metadata: { presets: presets.join(','), email: data.email },
        back_urls: {
          success: 'https://nadirfl.xyz/',
          failure: 'https://nadirfl.xyz/'
        },
        auto_return: 'approved',
        notification_url: 'https://nadirfl.xyz/webhook'
      })
    });

    const mpData = await mpRes.json();

    if (!mpRes.ok) {
      return new Response(JSON.stringify({ error: mpData }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ url: mpData.init_point }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response('Error creando pago: ' + err.message, { status: 500 });
  }
}
