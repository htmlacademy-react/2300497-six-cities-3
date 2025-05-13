import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import Favorites from '../pages/favorites/favorites';
import { AppRoute, AuthorizationStatus } from '../const/const';
import PrivateRoute from '../components/private-route';
import NotFoundScreen from '../components/not-found';
import Login from '../pages/login/login';
import Offer from '../pages/offer/offer';
import { OfferTypes } from '../mocks/offer';

type AppScreenProps = {
  offersCount: number;
  offersType: OfferTypes;
}

function App({ offersCount, offersType }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offersCount={offersCount} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Offer}
          element={<Offer />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
