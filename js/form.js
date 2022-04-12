import {checkCommentLength} from './util.js';
import {sendData} from './send-data.js';
import consts from './consts.js';

const formEl = document.querySelector('.img-upload__form');
const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const hashtagsInputEl = formEl.querySelector('#hashtags');
const descriptionInputEl = formEl.querySelector('#description');
const submitButtonEl = formEl.querySelector('.img-upload__submit');

const pristine = window.Pristine(formEl, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
}, false);

function hasUniqueElements(hashtags) {
  const uniqueHashtags = [];

  for (const hashtag of hashtags) {
    if (!uniqueHashtags.includes(hashtag)) {
      uniqueHashtags.push(hashtag);
    }
  }

  return uniqueHashtags.length === hashtags.length;
}


const validateHashtags = (value) => {
  let isValidate = true;

  if (value.length > 0) {
    const hashtags = value.toLowerCase().split(' ');

    if (hashtags.length > 5) {
      return false;
    }

    if (!hasUniqueElements(hashtags)) {
      return false;
    }

    hashtags.forEach((hashtag) => {
      if (hashtag.length > consts.HASHTAG_MAX_LENGTH) {
        isValidate = false;
      }

      isValidate = isValidate && re.test(hashtag);
    });
  }

  return isValidate;
};

const blockSubmitButton = () => {
  submitButtonEl.disabled = true;
  submitButtonEl.textContent = consts.UPLOADING_BUTTON_TEXT_PROGRESS;
};

const unblockSubmitButton = () => {
  submitButtonEl.disabled = false;
  submitButtonEl.textContent = consts.UPLOADING_BUTTON_TEXT;
};

pristine.addValidator(
  hashtagsInputEl,
  validateHashtags,
  consts.HASHTAG_ERROR_MESSAGE
);

pristine.addValidator(
  descriptionInputEl,
  checkCommentLength,
  consts.COMMENT_ERROR_MESSAGE
);

formEl.addEventListener('submit', (evt) => {
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

export {hashtagsInputEl, descriptionInputEl, unblockSubmitButton};
