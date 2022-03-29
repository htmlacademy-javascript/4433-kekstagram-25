import {hide, show} from './util.js';

const close = (popupElement) => {
  hide(popupElement);
  document.body.classList.remove('modal-open');
};

const open = (popupElement) => {
  show(popupElement);
  document.body.classList.add('modal-open');
};

export {open, close};
