import { DEBOUNCE_DELAY } from './consts.js';
import { renderPointsToMap, clearMap } from './map.js';

const FilterTypes = {
  TYPE: 'type',
  PRICE: 'price',
  ROOMS: 'room',
  GUESTS: 'guest',
  FEATURES: 'features',
};

const PriceValueToTypes = {
  LOW: 10000,
  MIDDLE: {
    low: 10000,
    high: 50000,
  },
  HIGH: 50000,
};

const PriceTypes = {
  ANY: 'any',
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const RoomTypes = {
  ANY: 'any',
  ONE: 'one',
  TWO: 'two',
  THREE: 'three',
};

const GuestTypes = {
  ANY: 'any',
  ONE: 'one',
  TWO: 'two',
  NOT: 'not',
};

const roomValueToType = {
  any: 0,
  one: 1,
  two: 2,
  three: 3,
};

const guestValueToType = {
  any: 0,
  one: 1,
  two: 2,
  not: 0,
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const mapFilter = document.querySelector('.map__filters');
const selectType = mapFilter.querySelector('#housing-type');
const selectPrice = mapFilter.querySelector('#housing-price');
const selectRooms = mapFilter.querySelector('#housing-rooms');
const selectGuests = mapFilter.querySelector('#housing-guests');
const fieldsetFeatures = mapFilter.querySelector('#housing-features');

let defaultPoints = [];

const getFilteredPointsToPrice = (points, price) => {
  const filteredPoints = points.filter(({offer}) => {
    let isMatch = true;

    if (price === PriceTypes.LOW) {
      isMatch = offer.price < PriceValueToTypes.LOW;
    }

    if (price === PriceTypes.MIDDLE) {
      isMatch = offer.price <= PriceValueToTypes.MIDDLE.high && offer.price >= PriceValueToTypes.MIDDLE.low ;
    }

    if (price === PriceTypes.HIGH) {
      isMatch = offer.price > PriceValueToTypes.HIGH;
    }

    return isMatch;
  });

  return filteredPoints;
};

const getFilteredPointsToRoom = (points, room) => {
  const filteredPoints = points.filter(({offer}) => {
    let isMatch = true;

    if (room === RoomTypes.ANY) {
      isMatch = offer.rooms >= roomValueToType[room];
    }

    if (room === RoomTypes.ONE) {
      isMatch = offer.rooms === roomValueToType[room];
    }

    if (room === RoomTypes.TWO) {
      isMatch = offer.rooms === roomValueToType[room];
    }

    if (room === RoomTypes.THREE) {
      isMatch = offer.rooms === roomValueToType[room];
    }

    return isMatch;
  });

  return filteredPoints;
};

const getFilteredPointsToGuest = (points, guest) => {
  const filteredPoints = points.filter(({offer}) => {
    let isMatch = true;

    if (guest === GuestTypes.ANY) {
      isMatch = offer.guests >= guestValueToType[guest];
    }

    if (guest === GuestTypes.ONE) {
      isMatch = offer.guests === guestValueToType[guest];
    }

    if (guest === GuestTypes.TWO) {
      isMatch = offer.guests === guestValueToType[guest];
    }

    if (guest === GuestTypes.NOT) {
      isMatch = offer.guests === guestValueToType[guest];
    }

    return isMatch;
  });

  return filteredPoints;
};

const getFilteredPointsToType = (points, type) => {
  if (type === 'any') {
    return defaultPoints.slice();
  }
  const filteredPoints = points.filter(({offer}) => offer.type === type);

  return filteredPoints;
};


const getFilteredPointsToFeatures = (points, features) => {
  const filteredPoints = points.filter(({offer}) => {
    if (!offer.features) {
      return false;
    }

    const pointFeatures = offer.features;

    const difference = features.filter((feature) => !pointFeatures.includes(feature));


    if (difference.length === 0) {
      return true;
    }

    return false;
  });

  return filteredPoints;
};

const getFilteredPointToAllParameters = (filterParameters) => {
  let filteredPoints = defaultPoints.slice();

  for (const [key, value] of Object.entries(filterParameters)) {
    if (key === FilterTypes.TYPE) {
      filteredPoints = getFilteredPointsToType(filteredPoints, value);
    }
    if (key === FilterTypes.PRICE) {
      filteredPoints = getFilteredPointsToPrice(filteredPoints, value);
    }
    if (key === FilterTypes.ROOMS) {
      filteredPoints = getFilteredPointsToRoom(filteredPoints, value);
    }
    if (key === FilterTypes.GUESTS) {
      filteredPoints = getFilteredPointsToGuest(filteredPoints, value);
    }
    if (key === FilterTypes.FEATURES) {
      filteredPoints = getFilteredPointsToFeatures(filteredPoints, value);
    }
  }

  return filteredPoints;
};

const onMapFilterChange = () => {
  const activeCheckboxElements = fieldsetFeatures.querySelectorAll('input:checked');
  const featuresValues = Array.from(activeCheckboxElements).map((element) => element.value);

  clearMap();

  const filterParameters = {
    type: selectType.value,
    price: selectPrice.value,
    room: selectRooms.value,
    guest: selectGuests.value,
    features: featuresValues,
  };

  renderPointsToMap(getFilteredPointToAllParameters(filterParameters));
};

const startFilter = (data) => {
  defaultPoints = data;
  mapFilter.addEventListener('change', debounce(onMapFilterChange));
};

const resetFilter = () => {
  mapFilter.reset();
  clearMap();
  renderPointsToMap(defaultPoints);
};

export { startFilter, resetFilter };
