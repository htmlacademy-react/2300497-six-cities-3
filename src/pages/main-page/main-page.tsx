import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeCity,
  loadOffers,
  startLoading,
  loadOffersFromServer,
} from '../../store/reducer';
import { State } from '../../types/state';
import OffersList from '../../components/OffersList';
import Map from '../../components/map';
import CityList from '../../components/city-list';
import SortOptions from '../../components/sort-options';
import Spinner from '../../components/spinner';
import api from '../../api';

function MainPage() {
  const dispatch = useDispatch();
  const city = useSelector((state: State) => state.city);
  const offers = useSelector((state: State) => state.offers);
  const sortType = useSelector((state: State) => state.sortType);
  const isLoading = useSelector((state: State) => state.isLoading);

  useEffect(() => {
    dispatch(loadOffersFromServer());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const sortedOffers = [...offers];

  switch (sortType) {
    case 'Price: low to high':
      sortedOffers.sort((a, b) => a.price - b.price);
      break;
    case 'Price: high to low':
      sortedOffers.sort((a, b) => b.price - a.price);
      break;
    case 'Top rated first':
      sortedOffers.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${sortedOffers.length} places to stay in ${city}`}</b>
              <SortOptions />
              <div className="cities__places-list places__list tabs__content">
                <OffersList offersType={sortedOffers} />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                city={{
                  location: offers[0]?.city.location || {
                    latitude: 52.3909553943508,
                    longitude: 4.85309666406198,
                    zoom: 12,
                  },
                }}
                offers={sortedOffers}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
