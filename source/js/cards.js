import { createPhotoOffer, createOfferFeatures } from './util.js';

const translateType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
}

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createCustomPopup = ({author: { avatar }, offer: { title, address, price, checkin, checkout, description, features, guests, rooms, type, photos } }) => {
  const popupElement = cardTemplate.cloneNode(true);
  const avatarImg = popupElement.querySelector('.popup__avatar'),
    offerTitle =  popupElement.querySelector('.popup__title'),
    offerAddress = popupElement.querySelector('.popup__text--address'),
    offerTime = popupElement.querySelector('.popup__text--time'),
    offerCapacity = popupElement.querySelector('.popup__text--capacity'),
    offerFeatures = popupElement.querySelector('.popup__features'),
    offerPrice = popupElement.querySelector('.popup__text--price'),
    offerType = popupElement.querySelector('.popup__type'),
    offerDescription = popupElement.querySelector('.popup__description'),
    offerPhotos = popupElement.querySelector('.popup__photos');

  if (photos) {
    offerPhotos.innerHTML = '';
    offerPhotos.appendChild(createPhotoOffer(photos));
  } else {
    offerPhotos.remove();
  }

  if (features) {
    offerFeatures.innerHTML = '';
    const featuresList = createOfferFeatures(features);
    offerFeatures.appendChild(featuresList);
  } else {
    offerFeatures.remove();
  }

  if (avatar) {
    avatarImg.src = avatar;
  } else {
    avatarImg.remove();
  }

  if (title) {
    offerTitle.textContent = title;
  } else {
    offerTitle.remove();
  }

  if (address) {
    offerAddress.textContent = address;
  } else {
    offerAddress.remove();
  }

  if (checkin && checkout) {
    offerTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    offerTime.remove();
  }

  if (rooms & guests) {
    offerCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    offerCapacity.remove();
  }

  if (price) {
    offerPrice.textContent =  price + ' ₽/ночь';
  } else {
    offerPrice.remove();
  }

  if (type) {
    offerType.textContent = translateType(type);
  } else {
    offerType.remove();
  }

  if (description) {
    offerDescription.textContent = description;
  } else {
    offerDescription.remove();
  }


  return popupElement;
};




export {createCustomPopup}
