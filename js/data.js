import dataConsts from './consts.js';
import {getRandomNumber, getRandomArrayElement} from './util.js';

const PHOTO_DESCRIPTIONS = [
  'Сегодня прекрасный день! Приехала на дачу.',
  'Меня трудно понять, невозможно сохранить и что-то там ещё.',
  'Сколько людей, столько и мнений.',
  'Никогда не говори «никогда»',
  'Коты — это жидкость. Мой Пафнутий тому доказательство'
];

const USER_NAMES = [
  'Екатерина',
  'Ольга Сергеевна',
  'Мария',
  'Спаниель Петрович',
  'Никонор Парамонович',
  'Юлия',
  'Александр Иванович',
  'Дмитрий Сергеевич',
];

const COMMENT_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentRandomIds = [];

const createComment = () => {
  const randomId = getRandomNumber(1, 10000);

  while (commentRandomIds.indexOf(randomId) < 0) {
    commentRandomIds.push(randomId);
  }

  return {
    id: commentRandomIds[commentRandomIds.length - 1],
    avatar: `img/avatar-${getRandomNumber(dataConsts.AVATAR_MIN_VALUE, dataConsts.AVATAR_MAX_VALUE)}.svg`,
    message: getRandomArrayElement(COMMENT_TEXTS),
    name: getRandomArrayElement(USER_NAMES)
  };
};


const createPhotoItem = (i) => (
  {
    id: i,
    url: `photos/${i}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomNumber(dataConsts.LIKES_MIN_VALUE, dataConsts.LIKES_MAX_VALUE),
    comments: Array.from({length: getRandomNumber(0, dataConsts.COMMENT_MAX_COUNT)}, createComment)
  }
);

export {createPhotoItem};
