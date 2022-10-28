const form = document.querySelector('.ad-form');
const titleLabel = form.querySelector('#title');
const priceLabel = form.querySelector('#price');
const roomsLabel = form.querySelector('#room_number');
const guestsLabel = form.querySelector('#capacity');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  successClass: 'success',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text'
});

const TITLE_SIZES = {
  min: 30,
  max: 100
};

const Price = {
  min: 0,
  max: 100000
};

// Валидация заголовка объявления
const validateTitle = (value) => value.length >= TITLE_SIZES.min && value.length <= TITLE_SIZES.max;
const getErrorTitleMessage = (value) => {
  if (value.length <= TITLE_SIZES.min) {
    return `Минимальная длина ${TITLE_SIZES.min} символов`;
  } else if (value.length >= TITLE_SIZES.max) {
    return `Максимальная длина ${TITLE_SIZES.max} символов`;
  } else {
    return 'Обязательное поле';
  }
};
pristine.addValidator(titleLabel, validateTitle, getErrorTitleMessage);

// Валидация цены за ночь
const validatePrice = () => Number(priceLabel.value) >= Price.min && Number(priceLabel.value) <= Price.max;
const getErrorPriceMessage = () => {
  if (Number(priceLabel.value) <= Price.min) {
    return `Минимальная цена должна быть больше ${Price.min}`;
  } else if (Number(priceLabel.value) >= Price.max) {
    return `Максимальная цена должна быть меньше ${Price.max}`;
  } else {
    return 'Обязательное поле';
  }
};
pristine.addValidator(priceLabel, validatePrice, getErrorPriceMessage);

// Валидация количества комнат и количества мест
const validateRoomsAndGuests = () => (Number(guestsLabel.value) <= Number(roomsLabel.value) && Number(roomsLabel.value) !== 100 && Number(guestsLabel.value) !== 0) || (Number(roomsLabel.value) === 100 && Number(guestsLabel.value) === 0);
const getErrorRoomsMessage = () => {
  if (Number(roomsLabel.value) < Number(guestsLabel.value)) {
    return 'Количество гостей не должно превышать количество комнат';
  }else if(Number(guestsLabel.value) !== 100 && Number(guestsLabel.value) === 0) {
    return 'не для гостей выбирайте 100 комнат';
  }
};

const getErrorGuestsMessage = () => {
  if (Number(guestsLabel.value) > Number(roomsLabel.value)) {
    return 'Количество комнат не может быть меньше количества гостей';
  } else if(Number(roomsLabel.value) === 100 && Number(guestsLabel.value) !== 0) {
    return '100 комнат это не для гостей';
  }
};
pristine.addValidator(guestsLabel, validateRoomsAndGuests, getErrorRoomsMessage);
pristine.addValidator(roomsLabel, validateRoomsAndGuests, getErrorGuestsMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

