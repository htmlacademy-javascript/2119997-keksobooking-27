import { initCards } from './card.js';
import { getOffers } from './data.js';
import { switchActive } from './form.js';

switchActive();

const data = getOffers();

initCards(data);
