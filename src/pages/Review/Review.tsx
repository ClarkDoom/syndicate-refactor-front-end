import { Comment } from '../../types/models'
import { useLocation } from 'react-router';
import { useState } from 'react';

const Review = () => {
  const location = useLocation()
  const review = location.state.review
  const show = location.state.show
  console.log("review page - show", show)
 
  const [commentForm, setCommentForm] = useState<any>({
    commentText: "",
    reaction: "",
  })

  const { commentText, reaction } = commentForm


  const selectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    setCommentForm({ ...commentForm, [evt.target.name]: evt.target.value });
  };


  return (

  

    <>
      <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" />
      <h1>{review.reviewTitle}</h1>
      <p>{review.reviewContent}</p>
      <p>{review.rating}</p>
      <h2>Leave Comment</h2>
      <div>
          <label
            className="placeholder"
            htmlFor="rating">Reaction</label>
          <select
            className="input"
            id="reaction"
            value={reaction}
            name="reaction"
            onChange={selectChange}
          >
            <option value=""></option>
            <option value="👍">👍</option>
            <option value="👎">👎</option>
            <option value="😑">😑</option>
            <option value="😂">😂</option>
            <option value="🧠">🧠</option>
            <option value="🤯">🤯</option>
          </select>
        </div>
      <div>
          <textarea
            value={commentText}
            onChange={(
              ev: React.ChangeEvent<HTMLTextAreaElement>,
            ): void => setCommentForm({ ...commentForm, commentText: ev.target.value })}
            rows={5}
            cols={5}
          />
        </div>
      <button>Submit</button>
      <h2>Comments</h2>
    </>
  );
}

export default Review;