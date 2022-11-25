import { switchStatePage } from './page.js';
import { loadMap } from './map.js';
import { getData } from './api.js';
import { initSlider } from './slider.js';
import { initForm } from './form.js';
import { closePopup, openPopup } from './popup.js';
import { TIMEOUT_GET_DATA_ERROR_POPUP_SHOW } from './consts.js';
import { startFilter } from './filter.js';

switchStatePage(true);
initForm();

const getDataSuccessHandler = (data) => {
  const points = data.slice();
  loadMap(points);
  startFilter(points);
  initSlider();
};

const getDataErrorHandler = (message) => {
  openPopup(message, true);
  setTimeout(() => closePopup(), TIMEOUT_GET_DATA_ERROR_POPUP_SHOW);
};

getData(getDataSuccessHandler, getDataErrorHandler);
