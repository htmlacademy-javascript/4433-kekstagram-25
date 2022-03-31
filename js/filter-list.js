import {renderPictureList} from './photo-list.js';
import {shuffleArray} from './util.js';

const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';

const filterContainerElement = document.querySelector('.img-filters');
const filterListElement = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

let photos = {};

const getPhotoArray = (data) => {
  photos = data;
  showFilterList();
};

const showFilterList = () => {
  filterContainerElement.classList.remove('img-filters--inactive');
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

    switch(currentFilterType){
      case 'filter-default':
        applyDefaultFilter(photos);
        break;
      case 'filter-random':
        applyRandomFilter(photos);
        break;
      case 'filter-discussed':
        applyDiscussedFilter(photos);
        break;
    }
  }
});

const compareLikesCount = (picture1, picture2) => {
  return picture1.likes - picture2.likes;
}

const applyDefaultFilter = (photos) => {
  renderPictureList(photos);
};

const applyRandomFilter = (photos) => {
  const copyArray = photos.slice();
  shuffleArray(copyArray);
  renderPictureList(copyArray.slice(photos.length - 10));
};

const applyDiscussedFilter = (photos) => {
  const copyArray = photos.slice().sort(compareLikesCount);
  renderPictureList(copyArray);
};

export {showFilterList, getPhotoArray};
