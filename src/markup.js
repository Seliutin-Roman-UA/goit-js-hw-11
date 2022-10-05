import { sesija, elHTML } from './index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup(arrayOfImg) {
  let index = document.querySelectorAll('.photo-card').length;
  const cardInnerHTML = arrayOfImg.map(
    ({ largeImageURL, previewURL, tags, likes, views, comments, downloads }) =>
      `<div class="photo-card"><a href="${largeImageURL}"><img src="${previewURL}" alt="${tags}v" loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes ${likes}</b></p><p class="info-item"><b>Views ${views}</b></p><p class="info-item"><b>Comments ${comments}</b></p><p class="info-item"><b>Downloads ${downloads}</b></p></div></div>`
  );

  elHTML.gallery.insertAdjacentHTML('beforeend', cardInnerHTML.join(''));

  if (sesija.page === sesija.maxPage) {
    elHTML.btnLoadMore.classList.add('invisible');
    Notify.failure("We're sorry, but you've reached the end of search results");
  } else {
    elHTML.btnLoadMore.classList.remove('invisible');
  }
  let lightbox = new SimpleLightbox('.gallery a', {});
  console.log('index = ', index);
  if (index > 0) {
    document.querySelectorAll('.photo-card')[index - 1].scrollIntoView({
      behavior: 'smooth',
    });
  }
}
