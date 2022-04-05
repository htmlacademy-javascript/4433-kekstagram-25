import {showElement, hideElement} from './util.js';
import consts from './consts.js';

const listContainerElement = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

const countElement = document.querySelector('.social__comment-count');
const countTotalElement = countElement.querySelector('.comments-count');
const countCurrentElement = countElement.querySelector('.showed-comments-count');
const loaderElememt = document.querySelector('.social__comments-loader');

let allComments;
let hiddenComments;

const renderCommentList = (comments) => {
  comments.forEach((comment) => {
    const newComment = commentElement.cloneNode(true);

    const newCommentAuthor = newComment.querySelector('.social__picture');
    newCommentAuthor.src = comment.avatar;
    newCommentAuthor.alt = comment.name;

    newComment.querySelector('.social__text').textContent = comment.message;

    fragment.append(newComment);
  });

  listContainerElement.append(fragment);
};

const checkCommentListLength = (comments) => {
  if (comments.length > consts.COMMENTS_COUNT_ON_LIST) {
    showElement(countElement);
    showElement(loaderElememt);

    countTotalElement.textContent = allComments.length;
    countCurrentElement.textContent = Number(countCurrentElement.textContent) + consts.COMMENTS_COUNT_ON_LIST;

    const commentList = comments.slice(0, consts.COMMENTS_COUNT_ON_LIST);
    renderCommentList(commentList);
  } else {
    renderCommentList(comments);
    hideElement(countElement);
    hideElement(loaderElememt);
  }
};

const onLoadButtonClick = () => {
  const showedComments = document.querySelectorAll('.social__comment');
  const showedCommentCount = showedComments.length;

  hiddenComments = allComments.slice(showedCommentCount, allComments.length);
  checkCommentListLength(hiddenComments);
};

loaderElememt.addEventListener('click', onLoadButtonClick);

const clearCommentList = () => {
  listContainerElement.innerHTML = '';
};

const getAllComments = (comments) => {
  clearCommentList();
  countCurrentElement.textContent = 0;

  allComments = comments;
  checkCommentListLength(allComments);
};

export {checkCommentListLength, clearCommentList, getAllComments};
