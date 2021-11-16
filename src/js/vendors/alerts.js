import { alert, error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const stack = new Stack({
  dir1: 'up',
  dir2: 'left',
  firstpos1: 20,
  firstpos2: 20,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: document.body,
});

const showAlert = (title, message) => {
  alert({
    title,
    text: message,
    delay: 2000,
    sticker: false,
    width: '280px',
    stack: stack,
  });
};

const showError = ({ title, message }) => {
  error({
    title,
    text: message,
    delay: 2000,
    sticker: false,
    width: '280px',
    stack: stack,
  });
};

export { showAlert, showError };