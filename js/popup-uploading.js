import {openPopup, closePopup} from './popup.js';
import {isEscapeKey, removeValue} from './util.js';
import {hashtagsInput, descriptionInput} from './form.js';
import {sliderElement, sliderValueElement, imagePreviewElement, setDefaultEffects} from './set-photo-effects.js';
import {scalingInput, scalePhotoPreview} from './scale-photo.js';

const popupElement = document.querySelector('.img-upload__overlay--uploading_form');
const uploadFileInput = document.querySelector('#upload-file');
const popupCloseButton = popupElement.querySelector('.img-upload__cancel');

const onClosingUploadingPopup = () => {
  closePopup(popupElement);

  removeValue(uploadFileInput);
  removeValue(hashtagsInput);
  removeValue(descriptionInput);

  scalingInput.value = '100%';
  scalePhotoPreview(100);

  removeValue(sliderValueElement);
  sliderElement.setAttribute('disabled', true);
  imagePreviewElement.classList = '';
  imagePreviewElement.style.filter = '';
  setDefaultEffects();
};

const onPopupEscKeydown = (evt) => {
  const activeElement = document.activeElement;
  const isPopupInputActive = (activeElement === hashtagsInput) || (activeElement === descriptionInput);

  if (isEscapeKey(evt) && !isPopupInputActive) {
    evt.preventDefault();
    onClosingUploadingPopup();
  }
};

uploadFileInput.addEventListener('change', () => {
  openPopup(popupElement);
  document.addEventListener('keydown', onPopupEscKeydown);
});

uploadFileInput.addEventListener('change', () => {
  openPopup(popupElement);
  document.addEventListener('keydown', onPopupEscKeydown);
});

popupCloseButton.addEventListener('click', () => {
  onClosingUploadingPopup();
  document.removeEventListener('keydown', onPopupEscKeydown);
});

export {popupElement};
