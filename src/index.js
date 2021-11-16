import 'material-icons/iconfont/material-icons.css';
import './sass/main.scss';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import { inputLoadSpinner, loadSpinner } from './js/vendors/spinner';
import App from './js/events/events';
import CSS from './js/data/css';
import NOT_FOUND_IMG_LINK from './images/iron2.png';
import makeImageCards from './templating/imageCards';
import makeImage from './templating/image';
import getRefs from './js/data/references';
const refs = getRefs();
const options = {
  not_fnd_img_url: NOT_FOUND_IMG_LINK,
  css: CSS,
  refs,
  makeImageCards,
  makeImage,
  imageModal: basicLightbox,
  loadSpinner,
  inputLoadSpinner,
};
const app = new App(options);
app.init();