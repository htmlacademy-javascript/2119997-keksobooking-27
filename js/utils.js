import { DEBOUNCE_DELAY } from './consts.js';

const declineNum = ( n, titles ) => {
  let index = 0;

  if (1 === n % 10 && 11 !== n % 100) {
    index = 0;
  } else if (2 <= n % 10 && 4 >= n % 10 && ( 10 > n % 100 || 20 <= n % 100 )) {
    index = 1;
  } else {
    index = 2;
  }

  return titles[index];
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { declineNum, isEscapeKey, debounce };
