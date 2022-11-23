import { switchStatePage } from './page.js';
import { createCardTemplate } from './card.js';
import { MAX_COUNT_OFFER } from './consts.js';

export const MainPinCoordinates = {
  LAT: 35.68399,
  LNG: 139.75378,
  SCALE: 12,
  DIGITS: 5,
};

const map = L.map('map-canvas');

const pinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setMainPin = () => {
  mainPinMarker.addTo(map);
  mainPinMarker.addTo(map).on('move', (evt) => {
    document.querySelector('.ad-form').querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(MainPinCoordinates.DIGITS)} ${evt.target.getLatLng().lng.toFixed(MainPinCoordinates.DIGITS)}`;
  });
};

const markerGroup = L.layerGroup();

const createNearbyMarker = ({author, offer, location}) => {
  const nearbyMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    },
  );
  nearbyMarker.addTo(markerGroup).bindPopup(createCardTemplate(author, offer));
};

const clearMap = () => markerGroup.clearLayers();

export const renderPointsToMap = (points) => {
  points.slice(0, MAX_COUNT_OFFER).forEach((point) => createNearbyMarker(point));
};

const setDefaultAddressInput = () => {
  document.querySelector('.ad-form').querySelector('#address').value = `${MainPinCoordinates.LAT}, ${MainPinCoordinates.LNG}`;
};

const loadMap = (points) => {
  map
    .on('load', () => {
      switchStatePage(true);
      renderPointsToMap(points);
    })
    .setView({
      lat: MainPinCoordinates.LAT,
      lng: MainPinCoordinates.LNG,
    }, MainPinCoordinates.SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  setMainPin(map);
  setDefaultAddressInput();
  markerGroup.addTo(map);
};

const resetMap = () => {
  map.setView({
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  }, MainPinCoordinates.SCALE);
  mainPinMarker.setLatLng({
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  });
  setDefaultAddressInput();
  map.closePopup();
};

export { loadMap, createNearbyMarker, resetMap, clearMap, mainPinMarker };
