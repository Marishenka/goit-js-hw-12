import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImg } from './js/pixabay-api';
import { showGLR, showErrorMessage } from './js/render-functions';

export const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const waitMsg = document.querySelector('.wait-msg');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const searchText = input.value.trim();
  if (!searchText) {
    showErrorToast('Input search string');
    return;
  }

  input.value = '';
  showLoader();

  getImg(searchText)
    .then(response => {
      if (!response.data || !Array.isArray(response.data.hits)) {
        throw new Error('Unexpected API response');
      }
      handleSearchResults(response.data.hits);
    })
    .catch(error => {
      console.error(error);
      showErrorToast('Failed to load images. Try again later.');
    })
    .finally(hideLoader);
}

function handleSearchResults(images) {
  if (!images.length) {
    showErrorMessage();
    return;
  }
  showGLR(images);
}

function showLoader() {
  waitMsg.innerHTML = 'Loading... <span class="loader"></span>';
}

function hideLoader() {
  waitMsg.textContent = '';
}

function showErrorToast(message) {
  iziToast.show({
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    close: true,
    position: 'topRight',
    title: 'Error',
    titleColor: '#fff',
    titleSize: '16px',
    message,
  });
}
