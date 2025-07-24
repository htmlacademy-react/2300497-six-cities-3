import { useSelector } from 'react-redux';
import Comment from './comment';
import { selectRecentComments } from '../store/selectors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loadCommentsById } from '../store/thunks/comment-thunks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


function CommentList() {
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(selectRecentComments);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(loadCommentsById(id));
    }
  }, [dispatch, id]);


  return (
    <ul className="reviews__list">
      {comments.map((review) => (
        <Comment key={review.id} review={review} />
      ))}
    </ul>
  );
}
export default CommentList;
