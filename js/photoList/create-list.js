const createPictureList = (container, template, pictures) => {
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    const pictureItem = template.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = photo.url;
    pictureItem.querySelector('.picture__likes').textContent = photo.likes;
    pictureItem.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureFragment.appendChild(pictureItem);
  });

  container.appendChild(pictureFragment);
};


export {createPictureList};
