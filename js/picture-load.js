const IMG_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

const avatarLoader = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housePhotoLoader = document.querySelector('#images');
const housePhotoPreview = document.querySelector('.ad-form__photo');

const getAvatarImg = (file) => {
  avatarPreview.src = URL.createObjectURL(file);
  avatarPreview.alt = 'Аватар';
};

const getHousePhotoImg = (file) => {
  housePhotoPreview.innerHTML = '';
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);
  image.style.width = '100%';
  image.style.height = '100%';
  image.alt = 'Фотография жилья';
  image.style.objectFit = 'cover';
  housePhotoPreview.append(image);
};

const renderPreview = (loader, preview) => {
  const file = loader.files[0];
  const fileName = file.name.toLowerCase();
  const isFileMatchesToTypes = IMG_TYPES.some((it) => fileName.endsWith(it));
  if (isFileMatchesToTypes) {
    preview(file);
  }
};

const getPreviewImg = () => {
  avatarLoader.addEventListener('change', () => renderPreview(avatarLoader, getAvatarImg));
  housePhotoLoader.addEventListener('change', () => renderPreview(housePhotoLoader, getHousePhotoImg));
};

const resetPreviewImg = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  housePhotoPreview.innerHTML = '';
};

export { getPreviewImg, resetPreviewImg };
