'use strict';

import axios from 'axios';

const API_KEY = '46100469-a9a71a6d23d5188e64cb63582';

export async function fetchImages(searchQuery, page) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: '',
      safesearch: 'true',
      page,
      per_page: 15,
    },
  });
  return response.data;
}
