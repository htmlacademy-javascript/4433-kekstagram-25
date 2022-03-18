const SCALE_STEP = 25;

const imagePreviewElement = document.querySelector('.img-upload__preview img');

const rangeInput = document.querySelector('.scale__control--value');
const rangeBiggerButton = document.querySelector('.scale__control--bigger');
const rangeSmallerButton = document.querySelector('.scale__control--smaller');

imagePreviewElement.style.transform = `scale(${parseInt(rangeInput.value, 10) / 100})`;

rangeBiggerButton.addEventListener('click', () => {
  rangeInput.value = parseInt(rangeInput.value, 10) + SCALE_STEP;
  imagePreviewElement.style.transform = `scale(${parseInt(rangeInput.value, 10) / 100})`;
});

rangeSmallerButton.addEventListener('click', () => {
  rangeInput.value = parseInt(rangeInput.value, 10) - SCALE_STEP;
  imagePreviewElement.style.transform = `scale(${parseInt(rangeInput.value, 10) / 100})`;
});

rangeInput.addEventListener('change', () => {
  imagePreviewElement.style.transform = `scale(${parseInt(rangeInput.value, 10) / 100})`;
});

rangeInput.addEventListener('input', () => {
  imagePreviewElement.style.transform = `scale(${parseInt(rangeInput.value, 10) / 100})`;
});

