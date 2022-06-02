'use strict';
const body = document.querySelector('body');
const toastBtn = document.getElementById('toast-btn');

let _toast;
let timeOut, timeOut2;

const generateToast = ({ type = '', title, msg }) => {
  const toast = document.createElement('div');
  const toastTypeIcon = document.createElement('i');
  const toastText = document.createElement('div');
  const toastTitle = document.createElement('div');
  const toastMsg = document.createElement('div');
  const toastIconClose = document.createElement('i');

  if (timeOut || timeOut2) {
    clearTimeout(timeOut);
    clearTimeout(timeOut2);
  }

  const typeMsg = {
    info: ['fa-solid', 'fa-message'],
    success: ['fa-solid', 'fa-check'],
    danger: ['fa-solid', 'fa-xmark'],
    warning: ['fa-solid', 'fa-exclamation'],
  };

  toast.append(toastTypeIcon);
  toast.append(toastText);
  toast.append(toastIconClose);
  toastText.append(toastTitle);
  toastText.append(toastMsg);
  toastMsg.textContent = msg;
  toastTitle.textContent = title ? title : 'Message';

  toast.id = 'toast';
  toast.classList.add('toast');
  toastTypeIcon.classList.add('toast__icon');
  toastText.classList.add('toast__text');
  toastTitle.classList.add('toast__title');
  toastMsg.classList.add('toast__msg');
  toastIconClose.classList.add('fa-solid', 'fa-xmark', 'toast__icon-btn');

  if (type && typeMsg[type]) {
    toast.classList.add(`toast-${type}`);
    toastTypeIcon.classList.add(...typeMsg[type]);
  } else {
    toast.classList.add('toast-info');
    toastTypeIcon.classList.add(...typeMsg['info']);
  }

  toastIconClose.addEventListener('click', () => {
    toast.classList.remove('toast--active');
    toastBtn.disabled = false;

    setTimeout(() => {
      body.removeChild(_toast);
      _toast = null;
    }, 400);
  });

  body.append(toast);

  return toast;
};

const gnToast = (toastObj) => {
  if (!_toast) {
    _toast = generateToast(toastObj);
    _toast.classList.add('toast--active');

    toastBtn.disabled = true;

    timeOut = setTimeout(() => {
      _toast?.classList.remove('toast--active');
    }, 5000);

    timeOut2 = setTimeout(() => {
      toastBtn.disabled = false;
      _toast && body.removeChild(_toast);
      _toast = null;
    }, 5400);
  }
};

toastBtn.addEventListener('click', () => {
  const toastObj = {
    type: 'warning',
    title: 'Warning',
    msg: 'The data is of dubious origin!',
  };

  gnToast(toastObj);
});
