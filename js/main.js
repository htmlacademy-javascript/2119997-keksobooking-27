// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomInt(min,max) {
  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 'Некорректный диапазон';
  }
}
getRandomInt(0,5);
