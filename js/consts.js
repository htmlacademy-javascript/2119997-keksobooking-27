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

export {COUNT_OBJECTS, OFFER_TITLES, OFFER_TYPES, OFFER_DESCRIPTIONS, OFFER_TIMES, OFFER_FEATURES, OfferCountRooms, OfferCountGuests, LocationLat, LocationLng, Price, OFFER_PHOTOS};

