import { checkFormValidity } from './form.js';
import { resetForm } from './form.js';

const Urls = {
  GET: 'https://23.javascript.htmlacademy.pro/keksobooking/data',
  POST: 'https://23.javascript.htmlacademy.pro/keksobooking',
}

const getData = (onSuccess) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      alert('При загрузке данных с сервера произошла ошибка');
    })
};

const sendData = (showSuccess, showErr, body) => {
  fetch(Urls.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccess();
        resetForm();
      } else {
        alert('Некорректные данные. Проверьте и попробуйте снова');
        checkFormValidity();
      }
    })
    .catch(() => {
      showErr();
    });
};


export {sendData, getData}
