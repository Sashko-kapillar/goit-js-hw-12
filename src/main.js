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
const loader = document.querySelector('.loader');

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
  if (toggleLoader) {
    toggleLoader(false);
  } else {
    toggleLoader(true);
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
        message: 'Sorry, ваш запит якийсь дивний. Напишіть щось зрозуміле',
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
    }

    loadMoreButton.addEventListener('click', async () => {
      const loadMoreBtn = document.querySelector('.load-more');
      // Перемістимо loader після кнопки Load more
      loadMoreBtn.parentNode.insertBefore(loader, loadMoreBtn);
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
        console.log(loadedImages);
        const image = galleryItem.querySelector('.gallery-image');
        loadedImages = 0;
        image.onload = () => {
          loadedImages++;
          console.log(loadedImages);
          console.log(hits.length);
          if (loadedImages === hits.length) {
            toggleLoader(false); // Приховати завантажувач після завантаження всіх зображень
          }
        };
      });
      lightbox.refresh();
      // toggleLoader(false);
      const galleryItem = document.querySelector('.gallery-item');
      if (galleryItem) {
        const { height } = galleryItem.getBoundingClientRect();
        window.scrollBy({
          top: height * 2, // Прокрутка на дві висоти карточки
          behavior: 'smooth', // Плавна прокрутка
        });
      }
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
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message:
        'Вибачте, ви нічого не написали зрозумілою мовою. Введіть людське слово для пошуку!',
      color: 'red',
      position: 'topCenter',
    });
    return; // у разі помилки нічого не робимо
  } finally {
  }
});
