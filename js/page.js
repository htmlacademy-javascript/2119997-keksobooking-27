const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

export const switchStatePage = (active = false) => {
  adForm.classList[active ? 'remove' : 'add']('ad-form--disabled');
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].disabled = !active;
  }
  mapFilters.classList[active ? 'remove' : 'add']('map__filters--disabled');
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].disabled = !active;
  }
};
