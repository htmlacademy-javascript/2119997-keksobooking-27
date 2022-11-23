import { switchStatePage } from './page.js';
import { createCardTemplate } from './card.js';
import { COUNT_OBJECTS } from './consts.js';

export const MainPinCoordinates = {
  LAT: 35.68399,
  LNG: 139.75378,
  scale: 12,
  digits: 5,
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
    document.querySelector('.ad-form').querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(MainPinCoordinates.digits)} ${evt.target.getLatLng().lng.toFixed(MainPinCoordinates.digits)}`;
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
  points.slice(0, COUNT_OBJECTS).forEach((point) => createNearbyMarker(point));
};

const setDefaultAdressInput = () => {
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
    }, MainPinCoordinates.scale);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  setMainPin(map);
  setDefaultAdressInput();
  markerGroup.addTo(map);
};

const resetMap = () => {
  map.setView({
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  }, MainPinCoordinates.scale);
  mainPinMarker.setLatLng({
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  });
  setDefaultAdressInput();
  map.closePopup();
};

export { loadMap, createNearbyMarker, resetMap, clearMap, mainPinMarker };
