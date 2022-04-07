import {onSendingForm} from './messages.js';
import {closePopup} from './popup.js';
import {popupElement} from './popup-uploading.js';
import {unblockSubmitButton} from './form.js';
import consts from './consts.js';

const sendData = (formData) => fetch(
  consts.API_DATA_URL,
  {
    method: 'POST',
    body: formData,
  },
)
  .then((response) => {
    if (response.ok) {
      unblockSubmitButton();
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
