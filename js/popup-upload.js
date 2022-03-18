import {openPopup, closePopup} from './popup.js';
import {isEscapeKey, removeInputValue} from './util.js';
import {hashtagsInput, descriptionInput} from './form.js';

const popupElement = document.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const popupCloseButton = popupElement.querySelector('.img-upload__cancel');

const onPopupEscKeydown = (evt) => {
  const activeElement = document.activeElement;
  const isPopupInputActive = (activeElement === hashtagsInput) || (activeElement === descriptionInput);
  if (isEscapeKey(evt) && !isPopupInputActive) {
    evt.preventDefault();
    closePopup(popupElement);
    removeInputValue(uploadFileInput);
  }
};

uploadFileInput.addEventListener('change', () => {
  openPopup(popupElement);
  document.addEventListener('keydown', onPopupEscKeydown);
});

popupCloseButton.addEventListener('click', () => {
  closePopup(popupElement);

  removeInputValue(uploadFileInput);
  removeInputValue(hashtagsInput);
  removeInputValue(descriptionInput);

  document.removeEventListener('keydown', onPopupEscKeydown);
});
