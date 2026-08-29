import { WorkerMailer } from 'worker-mailer'; // O la importación que estés usando

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Tu clave de seguridad
  if (url.searchParams.get('key') !== 'probar123') {
    return new Response('No autorizado', { status: 401 });
  }

  try {
    const mailer = new WorkerMailer({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    });

    await mailer.send({
      to: env.MAIL_USER,
      subject: 'Prueba desde Cloudflare',
      text: '¡Funciona perfecto!',
    });

    return new Response('¡Correo enviado con éxito!');
  } catch (error) {
    return new Response(`Error al enviar el correo: ${error.message}`, { status: 500 });
  }
}
