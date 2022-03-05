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

export {getRandomNumber, getRandomArrayElement};
