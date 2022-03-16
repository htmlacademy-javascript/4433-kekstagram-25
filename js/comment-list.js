const listContainerElement = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

const countElement = document.querySelector('.social__comment-count');
const countTotalElement = countElement.querySelector('.comments-count');

const loaderElememt = document.querySelector('.social__comments-loader');

const renderCommentList = (comments) => {
  comments.forEach((comment) => {
    const newComment = commentElement.cloneNode(true);

    const newCommentAuthor = newComment.querySelector('.social__picture');
    newCommentAuthor.src = comment.avatar;
    newCommentAuthor.alt = comment.name;

    newComment.querySelector('.social__text').textContent = comment.message;

    fragment.append(newComment);
  });

  countTotalElement.textContent = comments.length;
  countElement.classList.add('hidden');
  loaderElememt.classList.add('hidden');

  listContainerElement.innerHTML = '';
  listContainerElement.append(fragment);
};

const clearCommentList = () => {
  listContainerElement.innerHTML = '';
};

export {renderCommentList, clearCommentList};
