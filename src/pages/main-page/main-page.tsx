import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadOffersFromServer } from '../../store/thunks/offer-thunks';
import { State } from '../../types/state';
import OffersList from '../../components/Offers-list';
import Map from '../../components/map';
import CityList from '../../components/city-list';
import SortOptions from '../../components/sort-options';
import Spinner from '../../components/spinner';
import Header from '../../components/header';
import { AppDispatch } from '../../store';
import MainEmpty from '../main-empty/main-empty';
import { selectCurrentOffers } from '../../store/selectors';

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: State) => state.isLoading);
  const sortedOffers = useSelector(selectCurrentOffers);
  const city = useSelector((state: State) => state.city);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadOffersFromServer());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (sortedOffers.length === 0) {
    return <MainEmpty city={city} />;
  }

  const currentCity = sortedOffers[0].city.name;

  return (
    <div className="page page--gray page--main">
      <Header />
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
              <b className="places__found">{`${sortedOffers.length} places to stay in ${currentCity}`}</b>
              <SortOptions />
              <OffersList
                offersType={sortedOffers}
                onActiveCardChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={{
                  location: sortedOffers[0]?.city.location || {
                    latitude: 52.3909553943508,
                    longitude: 4.85309666406198,
                    zoom: 12,
                  },
                }}
                offers={sortedOffers}
                activeOfferId={activeOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
