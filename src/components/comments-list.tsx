import { ReviewTypes } from '../mocks/offer';
import Comment from './comment';

type CommentsListProp = {
  reviews: ReviewTypes[];
};

function CommentList({ reviews }: CommentsListProp) {
  return (
    <ul className="reviews__list">
      {reviews?.map((review) => (
        <Comment key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default CommentList;
