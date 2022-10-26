import {declineNum} from './utils.js';

const typePopup = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const mapCanvas = document.querySelector('#map-canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const offersListFragment = document.createDocumentFragment();

const createCard = (({ author, offer }) => {
  const offerElement = offerTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.addres;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = typePopup[offer.type];

  const declinedRooms = declineNum(offer.rooms, ['комната', 'комнаты', 'комнат']);
  const declinedGuests = declineNum(offer.guests, ['гостя', 'гостей', 'гостей']);
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declinedRooms} для ${offer.guests} ${declinedGuests}`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  // offerElement.querySelector('.popup__features').src = offer.features;
  const featuresContainer = offerElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (offer.features.length > 0) {
    featuresList.forEach((featuresListItem) => {
      const isNecessary = offer.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  } else {
    featuresContainer.remove();
  }

  const offerDescription = offerElement.querySelector('.popup__description');
  if (offer.description.length) {
    offerDescription.textContent = offer.description;
  } else {
    offerDescription.remove();
  }
  offerElement.querySelector('.popup__photo').src = offer.photos;

  const photosContainer = offerElement.querySelector('.popup__photos');
  const photosList = photosContainer.querySelector('.popup__photo');

  if (!offer.photos) {
    photosContainer.remove();
  } else {
    photosList.src = offer.photos[0];

    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const photoItemElement = photosList.cloneNode(true);
        photoItemElement.src = offer.photos[i];
        photosContainer.append(photoItemElement);
      }
    }
  }

  offerElement.querySelector('.popup__avatar').src = author.avatar;
  offersListFragment.append(offerElement);
});

const createCards = (offers) => {
  offers.forEach((offer) => createCard(offer));
  mapCanvas.append(offersListFragment);
};

export const initCards = (offers) => {
  createCards(offers);
};
