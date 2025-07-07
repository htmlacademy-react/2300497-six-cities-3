import { OfferTypes } from '../mocks/offer';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

type CitiesCardProps = {
  offer: OfferTypes;
  isActive: boolean;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
};

function CitiesCard({
  offer,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: CitiesCardProps) {
  console.log('Images:', offer.images);

  return (
    <div
      className={`cities__place-card place-card ${isActive ? 'active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`/offer/${offer.id}`}>
        <article className="cities__card place-card">
          {offer.isPremium && (
            <div className="place-card__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="cities__image-wrapper place-card__image-wrapper">
            <img
              className="place-card__image"
              src={offer.images || 'img/placeholder.jpg'}
              width="260"
              height="200"
              alt="Place image"
            />
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;{offer.price}</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button
                className="place-card__bookmark-button button"
                type="button"
              >
                <svg
                  className="place-card__bookmark-icon"
                  width="18"
                  height="19"
                >
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <a href="#">{offer.title}</a>
            </h2>
            <p className="place-card__type">{offer.type}</p>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default CitiesCard;
