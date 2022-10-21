import { initCards } from './card.js';
import { getOffers } from './data.js';

const data = getOffers();

initCards(data);
