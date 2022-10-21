const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

// Функция склонения слов после чисел
// Источник: https://wp-kama.ru/note/funktsiya-skloneniya-slov-posle-chisel-php

// eslint-disable-next-line no-nested-ternary
const declineNum = ( n, titles ) => titles[ 1 === n % 10 && 11 !== n % 100 ? 0 : 2 <= n % 10 && 4 >= n % 10 && ( 10 > n % 100 || 20 <= n % 100 ) ? 1 : 2 ];

export {getRandomPositiveInteger, getRandomPositiveFloat, declineNum};
