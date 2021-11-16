import { showAlert, showError } from '../vendors/alerts';
import ALERTS from '../data/alertsMsgs';
import PageServices from '../services/pageServices';

export default class App extends PageServices {
  constructor({
    not_fnd_img_url,
    css,
    refs,
    makeImageCards,
    makeImage,
    imageModal,
    loadSpinner,
    inputLoadSpinner,
  }) {
    super({
      not_fnd_img_url,
      css,
      refs,
      makeImageCards,
      makeImage,
      imageModal,
      loadSpinner,
      inputLoadSpinner,
    });
  }

  loadListeners = () => {
    this._refs.form.addEventListener('submit', this.onSubmit);

    this._refs.loadMoreBtn.addEventListener('click', this.onLoadMore);

    this._refs.gallery.addEventListener('click', this.onImageClick);

    window.addEventListener('online', this.onStatusOnline);

    window.addEventListener('offline', this.onStatusOffline);
  };

  onSubmit = async e => {
    try {
      e.preventDefault();
      const form = e.currentTarget;
      const query = form.elements.query.value.toLowerCase().trim();
      if (!query) {
        showAlert(ALERTS.EMPTY);
        return;
      }
      this.getNotFoundPicture(this._notFoundImageLink);
      this.inputLoadSpinner.spin(this._refs.searchSpin);
      this.hideLoadMoreBtn();
      this.resetPage();

      const resultsArray = await Promise.all([this.fetchPictures(query), this.clearGallery()]); // await
      const data = resultsArray[0];
      const galleryCards = data.hits;
      if (!galleryCards.length) {
        showAlert(query, ALERTS.NOT_FOUND);
        this.inputLoadSpinner.stop();
        return;
      }
      const normalizeData = this.getNormalizeData(data);
      this.countTotalResults();
      this.getGallery(normalizeData, this.resultsCounter, this.page);
      this.inputLoadSpinner.stop();
      form.classList.add(this._css.TRANSPARENT);

      this._refs.input.addEventListener('focus', this.onInputFocus);
      this._refs.form.reset();
    } catch (err) {
      this.hideLoadMoreBtn();
      this.clearGallery();
      showError(err);
      this.inputLoadSpinner.stop();
    }
  };

  onLoadMore = async () => {
    try {
      this.incrementPage();
      this.showBackdrop();
      this.disableLoadMoreBtn();

      const data = await this.fetchPictures(this.query); // await

      this.hideBackdrop();

      const galleryCards = data.hits;
      if (!galleryCards.length) {
        showAlert(query, ALERTS.NOT_RESPONDING);
        return;
      }

      const normalizeData = this.getNormalizeData(data);
      this.countTotalResults();
      this.getGallery(normalizeData, this.resultsCounter, this.page);

      this.scrollToNextPage(normalizeData);
    } catch (err) {
      this.hideBackdrop();
      this.disableLoadMoreBtn();
      showError(err);
    }
  };

  onImageClick = e => {
    if (e.target.tagName !== 'IMG') {
      return;
    }
    this.showBackdrop();
    this.openImage(e.target.dataset.src);
  };

  onInputFocus = e => {
    this._refs.form.classList.remove(this._css.TRANSPARENT);
    e.target.addEventListener('blur', () => {
      this._refs.form.classList.add(this._css.TRANSPARENT);
    });
  };

  onStatusOnline = async () => {
    console.log('online');
    this.enableLoadMoreBtn();
    this._refs.gallery.addEventListener('click', this.onImageClick);
    const notFoundImages = document.querySelectorAll(this._refs.notFoundImageSelector);
    notFoundImages.forEach(notFoundImage => {
      const container = notFoundImage.closest(this._refs.divContainerSelector);
      const liRef = notFoundImage.closest(this._refs.liRefSelector);
      liRef.classList.add(this._css.ACTIVE);

      this.fetchByID(notFoundImage.dataset.id)
        .then(data => {
          container.innerHTML = this.makeImage(data.hits[0]);
        })
        .then(() => {
          const newImage = container.querySelector(this._refs.imageSelector);
          this.showImage(newImage, liRef);
        })
        .catch(showError);
    });
  };

  onStatusOffline = () => {
    this._refs.gallery.removeEventListener('click', this.onImageClick);
    console.log('no internet connection');
  };

  init = () => {
    this.loadListeners();
  };
}