import {checkCommentLength} from './util.js';
import {sendData} from './send-data.js';
import consts from './consts.js';

const formElement = document.querySelector('.img-upload__form');
const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const hashtagsInput = formElement.querySelector('#hashtags');
const descriptionInput = formElement.querySelector('#description');
const submitButton = formElement.querySelector('.img-upload__submit');

const pristine = window.Pristine(formElement, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
}, false);

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  let isValidate = true;

  if (value.length > 0) {
    hashtags.forEach((hashtag, index) => {
      const prevHashtag = hashtags[index - 1];
      if (hashtag.length > consts.HASHTAG_MAX_LENGTH) {
        isValidate = false;
      }

      if (index > 0 && prevHashtag && hashtag === prevHashtag) {
        isValidate = false;
      }

      isValidate = isValidate && re.test(hashtag);
    });
  }
  return isValidate;
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Неверный формат хэштега'
);

pristine.addValidator(
  descriptionInput,
  checkCommentLength,
  'Длина комментария должна быть не больше 140 символов'
);

formElement.addEventListener('submit', (evt) => {
  const isValidate = pristine.validate();

  if (isValidate) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    evt.preventDefault();

    const sendForm = () => sendData(formData);
    sendForm();
  } else {
    evt.preventDefault();
  }
});


export {hashtagsInput, descriptionInput, unblockSubmitButton};
