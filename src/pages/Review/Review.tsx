import { Comment } from '../../types/models'
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import reviewStyles from "../Review/Review.module.css"

// services
import * as commentService from '../../services/commentService'

const Review = () => {
  const location = useLocation()
  const review = location.state.review
  const show = location.state.show

  const [comments, setComments] = useState([])

  const [commentForm, setCommentForm] = useState<any>({
    commentText: "",
    reaction: "",
  })

  const { commentText, reaction } = commentForm

  useEffect(() => {
    try {
      async function findComments() {
        const response = await commentService.findReviewComments(review.id)
        setComments(response)
      }
      findComments()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const selectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    setCommentForm({ ...commentForm, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await commentService.addComment(show.addedBy, review.id, commentForm)
      alert('Comment Created!')
    } catch (err) {
      console.log(err)
    }
  }

  console.log(review)

  return (
    <div className={reviewStyles.page}>
      <div className={reviewStyles.section1}>
        <div className={reviewStyles.subsection1}>
          <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${show.imageUrl}`} alt="" />
          <div className={reviewStyles.reviewDetails}>
            <h2>{review.reviewTitle}</h2>
            <p>Review by @{review.reviewBy.userName}</p>
            <p>{review.reviewContent}</p>
            <p>{review.rating}</p>
          </div>
        </div>
        <div className={reviewStyles.leaveComment}>
          <h2>Leave Comment</h2>
          <form
            className="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
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
                cols={40}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className={reviewStyles.discussion}>
        <h2>Discussion</h2>
        {comments.map((comment: Comment) =>
          <div key={comment.id} className={reviewStyles.comment}>
            <div className={reviewStyles.commentSection1}>
              <div className={reviewStyles.userNameAndPhoto}>
                <img src={comment.commentBy.photo} alt="" />
                <p>@{comment.commentBy.userName}</p>
              </div>
              <div className={reviewStyles.reaction}>
                <p >{comment.reaction}</p>
              </div>
            </div>
            <div>
              <p>{comment.commentText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;