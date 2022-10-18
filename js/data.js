import {getRandomPositiveInteger, getRandomPositiveFloat} from './utils.js';
import {COUNT_OBJECTS, OFFER_TITLES, OFFER_TYPES, OFFER_DESCRIPTIONS, OFFER_TIMES, OFFER_FEATURES, OfferCountRooms, OfferCountGuests, LocationLat, LocationLng, Price, OFFER_PHOTOS} from './consts.js';

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

const getObjectArray = () => Array.from({length: COUNT_OBJECTS}, getObjectCard);

export {getObjectArray};
