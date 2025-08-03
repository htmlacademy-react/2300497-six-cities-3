import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendComment } from '../store/thunks/comment-thunks';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../store';
import { ReviewValidation } from '../store/types/types';

function CommentForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const isFormValid =
    rating !== null && reviewText.length >= ReviewValidation.MIN_LENGTH;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    dispatch(sendComment({ offerId: id, comment: reviewText, rating: rating }))
      .unwrap()
      .then(() => {
        setReviewText('');
        setRating(null);
      })
      .catch((err: unknown) => {
        const message = (err as Error)?.message || 'Не удалось отправить отзыв. Попробуйте ещё раз.';
        setError(message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={rating === 5}
          onChange={() => handleRatingChange(5)}
          disabled={isSubmitting}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={rating === 4}
          onChange={() => handleRatingChange(4)}
          disabled={isSubmitting}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={rating === 3}
          onChange={() => handleRatingChange(3)}
          disabled={isSubmitting}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={rating === 2}
          onChange={() => handleRatingChange(2)}
          disabled={isSubmitting}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={rating === 1}
          onChange={() => handleRatingChange(1)}
          disabled={isSubmitting}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        minLength={ReviewValidation.MIN_LENGTH}
        maxLength={ReviewValidation.MAX_LENGTH}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        onChange={handleTextChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        {error && (
          <p
            className="reviews__error"
            style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}
          >
            {error}
          </p>
        )}
        <button
          className="reviews__submit form__submit button"
          disabled={!isFormValid || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
