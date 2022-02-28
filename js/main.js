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
const COMMENT_INDEXES = getRandomNumbers(COMMENT_MAX_COUNT);

function getRandomNumber(min, max) {
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
}

function checkCommentLength(comment, maxLength) {
  const commentLength = String(comment).length;

  return maxLength >= commentLength;
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

function getRandomNumbers(count) {
  let result = [];

  while (result.length < count) {
      const randomNumber = Math.floor(Math.random() * count * 100);
      if (result.indexOf(randomNumber) === -1) {
          result.push(randomNumber);
      }
  }

  return result;
}

const createComment = (value, i) => {
  return {
    id: COMMENT_INDEXES[i],
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: getRandomArrayElement(COMMENT_TEXTS),
    name: getRandomArrayElement(USER_NAMES)
  };
};

const createPhotoItem = (i) => {
  return {
    id: i,
    url: 'photos/' + i + '.jpg',
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(0, COMMENT_MAX_COUNT)}, createComment)
  };
};

const photos = [];

for (let i = 1; i <= PHOTO_COUNT; i++) {
  photos.push(createPhotoItem(i));
}

console.log(photos);
