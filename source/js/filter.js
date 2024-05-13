 import { MAX_OFFERS } from './map.js';

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
    const checkedCheckboxes = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
        return checkedCheckboxes.every(checkbox => {
            return data.offer.features? 
           data.offer.features.includes(checkbox)
             : false;
    }); 
    },
};


const filters = Array.from(document.querySelector('.map__filters').children);

const filterOffers = (data) => {
    let offers = []; 
  for (let i = 0; i < data.length;  i++) { 
      let result = filters.every(filter => { 
        console.log(filter);
      return filter.value === "any" ? true : filterRules[filter.id](data[i], filter); 
    }); 
    if (result) { 
      offers.push(data[i]); 
    } 
  } 
   return offers.slice(0, MAX_OFFERS); 
};


export { filterOffers}
