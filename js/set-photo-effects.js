import consts from './consts.js';
import {hideElement, showElement} from './util.js';

const imagePreviewEl = document.querySelector('.img-upload__preview img');
const effectListInputEls = document.querySelectorAll('.effects__radio');

const sliderEl = document.querySelector('.effect-level__slider');
const sliderValueEl = document.querySelector('.effect-level__value');
const sliderContainerEl = document.querySelector('.img-upload__effect-level');

const EffectTypes = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

let selectedEffect = EffectTypes.NONE;

noUiSlider.create(sliderEl, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderEl.disabled = true;
hideElement(sliderContainerEl);

const updateSliderOptions = (effectType) => {
  sliderEl.disabled = false;
  if (sliderContainerEl.classList.contains('hidden')) {
    showElement(sliderContainerEl);
  }

  switch (effectType) {
    case EffectTypes.CHROME:
    case EffectTypes.SEPIA:
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: consts.SEPIA_MIN_VALUE,
          max: consts.SEPIA_MAX_VALUE
        },
        step: consts.SEPIA_STEP
      });
      sliderEl.noUiSlider.set(consts.SEPIA_MAX_VALUE);
      break;
    case EffectTypes.MARVIN:
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: consts.MARVIN_MIN_VALUE,
          max: consts.MARVIN_MAX_VALUE
        },
        step: consts.MARVIN_STEP,
      });
      sliderEl.noUiSlider.set(consts.MARVIN_MAX_VALUE);
      break;
    case EffectTypes.PHOBOS:
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: consts.PHOBOS_MIN_VALUE,
          max: consts.PHOBOS_MAX_VALUE
        },
        step: consts.PHOBOS_STEP,
      });
      sliderEl.noUiSlider.set(consts.PHOBOS_MAX_VALUE);
      break;
    case EffectTypes.HEAT:
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: consts.HEAT_MIN_VALUE,
          max: consts.HEAT_MAX_VALUE
        },
        step: consts.HEAT_STEP,
      });
      sliderEl.noUiSlider.set(consts.HEAT_MAX_VALUE);
      break;
    case EffectTypes.NONE:
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: consts.NONE_MIN_VALUE,
          max: consts.NONE_MAX_VALUE
        },
        step: consts.NONE_STEP,
      });
      sliderEl.noUiSlider.set(consts.NONE_MAX_VALUE);
      sliderEl.disabled = true;
      hideElement(sliderContainerEl);
      break;
  }
};

const setImgStyle = (style) => {
  imagePreviewEl.style.filter = style;
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
  effectListInputEls[0].checked = true;
};

effectListInputEls.forEach((effectButton) => {
  effectButton.addEventListener('change', () => {
    imagePreviewEl.className = '';
    setEffectStyle();
    selectedEffect = effectButton.value;

    if (selectedEffect !== EffectTypes.NONE) {
      const newEffectClass = `effects__preview--${selectedEffect}`;
      imagePreviewEl.classList.add(newEffectClass);
    }

    updateSliderOptions(selectedEffect);
  });
});

sliderEl.noUiSlider.on('update', () => {
  sliderValueEl.value = sliderEl.noUiSlider.get();
  setEffectStyle(sliderValueEl.value);
});

export {sliderEl, sliderValueEl, imagePreviewEl, setDefaultEffects};
