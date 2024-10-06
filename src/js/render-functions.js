import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  images.forEach(image => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery-item');
    galleryItem.innerHTML = `
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image">
      </a>
    `;
    gallery.appendChild(galleryItem);
  });
  lightbox.refresh();
}

// Clearing the gallery
export function clearGallery() {
  gallery.innerHTML = '';
}
