// Cloudflare Pages Function — responde en /webhook
const linksDrive = {
  "HUNTR": "https://drive.google.com/drive/folders/1saQySurKB82uatNY2MLUrnamINmkPlQ9?usp=sharing",
  "JUANSSIN": "https://drive.google.com/drive/folders/1JnRze5StiMqh3uFBs9F7VkcHfWbzHszZ?usp=sharing",
  "SHAKO": "https://drive.google.com/drive/folders/1xfVq_BKWrZQ1jxtOmzXp3tkTFkfjWxsP?usp=drive_link",
  "CEROASTERISCO": "https://drive.google.com/drive/folders/1ST4Vd-CC4sbT4w7uwJBY-iUQwnl4URZD?usp=sharing",
  "ENZOCEROBULTO": "https://drive.google.com/drive/folders/1MD2hucDTmP32m-WWSN_NJ0VElhATUtPo?usp=sharing",
  "ONEY1": "https://drive.google.com/drive/folders/1VhaOnXZKzm2YIJm3oU36cw28BKV27OMk?usp=sharing",
  "SALAS FLACO": "https://drive.google.com/drive/folders/1q40hu-o932q7MnpAQ-yKUEgMrO1kdOve?usp=drive_link",
  "JOSHU JOSHU": "https://drive.google.com/drive/folders/1dUpqPQkJ-1mXdAJdwS_ZUrM8QMm3SxoN?usp=sharing",
  "ROJUU (salsa valentina)": "https://drive.google.com/drive/folders/1AmSt9LSOjhZUj4BWgxuFWJGKoHL1eUuO?usp=sharing",
  "OSAMASON/NETTSPEND": "https://drive.google.com/drive/folders/1snxQYqXmR_XKJf603QrO3ezILJ3bBcDe?usp=sharing",
  "SARAMALACARA x CAPOXXO": "https://drive.google.com/drive/folders/18aJa4dyU0tmmoIyff-6fHS9vqZeSXumg?usp=sharing",
  "ZELL 2.0": "https://drive.google.com/drive/folders/1aiLPPR5gWq1U4tSQPvuWTkyGffKdzs_a?usp=sharing",
  "STARBOY/GUNNR": "https://drive.google.com/drive/folders/1ezRW8GR-CSNNWmlHRxk_y-GDte6XNTyJ?usp=sharing",
  "NEW JAZZ (underaiki)": "https://drive.google.com/drive/folders/1yjQRiIiK5VM12lEJMRo74Tkp8WBIk70L?usp=sharing",
  "TURROBABY": "https://drive.google.com/drive/folders/1ZePTU1CDC3DXyB-YYudWyOHOIDSbyO_E?usp=drive_link",
  "C.R.O": "https://drive.google.com/drive/folders/1WDUSKtcpVj9ivxgLWsqzNVg8GDO4FPra?usp=drive_link",
  "LIL PEEP (your favorite dress)": "https://drive.google.com/drive/folders/1TtcEfeXSpySJQ2ey0XEVMWPLVpt6jVnY?usp=sharing",
  "ROJUU (melasuda)": "https://drive.google.com/drive/folders/1jlRMcfx5KsDIqoPTABgyjR1qjS62u86n?usp=drive_link",
  "DETROIT (mechayrxmeo)": "https://drive.google.com/drive/folders/1kWwnB44kAsYQnxIjxoXStO29F8VkVzDj?usp=sharing",
  "SWAGGERBOYZ": "https://drive.google.com/drive/folders/1gZTAj5rREws4nkpda08F28VAC5iGJQiH?usp=sharing",
  "ZELL": "https://drive.google.com/drive/folders/1UOc5PMeaDr3-H6j0g2jmqkMVrIwr8mC0?usp=sharing",
  "LOLO MORALES": "https://drive.google.com/drive/folders/1AwgW8BBq0N9R3xr0-wAK3G_1NcP85oOB?usp=sharing",
  "GLOOSITO (DETROIT)": "https://drive.google.com/drive/folders/1jY43x8446Hnn4kbWGiGQmeunQKYv-f2H?usp=sharing",
  "SARAMALACARA": "https://drive.google.com/drive/folders/1f7Fso9BF4hNokCXNkxowJe8y9YSJKVUO?usp=sharing",
  "HYPERPOP (CAPOXXO)": "https://drive.google.com/drive/folders/10okQko6RUUBThF8VSeaf_FXiKdTMZVER?usp=sharing",
  "PLUGGNB": "https://drive.google.com/drive/folders/189GP0fig_LZb21MZ7XutMPzRqyFxMuXo?usp=sharing"
};

const EMAIL_FROM = 'Preset Rack <soporte@nadirfl.xyz>';

