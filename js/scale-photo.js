import consts from './consts.js';

const imagePreviewElement = document.querySelector('.img-upload__preview img');

const scalingInput = document.querySelector('.scale__control--value');
const scalingBiggerButton = document.querySelector('.scale__control--bigger');
const scalingSmallerButton = document.querySelector('.scale__control--smaller');

const scalePhotoPreview = (value) => {
  const scale = parseInt(value, 10) / 100;
  imagePreviewElement.style.transform = `scale(${scale})`;
};

scalePhotoPreview(scalingInput.value);

scalingBiggerButton.addEventListener('click', () => {
  const newScale = parseInt(scalingInput.value, 10) + consts.SCALE_STEP;

  if (newScale <= consts.MAX_SCALE) {
    scalePhotoPreview(newScale);
    scalingInput.value = `${newScale}%`;
  }
});

scalingSmallerButton.addEventListener('click', () => {
  const newScale = parseInt(scalingInput.value, 10) - consts.SCALE_STEP;

  if (newScale >= consts.MIN_SCALE) {
    scalePhotoPreview(newScale);
    scalingInput.value = `${newScale}%`;
  }
});

export {scalingInput, scalePhotoPreview};
