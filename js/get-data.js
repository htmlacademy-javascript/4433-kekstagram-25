import consts from './consts.js';

const getData = (onSuccess, onError) => fetch(
  consts.GET_DATA_URL,
  {
    method: 'GET',
    credentials: 'same-origin',
  }
)
  .then((response) => response.json())
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

export {getData};
