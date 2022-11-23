/**
// Модуль фильтрации и вывода на карту искомого жилья

import { getData } from './api.js';
import { clearMap, createNearbyMarker } from './map.js';
import { debounce } from './utils.js';

// Значение фильтра искомого жилья по умолчанию
const FILTER_DEFAULT_VALUE = 'any';

// Диапазоны цен искомого жилья
const OffersPriceToRange = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: 100000,
  },
};

// Нода с фильтрами карты
const offersFiltersNode = document.querySelector('.map__filters');

// Поле выбора искомого жилья, тип
const offersTypeNode = offersFiltersNode.querySelector('#housing-type');

// Поле выбора искомого жилья, цена
const offersPriceNode = offersFiltersNode.querySelector('#housing-price');

// Поле выбора искомого жилья, количество комнат
const offersRoomsNode = offersFiltersNode.querySelector('#housing-rooms');

// Поле выбора искомого жилья, количество гостей
const offersGuestsNode = offersFiltersNode.querySelector('#housing-guests');

// Нода с удобствами искомого жилья
const offersFeaturesNode = offersFiltersNode.querySelector('#housing-features');

// Коллекция с чекбоксами удобств искомого жилья
const FeaturesListNode = offersFeaturesNode.querySelectorAll('input');

// Проверки отдельных полей карточек объявлений
const checkType = (card) => offersTypeNode.value === FILTER_DEFAULT_VALUE || offersTypeNode.value === card.offer.type;
const checkRooms = (card) => offersRoomsNode.value === FILTER_DEFAULT_VALUE || card.offer.rooms === Number(offersRoomsNode.value);
const checkGuests = (card) => offersGuestsNode.value === FILTER_DEFAULT_VALUE || card.offer.guests === Number(offersGuestsNode.value);
const checkPrice = (card) => {
  const chosenPriceRange = offersPriceNode.value.toUpperCase();
  return offersPriceNode.value === FILTER_DEFAULT_VALUE ||
    (
      card.offer.price > OffersPriceToRange[chosenPriceRange].MIN
      && card.offer.price < OffersPriceToRange[chosenPriceRange].MAX
    );
};
const FeaturesForSearch = () => Array.from(offersFeaturesNode.querySelectorAll('input:checked'), (input) => input.value);
const checkFeatures = (card) => {
  if (FeaturesForSearch() === undefined) {
    return true;
  }
  return FeaturesForSearch().every((item) => {
    const cardFeatures = card.offer.features;
    return cardFeatures === undefined ? false : cardFeatures.includes(item);
  });
};

// Получаем искомые объявления в количестве не более PINS.MAX
const getFilteredCards = (cards) => {
  const filteredCards = [];
  for (const card of cards) {
    if (filteredCards.length >= 10) {
      break;
    }
    if (
      checkType(card)
      && checkPrice(card)
      && checkRooms(card)
      && checkGuests(card)
      && checkFeatures(card)
    ) {
      filteredCards.push(card);
    }
  }
  return filteredCards;
};

// Следим за изменениями фильтров карты
const checkFilters = (cb) => {
  offersFiltersNode.addEventListener('change', () => {
    cb();
  });
  FeaturesListNode.forEach((feature) => {
    feature.addEventListener('change', () => {
      cb();
    });
  });
};

const resetFilter = () => {
  offersFiltersNode.reset();
};

// Получаем данные и отрисовываем подходящие метки, с задержкой RERENDER_DELAY
const getFilteredMarkers = () => {
  getData((cards) => {
    checkFilters(debounce(
      () => {
        clearMap();
        getFilteredCards(cards).forEach(createNearbyMarker);
      },
    ));
  });
};

export { getFilteredMarkers, offersFiltersNode, resetFilter };

*/

import { renderPointsToMap, clearMap } from './map.js';

const DEBOUNCE_TIMER = 500;

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

const debounce = (callback, timeoutDelay = DEBOUNCE_TIMER) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const mapFilterElement = document.querySelector('.map__filters');
const selectTypeElement = mapFilterElement.querySelector('#housing-type');
const selectPriceElement = mapFilterElement.querySelector('#housing-price');
const selectRoomsElement = mapFilterElement.querySelector('#housing-rooms');
const selectGuestsElement = mapFilterElement.querySelector('#housing-guests');
const fieldsetFeaturesElement = mapFilterElement.querySelector('#housing-features');

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

const onMapFilterElementChange = () => {
  const activeCheckboxElements = fieldsetFeaturesElement.querySelectorAll('input:checked');
  const featuresValues = Array.from(activeCheckboxElements).map((element) => element.value);

  clearMap();

  const filterParameters = {
    type: selectTypeElement.value,
    price: selectPriceElement.value,
    room: selectRoomsElement.value,
    guest: selectGuestsElement.value,
    features: featuresValues,
  };

  renderPointsToMap(getFilteredPointToAllParameters(filterParameters));
};

const startFilter = (data) => {
  defaultPoints = data;
  mapFilterElement.addEventListener('change', debounce(onMapFilterElementChange));
};

const resetFilter = () => {
  mapFilterElement.reset();
  clearMap();
  renderPointsToMap(defaultPoints);
};

export { startFilter, resetFilter };
