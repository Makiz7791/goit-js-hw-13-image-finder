// import 'material-icons/iconfont/material-icons.css';
// import './sass/main.scss';
// import { onSubmit, onLoadMore, onImageClick, onStatusOnline } from './js/events/eventsCopy';
// import getRefs from './js/data/references';

// const refs = getRefs();

// refs.form.addEventListener('submit', onSubmit);

// refs.loadMoreBtn.addEventListener('click', onLoadMore);

// refs.gallery.addEventListener('click', onImageClick);

// window.addEventListener('online', onStatusOnline);

// window.addEventListener('offline', () => {
//   refs.gallery.removeEventListener('click', onImageClick);
//   console.log('no internet connection');
// });

// class Parent {
//   constructor(parent) {
//     this.aarent = parent;
//   }
//   parent = () => {
//     console.log(this.parent);
//   };
// }

// class Child1 extends Parent {
//   // api
//   #abra = 'con';
//   constructor(child1, parent) {
//     super(parent);
//     this.child1 = child1;
//   }

//   Child1 = () => {
//     console.log(this.child1, this.#abra);
//   };
// }

// class Child2 extends Child1 {
//   // events

//   constructor(child1, parent, child2) {
//     super(child1, parent);
//     this.child2 = child2;
//   }

//   Child2 = () => {
//     console.log(this.child2);
//   };
// }

// const app = new Child2('child1', 'parent', 'child2');

// console.log(app.Child1());

// import { showAlert, showError } from '../vendors/alerts';

import App from './js/events/events';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import { inputLoadSpinner, loadSpinner } from './js/vendors/spinner';
import { showAlert, showError } from './js/vendors/alerts';
import ALERTS from './js/data/alertsMsgs';
import CSS from './js/data/css';
import NOT_FOUND_IMG_LINK from './images/iron2.png';
import makeImageCards from './templating/imageCards';
import makeImage from './templating/image';

import getRefs from './js/data/references';

const refs = getRefs();

const options = {
  not_fnd_img_url: NOT_FOUND_IMG_LINK,
  css: CSS,
  refs: refs,
  makeImageCards: makeImageCards,
  makeImage: makeImage,
  imageModal: basicLightbox,
  loadSpinner: loadSpinner,
  inputLoadSpinner: inputLoadSpinner,
};

const app = new App(options);

app.init();