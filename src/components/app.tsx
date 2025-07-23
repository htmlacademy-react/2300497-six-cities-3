import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const/const';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from '../store/thunks/auth-thunks';
import { State } from '../types/state';
import PrivateRoute from '../components/private-route';
import MainPage from '../pages/main-page/main-page';
import Favorites from '../pages/favorites/favorites';
import NotFoundScreen from '../components/not-found';
import Login from '../pages/login/login';
import Offer from '../pages/offer/offer';
import { AppDispatch } from '../store';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: State) => state.authorizationStatus);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path={AppRoute.Main} element={<MainPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={status}>
              <Favorites/>
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
