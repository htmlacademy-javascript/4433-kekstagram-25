import {createPhotoItem} from './data.js';
import dataConsts from './consts.js';

const photos = [];

for (let i = 1; i <= dataConsts.PHOTO_COUNT; i++) {
  photos.push(createPhotoItem(i));
}
