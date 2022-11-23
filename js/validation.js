const MAX_PRICE = 100000;

const TitleSizes = {
  MIN: 30,
  MAX: 100
};

const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const countGuestInRoom = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

export const form = document.querySelector('.ad-form');
const titleLabel = form.querySelector('#title');
const priceLabel = form.querySelector('#price');
const roomsLabel = form.querySelector('#room_number');
const guestsLabel = form.querySelector('#capacity');
const typeLabel = document.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

const resetLabelError = (element) => {
  element.classList.remove('ad-form__element--invalid');
  const parent = element.closest('.ad-form__element');
  const error = parent.querySelector('.pristine-error');

  if (error) {
    error.textContent = '';
    error.style.display = 'none';
  }
};

export const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  successClass: 'has-success',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text'
}, true);


const validateTitle = (value) => value.length >= TitleSizes.MIN && value.length <= TitleSizes.MAX;
const getErrorMessageToTitleValidate = () => `Введите от ${TitleSizes.MIN} до ${TitleSizes.MAX} символов`;

const validatePrice = (value) => value <= MAX_PRICE && value >= typePrice[typeLabel.value];
const getErrorMessageToPriceValidate = () => `От ${typePrice[typeLabel.value]} до ${MAX_PRICE}`;

const validateRoomsAndGuests = () => countGuestInRoom[roomsLabel.value].includes(guestsLabel.value);
const getErrorMessageToRoomsValidate = () => 'Неверное количество мест';
const getErrorMessageToGuestsValidate = () => 'Неверное количество комнат';


pristine.addValidator(titleLabel, validateTitle, getErrorMessageToTitleValidate);
pristine.addValidator(priceLabel, validatePrice, getErrorMessageToPriceValidate);
pristine.addValidator(guestsLabel, validateRoomsAndGuests, getErrorMessageToRoomsValidate);
pristine.addValidator(roomsLabel, validateRoomsAndGuests, getErrorMessageToGuestsValidate);


typeLabel.addEventListener('change', () => priceLabel.setAttribute('placeholder', typePrice[typeLabel.value]));
roomsLabel.addEventListener('change', () => validateRoomsAndGuests && resetLabelError(guestsLabel));
guestsLabel.addEventListener('change', () => validateRoomsAndGuests && resetLabelError(roomsLabel));

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});
timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});


export const validateElement = (element) => {
  pristine.validate(element);
};

