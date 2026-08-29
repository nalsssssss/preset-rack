import { WorkerMailer } from 'worker-mailer';

export async function onRequest(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  
  // Clave de seguridad simple para que nadie más pueda usarlo
  const secret = url.searchParams.get('key');
  if (secret !== 'probar123') {
    return new Response('No autorizado', { status: 403 });
  }

  try {
    const mailer = new WorkerMailer({
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    });

    await mailer.send({
      to: env.MAIL_USER, // Te lo manda a tu propio correo
      subject: 'Prueba de Preset-Rack - ¡Funciona!',
      html: '<h1>¡El sistema de correos está activo!</h1><p>Acá tendrías los links de Google Drive para descargar tus presets.</p>',
    });

    return new Response('¡Correo de prueba enviado con éxito! Fijate en tu bandeja de entrada.');
  } catch (error) {
    return new Response('Error al enviar el correo: ' + error.message, { status: 500 });
  }
}
