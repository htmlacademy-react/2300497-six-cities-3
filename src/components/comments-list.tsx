import { useSelector } from 'react-redux';
import { selectComments } from '../store/reducer';
import Comment from './comment';

function CommentList() {
  const comments = useSelector(selectComments);

  return (
    <ul className="reviews__list">
      {comments.map((review) => (
        <Comment key={review.id} review={review} />
      ))}
    </ul>
  );
}
export default CommentList;
