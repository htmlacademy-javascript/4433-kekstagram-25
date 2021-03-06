import consts from './consts.js';
import {getPhotoArray} from './filter-list.js';

const getData = (onSuccess, onError) => fetch(
  `${consts.API_DATA_URL}/data`,
  {
    method: 'GET',
    credentials: 'same-origin',
  }
)
  .then((response) => response.json())
  .then((data) => {
    getPhotoArray(data);
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

export {getData};
