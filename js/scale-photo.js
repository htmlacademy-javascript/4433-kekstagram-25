const SCALE_STEP = 25;

const imagePreviewElement = document.querySelector('.img-upload__preview img');

const rangeInput = document.querySelector('.scale__control--value');
const rangeBiggerButton = document.querySelector('.scale__control--bigger');
const rangeSmallerButton = document.querySelector('.scale__control--smaller');

const scalePhotoPreview = (value) => {
  const scale = parseInt(value, 10) / 100;
  imagePreviewElement.style.transform = `scale(${scale})`;
};

scalePhotoPreview(rangeInput.value);

rangeBiggerButton.addEventListener('click', () => {
  rangeInput.value = parseInt(rangeInput.value, 10) + SCALE_STEP;
  scalePhotoPreview(rangeInput.value);
});

rangeSmallerButton.addEventListener('click', () => {
  rangeInput.value = parseInt(rangeInput.value, 10) - SCALE_STEP;
  scalePhotoPreview(rangeInput.value);
});

rangeInput.addEventListener('change', () => {
  scalePhotoPreview(rangeInput.value);
});

rangeInput.addEventListener('input', () => {
  scalePhotoPreview(rangeInput.value);
});
