import { sendData } from './api.js';
import { form, pristine } from './validation.js';
import { resetMap } from './map.js';
import { getPreviewImg, resetPreviewImg} from './picture-load.js';
import { openPopup } from './popup.js';
import { ErrorPopupMessage } from './consts.js';
import { slider } from './slider.js';
import { resetFilter } from './filter.js';

const resetButton = form.querySelector('.ad-form__reset');

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

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    sendData(() => {
      openPopup();
      resetForm();
    }, () => openPopup(ErrorPopupMessage.ERROR_POST), new FormData(evt.target));
  }
};

export const initForm = () => {
  getPreviewImg();
  form.addEventListener('submit', onFormSubmit);
};
