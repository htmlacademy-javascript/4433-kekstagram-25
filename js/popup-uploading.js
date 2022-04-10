import {openPopup, closePopup} from './popup.js';
import {isEscapeKey, removeValue} from './util.js';
import {hashtagsInputEl, descriptionInputEl} from './form.js';
import {sliderEl, sliderValueEl, setDefaultEffects} from './set-photo-effects.js';
import {scalingInputEl, scalePhotoPreview} from './scale-photo.js';
import consts from './consts.js';

const popupEl = document.querySelector('.img-upload__overlay--uploading_form');
const uploadFileInputEl = document.querySelector('#upload-file');
const popupCloseButtonEl = popupEl.querySelector('.img-upload__cancel');
const imagePreviewEl = document.querySelector('.img-upload__preview img');
const effectsPreviewEl = document.querySelectorAll('.effects__preview');

const setImageEffectBackground = (url) => {
  effectsPreviewEl.forEach((element) => {
    element.style.backgroundImage = `url(${url})`;
  });
};

const onClosingUploadingPopup = () => {
  closePopup(popupEl);

  removeValue(uploadFileInputEl);
  removeValue(hashtagsInputEl);
  removeValue(descriptionInputEl);

  scalingInputEl.value = '100%';
  scalePhotoPreview(100);

  removeValue(sliderValueEl);
  sliderEl.setAttribute('disabled', true);
  imagePreviewEl.classList = '';
  imagePreviewEl.style.filter = '';
  setImageEffectBackground('');
  setDefaultEffects();
};

const onPopupEscKeydown = (evt) => {
  const activeElement = document.activeElement;
  const isPopupInputActive = (activeElement === hashtagsInputEl) || (activeElement === descriptionInputEl);

  if (isEscapeKey(evt) && !isPopupInputActive) {
    evt.preventDefault();
    onClosingUploadingPopup();
  }
};

uploadFileInputEl.addEventListener('change', () => {
  const file = uploadFileInputEl.files[0];
  const fileName = file.name.toLowerCase();
  const matches = consts.FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const fileUrl = URL.createObjectURL(file);
    imagePreviewEl.src = fileUrl;
    setImageEffectBackground(fileUrl);

    openPopup(popupEl);
    document.addEventListener('keydown', onPopupEscKeydown);
  }
});

uploadFileInputEl.addEventListener('change', () => {
  openPopup(popupEl);
  document.addEventListener('keydown', onPopupEscKeydown);
});

popupCloseButtonEl.addEventListener('click', () => {
  onClosingUploadingPopup();
  document.removeEventListener('keydown', onPopupEscKeydown);
});

export {popupEl};
