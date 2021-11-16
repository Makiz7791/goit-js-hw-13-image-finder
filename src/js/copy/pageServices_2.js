// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/src/styles/main.scss';
// import getRefs from '../data/references';
// import makeImageCards from '../../templating/imageCards';
// import CSS from '../data/css';
// import { loadSpinner } from '../vendors/spinner';
// import NOT_FOUND_IMG_LINK from '../../images/iron2.png';

// const refs = getRefs();

// const options = {
//   url: NOT_FOUND_IMG_LINK,
//   css: CSS,
//   refs: refs,
//   makeImageCards: makeImageCards,
//   imageModal: basicLightbox,
// };

class PageServices {
    constructor({ url, css, refs, makeImageCards, imageModal }) {
      this._notFoundImageLink = url;
      this._css = css;
      this._refs = refs;
      this.makeImageCards = makeImageCards;
      this.imageModal = imageModal;
    }
  
    getNotFoundPicture = () => {
      const img = new Image();
      img.src = this._notFoundImageLink;
      img.dataset.src = this._notFoundImageLink;
      img.alt = 'Not found';
      img.classList.add(this._css.IMG, this._css.NOT_FOUND);
      return img;
    };
  
    getGallery = (data, totalResults, page) => {
      this.renderMarkup(data);
      this.showImages(page);
      if (totalResults > data.totalHits) {
        this.hideLoadMoreBtn();
        return;
      }
      this.showLoadMoreBtn();
    };
  
    renderMarkup = ({ hits }) => {
      const markup = this.makeImageCards(hits);
  
      this._refs.gallery.insertAdjacentHTML('beforeend', markup);
      this._refs.gallery.classList.remove(this._css.IS_HIDDEN);
    };
  
    showImages = page => {
      const images = document.querySelectorAll(`[data-page="${page}"]`);
  
      images.forEach(image => {
        const liRef = image.closest('li');
  
        this.showImage(image, liRef);
  
        image.onerror = () => {
          const notFoundImage = this.getNotFoundPicture(this._notFoundImageLink);
          notFoundImage.dataset.id = liRef.dataset.id;
          image.replaceWith(notFoundImage);
          setTimeout(() => {
            liRef.classList.remove(this._css.ACTIVE);
          }, 2000);
        };
      });
    };
  
    showImage = (image, liRef) => {
      image.addEventListener(
        'load',
        () => {
          image.classList.remove(this._css.IS_HIDDEN);
          liRef.classList.remove(this._css.ACTIVE);
        },
        { once: true },
      );
    };
  
    getOpenImageOptions = () => {
      return {
        onShow: () => {
          document.body.classList.add(this._css.LOCK);
        },
        onClose: () => {
          document.body.classList.remove(this._css.LOCK);
        },
      };
    };
  
    openImage = src => {
      const options = {
        onShow: () => {
          document.body.classList.add(this._css.LOCK);
        },
        onClose: () => {
          document.body.classList.remove(this._css.LOCK);
        },
      };
  
      const instance = this.imageModal.create(
        `
      <img src="${src}">
  `,
        options,
      );
  
      const imageRef = instance.element().querySelector('img');
  
      imageRef.addEventListener(
        'load',
        () => {
          instance.show();
          this.hideBackdrop();
        },
        { once: true },
      );
    };
  
    clearGallery = () => {
      this.hideGallery();
      const promise = new Promise(res => {
        setTimeout(() => {
          this._refs.gallery.innerHTML = '';
          res(true);
        }, 250);
      });
      return promise;
    };
  
    hideGallery = () => {
      this._refs.gallery.classList.add(this._css.IS_HIDDEN);
    };
  
    showLoadMoreBtn = () => {
      this._refs.loadMoreBtn.disabled = false;
      this._refs.loadMoreBtn.classList.remove(this._css.IS_HIDDEN);
    };
  
    hideLoadMoreBtn = () => {
      this._refs.loadMoreBtn.disabled = true;
      this._refs.loadMoreBtn.classList.add(this._css.IS_HIDDEN);
    };
  
    disableLoadMoreBtn = () => {
      this._refs.loadMoreBtn.disabled = true;
    };
  
    enableLoadMoreBtn = () => {
      this._refs.loadMoreBtn.disabled = false;
    };
  
    getElementToScroll = id => {
      return document.querySelector(`[data-id="${id}"]`);
    };
  
