import { Link } from 'react-router-dom';
import '../../public/css/not-found.css';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="main-page">
      <section className="main-page__screen">
      <h1 className="not-found-header">
        404
        <span aria-hidden="true">404</span>
      </h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <p className="not-found-text">
          We're fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it's behalf.
        </p>
      </div>
      <Link to="/">Вернуться на главную</Link>
    </section>
    </section >
  );
}

export default NotFoundScreen;
