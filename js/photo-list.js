import {openPreviewPopup} from './popup-preview.js';
import {getData} from './get-data.js';
import {showElement, hideElement} from './util.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureListEl = document.querySelector('.pictures');
const errorEl = document.querySelector('.img-upload__overlay--error');
const reloadingButtonEl = document.querySelector('.img-upload__button-reload');

const clearPictureList = () => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picure) => {
    picure.remove();
  });
};

const renderPictureList = (pictures) => {
  clearPictureList();
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const pictureItemEl = pictureTemplate.cloneNode(true);

    pictureItemEl.querySelector('.picture__img').src = photo.url;
    pictureItemEl.querySelector('.picture__likes').textContent = photo.likes;
    pictureItemEl.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureItemEl.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPreviewPopup(photo.url, photo.likes, photo.comments, photo.description);
    });

    pictureFragment.appendChild(pictureItemEl);
  });

  pictureListEl.appendChild(pictureFragment);
};

const onRenderUploadingError = () => {
  showElement(errorEl);
};

const loadPictures = () => getData(renderPictureList, onRenderUploadingError);

loadPictures();

reloadingButtonEl.addEventListener('click', () => {
  hideElement(errorEl);
  loadPictures();
});

export {renderPictureList};
