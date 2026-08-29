export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  if (url.searchParams.get('key') !== 'probar123') {
    return new Response('No autorizado', { status: 401 });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'nadiirlr@gmail.com',
        subject: '¡Prueba exitosa desde Cloudflare!',
        html: '<p>Funciona perfecto y sin trabarse.</p>',
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    return new Response('¡Correo enviado con éxito!');
  } catch (error) {
    return new Response(`Error al enviar el correo: ${error.message}`, { status: 500 });
  }
}
