import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const/const';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Spinner from './spinner';
import { selectIsCheckingAuth } from '../store/selectors';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;
  const isCheckingAuth = useSelector(selectIsCheckingAuth);

  if (isCheckingAuth) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
