import { createCustomPopup } from './cards.js';
import { filterOffers } from './filter.js';
import { getData } from './data.js';
import { debounce } from './util.js';
import { setAddresInputValue, disableAdForm, disableFilterForm } from './form.js';
import L from 'leaflet';

const filterForm = document.querySelector('.map__filters');

const MAX_ZOOM = 10,
  TOKYO = { lat: 35.652832, lng: 139.839478 },
  MAX_OFFERS = 10,
  RENDER_DELAY = 500;

const map = L.map('map-canvas')
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, MAX_ZOOM);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

const marker = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
marker.addTo(map);

const resetAddress = () => {
  marker.setLatLng(TOKYO);
  setAddresInputValue(marker.getLatLng());
};

const layerGroup = L.layerGroup().addTo(map);

const removeMapPin = () => {
  layerGroup.clearLayers();
}

const pinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
},
)

let offers;

const renderOffers = (offers) => {
  offers.forEach(offer => {
    L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: pinIcon,
    }).addTo(layerGroup)
      .bindPopup(createCustomPopup(offer));
  });
};

const onFilterChange = debounce(() => {
  removeMapPin();
  renderOffers(filterOffers(offers));
}, RENDER_DELAY);

const onFilterReset = () => {
  onFilterChange();
};

const onSuccess = (data) => {
  offers = data;
  renderOffers(offers);
  filterForm.addEventListener('change', onFilterChange);
  filterForm.addEventListener('reset', onFilterReset);
  disableFilterForm();
  disableAdForm();
};

getData(onSuccess);

marker.on('moveend', (evt) =>
  setAddresInputValue(evt.target.getLatLng()));

export {MAX_OFFERS, resetAddress, onSuccess, marker}
