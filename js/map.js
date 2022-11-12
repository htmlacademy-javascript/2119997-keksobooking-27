import { switchStatePage } from './page.js';
import { createCard } from './card.js';

const MainPinCoordinates = {
  LAT: 35.68399,
  LNG: 139.75378,
  scale: 12,
  digits: 5,
};

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

const setMainPin = (map) => {
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
  nearbyMarker.addTo(markerGroup).bindPopup(createCard({author, offer}));
};

const loadMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      switchStatePage(false);
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
  markerGroup.addTo(map);
};

export {loadMap, createNearbyMarker};
