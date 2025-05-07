import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="page">
      <section className="page__screen">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </section>
    </section>
  );
}

export default NotFoundScreen;
