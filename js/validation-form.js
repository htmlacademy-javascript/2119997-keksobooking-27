const form = document.querySelector('.ad-form');
const titleLabel = form.querySelector('#title');
const priceLabel = form.querySelector('#price');
const roomsLabel = form.querySelector('#room_number');
const guestsLabel = form.querySelector('#capacity');
const typeLabel = document.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  successClass: 'success',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text'
},
true
);

const TitleSizes = {
  MIN: 30,
  MAX: 100
};

const Price = {
  MIN: 0,
  MAX: 100000
};

const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

// Валидация заголовка объявления
const validateTitle = (value) => value.length >= TitleSizes.MIN && value.length <= TitleSizes.MAX;
const getErrorTitleMessage = (value) => {
  if (value.length <= TitleSizes.MIN) {
    return `Минимальная длина ${TitleSizes.MIN} символов`;
  } else if (value.length > TitleSizes.MAX) {
    return `Максимальная длина ${TitleSizes.MAX} символов`;
  } else {
    return 'Обязательное поле';
  }
};
pristine.addValidator(titleLabel, validateTitle, getErrorTitleMessage);

// Валидация цены за ночь
const validatePrice = () => Number(priceLabel.value) >= Price.MIN && Number(priceLabel.value) <= Price.MAX;
const getErrorPriceMessage = () => {
  if (Number(priceLabel.value) <= Price.MIN) {
    return `Минимальная цена должна быть больше ${Price.MIN}`;
  } else if (Number(priceLabel.value) > Price.MAX) {
    return `Максимальная цена должна быть меньше ${Price.MAX}`;
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

// Валидация типа жилья
const validateMinPrice = () => typePrice[typeLabel.value] <= priceLabel.value;

const getMinPriceErrorMessage = () => `Минимальная цена для выбранного типа жилья ${typePrice[typeLabel.value]}`;

pristine.addValidator(priceLabel, validateMinPrice, getMinPriceErrorMessage);

typeLabel.addEventListener('change', () => {
  priceLabel.placeholder = typePrice[typeLabel.value];
  pristine.validate(priceLabel);
});

// Валидация въезд-выезд
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

// слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: Price.MIN,
    max: Price.MAX,
  },
  start: Price.MIN,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceLabel.value = sliderElement.noUiSlider.get();
});

