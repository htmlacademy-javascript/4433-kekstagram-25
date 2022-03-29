import consts from './consts.js';

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectListInputs = document.querySelectorAll('.effects__radio');

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');

let selectedEffect = 'none';

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

const updateSliderOptions = (effectType) => {
  sliderElement.removeAttribute('disabled');

  switch (effectType) {
    case 'chrome':
    case 'sepia':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.SEPIA_MIN_VALUE,
          max: consts.SEPIA_MAX_VALUE
        },
        step: consts.SEPIA_STEP
      });
      sliderElement.noUiSlider.set(consts.SEPIA_MAX_VALUE);
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.MARVIN_MIN_VALUE,
          max: consts.MARVIN_MAX_VALUE
        },
        step: consts.MARVIN_STEP,
      });
      sliderElement.noUiSlider.set(consts.MARVIN_MAX_VALUE);
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.PHOBOS_MIN_VALUE,
          max: consts.PHOBOS_MAX_VALUE
        },
        step: consts.PHOBOS_STEP,
      });
      sliderElement.noUiSlider.set(3);
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.HEAT_MIN_VALUE,
          max: consts.HEAT_MAX_VALUE
        },
        step: consts.HEAT_STEP,
      });
      sliderElement.noUiSlider.set(consts.HEAT_MAX_VALUE);
      break;
    case 'none':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: consts.NONE_MIN_VALUE,
          max: consts.NONE_MAX_VALUE
        },
        step: consts.NONE_STEP,
      });
      sliderElement.noUiSlider.set(consts.NONE_MAX_VALUE);
      sliderElement.setAttribute('disabled', true);
      break;
  }
};

const setImgStyle = (style) => {
  imagePreviewElement.style.filter = style;
};

const setEffectStyle = (value) => {
  switch(selectedEffect) {
    case 'chrome':
      setImgStyle(`grayscale(${value})`);
      break;
    case 'sepia':
      setImgStyle(`sepia(${value})`);
      break;
    case 'marvin':
      setImgStyle(`invert(${value}%)`);
      break;
    case 'phobos':
      setImgStyle(`blur(${value}px)`);
      break;
    case 'heat':
      setImgStyle(`brightness(${value})`);
      break;
    case 'none':
      setImgStyle('');
      break;
  }
};

const setDefaultEffects = () => {
  selectedEffect = 'none';
  updateSliderOptions(selectedEffect);
  setEffectStyle();
  effectListInputs[0].checked = true;
};

effectListInputs.forEach((effectButton) => {
  effectButton.addEventListener('change', () => {
    imagePreviewElement.className = '';
    setEffectStyle();
    selectedEffect = effectButton.value;

    if (selectedEffect !== 'none') {
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
