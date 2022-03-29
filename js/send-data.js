import {onSendingForm} from './messages.js';
import {close} from './popup.js';
import {popupElement} from './popup-uploading.js';

const sendData = (formData) => fetch(
  'https://25.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body: formData,
  },
)
  .then((response) => {
    if (response.ok) {
      close(popupElement);
      onSendingForm('success');
    } else {
      close(popupElement);
      onSendingForm('error');
    }
  })
  .catch(() => {
    close(popupElement);
    onSendingForm('error');
  });

export {sendData};
