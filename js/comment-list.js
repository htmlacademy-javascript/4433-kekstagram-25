const listContainer = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

const count = document.querySelector('.social__comment-count');
const countTotal = count.querySelector('.comments-count');

const loader = document.querySelector('.social__comments-loader');

const renderCommentList = (comments) => {
  comments.forEach((comment) => {
    const newItem = commentItem.cloneNode(true);

    const newCommentAuthor = newItem.querySelector('.social__picture');
    newCommentAuthor.src = comment.avatar;
    newCommentAuthor.alt = comment.name;

    newItem.querySelector('.social__text').textContent = comment.message;

    fragment.append(newItem);
  });

  countTotal.textContent = comments.length;
  count.classList.add('hidden');
  loader.classList.add('hidden');

  listContainer.innerHTML = '';
  listContainer.append(fragment);
};

const clearCommentList = () => {
  listContainer.innerHTML = '';
};

export {renderCommentList, clearCommentList};
