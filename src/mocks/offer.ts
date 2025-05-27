export type OfferTypes = {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  isFavorite: boolean;
  name: string;
  isPremium: boolean;
  type: string;
  rating: number;
  description: string;
  price: number;
  image: string;
  goods: string[];
  bedRooms: number;
  maxAdults: number;
  host: {
    name: string;
    isPro: boolean;
    avatarUrl?: string;
  };
  images?: string[];
  reviews: ReviewTypes[];
};

type ReviewTypes = {
  id: number;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
};
