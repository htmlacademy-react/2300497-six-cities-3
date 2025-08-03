import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/thunks/auth-thunks';
import { selectFavoriteOffers } from '../store/selectors';
import { AppDispatch, RootState } from '../store';
import { AuthorizationStatus } from '../const/const';

function Header() {
  const status = useSelector((state: RootState) => state.user.authorizationStatus);
  const userEmail = useSelector((state: RootState) => state.user.user?.email);
  const dispatch = useDispatch<AppDispatch>();
  const favoriteOffers = useSelector(selectFavoriteOffers);
  const count = favoriteOffers?.length || 0;

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {status === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      to="/favorites"
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userEmail}
                      </span>
                      <span className="header__favorite-count">{count}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" onClick={handleSignOut}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <Link
                  to="/login"
                  className="header__nav-link header__nav-link--profile"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__login">Sign in</span>
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
