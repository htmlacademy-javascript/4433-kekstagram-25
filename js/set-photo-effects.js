import consts from './consts.js';
import {hideElement, showElement} from './util.js';

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectListInputs = document.querySelectorAll('.effects__radio');

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

const EffectTypes = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

let selectedEffect = EffectTypes.NONE;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.setAttribute('disabled', true);
hideElement(sliderContainerElement);

const updateSliderOptions = (effectType) => {
  sliderElement.removeAttribute('disabled');
  if (sliderContainerElement.classList.contains('hidden')) {
    showElement(sliderContainerElement);
  }

  switch (effectType) {
    case EffectTypes.CHROME:
    case EffectTypes.SEPIA:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.SEPIA_MIN_VALUE,
          max: consts.SEPIA_MAX_VALUE
        },
        step: consts.SEPIA_STEP
      });
      sliderElement.noUiSlider.set(consts.SEPIA_MAX_VALUE);
      break;
    case EffectTypes.MARVIN:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.MARVIN_MIN_VALUE,
          max: consts.MARVIN_MAX_VALUE
        },
        step: consts.MARVIN_STEP,
      });
      sliderElement.noUiSlider.set(consts.MARVIN_MAX_VALUE);
      break;
    case EffectTypes.PHOBOS:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.PHOBOS_MIN_VALUE,
          max: consts.PHOBOS_MAX_VALUE
        },
        step: consts.PHOBOS_STEP,
      });
      sliderElement.noUiSlider.set(consts.PHOBOS_MAX_VALUE);
      break;
    case EffectTypes.HEAT:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.HEAT_MIN_VALUE,
          max: consts.HEAT_MAX_VALUE
        },
        step: consts.HEAT_STEP,
      });
      sliderElement.noUiSlider.set(consts.HEAT_MAX_VALUE);
      break;
    case EffectTypes.NONE:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.NONE_MIN_VALUE,
          max: consts.NONE_MAX_VALUE
        },
        step: consts.NONE_STEP,
      });
      sliderElement.noUiSlider.set(consts.NONE_MAX_VALUE);
      sliderElement.setAttribute('disabled', true);
      hideElement(sliderContainerElement);
      break;
  }
};

const setImgStyle = (style) => {
  imagePreviewElement.style.filter = style;
};

const setEffectStyle = (value) => {
  switch(selectedEffect) {
    case EffectTypes.CHROME:
      setImgStyle(`grayscale(${value})`);
      break;
    case EffectTypes.SEPIA:
      setImgStyle(`sepia(${value})`);
      break;
    case EffectTypes.MARVIN:
      setImgStyle(`invert(${value}%)`);
      break;
    case EffectTypes.PHOBOS:
      setImgStyle(`blur(${value}px)`);
      break;
    case EffectTypes.HEAT:
      setImgStyle(`brightness(${value})`);
      break;
    case EffectTypes.NONE:
      setImgStyle('');
      break;
  }
};

const setDefaultEffects = () => {
  selectedEffect = EffectTypes.NONE;
  updateSliderOptions(selectedEffect);
  setEffectStyle();
  effectListInputs[0].checked = true;
};

effectListInputs.forEach((effectButton) => {
  effectButton.addEventListener('change', () => {
    imagePreviewElement.className = '';
    setEffectStyle();
    selectedEffect = effectButton.value;

    if (selectedEffect !== EffectTypes.NONE) {
      const newEffectClass = `effects__preview--${selectedEffect}`;
      imagePreviewElement.classList.add(newEffectClass);
    }

    updateSliderOptions(selectedEffect);
  });
});

sliderElement.noUiSlider.on('update', () => {
  sliderValueElement.value = sliderElement.noUiSlider.get();
  setEffectStyle(sliderValueElement.value);
});

export {sliderElement, sliderValueElement, imagePreviewElement, setDefaultEffects};
