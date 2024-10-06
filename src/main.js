// import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import { createGallery, clearGallery } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.classList.add('hidden');
const loader = document.querySelector('.loader');
loader.classList.add('hidden');
let searchValue = '';
let page = 1;
let loadedImg = 0;
let totalImg = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  loader.classList.remove('hidden');

  if (loadMoreBtn) {
    loadMoreBtn.classList.add('hidden');
  }
  page = 1;
  searchValue = searchInput.value.trim();
  if (searchValue === '') {
    loader.classList.add('hidden');
    iziToast.warning({
      message: 'Please fill this field',
      position: 'topCenter',
    });
    return;
  }
  clearGallery();
  loadedImg = 0;

  try {
    const { hits, totalHits } = await fetchImages(searchValue, page);

    if (hits.length === 0) {
      iziToast.info({
        message: 'Sorry, такий собі запит... Придумай щось краще!',
        position: 'topCenter',
        color: 'red',
      });
      loader.classList.add('hidden');
      loadMoreBtn.classList.add('hidden');
      return;
    }
    totalImg = totalHits;

    loadedImg += hits.length;

    createGallery(hits);
    loadMoreBtn.classList.remove('hidden');
    loader.classList.add('hidden');
    console.log(loadedImg);
    console.log(totalImg);
    if (loadedImg < totalImg) {
      loadMoreBtn.classList.remove('hidden');
      loader.classList.add('hidden');
    }
    if (loadedImg >= totalImg) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: 'Ой, це що, вже кінець колекції ?',
        position: 'topCenter',
        color: 'green',
      });
    }
  } catch (error) {
    console.error('Error during receiving images:', error);
    iziToast.error({
      message: 'Something went wrong! Please try again later.',
      position: 'topCenter',
    });
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  loader.classList.remove('hidden');
  try {
    loadMoreBtn.classList.add('hidden');
    const { hits } = await fetchImages(searchValue, page);
    loadedImg += hits.length;
    loader.classList.add('hidden');

    createGallery(hits);
    console.log(loadedImg);
    console.log(totalImg);

    if (loadedImg < totalImg) {
      loadMoreBtn.classList.remove('hidden');
      loader.classList.add('hidden');
    }

    if (loadedImg >= totalImg) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: 'Ой, це що, вже кінець колекції ?',
        position: 'topCenter',
        color: 'green',
      });
    }

    // Плавне прокручування
    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error loading additional images:', error);
  } finally {
    alert(
      'зробив рефакторинг, все одно не розумію до кінця і що з цим робити???'
    );
  }
});
