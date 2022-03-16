import {renderCommentList, clearCommentList} from './comment-list.js';
import {isEscapeKey} from '../util.js';

const popup = document.querySelector('.big-picture');
const popupImage = popup.querySelector('.big-picture__img img');
const popupImageLikes = popup.querySelector('.likes-count');
const popupImageDescription = popup.querySelector('.social__caption');
const popupCloseButton = popup.querySelector('.big-picture__cancel');

const closePopup = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
    clearCommentList();
  }
};

const openPopup = (url, likes, comments, description) => {
  popupImage.src = url;
  popupImageLikes.textContent = likes;
  popupImageDescription.textContent = description;

  renderCommentList(comments);

  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

popupCloseButton.addEventListener('click', () => {
  closePopup();
  clearCommentList();
  document.removeEventListener('keydown', onPopupEscKeydown);
});

export {openPopup};
