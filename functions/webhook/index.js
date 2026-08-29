// Cloudflare Pages Function — responde en /webhook
// Acepta tanto GET (para pruebas desde el navegador) como POST (para Mercado Pago)

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

export async function onRequest(context) {
  const { request, env } = context;

  const url = new URL(request.url);
  const id = url.searchParams.get('data.id') || url.searchParams.get('id');
  if (!id) return new Response('Falta ID', { status: 200 });

  try {
    const payRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { 'Authorization': `Bearer ${env.MP_TOKEN}` }
    });
    const info = await payRes.json();

    if (info.status === 'approved') {
      const presetsList = info.metadata?.presets ? info.metadata.presets.split(',') : [];
      const email = info.metadata?.email;

      if (!email) {
        return new Response('Pago aprobado pero falta email en metadata', { status: 200 });
      }

      const linksTexto = presetsList
        .map(p => `${p.trim()}:\n${linksDrive[p.trim()] || '(link no encontrado, avisar al vendedor)'}`)
        .join('\n\n');

      const subjectText = presetsList.length > 1
        ? 'Tus presets de Preset Rack'
        : `Aquí tienes tu preset: ${presetsList[0] || 'Preset Rack'}`;

      // ACÁ ESTABAN FALTANDO LOS SALTOS DE LÍNEA CLAROS
      const emailBody = `¡Gracias por tu compra!\n\nDescargá tu(s) archivo(s) de FL Studio acá:\n\n${linksTexto}\n\nCualquier duda, respondé a este correo.`;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Preset Rack <soporte@nadirfl.xyz>',
          to: email,
          subject: subjectText,
          text: emailBody,
        }),
      });
    }

    return new Response('Procesado', { status: 200 });
  } catch (err) {
    return new Response('Error interno: ' + err.message, { status: 500 });
  }
}
