import {showElement, hideElement} from './util.js';
import {isEscapeKey} from './util.js';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideElement(document.querySelector('.success'));
    hideElement(document.querySelector('.error'));
  }
};

const createMessageElement = (type) => {
  const template = document
    .querySelector(`#${type}`)
    .content
    .querySelector(`.${type}`);

  const messageElement = template.cloneNode(true);
  messageElement.classList.add('hidden');
  document.body.append(messageElement);

  const messageButton = messageElement.querySelector('button');

  messageButton.addEventListener('click', () => {
    if (type === 'success') {
      hideElement(messageElement);
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  });

  document.addEventListener('keydown', onPopupEscKeydown);
};

createMessageElement('success');
createMessageElement('error');

const onSendingForm = (type) => {
  const messageElement = document.querySelector(`.${type}`);
  showElement(messageElement);
};

export {onSendingForm};
