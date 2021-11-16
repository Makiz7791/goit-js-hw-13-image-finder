import { Spinner } from 'spin.js';

const inputLoadSpinner = new Spinner({
  lines: 11,
  length: 3,
  width: 2,
  radius: 5,
  scale: 1.0,
  corners: 1,
  color: '#3a2f55',
  fadeColor: 'transparent',
  animation: 'spinner-line-shrink',
  rotate: 0,
  direction: 1,
  speed: 1,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: '0 0 1px transparent',
  position: 'absolute',
});

const loadSpinner = new Spinner({
  lines: 12,
  length: 7,
  width: 1,
  radius: 10,
  scale: 2.0,
  corners: 1,
  color: '#ded7f0',
  fadeColor: 'transparent',
  animation: 'spinner-line-shrink',
  rotate: 0,
  direction: 1,
  speed: 1,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: '0 0 1px transparent',
  position: 'absolute',
});

export { inputLoadSpinner, loadSpinner };