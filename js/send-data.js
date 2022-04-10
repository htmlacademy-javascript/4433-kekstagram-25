import {onSendingForm} from './messages.js';
import {closePopup} from './popup.js';
import {popupEl} from './popup-uploading.js';
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
      closePopup(popupEl);
      onSendingForm('success');
    } else {
      closePopup(popupEl);
      onSendingForm('error');
    }
  })
  .catch(() => {
    closePopup(popupEl);
    onSendingForm('error');
  });

export {sendData};
