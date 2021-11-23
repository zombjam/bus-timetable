import jsSHA from 'jssha';

const getAuthorizationHeader = () => {
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(process.env.REACT_APP_KEY, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = `hmac username="${process.env.REACT_APP_ID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return {
    Authorization,
    'X-Date': GMTString,
  };
};

const defaultOptions = {
  baseUrl: 'https://ptx.transportdata.tw/MOTC/v2',
  headers: () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...getAuthorizationHeader(),
  }),
};

export default defaultOptions;
