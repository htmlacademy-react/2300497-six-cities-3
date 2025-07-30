export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

export type User = {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
};

export type LoginResponse = {
  token: string;
  name: string;
  email: string;
  avatarUrl: string;
  isPro: boolean;
};

export const ReviewValidation = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 300,
} as const;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
