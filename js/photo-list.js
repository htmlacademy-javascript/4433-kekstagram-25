import {openPreviewPopup} from './popup-preview.js';
import {getData} from './get-data.js';
import {showElement, hideElement} from './util.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');
const errorElement = document.querySelector('.img-upload__overlay--error');
const reloadingButton = document.querySelector('.img-upload__button-reload');

const clearPictureList = () => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach(picure => {
    picure.remove();
  });
};

const renderPictureList = (pictures) => {
  clearPictureList();
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

const loadPictures = () => getData(renderPictureList, onRenderUploadingError);

loadPictures();

reloadingButton.addEventListener('click', () => {
  hideElement(errorElement);
  loadPictures();
});

export {renderPictureList};
