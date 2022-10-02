// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomInt(min,max) {
  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 'Некорректный диапазон';
  }
}
getRandomInt(0,10);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getRandomNonInt(min,max,symbols) {
  if (min < max) {
    return +(Math.random() * (max - min + min)).toFixed(symbols);
  } else {
    return 'Некорректный диапазон';
  }
}
getRandomNonInt(0.1,10,3);
