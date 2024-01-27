function decodeToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

function checkTokenValid(data) {
  const expTime = parseInt(`${data.exp}000`, 10);
  return new Date().getTime() < expTime;
}

function getTDXToken() {
  const accessToken = JSON.parse(localStorage.getItem('bus_accessToken') || '""');
  if (accessToken) {
    const payload = decodeToken(accessToken);
    const isValid = checkTokenValid(payload);
    if (isValid) return;
  }

  const authUrl = `https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token`;
  fetch(authUrl, {
    method: 'POST',
    body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const accessToken = res.access_token;
      localStorage.setItem('bus_accessToken', JSON.stringify(accessToken));
    });
}

function getAuthorizationHeader() {
  const accessToken = JSON.parse(localStorage.getItem('bus_accessToken') || '""');
  if (!accessToken) return {};

  return {
    'authorization': `Bearer ${accessToken}`,
  };
}

getTDXToken();


const defaultOptions = {
  baseUrl: 'https://tdx.transportdata.tw/api',
  headers: () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...getAuthorizationHeader()
  }),
};

export default defaultOptions;
