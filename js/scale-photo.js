import consts from './consts.js';

const imagePreviewEl = document.querySelector('.img-upload__preview img');

const scalingInputEl = document.querySelector('.scale__control--value');
const scalingBiggerButtonEl = document.querySelector('.scale__control--bigger');
const scalingSmallerButtonEl = document.querySelector('.scale__control--smaller');

const scalePhotoPreview = (value) => {
  const scale = parseInt(value, 10) / 100;
  imagePreviewEl.style.transform = `scale(${scale})`;
};

scalePhotoPreview(scalingInputEl.value);

scalingBiggerButtonEl.addEventListener('click', () => {
  const newScale = parseInt(scalingInputEl.value, 10) + consts.SCALE_STEP;

  if (newScale <= consts.MAX_SCALE) {
    scalePhotoPreview(newScale);
    scalingInputEl.value = `${newScale}%`;
  }
});

scalingSmallerButtonEl.addEventListener('click', () => {
  const newScale = parseInt(scalingInputEl.value, 10) - consts.SCALE_STEP;

  if (newScale >= consts.MIN_SCALE) {
    scalePhotoPreview(newScale);
    scalingInputEl.value = `${newScale}%`;
  }
});

export {scalingInputEl, scalePhotoPreview};
