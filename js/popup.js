import { changeStateButtons } from './form.js';
import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');

const SUCCESS_POPUP_TEMPLATE = `<div class="success js-success js-popup">
  <p class="success__message">Ваше объявление<br>успешно размещено!</p>
</div>`;

const getErrorPopupTemplate = (message, isGetDataError) => `<div class="error js-error js-popup">
  <p class="error__message">${message}</p>
  ${isGetDataError ? '' : '<button type="button" class="error__button">Попробовать снова</button>'}
</div>`;

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closePopup();
  }
};

const onDocumentClick = () => closePopup();

function closePopup () {
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onDocumentClick);
  const popup = body.querySelector('.js-popup');
  popup.remove();
  changeStateButtons(false);
}

const openPopup = (errorMessage, isGetDataError = false) => {
  const popupTemplate = errorMessage ? getErrorPopupTemplate(errorMessage, isGetDataError) : SUCCESS_POPUP_TEMPLATE;
  body.insertAdjacentHTML('beforeend', popupTemplate);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);
};

export { closePopup, openPopup };
