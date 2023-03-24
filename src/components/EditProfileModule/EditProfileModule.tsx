import { EditProfileModuleProps } from "../../types/props";
import { PhotoFormData } from "../../types/forms";
import { useNavigate } from "react-router";
import { useState } from "react";
import * as profileService from '../../services/profileService'

const EditProfileModule = (props: EditProfileModuleProps) => {
  const { profile, setChangeOccured, changeOccured } = props
  const navigate = useNavigate()

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const [editProfileForm, setEditProfileForm] = useState<any>({
    name: profile.name,
    userName: profile.userName,
    aboutMe: profile.aboutMe,
  })

  const { name, aboutMe, userName } = editProfileForm

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEditProfileForm({ ...editProfileForm, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await profileService.updateProfile(profile.id, editProfileForm, photoData)
      setChangeOccured(!changeOccured)
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Edit Profile Module</h1>
      <div >
        <label htmlFor="name" >Name</label>
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div >
        <label htmlFor="userName" >userName</label>
        <input
          type="text"
          id="userName"
          value={userName}
          name="userName"
          onChange={handleChange}
        />
      </div>
      <label htmlFor="aboutMe" >
        About Me
      </label>
      <div className="input-container ic2">
        <textarea
          id="aboutMe"
          name="aboutMe"
          value={aboutMe}
          onChange={(
            ev: React.ChangeEvent<HTMLTextAreaElement>,
          ): void => setEditProfileForm({ ...editProfileForm, aboutMe: ev.target.value })}
          rows={5}
          cols={5}
        />
      </div>
      <div >
        <label htmlFor="photo-upload" >
          Upload Photo
        </label>
        <input
          type="file"
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
        />
      </div>
      <button type="submit">Submit</button>
    </form> 
    </>
  );
}

export default EditProfileModule;