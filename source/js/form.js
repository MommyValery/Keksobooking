
import { showSuccess, showErr } from './util.js';
import { marker, resetAddress } from './map.js';
import { sendData } from './data.js';

const addressInput = document.querySelector('#address');
addressInput.readOnly = true;
const setAddresInputValue = ({lat, lng}) => {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
};


const completeAddressInput = () => {
    setAddresInputValue(marker.getLatLng());

}

completeAddressInput();

const type = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const MAX_PRICE = 1000000;
priceInput.placeholder = '1000';
priceInput.min = '1000';
priceInput.max = MAX_PRICE;

const getPriceBorders = type.addEventListener('change', () => {
  priceInput.value = '';
  if (type.value === 'flat') {
    priceInput.min = '1000';
    priceInput.placeholder = '1000';
  }
  else if (type.value === 'bungalow') {
    priceInput.min = '0';
    priceInput.placeholder = '0';
  } else if (type.value === 'house') {
    priceInput.placeholder = '5000';
    priceInput.min = '5000';
  } else if (type.value === 'palace') {
    priceInput.placeholder = '10000';
    priceInput.min = '10000';
  } else if (type.value === 'hotel') {
    priceInput.placeholder = '3000';
    priceInput.min = '3000';
  }
});

//валидация цены (+)
priceInput.addEventListener('input', () => {
  priceInput.setCustomValidity('');
  const valueLength = priceInput.value;
  if (Number(valueLength) < priceInput.min) {
    priceInput.setCustomValidity(`Минимальная цена за ночь ${priceInput.min}`);
    priceInput.style.borderColor = 'red';
  } else if (Number(valueLength) > MAX_PRICE) {
    priceInput.setCustomValidity('Максимальная цена за ночь 1 000 000 руб');
    priceInput.style.borderColor = 'red';
  } else {
    priceInput.style.borderColor = '';
  }
  priceInput.reportValidity();
});

// валидация названия (+)
const titleInput = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  titleInput.setCustomValidity('');
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    titleInput.style.borderColor = 'red';
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    titleInput.style.borderColor = 'red';
  } else  {
    titleInput.setCustomValidity('');
    titleInput.style.borderColor = '';
  }
  titleInput.reportValidity();
})


// функция выравнивания времени (+)
const timein = document.querySelector('#timein'),
  timeout = document.querySelector('#timeout');

const timeInIsOut = timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});
const TimeOutIsIn = timein.addEventListener('change', () => {
  timeout.value = timein.value;
});


// функция синхрона комнат и мест (сделать сеткастомвалидити, ниже есть комментарии)
const formRoomNumber = document.querySelector('#room_number');
const formCapacity = document.querySelector('#capacity');
const roomForGuest = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const checkRoomsCapacity = () => {
  if (formRoomNumber.value === '1') {
    for (let i = 0; i < formCapacity.length; i++) {
      if ((formCapacity[i].value) !== formRoomNumber.value) {
        formCapacity[i].disabled = 'true';
      }
    }
  }
  formRoomNumber.addEventListener('change', (e) => {
    const numberRooms = roomForGuest[e.target.value];
    for (const currentCapacityItem of formCapacity.children) {
      currentCapacityItem.disabled = !numberRooms.includes(currentCapacityItem.value);
    }
    formCapacity.value = numberRooms[0];
  });
  formCapacity.addEventListener('change', () => {
    formCapacity.style.borderColor = '';
  })
}

checkRoomsCapacity();


const checkFormValidity = () => {
  if (!titleInput.checkValidity()) {
    titleInput.setCustomValidity('Введите название');
    titleInput.style.borderColor = 'red';
  }
  if (!priceInput.checkValidity()) {
    priceInput.setCustomValidity('Введите цену');
    priceInput.style.borderColor = 'red';
  }
  if (formRoomNumber.value === '1' && formCapacity.value === '3') {
    formCapacity.setCustomValidity('Выберите количество комнат');
    formCapacity.style.borderColor = 'red';
  }
}

//активное и пассивное состояние формы
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');

const disableAdForm = () => {
  adForm.classList.toggle('ad-form--disabled');
  adFormFieldsets.forEach(fieldset => {
    fieldset.disabled = !fieldset.disabled;
  });
};

const disableFilterForm = () => {
  filterForm.classList.toggle('map__filters--disabled');
  for (let filterFormItem of filterForm.children) {
    filterFormItem.disabled = !filterFormItem.disabled;
  }
};

disableAdForm();
disableFilterForm();



// функция отправки формы (+, но можно алерт поменять на функцию)
const adSubmit = () => {
  const submitButton = document.querySelector('.ad-form__submit');
  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const formData = new FormData(adForm);
    sendData(() => {
      showSuccess();
    },
    () => {
      showErr()
    }, formData);
  })
}

const resetForm = () => {
  document.querySelector('.ad-form').reset();
  resetAddress();
}


// короче не могу, при клике сбрасывается адрес
// const clickResetButton = () => {
//   const resetButton = document.querySelector('button[type="reset"]');
//   resetButton.addEventListener('click', resetForm())
// }

// clickResetButton();

adSubmit();


export {
  timeInIsOut,
  TimeOutIsIn,
  getPriceBorders,
  checkRoomsCapacity,
  adSubmit,
  setAddresInputValue,
  disableAdForm,
  disableFilterForm,
  resetForm,
  checkFormValidity
}

