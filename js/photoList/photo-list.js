import {createPhotoItem} from '../data.js';
import consts from '../consts.js';

const photos = [];

for (let i = 1; i <= consts.PHOTO_COUNT; i++) {
  photos.push(createPhotoItem(i));
}

const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureList = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

photos.forEach((photo) => {
  const pictureItem = pictureTemplate.cloneNode(true);

  pictureItem.querySelector('.picture__img').src = photo.url;
  pictureItem.querySelector('.picture__likes').textContent = photo.likes;
  pictureItem.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureFragment.appendChild(pictureItem);
});

pictureList.appendChild(pictureFragment);
