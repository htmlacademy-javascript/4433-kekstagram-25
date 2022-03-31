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

const isEscapeKey = (evt) => evt.key === 'Escape';

const removeValue = (input) => {
  input.innerHtml = '';
  input.value = '';
};

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export {checkCommentLength, showElement, hideElement, isEscapeKey, removeValue, shuffleArray};
