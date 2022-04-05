import {clearCommentList, getAllComments} from './comment-list.js';
import {openPopup, closePopup} from './popup.js';
import {isEscapeKey} from './util.js';

const popupElement = document.querySelector('.big-picture');
const bigImageElement = popupElement.querySelector('.big-picture__img img');
const likesElement = popupElement.querySelector('.likes-count');
const imageDescriptionElement = popupElement.querySelector('.social__caption');
const popupCloseButton = popupElement.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup(popupElement);
    clearCommentList();
  }
};

const openPreviewPopup = (url, likes, comments, description) => {
  openPopup(popupElement);

  bigImageElement.src = url;
  likesElement.textContent = likes;
  imageDescriptionElement.textContent = description;

  getAllComments(comments);

  document.addEventListener('keydown', onPopupEscKeydown);
};

popupCloseButton.addEventListener('click', () => {
  closePopup(popupElement);
  clearCommentList();
  document.addEventListener('keydown', onPopupEscKeydown);
});

export {openPreviewPopup};
