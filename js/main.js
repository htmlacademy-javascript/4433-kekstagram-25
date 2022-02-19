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

checkCommentLength('Комментарий', 140);
getRandomNumber(0, 1);
