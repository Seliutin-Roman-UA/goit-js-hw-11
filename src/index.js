import { getFoto } from './getFoto';
export const elHTML = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};
let searchString = [];
export const sesija = {
  page: 1,
  maxPage: 1,
};

function handlerSubmit(e) {
  e.preventDefault();
  if (!elHTML.input.value) {
    return;
  }
  searchString = elHTML.input.value.toLowerCase().trim().split(' ');
  elHTML.btnLoadMore.classList.add('invisible');
  sesija.page = 1;
  sesija.maxPage = 1;
  elHTML.gallery.innerHTML = '';
  getFoto(searchString);
}

function handlerLoadMore() {
  if (sesija.page < sesija.maxPage) {
    sesija.page++;
    getFoto(searchString);
  }
}

//
elHTML.form.addEventListener('submit', handlerSubmit);

elHTML.btnLoadMore.addEventListener('click', handlerLoadMore);
