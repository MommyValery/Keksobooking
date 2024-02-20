// import { MAX_OFFERS } from './map.js';


const DEFAULT_VALUE = 'any';
const housingPrice = {
  'low': {
    from: 0,
    to: 10000,
  },
  'middle': {
    from: 10000,
    to: 50000,
  },
  'high': {
    from: 50000,
    to: Infinity,
  },
}
const filters = Array.from(document.querySelector('.map__filters').children);

const filterRules = {
  'housing-type': (data, filter) => {
    return filter.value === data.offer.type;
  },
  'housing-price': (data, filter) => {
    return data.offer.price >= housingPrice[filter.value].from && data.offer.price < housingPrice[filter.value].to;
  },
  'housing-rooms': (data, filter) => {
    return filter.value === data.offer.rooms.toString();
  },
  'housing-guests': (data, filter) => {
    return filter.value === data.offer.guests.toString();
  },
  'housing-features': (data, filter) => {
    const checkedCheckboxes = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
    return checkedCheckboxes.every(checkbox => {
      return data.offer.features.some(feature => {
        return feature === checkbox.value;
      });
    });
  },
};

const filterOffers = (data) => {
  let offers = [];
  let result;
  for (let i = 0; i < data.length;  i++) {
    result = filters.every(filter => {
      return filter.value === DEFAULT_VALUE ? true : filterRules[filter.id](data[i], filter);
    });
    if (result) {
      offers.push(data[i]);
    }
  }
  // offers.slice(0, MAX_OFFERS);
  return offers;
};



export { filterOffers}
