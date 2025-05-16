import { OfferTypes } from './offer';
const offersCards: OfferTypes[] = [
  {
    id: 1,
    city: 'Amsterdam',
    isFavorite: true,
    name: 'Beautiful luxurious apartment at great location',
    type: 'Apartment',
    description: 'This is offer 1',
    price: 120,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    rating: 4.5
  },
  {
    id: 2,
    city: 'Amsterdam',
    isFavorite: false,
    name: 'Wood and stone place',
    type: 'Room',
    description: 'This is offer 2',
    price: 100,
    image: 'img/room.jpg',
    isPremium: false,
    rating: 3.5,
  },
  {
    id: 3,
    city: 'Amsterdam',
    isFavorite: true,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    description: 'This is offer 3',
    price: 95,
    image: 'img/apartment-02.jpg',
    isPremium: false,
    rating: 4.0,
  },
  {
    id:4,
    city: 'Amsterdam',
    isFavorite: false,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    description: 'This is offer 4',
    price: 190,
    image: 'img/apartment-03.jpg',
    isPremium: true,
    rating: 5.0,
  }
];

export default offersCards;
