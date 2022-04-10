import {showElement, hideElement} from './util.js';
import {isEscapeKey} from './util.js';

const MessageTypes = { SUCCESS: 'success', ERROR: 'error' };

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideElement(document.querySelector('.success'));
    hideElement(document.querySelector('.error'));
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
