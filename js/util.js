import consts from './consts.js';

const checkCommentLength = (comment) => {
  const commentLength = String(comment).length;
  return commentLength <= consts.COMMENT_MAX_LENGTH;
};

const show = (element) => {
  element.classList.remove('hidden');
};

const hide = (element) => {
  element.classList.add('hidden');
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const removeValue = (input) => {
  input.innerHtml = '';
  input.value = '';
};

export {checkCommentLength, show, hide, isEscapeKey, removeValue};
