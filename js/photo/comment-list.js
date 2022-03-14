const commentsContainer = document.querySelector('.social__comments');
const commentsItem = document.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const commentsCount = document.querySelector('.social__comment-count');
const commentsCountTotal = commentsCount.querySelector('.comments-count');

const commentsLoader = document.querySelector('.social__comments-loader');

const renderCommentList = (comments) => {
  comments.forEach((comment) => {
    const newCommemtItem = commentsItem.cloneNode(true);

    const newCommemtItemAuthor = newCommemtItem.querySelector('.social__picture');
    newCommemtItemAuthor.src = comment.avatar;
    newCommemtItemAuthor.alt = comment.name;

    newCommemtItem.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(newCommemtItem);
  });

  commentsCountTotal.textContent = comments.length;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
};

const clearCommentList = () => {
  commentsContainer.innerHTML = '';
};

export {renderCommentList, clearCommentList};
