import { showAlert, showError, ALERTS } from '../vendors/alerts';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import getRefs from '../data/references';
import { inputLoadSpinner } from '../vendors/spinner';
import CSS from '../data/css';
import NOT_FOUND_IMG_LINK from '../../images/iron2.png';
import makeImageCards from '../../templating/imageCards';
import makeImage from '../../templating/image';
import ApiService from '../services/apiService';
import { PageServices } from '../services/pageServices';

const refs = getRefs();

const api = new ApiService(NOT_FOUND_IMG_LINK);

const options = {
  url: NOT_FOUND_IMG_LINK,
  css: CSS,
  refs: refs,
  makeImageCards: makeImageCards,
  imageModal: basicLightbox,
};

const pageServices = new PageServices(options);

const onSubmit = async e => {
  try {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.elements.query.value.toLowerCase().trim();
    if (!query) {
      showAlert(ALERTS.EMPTY);
      return;
    }
    pageServices.getNotFoundPicture(pageServices._notFoundImageLink);
    inputLoadSpinner.spin(refs.searchSpin);
    pageServices.hideLoadMoreBtn();
    api.resetPage();

    const resultsArray = await Promise.all([api.fetchPictures(query), pageServices.clearGallery()]); // await
    const data = resultsArray[0];
    const galleryCards = data.hits;
    if (!galleryCards.length) {
      showAlert(query, ALERTS.NOT_FOUND);
      inputLoadSpinner.stop();
      return;
    }
    const normalizeData = api.getNormalizeData(data);
    api.countTotalResults();
    pageServices.getGallery(normalizeData, api.resultsCounter, api.page);
    inputLoadSpinner.stop();
    form.classList.add(CSS.TRANSPARENT);

    refs.input.addEventListener('focus', onInputFocus);
    refs.form.reset();
  } catch (err) {
    pageServices.hideLoadMoreBtn();
    pageServices.clearGallery();
    showError(err);
    inputLoadSpinner.stop();
    console.log(err);
  }
};

const onLoadMore = async () => {
  try {
    api.incrementPage();
    pageServices.showBackdrop();
    pageServices.disableLoadMoreBtn();

    const data = await api.fetchPictures(api.query); // await

    pageServices.hideBackdrop();

    const galleryCards = data.hits;
    if (!galleryCards.length) {
      showAlert(query, ALERTS.NOT_RESPONDING);
      return;
    }

    const normalizeData = api.getNormalizeData(data);
    api.countTotalResults();
    pageServices.getGallery(normalizeData, api.resultsCounter, api.page);

    api.getFirstFetchedElemetId(normalizeData);
    const elemToScroll = pageServices.getElementToScroll(api.firstFetchedElemetId);
    pageServices.scrollToNextPage(elemToScroll);
  } catch (err) {
    pageServices.hideBackdrop();
    pageServices.disableLoadMoreBtn();
    showError(err);
  }
};

const onImageClick = e => {
  if (e.target.tagName !== 'IMG') {
    return;
  }
  pageServices.showBackdrop();
  pageServices.openImage(e.target.dataset.src);
};

const onInputFocus = e => {
  refs.form.classList.remove(CSS.TRANSPARENT);
  e.target.addEventListener('blur', () => {
    refs.form.classList.add(CSS.TRANSPARENT);
  });
};

const onStatusOnline = () => {
  pageServices.enableLoadMoreBtn();
  refs.gallery.addEventListener('click', onImageClick);

  const notFoundImages = document.querySelectorAll('img[alt="Not found"]');
  notFoundImages.forEach(notFoundImage => {
    const container = notFoundImage.closest('div');
    const liRef = notFoundImage.closest('li');
    liRef.classList.add(CSS.ACTIVE);
    api
      .fetchByID(notFoundImage.dataset.id)
      .then(data => {
        container.innerHTML = makeImage(data.hits[0]);
      })
      .then(() => {
        const newImage = container.querySelector('.photo-card__img');
        pageServices.showImage(newImage, liRef);
      });
  });
};

export { onSubmit, onLoadMore, onImageClick, onStatusOnline };