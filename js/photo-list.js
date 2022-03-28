import {openPreviewPopup} from './popup-preview.js';
import {createLoader} from './loader.js';
import {showElement, hideElement} from './util.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');
const errorElement = document.querySelector('.img-upload__overlay--error');
const updateUploadingButton = document.querySelector('.img-upload__button');

const renderPictureList = (pictures) => {
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const pictureItem = pictureTemplate.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = photo.url;
    pictureItem.querySelector('.picture__likes').textContent = photo.likes;
    pictureItem.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureItem.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPreviewPopup(photo.url, photo.likes, photo.comments, photo.description);
    });

    pictureFragment.appendChild(pictureItem);
  });

  pictureListElement.appendChild(pictureFragment);
};

const onRenderUploadingError = () => {
  showElement(errorElement);
};

const loadPictures = () => createLoader(renderPictureList, onRenderUploadingError);

loadPictures();

updateUploadingButton.addEventListener('click', () => {
  hideElement(errorElement);
  loadPictures();
});
