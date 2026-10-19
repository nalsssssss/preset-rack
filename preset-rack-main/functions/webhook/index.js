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
  "PLUGGNB": "https://drive.google.com/drive/folders/189GP0fig_LZb21MZ7XutMPzRqyFxMuXo?usp=sharing",
  "SLIMESANTI": "https://drive.google.com/drive/folders/1ojpaxQokVDY7npHv00bVas8ubNIpvi-R?usp=sharing",
  "CERO ASTERISCO (yo pray)": "https://drive.google.com/drive/folders/1ojpaxQokVDY7npHv00bVas8ubNIpvi-R?usp=sharing"
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
      <div style="background-color: #f8f9fa; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; font-size: 13px; color: #55
