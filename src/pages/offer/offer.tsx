import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadOfferById } from '../../store/thunks/offer-thunks';
import { useParams } from 'react-router-dom';
import NotFoundScreen from '../../components/not-found';
import Map from '../../components/map';
import OffersList from '../../components/offers-list';
import CommentsList from '../../components/comments-list';
import Header from '../../components/header';
import { getOfferWithNearby } from '../../store/selectors';
import { AppDispatch } from '../../store';
import ErrorBoundary from '../../components/error-boundary';
import Spinner from '../../components/spinner';
import { RootState } from '../../store';
import CommentForm from '../../components/comment-form';
import { selectIsAuthorized } from '../../store/selectors';
import { useNavigate } from 'react-router-dom';
import { toggleFavorite } from '../../store/thunks/offer-thunks';

function Offer() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { nearby } = useSelector(getOfferWithNearby);
  const comments = useSelector((state: RootState) => state.comments);
  const isAuthorized = useSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const { currentOffer, isLoading } = useSelector((state: RootState) => ({
    currentOffer: state.currentOffer.offer,
    isLoading: state.currentOffer.status === 'loading',
  }));

  const handleFavoriteClick = () => {
    if (!isAuthorized) {
      navigate('/login');
      return;
    }

    if (!currentOffer) {
      return;
    }

    const newStatus = currentOffer.isFavorite ? 0 : 1;

    dispatch(toggleFavorite({ offerId: currentOffer.id, status: newStatus }));
  };

  useEffect(() => {
    if (id) {
      dispatch(loadOfferById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentOffer) {
      setActiveOfferId(currentOffer.id);
    }
  }, [currentOffer]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    src={image}
                    alt={`Photo of ${currentOffer.title}`}
                    className="offer__image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${currentOffer.isFavorite
                    ? 'offer__bookmark-button--active'
                    : ''
                  }`}
                  type="button"
                  onClick={handleFavoriteClick}
                  disabled={isLoading}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${(currentOffer.rating / 5) * 100}%` }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedroom
                  {currentOffer.bedrooms !== 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adult
                  {currentOffer.maxAdults !== 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                {currentOffer.goods && currentOffer.goods.length > 0 ? (
                  <ul className="offer__inside-list">
                    {currentOffer.goods.map((good) => (
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
                    className={`offer__avatar-wrapper user__avatar-wrapper ${currentOffer.host?.isPro
                      ? 'offer__avatar-wrapper--pro'
                      : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host?.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host?.name}
                  </span>
                  {currentOffer.host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  {currentOffer.description?.split('\n').map((paragraph) => (
                    <p key={paragraph} className="offer__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{comments?.length}</span>
                </h2>
                <ErrorBoundary>
                  <CommentsList />
                </ErrorBoundary>
                {isAuthorized && <CommentForm />}
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
              city={currentOffer.city}
              offers={[
                currentOffer,
                ...nearby
                  .filter(
                    (item) =>
                      item.city.name === currentOffer.city.name &&
                      item.id !== currentOffer.id
                  )
                  .slice(0, 3),
              ]}
              activeOfferId={activeOfferId}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                offersType={nearby
                  .filter(
                    (item) =>
                      item.city.name === currentOffer.city.name &&
                      item.id !== currentOffer.id
                  )
                  .slice(0, 3)}
                onActiveCardChange={setActiveOfferId}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
