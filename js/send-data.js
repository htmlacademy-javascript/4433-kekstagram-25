import {onSendingForm} from './messages.js';
import {closePopup} from './popup.js';
import {popupElement} from './popup-uploading.js';
import consts from './consts.js';

const sendData = (formData) => fetch(
  consts.SEND_DATA_URL,
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
      close(popupElement);
      onSendingForm('error');
    }
  })
  .catch(() => {
    closePopup(popupElement);
    onSendingForm('error');
  });

export {sendData};
