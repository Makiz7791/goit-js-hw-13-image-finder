import './sass/main.scss';
import debounce from 'lodash.debounce';
import photoMarkup from './photoMarkup.hbs';

const searchFormRef = document.querySelector('input');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('[data-action="load more"]');
loadMoreBtnRef.disabled = true;

const queryStringParam = {
  KEY: '24314191-3406a2e95029d0b69c083d53a',
  page: 1,
  LINK: 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=',
  resetPage() {
    this.page = 2;
  },
  pageIncrement() {
    this.page += 2;
  },
};

searchFormRef.addEventListener('input', debounce(onSearch, 500));

searchFormRef.addEventListener('keydown', e => {
  if (e.which === 13) e.preventDefault();
});

loadMoreBtnRef.addEventListener('click', onBtnClick);

function onSearch(event) {
  if (event.target.value.trim() === '') {
    loadMoreBtnRef.disabled = true;
    clearMarkup();
    return;
  }
  clearMarkup();
  queryStringParam.resetPage();
  return fetchImage(event)
    .then(renderMarkup)
    .catch(error => console.log(error));
}

async function onBtnClick() {
  queryStringParam.pageIncrement();
  await fetchImageOnBtnClick()
    .then(renderMarkup)
    .catch(error => console.log(error));

  scroll();
}

function fetchImage(event) {
  loadMoreBtnRef.disabled = false;
  return fetch(
    `${queryStringParam.LINK}${event.target.value}&page=${queryStringParam.page}&per_page=12&key=${queryStringParam.KEY}`,
  )
    .then(data => data.json())
    .then(data => data.hits);
}

function fetchImageOnBtnClick() {
  return fetch(
    `${queryStringParam.LINK}${searchFormRef.value}&page=${queryStringParam.page}&per_page=12&key=${queryStringParam.KEY}`,
  )
    .then(data => data.json())
    .then(data => data.hits);
}

function renderMarkup(markup) {
  galleryRef.insertAdjacentHTML('beforeend', photoMarkup(markup));
}

function clearMarkup() {
  galleryRef.innerHTML = '';
}

function scroll(index) {
  const images = document.querySelectorAll('li');
  const newImageIndex = document.querySelectorAll('li').length;
  const element = images[newImageIndex-11];
  // console.log(images);
  // images.forEach(image => console.log(image))
  // console.log(element);
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}