import {renderPictureList} from './photo-list.js';
import {shuffleArray, debounce} from './util.js';
import consts from './consts.js';

const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';

const filterContainerElement = document.querySelector('.img-filters');
const filterListElement = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

let photos = {};

const showFilter = () => {
  filterContainerElement.classList.remove('img-filters--inactive');
};

const getPhotoArray = (data) => {
  photos = data;
  showFilter();
};

const compareLikesCount = (picture1, picture2) => picture1.likes - picture2.likes;

const applyDefaultFilter = () => {
  renderPictureList(photos);
};

const applyRandomFilter = () => {
  const copyArray = photos.slice();
  shuffleArray(copyArray);
  renderPictureList(copyArray.slice(photos.length - consts.RANDOM_PHOTO_COUNT));
};

const applyDiscussedFilter = () => {
  const copyArray = photos.slice().sort(compareLikesCount);
  renderPictureList(copyArray);
};

const onFilterButtonClick = (currentFilterType) => {
  switch(currentFilterType) {
    case 'filter-default':
      applyDefaultFilter();
      break;
    case 'filter-random':
      applyRandomFilter();
      break;
    case 'filter-discussed':
      applyDiscussedFilter();
      break;
  }
};

filterListElement.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove(ACTIVE_FILTER_BUTTON_CLASS);
      filterButton.disabled = '';
    });

    const activeFilterButton = evt.target;
    activeFilterButton.disabled = 'disabled';

    activeFilterButton.classList.add(ACTIVE_FILTER_BUTTON_CLASS);
    const currentFilterType = activeFilterButton.id;

    debounce(
      () => onFilterButtonClick(currentFilterType),
      consts.RERENDER_DELAY,
    );
  }
});

export {showFilter, getPhotoArray};
