import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderImages } from './js/render-functions';
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const loading = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-button'); 
const input = document.querySelector('.input');
form.addEventListener('submit', submitForm);
loadMoreBtn.addEventListener('click', loadMorePictures);
let page;
let value;
const API_KEY = '47671198-bf70cd038d5f77d4168ecf4e9'; 
const BASE_URL = 'https://pixabay.com/api/';
async function fetchImages(value, page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
async function submitForm(event) {
  event.preventDefault();
  page = 1;
  value = input.value.trim();
  loadMoreBtn.style.display = 'none';
  loading.style.display = 'inline-block';
  list.innerHTML = '';
  if (!value) {
    loading.style.display = 'none';
    iziToast.warning({
      position: 'topRight',
      message: 'Please enter a search item.',
    });
    return;
  }
  try {
    const data = await fetchImages(value, page);
    if (data.total === 0) {
      loading.style.display = 'none';
      clearGallery();
      return;
    }
    list.innerHTML = renderImages(data.hits);
    initSimpleLightbox();
    const total = data.totalHits;
    const totalPages = Math.ceil(total / 15);
    if (page >= totalPages) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but there are no more images for your request.",
      });
      loadMoreBtn.style.display = 'none';
      return;
    }
    page++;
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    loading.style.display = 'none';
    iziToast.error({
      position: 'topRight',
      message: error.message,
      maxWidth: 432,
    });
  } finally {
    loading.style.display = 'none';
  }
}
function clearGallery() {
  iziToast.error({
    position: 'topRight',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    maxWidth: 432,
  });
  list.innerHTML = '';
  loadMoreBtn.style.display = 'none';
}
function initSimpleLightbox() {
  const lightbox = new SimpleLightbox('.list-item', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 150,
  });
  lightbox.refresh();
}
async function loadMorePictures(event) {
  event.preventDefault();
  loadMoreBtn.style.display = 'none';
  loading.style.display = 'inline-block';
  try {
    const data = await fetchImages(value, page);
    list.insertAdjacentHTML('beforeend', renderImages(data.hits));
    scrollBy();
    initSimpleLightbox();
    const total = data.totalHits;
    const totalPages = Math.ceil(total / 15);
    if (page >= totalPages) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.style.display = 'none';
      return;
    }
    page++;
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    loading.style.display = 'none';
    iziToast.error({
      position: 'topRight',
      message: error.message,
      maxWidth: 432,
    });
  } finally {
    loading.style.display = 'none';
  }
}
function scrollBy() {
  const card = document.querySelector('.list-item');
  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    left: 0,
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
