import { useLocation } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

import * as reviewService from '../../services/reviewService'

import { CreateReviewProps } from '../../types/props'

import styles from "./CreateReview.module.css"

const CreateReview = (props: CreateReviewProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const showId = location.state.showId
  const { profileId } = props


  //! remove any
  const [formData, setFormData] = useState<any>({
    rating: 0,
    reviewContent: "",
    reviewFor: showId,
    reviewTitle: ''
  })

  const { rating, reviewTitle, reviewContent } = formData

  const handleChange = (evt: any): void => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const selectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await reviewService.addReview(profileId, showId, formData)
      alert('Review Created!')
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.page}>
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="subtitle">Create a Review!</div>

        <div className="input-container ic1">
          <label
            htmlFor="item-name"
          ></label>
          <input
            type="text"
            id="reviewTitle"
            value={reviewTitle}
            name="reviewTitle"
            onChange={handleChange}
            placeholder="Review Title"

          />
        </div>


        <div>
          <label
            htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            name="rating"
            onChange={selectChange}
          >
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
          </select>
          <div className="cut"></div>
        </div>

        <div>
          <textarea
            value={reviewContent}
            onChange={(
              ev: React.ChangeEvent<HTMLTextAreaElement>,
            ): void => setFormData({ ...formData, reviewContent: ev.target.value })}
            rows={5}
            cols={40}
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default CreateReview;

