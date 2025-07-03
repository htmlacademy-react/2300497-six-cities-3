import { OfferTypes } from './offer';

const offersCards: OfferTypes[] = [
  {
    id: 1,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 12,
      },
    },
    isFavorite: true,
    name: 'Beautiful luxurious apartment at great location',
    type: 'Apartment',
    description: 'This is offer 1',
    price: 120,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    rating: 4.5,
    bedRooms: 3,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Kitchen', 'Washing machine'],
    host: {
      name: 'Irina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    reviews: [
      {
        id: 1,
        user: {
          name: 'Max',
          avatarUrl: 'img/avatar-max.jpg',
        },
        rating: 4.5,
        comment: 'Great place!',
        date: '2023-05-01',
      },
    ],
  },
  {
    id: 2,
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 12,
      },
    },
    isFavorite: false,
    name: 'Wood and stone place',
    type: 'Room',
    description: 'This is offer 2',
    price: 100,
    image: 'img/room.jpg',
    isPremium: false,
    rating: 3.5,
    bedRooms: 3,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Kitchen', 'Washing machine'],
    host: {
      name: 'Irina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    reviews: [
      {
        id: 1,
        user: {
          name: 'Max',
          avatarUrl: 'img/avatar-max.jpg',
        },
        rating: 3.5,
        comment: 'Где я?!',
        date: '2023-05-01',
      },
    ],
  },
  {
    id: 3,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 12,
      },
    },
    isFavorite: true,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    description: 'This is offer 3',
    price: 95,
    image: 'img/apartment-02.jpg',
    isPremium: false,
    rating: 4.0,
    bedRooms: 3,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Kitchen', 'Washing machine'],
    host: {
      name: 'Irina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    reviews: [
      {
        id: 1,
        user: {
          name: 'Max',
          avatarUrl: 'img/avatar-max.jpg',
        },
        rating: 4,
        comment: 'Great place!',
        date: '2023-05-01',
      },
      {
        id: 2,
        user: {
          name: 'Din',
          avatarUrl: 'img/avatar-max.jpg',
        },
        rating: 4,
        comment: 'Мне заплатили',
        date: '2023-05-01',
      },
      {
        id: 3,
        user: {
          name: 'Sara',
          avatarUrl: 'img/avatar-max.jpg',
        },
        rating: 4,
        comment: 'Cool!',
        date: '2023-05-01',
      },
    ],
  },
  {
    id: 4,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 12,
      },
    },
    isFavorite: false,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    description: 'This is offer 4',
    price: 190,
    image: 'img/apartment-03.jpg',
    isPremium: true,
    rating: 5.0,
    bedRooms: 3,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Kitchen', 'Washing machine'],
    host: {
      name: 'Irina',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    reviews: [
      {
        id: 1,
        user: {
          name: 'Max',
          avatarUrl: 'img/avatar-max.jpg',
        },
        rating: 4,
        comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        date: '2023-05-01',
      },
    ],
  },
];

export default offersCards;
