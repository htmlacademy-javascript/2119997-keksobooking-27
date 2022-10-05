// Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomInt = (min, max) => min < max ? Math.floor(Math.random() * (max - min + 1)) + min : 'Некорректный диапазон';
getRandomInt(0,10);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomNonInt = (min, max, symbols) => min < max ? +(Math.random() * (max - min + min)).toFixed(symbols) : 'Некорректный диапазон';
getRandomNonInt(0.1,10,3);