    scrollToNextPage = element => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };
  
    showBackdrop = () => {
      this._refs.backdrop.classList.remove(this._css.IS_HIDDEN);
      loadSpinner.spin(this._refs.loadMoreSpinner);
    };
  
    hideBackdrop = () => {
      this._refs.backdrop.classList.add(this._css.IS_HIDDEN);
      loadSpinner.stop();
    };
  }
  
  // const getNotFoundPicture = src => {
  //   const img = new Image();
  //   img.src = src;
  //   img.dataset.src = src;
  //   img.alt = 'Not found';
  //   img.classList.add(CSS.IMG, CSS.NOT_FOUND);
  //   return img;
  // };
  
  // const getGallery = (data, totalResults, page) => {
  //   renderMarkup(data);
  //   showImages(page);
  //   if (totalResults > data.totalHits) {
  //     hideLoadMoreBtn();
  //     return;
  //   }
  //   showLoadMoreBtn();
  // };
  
  // const renderMarkup = ({ hits }) => {
  //   const markup = makeImageCards(hits);
  //   refs.gallery.insertAdjacentHTML('beforeend', markup);
  //   refs.gallery.classList.remove(CSS.IS_HIDDEN);
  // };
  
  // const showImages = page => {
  //   const images = document.querySelectorAll(`[data-page="${page}"]`);
  //   images.forEach(image => {
  //     const liRef = image.closest('li');
  
  //     showImage(image, liRef);
  
  //     image.onerror = () => {
  //       const notFoundImage = getNotFoundPicture(NOT_FOUND_IMG_LINK);
  //       notFoundImage.dataset.id = liRef.dataset.id;
  //       image.replaceWith(notFoundImage);
  //       setTimeout(() => {
  //         liRef.classList.remove(CSS.ACTIVE);
  //       }, 2000);
  //     };
  //   });
  // };
  
  // const showImage = (image, liRef) => {
  //   image.addEventListener(
  //     'load',
  //     () => {
  //       image.classList.remove(CSS.IS_HIDDEN);
  //       liRef.classList.remove(CSS.ACTIVE);
  //     },
  //     { once: true },
  //   );
  // };
  
  // const clearGallery = () => {
  //   hideGallery();
  //   const promise = new Promise(res => {
  //     setTimeout(() => {
  //       refs.gallery.innerHTML = '';
  //       res(true);
  //     }, 250);
  //   });
  //   return promise;
  // };
  
  // const hideGallery = () => {
  //   refs.gallery.classList.add(CSS.IS_HIDDEN);
  // };
  
  // const showLoadMoreBtn = () => {
  //   refs.loadMoreBtn.disabled = false;
  //   refs.loadMoreBtn.classList.remove(CSS.IS_HIDDEN);
  // };
  
  // const hideLoadMoreBtn = () => {
  //   refs.loadMoreBtn.disabled = true;
  //   refs.loadMoreBtn.classList.add(CSS.IS_HIDDEN);
  // };
  
  // const disableLoadMoreBtn = () => {
  //   refs.loadMoreBtn.disabled = true;
  // };
  
  // const enableLoadMoreBtn = () => {
  //   refs.loadMoreBtn.disabled = false;
  // };
  
  // const getElementToScroll = id => {
  //   return document.querySelector(`[data-id="${id}"]`);
  // };
  
  // const scrollToNextPage = element => {
  //   element.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //   });
  // };
  
  // const showBackdrop = () => {
  //   refs.backdrop.classList.remove(CSS.IS_HIDDEN);
  //   loadSpinner.spin(refs.loadMoreSpinner);
  // };
  
  // const hideBackdrop = () => {
  //   refs.backdrop.classList.add(CSS.IS_HIDDEN);
  //   loadSpinner.stop();
  // };
  
  // export {
  //   renderMarkup,
  //   showLoadMoreBtn,
  //   hideLoadMoreBtn,
  //   disableLoadMoreBtn,
  //   clearGallery,
  //   getGallery,
  //   getElementToScroll,
  //   scrollToNextPage,
  //   showBackdrop,
  //   hideBackdrop,
  //   hideGallery,
  //   getNotFoundPicture,
  //   showImage,
  //   enableLoadMoreBtn,
  //   ps,
  // };
  
  export { PageServices };