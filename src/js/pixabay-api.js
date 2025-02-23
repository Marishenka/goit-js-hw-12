import axios from 'axios';

const baseUrl = 'https://pixabay.com';
const endPoint = '/api';

export function getImg(searchName) {
  const params = new URLSearchParams({
    key: '48962354-d02229266f1321f72919e6f30',
    q: searchName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${baseUrl}${endPoint}?${params}`;

  return axios.get(url, {
    validateStatus: status => status < 500,
  });
}
