import Header from '../../components/header';
import { OfferTypes } from '../../mocks/offer';
import CitiesCard from '../../components/cities-cards';
import {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../types/state';
import { loadFavoritesFromServer } from '../../store/reducer';

type FavoritesProps = {
  favoriteOffers: OfferTypes[];
};

function Favorites({ favoriteOffers }: FavoritesProps) {
  const status = useSelector((state: State) => state.authorizationStatus);
  const dispatch = useDispatch();
  const favOff = useSelector((state: any) => state.offers.favOff);

  useEffect(() => {
    dispatch(loadFavoritesFromServer());
  }, [dispatch]);

  if (status !== 'AUTH') {
    return <Navigate to="/login" />;
  }

  const offersByCity = favoriteOffers.reduce<Record<string, OfferTypes[]>>(
    (acc, offer) => {
      if (!acc[offer.city]) {
        acc[offer.city] = [];
      }
      acc[offer.city].push(offer);
      return acc;
    },
    {}
  );


  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, cityOffers]) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <CitiesCard key={offer.id} offer={offer} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
