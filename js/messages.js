import {showElement, hideElement} from './util.js';
import {isEscapeKey} from './util.js';

const MessageTypes = { SUCCESS: 'success', ERROR: 'error' };

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    for (const index in MessageTypes) {
      const messageEl = document.querySelector(`.${MessageTypes[index]}`);
      if (!messageEl.classList.contains('hidden')) {
        hideElement(messageEl);
        document.removeEventListener('keydown', onPopupEscKeydown);
      }
    }
  }
};

const createMessageEl = (type) => {
  const template = document
    .querySelector(`#${type}`)
    .content
    .querySelector(`.${type}`);

  const messageEl = template.cloneNode(true);
  messageEl.classList.add('hidden');
  document.body.append(messageEl);

  const messageButton = messageEl.querySelector('button');

  messageButton.addEventListener('click', () => {
    if (type === MessageTypes.SUCCESS) {
      hideElement(messageEl);
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  });

  document.addEventListener('keydown', onPopupEscKeydown);
};

createMessageEl(MessageTypes.SUCCESS);
createMessageEl(MessageTypes.ERROR);

const onSendingForm = (type) => {
  const messageEl = document.querySelector(`.${type}`);
  showElement(messageEl);
};

export {onSendingForm};
