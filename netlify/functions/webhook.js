const { MercadoPagoConfig, Payment } = require('mercadopago');
const nodemailer = require('nodemailer');

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

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 200, body: 'OK' };

  const id = event.queryStringParameters['data.id'];
  if (!id) return { statusCode: 200, body: 'Falta ID' };

  const client = new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN });
  const payment = new Payment(client);
  
  try {
    const info = await payment.get({ id });
    if (info.status === 'approved') {
      const preset = info.metadata.preset;
      const email = info.metadata.email;
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
      });

      await transporter.sendMail({
        from: `"Preset Rack" <${process.env.MAIL_USER}>`,
        to: email,
        subject: `Aquí tienes tu preset: ${preset}`,
        text: `¡Gracias por tu compra!\n\nDescarga tu archivo de FL Studio aquí:\n${linksDrive[preset]}\n\nCualquier duda, respondé a este correo.`
      });
    }
    return { statusCode: 200, body: 'Procesado' };
  } catch (error) {
    return { statusCode: 500, body: 'Error interno' };
  }
};