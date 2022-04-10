import consts from './consts.js';

const checkCommentLength = (comment) => {
  const commentLength = String(comment).length;
  return commentLength <= consts.COMMENT_MAX_LENGTH;
};

const showElement = (element) => {
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

const isEscapeKey = (evt) => evt.key === consts.ESCAPE_KEY;

const removeValue = (input) => {
  input.innerHtml = '';
  input.value = '';
};

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  const createTimeuot = (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };

  return createTimeuot();
};

export {checkCommentLength, showElement, hideElement, isEscapeKey, removeValue, shuffleArray, debounce};
