import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { sesija } from './index';
import { createMarkup } from './markup';
import axios from 'axios';

async function requeBackEnd(url) {
  const { data } = await axios.get(url);
  console.log('response = ', data);
  return data;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.log('I am so sorry', error.message);
  //   }
  //     return data;
}

export function getFoto(searchKeys) {
  const PER_PAGE = 40;
  const URL_BASE = 'https://pixabay.com/api/';
  const searchParams = new URLSearchParams({
    key: '30360417-ab3f4917951fb9c0069edf9ea',
    q: searchKeys.join('+'),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: sesija.page,
    per_page: PER_PAGE,
  });
  requeBackEnd(`${URL_BASE}?${searchParams}`)
    .then(data => {
      console.log('data  == ', data);
      if (!data.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      sesija.maxPage = Math.ceil(data.totalHits / PER_PAGE);
      if (sesija.page === 1) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      console.log('sesija  == ', sesija);
      createMarkup(data.hits);
    })
    .catch(error => {
      console.log('I am so sorry', error);
    });
}
