'use strict';

import { apiKey, searchParams } from './render-functions';
import axios from 'axios';

const searchInput = document.querySelector('input[name="search"]').value;

export async function fetchImages(searchInput, page, perPage) {
  if (searchInput === '') {
    iziToast.show({
      // title: 'Error',
      // message:
      //   'Sorry, your search query is incorrect. Please, change something there!',
      // color: 'red',
      // position: 'topCenter',
    });
    return;
  }
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${apiKey}&q=${searchInput}&page=${page}&per_page=${perPage}`
    );

    return {
      hits: response.data.hits,
      total: response.data.total,
    };
  } catch (error) {
    console.error('Помилка при отриманні даних з Pixabay:', error);
    iziToast.show({
      title: 'Помилка',
      message:
        'Виникла помилка при пошуку зображень. Будь ласка, спробуйте пізніше.',
      color: 'red',
      position: 'topCenter',
    });
  }
}
