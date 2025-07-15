import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const/const';
import { useSelector } from 'react-redux';
import { State } from '../types/state';
import PrivateRoute from '../components/private-route';
import MainPage from '../pages/main-page/main-page';
import Favorites from '../pages/favorites/favorites';
import NotFoundScreen from '../components/not-found';
import Login from '../pages/login/login';
import Offer from '../pages/offer/offer';
import offersCards from '../mocks/offers';

function App(): JSX.Element {

  const status = useSelector((state: State) => state.authorizationStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path={AppRoute.Main} element={<MainPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={status}>
              <Favorites
                favoriteOffers={offersCards.filter((offer) => offer.isFavorite)}
              />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
