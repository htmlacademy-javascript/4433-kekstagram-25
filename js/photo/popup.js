import {createCommentList} from './comment-list.js';

const popup = document.querySelector('.big-picture');
const popupImage = popup.querySelector('.big-picture__img img');
const popupImageLikes = popup.querySelector('.likes-count');
const popupImageDescription = popup.querySelector('.social__caption');
const popupCloseButton = popup.querySelector('.big-picture__cancel');

const openPopup = (url, likes, comments, description) => {
  popupImage.src = url;
  popupImageLikes.textContent = likes;
  popupImageDescription.textContent = description;

  if (comments.length > 0) {
    createCommentList(comments);
  }

  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePopup = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

popupCloseButton.addEventListener('click', closePopup);

addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    closePopup();
  }
});

export {openPopup};
