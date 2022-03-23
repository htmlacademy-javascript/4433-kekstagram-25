const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const imagePreviewElement = document.querySelector('.img-upload__preview img');

const scaleInput = document.querySelector('.scale__control--value');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');

const scalePhotoPreview = (value) => {
  const scale = parseInt(value, 10) / 100;
  imagePreviewElement.style.transform = `scale(${scale})`;
};

scalePhotoPreview(scaleInput.value);

scaleBiggerButton.addEventListener('click', () => {
  const newScale = parseInt(scaleInput.value, 10) + SCALE_STEP;

  if (newScale <= MAX_SCALE) {
    scalePhotoPreview(newScale);
    scaleInput.value = `${newScale}%`;
  }
});

scaleSmallerButton.addEventListener('click', () => {
  const newScale = parseInt(scaleInput.value, 10) - SCALE_STEP;

  if (newScale >= MIN_SCALE) {
    scalePhotoPreview(newScale);
    scaleInput.value = `${newScale}%`;
  }
});

export {scaleInput, scalePhotoPreview};
