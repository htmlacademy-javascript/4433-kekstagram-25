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
  start: 80,
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
          min: 0,
          max: 1
        },
        step: .1
      });
      sliderElement.noUiSlider.set(1);
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        step: 1,
      });
      sliderElement.noUiSlider.set(100);
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        step: .1,
      });
      sliderElement.noUiSlider.set(3);
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        step: .1,
      });
      sliderElement.noUiSlider.set(3);
      break;
    case 'none':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      sliderElement.noUiSlider.set(100);
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

export {sliderElement, sliderValueElement, selectedEffect, imagePreviewElement};
