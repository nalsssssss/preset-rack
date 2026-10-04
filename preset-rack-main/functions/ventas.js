// Cloudflare Pages Function — responde en /ventas
// Uso: https://nadirfl.xyz/ventas?key=TU_TEST_KEY
// Lista los últimos 30 pagos de la cuenta a la que pertenece tu MP_TOKEN.
// Sirve para ver si un pago existe, en qué estado está y si es REAL o de PRUEBA.

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.TEST_KEY || url.searchParams.get('key') !== env.TEST_KEY) {
    return new Response('No autorizado', { status: 401 });
  }

  const headers = { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' };

  try {
    const r = await fetch(
      'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&limit=30',
      { headers: { Authorization: `Bearer ${env.MP_TOKEN}` } }
    );
    const data = await r.json();
    if (!r.ok) {
      return new Response('Error de Mercado Pago ' + r.status + ': ' + JSON.stringify(data), { status: 502, headers });
    }

    const results = data.results || [];
    if (results.length === 0) {
      return new Response('Mercado Pago no devolvió ningún pago para este token.', { status: 200, headers });
    }

    const lines = results.map(p => [
      p.date_created,
      'ID ' + p.id,
      p.live_mode === false ? 'PRUEBA' : 'REAL',
      p.status + '/' + p.status_detail,
      '$' + p.transaction_amount,
      p.payer?.email || '(sin mail)',
      p.metadata?.presets || p.description || '(sin detalle)',
      p.money_release_date ? 'liberación: ' + p.money_release_date : ''
    ].join(' | '));

    return new Response(lines.join('\n'), { status: 200, headers });
  } catch (err) {
    return new Response('Error: ' + err.message, { status: 500, headers });
  }
}
