const COUNT_OBJECTS = 10;

const OFFER_TITLES = ['Дворец', 'Квартира', 'Дом', 'Бунгало', 'Отель'];

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const OFFER_DESCRIPTIONS = [
  'Дворцовый комплекс с парками, который принадлежал римскому императору',
  'Уютные апартаменты в самом центре города',
  'Эффектный, современный и роскошный дом на берегу озера',
  'Просторное бунгало над водой',
  'Просто отель.',
];

const OFFER_TIMES = ['12:00', '13:00', '14:00'];

const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const OfferCountRooms = {
  MIN: 1,
  MAX: 5,
};
const OfferCountGuests = {
  MIN: 1,
  MAX: 10,
};

const LocationLat = {
  MIN: 35.65000,
  MAX: 35.70000,
};
const LocationLng = {
  MIN: 139.70000,
  MAX: 139.80000,
};
const Price = {
  MIN: 1000,
  MAX: 30000,
};

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

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

const getObjectCard = (id) => {
  const time = OFFER_TIMES[getRandomPositiveInteger(0, OFFER_TIMES.length - 1)];
  const location = {
    lat: getRandomPositiveFloat(LocationLat.MIN, LocationLat.MAX, 5),
    lng: getRandomPositiveFloat(LocationLng.MIN, LocationLng.MAX, 5),
  };

  return {
    author: {
      avatar: `img/avatars/user${id < 10 ? '0' : ''}${id}.png`
    },
    offer: {
      title: OFFER_TITLES[getRandomPositiveInteger(0, OFFER_TITLES.length - 1)],
      addres: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger(Price.MIN, Price.MAX),
      type: OFFER_TYPES[getRandomPositiveInteger(0, OFFER_TYPES.length - 1)],
      rooms: getRandomPositiveInteger(OfferCountRooms.MIN, OfferCountRooms.MAX),
      guests: getRandomPositiveInteger(OfferCountGuests.MIN, OfferCountGuests.MAX),
      checkin: time,
      checkout: time,
      features: OFFER_FEATURES.slice(0,getRandomPositiveInteger(0, OFFER_FEATURES.length - 1)),
      description: OFFER_DESCRIPTIONS[getRandomPositiveInteger(0, OFFER_DESCRIPTIONS.length - 1)],
      photos: OFFER_PHOTOS[getRandomPositiveInteger(0, OFFER_PHOTOS.length - 1)],
    },
    location,
  };
};

const getObjectArray = Array.from({length: COUNT_OBJECTS}, getObjectCard);

// eslint-disable-next-line no-console
console.log(getObjectArray);
