import {declineNum} from './utils.js';

const typePopup = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createFeaturesTemplate = (features) => `<ul class="popup__features">
  ${features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('')}
</ul>`;

const getPhotosTemplate = (photos) => {
  if (!photos) {
    return '';
  }
  return `<div class="popup__photos">
  ${photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('')}
</div>`;
};

export const createCardTemplate = (author, offer) => {
  const declinedRooms = declineNum(offer.rooms, ['комната', 'комнаты', 'комнат']);
  const declinedGuests = declineNum(offer.guests, ['гостя', 'гостей', 'гостей']);

  return `<article class="popup">
      <img src="${author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">${offer.title}</h3>
      <p class="popup__text popup__text--address">${offer.address}</p>
      <p class="popup__text popup__text--price">${offer.price} <span>₽/ночь</span></p>
      <h4 class="popup__type">${typePopup[offer.type]}</h4>
      <p class="popup__text popup__text--capacity">${offer.rooms} ${declinedRooms} для ${offer.guests} ${declinedGuests}</p>
      <p class="popup__text popup__text--time">Заезд после ${offer.checkin}, выезд до ${offer.checkout}</p>
      ${offer.features ? createFeaturesTemplate(offer.features) : ''}
      ${offer.description ? ` <p class="popup__description">${offer.description}</p>` : ''}
      ${getPhotosTemplate(offer.photos)}
  </article>`;
};
