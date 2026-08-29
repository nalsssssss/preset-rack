// FUNCIÓN TEMPORAL DE DIAGNÓSTICO — no maneja pagos, solo revisa que todo esté bien configurado.
// Se puede borrar una vez que el problema esté resuelto.

exports.handler = async (event) => {
  const key = event.queryStringParameters && event.queryStringParameters.debug_key;
  if (key !== "presetrack2026") {
    return { statusCode: 403, body: "Acceso denegado" };
  }

  const out = [];

  out.push("MP_TOKEN presente: " + (!!process.env.MP_TOKEN));
  out.push("MAIL_USER presente: " + (!!process.env.MAIL_USER) + (process.env.MAIL_USER ? " (" + process.env.MAIL_USER + ")" : ""));
  out.push("MAIL_PASS presente: " + (!!process.env.MAIL_PASS) + (process.env.MAIL_PASS ? ", largo: " + process.env.MAIL_PASS.length + " caracteres" : ""));
  out.push("");

  // Probar login real contra Gmail
  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    });
    await transporter.verify();
    out.push("Conexión con Gmail: OK, el login funciona.");
  } catch (e) {
    out.push("Conexión con Gmail: ERROR -> " + e.message);
  }

  out.push("");

  // Probar que el token de Mercado Pago tenga formato válido
  try {
    const { MercadoPagoConfig } = require('mercadopago');
    new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN });
    out.push("Cliente de Mercado Pago: se pudo inicializar sin errores.");
  } catch (e) {
    out.push("Cliente de Mercado Pago: ERROR -> " + e.message);
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
    body: out.join("\n")
  };
};
