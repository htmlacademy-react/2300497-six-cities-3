import { OfferTypes } from '../mocks/offer';
import { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { AppDispatch } from '../store';
import { selectIsAuthorized } from '../store/selectors';
import { toggleFavorite } from '../store/thunks/offer-thunks';

type CitiesCardProps = {
  offer: OfferTypes;
  isActive: boolean;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  wrapperClassName?: 'cities__card' | 'favorites__card';
  imageWrapperClassName?: 'cities__image-wrapper' | 'favorites__image-wrapper';
  imageWidth?: number;
  imageHeight?: number;
};

function CitiesCard({
  offer,
  isActive,
  onMouseEnter,
  onMouseLeave,
  wrapperClassName = 'cities__card',
  imageWrapperClassName = 'cities__image-wrapper',
  imageWidth = 260,
  imageHeight = 200,
}: CitiesCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthorized = useSelector(selectIsAuthorized);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (!isAuthorized) {
      navigate('/login');
      return;
    }

    const newStatus = offer.isFavorite ? 0 : 1;

    dispatch(toggleFavorite({ offerId: offer.id, status: newStatus }));
  };

  return (
    <article
      className={`place-card ${wrapperClassName} ${isActive ? 'active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${imageWrapperClassName}`}>
        <img
          className="place-card__image"
          width={imageWidth}
          height={imageHeight}
          src={offer.previewImage}
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
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
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
        <Link to={`/offer/${offer.id}`}>
          <h2 className="place-card__name">
            <div>{offer.title}</div>
          </h2>
        </Link>
        <p className="place-card__type">
          {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
        </p>
      </div>
    </article>
  );
}

export default CitiesCard;
