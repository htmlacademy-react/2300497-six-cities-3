import { useSelector } from 'react-redux';
import { State } from '../types/state';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/reducer';
import { selectFavoriteOffers } from '../store/selectors';
import { AppDispatch } from '../store';

function Header() {
  const status = useSelector((state: State) => state.authorizationStatus);
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const favoriteOffers = useSelector(selectFavoriteOffers);
  const count = favoriteOffers.length;

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
              {status === 'AUTH' ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      to="/favorites"
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {user?.email || 'User'}
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
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/login">
                    Sign in
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
