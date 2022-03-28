const createLoader = (onSuccess, onError) => fetch(
  'https://25.javascript.pages.academy/kekstagram/data',
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

export {createLoader};
