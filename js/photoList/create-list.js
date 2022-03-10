import {createPhotoItem} from '../data.js';
import consts from '../consts.js';
import {openPopup} from '../photo/popup.js';

const createPictureList = (container, template, pictures) => {
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const pictureItem = template.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = photo.url;
    pictureItem.querySelector('.picture__likes').textContent = photo.likes;
    pictureItem.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureItem.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(photo.url, photo.likes, photo.comments, photo.description);
    });

    pictureFragment.appendChild(pictureItem);
  });

  container.appendChild(pictureFragment);
};

const photos = [];

for (let i = 1; i <= consts.PHOTO_COUNT; i++) {
  photos.push(createPhotoItem(i));
}

const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureListContainer = document.querySelector('.pictures');

createPictureList(pictureListContainer, pictureTemplate, photos);
