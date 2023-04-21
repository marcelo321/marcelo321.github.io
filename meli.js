const firstUrl = 'https://www.mercadopago.com.ar/developers/panel/app';

// Make first request
const xhr = new XMLHttpRequest();
xhr.open('GET', firstUrl);
xhr.onload = function() {
  // Extract app number from first response using regular expression
  const appNumberRegex = /Número de aplicación: (\d+)/;
  const appNumberMatch = appNumberRegex.exec(xhr.responseText);
  const appNumber = appNumberMatch[1];

  // Make second request using app number from first response
  const secondUrl = `https://www.mercadopago.com.ar/developers/panel/app/${appNumber}/credentials/production`;
  const xhr2 = new XMLHttpRequest();
  xhr2.open('GET', secondUrl);
  xhr2.onload = function() {
    // Extract public and secret key from second response
    const passwordRegex = /class="credentials-container__key-secret" value="([^"]+)"/;
    const passwordMatch = passwordRegex.exec(xhr2.responseText);
    const password = passwordMatch[1];

    const keyRegex = /<div class="credentials-container__key">([^<]+)<\/div>/;
    const keyMatch = keyRegex.exec(xhr2.responseText);
    const key = keyMatch[1];

    // Alert the extracted values
    alert(`Public key: ${password}\n\nAccess Token: ${key}`);
  };
  xhr2.send();
};
xhr.send();
