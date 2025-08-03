import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../store/thunks/auth-thunks';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/reducer';
import { randomCity } from '../../utils/random-city-start';
import { cities } from '../../store/types/types';
import { AppDispatch, RootState } from '../../store';
import { AuthorizationStatus } from '../../const/const';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.user.authorizationStatus);
  const [currentCity, setCurrentCity] = useState<string>('Paris');
  const navigate = useNavigate();
  const [error, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const city = randomCity(cities);
    setCurrentCity(city);
  }, []);

  const validate = () => {
    const errors = [];
    if (password.length < 6) {
      errors.push('Пароль должен быть не менее 6 символов');
    }
    if (!/\d/.test(password)) {
      errors.push('Пароль должен содержать цифру');
    }
    if (!/[a-zA-Z]/.test(password)) {
      errors.push('Пароль должен содержать букву');
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors([]);
    dispatch(login({ email, password }));
  };

  const handleCityClick = (city: string) => {
    dispatch(changeCity(city));
    navigate('/');
  };

  if (status === AuthorizationStatus.Auth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page page--gray page--login">
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
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  minLength={1}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error.length > 0 && (
                <div className="login__error">
                  <ul>
                    {error.map((err) => (
                      <li key={err} style={{ color: 'red', fontSize: '14px' }}>
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCityClick(currentCity);
                }}
              >
                <span>{currentCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