function buildEmail(presetsList, titulo) {
  const linksHtml = presetsList.map(name => {
    const linkUrl = linksDrive[name];
    return `
      <div style="margin-bottom: 20px;">
        <b>Preset: ${name}</b><br><br>
        <a href="${linkUrl}" target="_blank" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Descargar archivo</a>
      </div>`;
  }).join('<br>');

  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <p>${titulo}</p>
      <p>Ya podés descargar tu(s) archivo(s) de FL Studio haciendo clic en el botón:</p>
      <div style="margin: 30px 0;">${linksHtml}</div>
      <div style="background-color: #f8f9fa; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; font-size: 13px; color: #555;">
        <b>¿No encontrás el correo?</b> Si este mensaje te llegó a la carpeta de <b>Spam o Correo no deseado</b>, marcalo como "No es spam" para recibir futuras actualizaciones sin problemas.
      </div>
      <p style="color: #666; font-size: 14px;">Cualquier duda, respondé directamente a este correo.</p>
    </div>`;
}

async function sendEmail(env, { to, subject, html, idempotencyKey }) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${env.RESEND_API_KEY}`
  };
  // Si MP reenvía el mismo aviso, Resend no manda el mail dos veces
  if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers,
    body: JSON.stringify({ from: EMAIL_FROM, to, subject, html })
  });
  const body = await res.text();
  if (!res.ok) {
    console.error('RESEND ERROR', res.status, body);
    throw new Error('Resend ' + res.status + ': ' + body);
  }
  console.log('Resend OK', body);
  return body;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // MODO PRUEBA: /webhook?test=1&key=TU_TEST_KEY&to=tu@mail.com&preset=HUNTR
  // Requiere el secret TEST_KEY en Cloudflare, así nadie más puede dispararlo.
  if (url.searchParams.get('test') === '1') {
    if (!env.TEST_KEY || url.searchParams.get('key') !== env.TEST_KEY) {
      return new Response('No autorizado', { status: 401 });
    }
    const preset = url.searchParams.get('preset') || 'HUNTR';
    const to = url.searchParams.get('to');
    if (!linksDrive[preset]) return new Response('Preset inexistente', { status: 400 });
    if (!to) return new Response('Falta &to=correo', { status: 400 });
    try {
      const r = await sendEmail(env, {
        to,
        subject: `Aquí tienes tu preset: ${preset}`,
        html: buildEmail([preset], '¡Prueba exitosa!')
      });
      return new Response('Mail enviado. Respuesta de Resend: ' + r, { status: 200 });
    } catch (e) {
      return new Response('FALLÓ: ' + e.message, { status: 500 });
    }
  }

  // Solo nos interesan los avisos de tipo "payment"
  const tipo = url.searchParams.get('type') || url.searchParams.get('topic');
  if (tipo && tipo !== 'payment') return new Response('Ignorado', { status: 200 });

  const id = url.searchParams.get('data.id') || url.searchParams.get('id');
  if (!id) return new Response('Falta ID', { status: 200 });

  try {
    const payRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { 'Authorization': `Bearer ${env.MP_TOKEN}` }
    });
    if (!payRes.ok) {
      console.error('MP payment fetch', payRes.status, await payRes.text());
      return new Response('No se pudo leer el pago', { status: 500 }); // MP reintenta
    }
    const info = await payRes.json();

    if (info.status !== 'approved') return new Response('Procesado', { status: 200 });

    // MP vuelve a avisar cuando se LIBERA la plata (a veces semanas después).
    // Si el pago se aprobó hace más de 24 h, ya se entregó: no reenviamos.
    const aprobadoEn = new Date(info.date_approved || info.date_created).getTime();
    if (Date.now() - aprobadoEn > 24 * 60 * 60 * 1000) {
      console.log('Pago viejo, no se reenvía el mail', id);
      return new Response('Pago viejo, ya entregado', { status: 200 });
    }

    // Presets: los guardamos en metadata al crear la preferencia
    let presetsList = [];
    if (info.metadata?.presets) {
      presetsList = String(info.metadata.presets).split('|').map(s => s.trim()).filter(Boolean);
    }
    presetsList = presetsList.filter(p => linksDrive[p]);

    // El mail que escribió el comprador en la página manda sobre el de su cuenta de MP
    const email = info.metadata?.email || info.payer?.email;

    if (presetsList.length === 0 || !email) {
      // Pago viejo (link fijo) o datos incompletos: NO adivinamos, avisamos en el log
      console.error('PAGO APROBADO SIN DATOS PARA ENTREGAR', id, JSON.stringify({ meta: info.metadata, payer: info.payer?.email, desc: info.description }));
      return new Response('Pago sin datos de entrega', { status: 200 });
    }

    await sendEmail(env, {
      to: email,
      subject: presetsList.length > 1 ? 'Tus presets de Preset Rack' : `Aquí tienes tu preset: ${presetsList[0]}`,
      html: buildEmail(presetsList, '¡Gracias por tu compra!'),
      idempotencyKey: `pago-${id}`
    });

    return new Response('Procesado', { status: 200 });
  } catch (err) {
    console.error('webhook error', err.message);
    return new Response('Error interno: ' + err.message, { status: 500 });
  }
}
