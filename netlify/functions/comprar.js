const { MercadoPagoConfig, Preference } = require('mercadopago');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Método no permitido' };

  const data = JSON.parse(event.body);
  const client = new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN });
  const preference = new Preference(client);

  try {
    const response = await preference.create({
      body: {
        items: [{ title: `Preset: ${data.preset}`, unit_price: 8500, quantity: 1 }],
        payer: { email: data.email },
        metadata: { preset: data.preset, email: data.email },
        back_urls: { 
          success: "https://nadirfl.xyz/", 
          failure: "https://nadirfl.xyz/" 
        },
        auto_return: "approved",
        notification_url: "https://nadirfl.xyz/.netlify/functions/webhook"
      }
    });
    return { statusCode: 200, body: JSON.stringify({ url: response.init_point }) };
  } catch (error) {
    return { statusCode: 500, body: 'Error creando pago' };
  }
};