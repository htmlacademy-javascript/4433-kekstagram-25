import {hideElement, showElement} from './util.js';

const closePopup = (popupElement) => {
  hideElement(popupElement);
  document.body.classList.remove('modal-open');
};

const openPopup = (popupElement) => {
  showElement(popupElement);
  document.body.classList.add('modal-open');
};

export {openPopup, closePopup};
