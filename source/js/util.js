const PHOTO_SIZE = {
  width: 45,
  height: 40,
}

const createPhotoOffer = (photos) => {
  const offerPhotosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.alt = 'Фотография жилья';
    newPhoto.src = photo;
    newPhoto.width = PHOTO_SIZE.width;
    newPhoto.height = PHOTO_SIZE.height;
    offerPhotosFragment.appendChild(newPhoto);
  });
  return offerPhotosFragment;
}

const createOfferFeatures = (features) => {
  const featuresOfferFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add(`popup__feature--${feature}`);
    featuresOfferFragment.appendChild(newFeature);
  });
  return featuresOfferFragment;
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};


const closeModal = (modalWindow) => {
  window.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalWindow.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modalWindow.remove();
    }
  });
}

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  document.body.append(successTemplate);
  closeModal(successTemplate);
}

const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showErrorMessage = () => {
  errorTemplate.disabled = 'false';
  document.body.append(errorTemplate);
  closeErrorModal();
}

const closeErrorModal = () => {
  const buttonError = document.querySelector('.error__button');
  buttonError.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorTemplate.remove();
  })
  closeModal(errorTemplate);
}


const debounce = function (cb, interval) {
  let lastTimeout = null;
  return () => {
    const parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb.apply(null, parameters);
    }, interval);
  };
};


export { createPhotoOffer, createOfferFeatures, showSuccessMessage as showSuccess, showErrorMessage as showErr, debounce, closeErrorModal, closeModal }
