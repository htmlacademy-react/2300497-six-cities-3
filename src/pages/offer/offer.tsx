import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadOfferById, loadCommentsById } from '../../store/reducer';
import { useParams } from 'react-router-dom';
import NotFoundScreen from '../../components/not-found';
import Map from '../../components/map';
import OffersList from '../../components/OffersList';
import CommentList from '../../components/comments-list';
import Header from '../../components/header';
import { getOfferWithNearby } from '../../store/selectors';
import { AppDispatch } from '../../store';
import ErrorBoundary from '../../components/error-boundary';
import Spinner from '../../components/spinner';
import { RootState } from '../../store';
import ReviewsForm from '../../components/comment-form';
import { selectIsAuthorized } from '../../store/reducer';

function Offer() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentOffer, nearby, isLoading } = useSelector(getOfferWithNearby);
  const comments = useSelector((state: RootState) => state.comments);
  const isAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    if (id) {
      dispatch(loadOfferById(id));
      dispatch(loadCommentsById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  console.log('currentOffer:', currentOffer);
  console.log('nearby:', nearby);
  console.log('isLoading:', isLoading);

  const filtered = nearby.filter(
    (item) =>
      item.city.name === currentOffer?.city?.name &&
      item.id !== currentOffer?.id
  );

  console.log('filtered:', filtered);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image, index) => (
                <div className="offer__image-wrapper" key={index}>
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
                  ></span>
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
                  {currentOffer.description?.split('\n').map((paragraph, i) => (
                    <p key={i} className="offer__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__section offer__section--reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{comments?.length}</span>
                </h2>
                <ErrorBoundary>
                  <CommentList />
                </ErrorBoundary>
                {isAuthorized && <ReviewsForm />}
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
              offers={nearby
                .filter(
                  (item) =>
                    item.city.name === currentOffer.city?.name &&
                    item.id !== currentOffer.id
                )
                .slice(0, 3)}
              activeOfferId={currentOffer.id}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList
              offersType={nearby
                .filter(
                  (item) =>
                    item.city.name === currentOffer.city?.name &&
                    item.id !== currentOffer.id
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
