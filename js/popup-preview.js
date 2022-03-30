import {renderCommentList, clearCommentList} from './comment-list.js';
import {open, close} from './popup.js';
import {isEscapeKey} from './util.js';

const popupElement = document.querySelector('.big-picture');
const bigImageElement = popupElement.querySelector('.big-picture__img img');
const likesElement = popupElement.querySelector('.likes-count');
const imageDescriptionElement = popupElement.querySelector('.social__caption');
const popupCloseButton = popupElement.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close(popupElement);
    clearCommentList();
  }
};

const openPreviewPopup = (url, likes, comments, description) => {
  open(popupElement);

  bigImageElement.src = url;
  likesElement.textContent = likes;
  imageDescriptionElement.textContent = description;

  renderCommentList(comments);

  document.addEventListener('keydown', onPopupEscKeydown);
};

popupCloseButton.addEventListener('click', () => {
  close(popupElement);
  clearCommentList();
  document.addEventListener('keydown', onPopupEscKeydown);
});

export {openPreviewPopup};
