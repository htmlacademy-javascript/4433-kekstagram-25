import {showElement, hideElement} from './util.js';
import consts from './consts.js';

const listContainerEl = document.querySelector('.social__comments');
const commentEl = document.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

const countEl = document.querySelector('.social__comment-count');
const countTotalEl = countEl.querySelector('.comments-count');
const countCurrentEl = countEl.querySelector('.showed-comments-count');
const loaderEl = document.querySelector('.social__comments-loader');

let allComments;
let hiddenComments;

const renderCommentList = (comments) => {
  comments.forEach((comment) => {
    const newCommentEl = commentEl.cloneNode(true);

    const authorEl = newCommentEl.querySelector('.social__picture');
    authorEl.src = comment.avatar;
    authorEl.alt = comment.name;

    newCommentEl.querySelector('.social__text').textContent = comment.message;

    fragment.append(newCommentEl);
  });

  listContainerEl.append(fragment);
};

const checkCommentListLength = (comments) => {
  if (comments.length > consts.COMMENTS_COUNT_ON_LIST) {
    showElement(countEl);
    showElement(loaderEl);

    countTotalEl.textContent = allComments.length;
    countCurrentEl.textContent = Number(countCurrentEl.textContent) + consts.COMMENTS_COUNT_ON_LIST;

    const commentList = comments.slice(0, consts.COMMENTS_COUNT_ON_LIST);
    renderCommentList(commentList);
  } else {
    renderCommentList(comments);
    hideElement(countEl);
    hideElement(loaderEl);
  }
};

const onLoadButtonClick = () => {
  const showedComments = document.querySelectorAll('.social__comment');
  const showedCommentCount = showedComments.length;

  hiddenComments = allComments.slice(showedCommentCount, allComments.length);
  checkCommentListLength(hiddenComments);
};

loaderEl.addEventListener('click', onLoadButtonClick);

const clearCommentList = () => {
  listContainerEl.innerHTML = '';
};

const getAllComments = (comments) => {
  clearCommentList();
  countCurrentEl.textContent = 0;

  allComments = comments;
  checkCommentListLength(allComments);
};

export {checkCommentListLength, clearCommentList, getAllComments};
