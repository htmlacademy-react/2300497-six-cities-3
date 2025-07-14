import { useSelector } from 'react-redux';
import { State } from '../../types/state';
import { useParams } from 'react-router-dom';
import NotFoundScreen from '../../components/not-found';
import Map from '../../components/map';
import OffersList from '../../components/OffersList';
import ReviewsForm from '../../components/comment-form';
import CommentList from '../../components/comments-list';
import Header from '../../components/header';

function Offer() {
  const { id } = useParams();
  const offers = useSelector((state: State) => state.allOffers);

  const offer = offers.find((item) => item.id === id);

  if (!offer) {
    return <NotFoundScreen />;
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    offer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${(offer.rating / 5) * 100}%` }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedroom{offer.bedrooms !== 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults !== 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                {offer.goods && offer.goods.length > 0 ? (
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="offer__text">Нет доступных удобств</p>
                )}
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper ${
                      offer.host?.isPro ? 'offer__avatar-wrapper--pro' : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host?.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host?.name}</span>
                  {offer.host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  {offer.description?.split('\n').map((paragraph, i) => (
                    <p key={i} className="offer__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">
                    {offer.reviews?.length}
                  </span>
                </h2>
                {<CommentList reviews={offer.reviews} />}
                {<ReviewsForm />}
              </section>
            </div>
          </div>
          <section
            className="offer__map map"
            style={{
              height: '600px',
              width: '1144px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Map
              city={offer.city}
              offers={offers
                .filter(
                  (item) =>
                    item.city.name === offer.city?.name && item.id !== offer.id
                )
                .slice(0, 3)}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList
              offersType={offers
                .filter(
                  (item) =>
                    item.city.name === offer.city?.name && item.id !== offer.id
                )
                .slice(0, 3)}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
