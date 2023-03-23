import { useLocation } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

import * as reviewService from '../../services/reviewService'

import { CreateReviewProps } from '../../types/props'

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
    <div>
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="subtitle">Create a Review!</div>

        <div className="input-container ic1">
          <label
            className="placeholder"
            htmlFor="item-name"
          >Review Title</label>
          <input
            className="input"
            placeholder=" "
            type="text"
            id="reviewTitle"
            value={reviewTitle}
            name="reviewTitle"
            onChange={handleChange}

          />
          <div className="cut"></div>
        </div>


        <div className="input-container ic2">
          <label
            className="placeholder"
            htmlFor="rating">Rating</label>
          <select
            className="input"
            id="rating"
            value={rating}
            name="rating"
            onChange={selectChange}
          >
            <option value="0">0</option>
            <option value=".5">.5</option>
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

        <div className="input-container ic2">
          <textarea
            value={reviewContent}
            onChange={(
              ev: React.ChangeEvent<HTMLTextAreaElement>,
            ): void => setFormData({ ...formData, reviewContent: ev.target.value })}
            rows={5}
            cols={5}
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default CreateReview;

