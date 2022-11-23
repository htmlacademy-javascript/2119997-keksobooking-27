import { sendData } from './api.js';
import { form, pristine } from './validation.js';
import { resetMap } from './map.js';
import { getPreviewImg, resetPreviewImg} from './picture-load.js';
import { openPopup } from './popup.js';
import { ErrorPopupMessage } from './consts.js';
import { slider } from './slider.js';
import { resetFilter } from './filter.js';

const resetButton = form.querySelector('.ad-form__reset');
const submitButton = form.querySelector('.ad-form__submit');

const resetForm = () => {
  form.reset();
  resetMap();
  resetFilter();
  slider.noUiSlider.reset();
  resetPreviewImg();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const changeStateButtons = (isDisabled = false) => {
  resetButton.disabled = isDisabled;
  submitButton.disabled = isDisabled;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    changeStateButtons(true);
    sendData(() => {
      openPopup();
      resetForm();
      resetFilter();
    }, () => openPopup(ErrorPopupMessage.ERROR_POST), new FormData(evt.target));
  }
};

const initForm = () => {
  getPreviewImg();
  form.addEventListener('submit', onFormSubmit);
};

export { changeStateButtons, initForm };
