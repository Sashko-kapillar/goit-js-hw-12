import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import { toggleLoader } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let loadMoreButton;
const perPage = 15; // Обмеження кількість завантажень до 15 зображень на сторінку
let page = 1;
let totalPages = 0; //загальна кількість сторінок
const lightbox = new SimpleLightbox('.gallery a');

/* ==================================================================== */

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const searchInput = document
    .querySelector('input[name="search"]')
    .value.trim();
  gallery.innerHTML = '';
  if (loadMoreButton) {
    loadMoreButton.remove();
  }
  let loadedImages = 0; // Кількість завантажених зображень

  page = 1;

  try {
    const { hits, total } = await fetchImages(searchInput, page, perPage); // деструктуризація
    totalPages = Math.ceil(total / perPage);
    console.log(totalPages);

    if (hits.length === 0) {
      iziToast.show({
        title: 'Error',
        message:
          'Sorry, your search query is incorrect. Please, change something there!',
        color: 'red',
        position: 'topCenter',
      });
      return;
    } else {
      toggleLoader(true);
      const totalImages = hits.length;

      hits.forEach(hit => {
        const galleryItem = document.createElement('li');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `
          <a href="${hit.largeImageURL}">
            <img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery-image">
          </a>
        `;
        gallery.appendChild(galleryItem);

        // Оновлення прогресу завантаження після завантаження кожного зображення
        const image = galleryItem.querySelector('.gallery-image');
        image.onload = () => {
          loadedImages++;
          console.log(loadedImages);

          if (loadedImages === totalImages) {
            toggleLoader(false); // Приховати завантажувач після завантаження всіх зображень
          }
        };
      });
      lightbox.refresh();
    }

    if (hits.length >= perPage) {
      loadMoreButton = document.createElement('button');
      loadMoreButton.textContent = 'Load more';
      loadMoreButton.classList.add('load-more');

      gallery.after(loadMoreButton);

      loadMoreButton.addEventListener('click', async () => {
        page++;

        const { hits } = await fetchImages(searchInput, page, perPage);
        toggleLoader(true);
        hits.forEach(hit => {
          const galleryItem = document.createElement('li');
          galleryItem.classList.add('gallery-item');
          galleryItem.innerHTML = `
          <a href="${hit.largeImageURL}">
            <img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery-image">
          </a>
        `;
          gallery.appendChild(galleryItem);
        });
        lightbox.refresh();
        toggleLoader(false);

        if (page === totalPages) {
          iziToast.show({
            title: 'Infoline',
            message: 'This is the last page',
            color: 'green',
            position: 'topCenter',
          });
          loadMoreButton.remove(); // Приховати кнопку, якщо це остання сторінка
        }
      });
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message:
        'Sorry, you have not written anything. Еnter a few letters to search!',
      color: 'red',
      position: 'topCenter',
    });
    return; // у разі помилки нічого не робимо
  } finally {
  }
});
