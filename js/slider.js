import { validateElement } from './validation.js';

const slider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('[name="price"]');

const Price = {
  MIN: 0,
  MAX: 100000,
};

const Slider = {
  START: 5000,
  STEP: 100,
};

const initSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: Price.MIN,
      max: Price.MAX,
    },
    start: Slider.START,
    step: Slider.STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return value;
      },
    },
  });

  slider.noUiSlider.on('update', () => {
    priceField.value = slider.noUiSlider.get();
    validateElement(priceField);
  });
};

export { initSlider, slider };
