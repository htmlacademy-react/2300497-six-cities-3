import { ReviewTypes } from '../mocks/offer';

type CommentProps = {
  review: ReviewTypes;
};

function Comment({ review }: CommentProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            alt="Reviews avatar"
            width="54"
            height="54"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(review.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {new Date(review.date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
    </li>
  );
}

export default Comment;
