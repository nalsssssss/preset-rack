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

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // MODO PRUEBA MANUAL SIN GASTAR PLATA
  if (url.searchParams.get('test') === '1') {
    const presetPrueba = url.searchParams.get('preset') || 'HUNTR';
    const linkUrl = linksDrive[presetPrueba] || linksDrive['HUNTR'];
    
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Preset Rack <soporte@nadirfl.xyz>',
        to: 'nadiirriios@gmail.com',
        subject: `Aquí tienes tu preset: ${presetPrueba}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <p>¡Prueba exitosa!</p>
            <p>Ya podés descargar tu(s) archivo(s) de FL Studio haciendo clic en el botón:</p>
            <div style="margin: 30px 0;">
              <div style="margin-bottom: 20px;">
                <b>Preset: ${presetPrueba}</b><br><br>
                <a href="${linkUrl}" target="_blank" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Descargar archivo</a>
              </div>
            </div>
            <div style="background-color: #f8f9fa; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; font-size: 13px; color: #555;">
              <b>¿No encontrás el correo?</b> Si este mensaje te llegó a la carpeta de <b>Spam o Correo no deseado</b>, marcalo como "No es spam" para recibir futuras actualizaciones sin problemas.
            </div>
            <p style="color: #666; font-size: 14px;">Cualquier duda, respondé directamente a este correo.</p>
          </div>
        `,
      }),
    });
    return new Response('¡Correo de prueba enviado con éxito!', { status: 200 });
  }

  const id = url.searchParams.get('data.id') || url.searchParams.get('id');
  if (!id) return new Response('Falta ID', { status: 200 });

  try {
    const payRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { 'Authorization': `Bearer ${env.MP_TOKEN}` }
    });
    const info = await payRes.json();

    if (info.status === 'approved') {
      let presetsList = [];

      if (info.metadata?.presets) {
        presetsList = info.metadata.presets.split(',').map(s => s.trim());
      }
      
      if (presetsList.length === 0 && info.additional_info?.items) {
        presetsList = info.additional_info.items
          .map(item => item.title || '')
          .map(t => t.replace(/preset:|2x1:/gi, '').trim());
      }

      if (presetsList.length === 0 && info.description) {
        presetsList = [info.description.replace(/preset:|2x1:/gi, '').trim()];
      }

      if (presetsList.length === 0 || !presetsList[0] || presetsList[0] === 'Preset Rack') {
        const rawJsonString = JSON.stringify(info).toUpperCase();
        const foundKey = Object.keys(linksDrive).find(k => rawJsonString.includes(k.toUpperCase()));
        if (foundKey) {
          presetsList = [foundKey];
        } else {
          presetsList = ["HUNTR"];
        }
      }

      const email = info.payer?.email || info.metadata?.email || 'nadiirriios@gmail.com';

      const linksHtml = presetsList
        .map(p => {
          const cleanP = p.toUpperCase();
          const matchKey = Object.keys(linksDrive).find(k => cleanP.includes(k.toUpperCase()) || k.toUpperCase().includes(cleanP));
          const finalKey = matchKey || presetsList[0] || "HUNTR";
          const linkUrl = linksDrive[finalKey] || linksDrive["HUNTR"];
          
          return `
            <div style="margin-bottom: 20px;">
              <b>Preset: ${finalKey}</b><br><br>
              <a href="${linkUrl}" target="_blank" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Descargar archivo</a>
            </div>
          `;
        })
        .join('<br>');

      const subjectText = presetsList.length > 1
        ? 'Tus presets de Preset Rack'
        : `Aquí tienes tu preset: ${presetsList[0] || 'Preset Rack'}`;

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <p>¡Gracias por tu compra!</p>
          <p>Ya podés descargar tu(s) archivo(s) de FL Studio haciendo clic en el botón:</p>
          <div style="margin: 30px 0;">
            ${linksHtml}
          </div>
          <div style="background-color: #f8f9fa; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; font-size: 13px; color: #555;">
            <b>¿No encontrás el correo?</b> Si este mensaje te llegó a la carpeta de <b>Spam o Correo no deseado</b>, marcalo como "No es spam" para recibir futuras actualizaciones sin problemas.
          </div>
          <p style="color: #666; font-size: 14px;">Cualquier duda, respondé directamente a este correo.</p>
        </div>
      `;

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
          html: emailHtml,
        }),
      });
    }

    return new Response('Procesado', { status: 200 });
  } catch (err) {
    return new Response('Error interno: ' + err.message, { status: 500 });
  }
}
