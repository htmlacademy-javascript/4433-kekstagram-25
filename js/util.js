import constList from './consts.js';

const checkCommentLength = (comment) => {
  const commentLength = String(comment).length;

  return commentLength <= constList.COMMENT_MAX_LENGTH;
};

const showElement = (element) => {
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const removeInputValue = (input) => {
  input.innerHtml = '';
};

export {checkCommentLength, showElement, hideElement, isEscapeKey, removeInputValue};
