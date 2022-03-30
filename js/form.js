import {checkCommentLength} from './util.js';
import {sendData} from './send-data.js';

const formElement = document.querySelector('.img-upload__form');
const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const hashtagsInput = formElement.querySelector('#hashtags');
const descriptionInput = formElement.querySelector('#description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
}, false);

const validateHashtags = (value) => {
  const hashtags = value.split(' ');
  let isValidate = true;

  if (value.length > 0) {
    hashtags.forEach((hashtag) => {
      isValidate = isValidate && re.test(hashtag);
    });
  }
  return isValidate;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Хэштег должен начинаться с # и состоять только из букв и цифр'
);

pristine.addValidator(
  descriptionInput,
  checkCommentLength,
  'Длина комментария должна быть не больше 140 символов'
);

formElement.addEventListener('submit', (evt) => {
  const isValidate = pristine.validate();

  if (isValidate) {
    const formData = new FormData(evt.target);
    evt.preventDefault();

    const sendForm = () => sendData(formData);
    sendForm();
  } else {
    evt.preventDefault();
  }
});

export {hashtagsInput, descriptionInput};
