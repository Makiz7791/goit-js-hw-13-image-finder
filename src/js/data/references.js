export default () => {
    return {
      form: document.querySelector('#search-form'),
      input: document.querySelector('[name="query"]'),
      searchBtn: document.querySelector('[data-btn="search"]'),
      gallery: document.querySelector('.js-gallery'),
      loadMoreBtn: document.querySelector('[data-btn="Yet ..."]'),
      searchSpin: document.querySelector('.search-form__spinner'),
      loadMoreSpinner: document.querySelector('.gallery__spinner'),
      backdrop: document.querySelector('.js-loader-backdrop'),
      notFoundImageSelector: 'img[alt="Not found"]',
      liRefSelector: 'li',
      divContainerSelector: 'div',
      imageSelector: '.photo-card__img',
    };
  };