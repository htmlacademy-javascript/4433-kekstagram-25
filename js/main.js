import {createPhotoItem} from './data.js';
import consts from './consts.js';
import {createPictureList} from './photoList/create-list.js';

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

