import {clearCommentList, getAllComments} from './comment-list.js';
import {openPopup, closePopup} from './popup.js';
import {isEscapeKey} from './util.js';

const popupEl = document.querySelector('.big-picture');
const bigImageEl = popupEl.querySelector('.big-picture__img img');
const likesEl = popupEl.querySelector('.likes-count');
const imageDescriptionEl = popupEl.querySelector('.social__caption');
const popupCloseButtonEl = popupEl.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup(popupEl);
    clearCommentList();
  }
};

const openPreviewPopup = (url, likes, comments, description) => {
  openPopup(popupEl);

  bigImageEl.src = url;
  likesEl.textContent = likes;
  imageDescriptionEl.textContent = description;

  getAllComments(comments);

  document.addEventListener('keydown', onPopupEscKeydown);
};

popupCloseButtonEl.addEventListener('click', () => {
  closePopup(popupEl);
  clearCommentList();

  document.removeEventListener('keydown', onPopupEscKeydown);
});

export {openPreviewPopup};
