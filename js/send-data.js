import {onSendingForm} from './messages.js';
import {closePopup} from './popup.js';
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
      closePopup(popupElement);
      onSendingForm('success');
    } else {
      closePopup(popupElement);
      onSendingForm('error');
    }
  })
  .catch(() => {
    closePopup(popupElement);
    onSendingForm('error');
  });

export {sendData};
