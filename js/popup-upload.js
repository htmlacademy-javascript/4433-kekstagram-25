import {openPopup, closePopup} from './popup.js';
import {isEscapeKey} from './util.js';

const popupElement = document.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const popupCloseButton = popupElement.querySelector('.img-upload__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup(popupElement);
    uploadFileInput.value = '';
  }
};

uploadFileInput.addEventListener('change', () => {
  openPopup(popupElement);

  document.addEventListener('keydown', onPopupEscKeydown);
});


popupCloseButton.addEventListener('click', () => {
  closePopup(popupElement);
  document.removeEventListener('keydown', onPopupEscKeydown);
});
