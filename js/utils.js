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

export { getRandomPositiveInteger, getRandomPositiveFloat, declineNum };
