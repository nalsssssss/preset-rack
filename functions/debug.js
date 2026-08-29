// FUNCIÓN TEMPORAL DE DIAGNÓSTICO — se puede borrar una vez resuelto el problema.
import { WorkerMailer } from 'worker-mailer';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('debug_key');
  if (key !== 'presetrack2026') {
    return new Response('Acceso denegado', { status: 403 });
  }

  const out = [];
  out.push('MP_TOKEN presente: ' + (!!env.MP_TOKEN));
  out.push('MAIL_USER presente: ' + (!!env.MAIL_USER) + (env.MAIL_USER ? ' (' + env.MAIL_USER + ')' : ''));
  out.push('MAIL_PASS presente: ' + (!!env.MAIL_PASS) + (env.MAIL_PASS ? ', largo: ' + env.MAIL_PASS.length + ' caracteres' : ''));
  out.push('');

  try {
    const mailer = await WorkerMailer.connect({
      credentials: { username: env.MAIL_USER, password: env.MAIL_PASS },
      authType: 'plain',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      startTls: true
    });
    out.push('Conexión con Gmail: OK, el login funciona.');
  } catch (e) {
    out.push('Conexión con Gmail: ERROR -> ' + e.message);
  }

  out.push('');

  try {
    const mpRes = await fetch('https://api.mercadopago.com/v1/payment_methods', {
      headers: { 'Authorization': `Bearer ${env.MP_TOKEN}` }
    });
    if (mpRes.ok) {
      out.push('Conexión con Mercado Pago: OK, el token es válido.');
    } else {
      const body = await mpRes.text();
      out.push('Conexión con Mercado Pago: ERROR -> status ' + mpRes.status + ' - ' + body);
    }
  } catch (e) {
    out.push('Conexión con Mercado Pago: ERROR -> ' + e.message);
  }

  return new Response(out.join('\n'), {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
