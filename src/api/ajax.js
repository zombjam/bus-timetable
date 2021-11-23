import defaultOptions from './defaultOptions';

const { baseUrl, headers } = defaultOptions;

export default function ajax(path, parameters) {
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.append('$format', 'JSON');

  if (parameters) {
    Object.keys(parameters).forEach(key => url.searchParams.append(key, parameters[key]));
  }

  return fetch(url, {
    method: 'GET',
    headers: headers(),
  }).then(response => response.json());
}
