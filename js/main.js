'use strict';
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

const PHOTO_COUNT = 25;

const COMMENT_MAX_COUNT = 10;

const AVATAR_MIN_VALUE = 1;
const AVATAR_MAX_VALUE = 6;

const LIKES_MIN_VALUE = 15;
const LIKES_MAX_VALUE = 255;

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return '⛔ Ошибка. Некорректный диапазон: числа должны быть положительными.';
  }

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
  // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

const checkCommentLength = (comment, maxLength) => {
  const commentLength = String(comment).length;

  return maxLength >= commentLength;
};

checkCommentLength();

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const commentRandomIds = [];

const createComment = () => {
  const randomId = getRandomNumber(1, 10000);

  while (commentRandomIds.indexOf(randomId) < 0) {
    commentRandomIds.push(randomId);
  }

  return {
    id: commentRandomIds[commentRandomIds.length - 1],
    avatar: `img/avatar-${getRandomNumber(AVATAR_MIN_VALUE, AVATAR_MAX_VALUE)}.svg`,
    message: getRandomArrayElement(COMMENT_TEXTS),
    name: getRandomArrayElement(USER_NAMES)
  };
};


const createPhotoItem = (i) => (
  {
    id: i,
    url: `photos/${i}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomNumber(LIKES_MIN_VALUE, LIKES_MAX_VALUE),
    comments: Array.from({length: getRandomNumber(0, COMMENT_MAX_COUNT)}, createComment)
  }
);

const photos = [];

for (let i = 1; i <= PHOTO_COUNT; i++) {
  photos.push(createPhotoItem(i));
}
