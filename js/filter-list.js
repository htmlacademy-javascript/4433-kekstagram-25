import {renderPictureList} from './photo-list.js';
import {shuffleArray, debounce} from './util.js';
import consts from './consts.js';

const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';

const filterContainerEl = document.querySelector('.img-filters');
const filterListEl = document.querySelector('.img-filters__form');
const filterButtonsEl = document.querySelectorAll('.img-filters__button');

const FilterTypes = { DEFAULT: 'filter-default', RANDOM: 'filter-random', DISCUSSED: 'filter-discussed' };

let photos = {};

const showFilter = () => {
  filterContainerEl.classList.remove('img-filters--inactive');
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
    case FilterTypes.DEFAULT:
      applyDefaultFilter();
      break;
    case FilterTypes.RANDOM:
      applyRandomFilter();
      break;
    case FilterTypes.DISCUSSED:
      applyDiscussedFilter();
      break;
  }
};

filterListEl.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    filterButtonsEl.forEach((filterButton) => {
      if (filterButton.classList.contains(ACTIVE_FILTER_BUTTON_CLASS)) {
        filterButton.classList.remove(ACTIVE_FILTER_BUTTON_CLASS);
      }
      filterButton.disabled = false;
    });

    const activeFilterButton = evt.target;
    activeFilterButton.disabled = true;

    activeFilterButton.classList.add(ACTIVE_FILTER_BUTTON_CLASS);
    const currentFilterType = activeFilterButton.id;

    debounce(
      () => onFilterButtonClick(currentFilterType),
      consts.RERENDER_DELAY,
    );
  }
});

export {showFilter, getPhotoArray};
