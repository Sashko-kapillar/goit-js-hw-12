'use strict';

const loader = document.querySelector('.loader');

export const apiKey = '46100469-a9a71a6d23d5188e64cb63582';

export const searchParams = new URLSearchParams({
  _limit: 15,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}
