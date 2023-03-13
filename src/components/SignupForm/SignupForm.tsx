// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// types
import { AuthFormProps } from '../../types/props'
import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const SignupForm = (props: AuthFormProps): JSX.Element => {
  const {updateMessage, handleAuthEvt} = props
  const navigate = useNavigate()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      await authService.signup(formData, photoData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
      setIsSubmitted(false)
    }
  }

  const { name, email, password, passwordConf, userName } = formData

  const isFormInvalid = (): boolean => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      
    >
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
      <div >
        <label htmlFor="email" >
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div >
        <label htmlFor="password" >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div >
        <label htmlFor="confirm" >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
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
      <div >
        <button 
          disabled={isFormInvalid() || isSubmitted} 
          
        >
          {!isSubmitted ? "Sign Up" : "🚀 Sending..."}
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default SignupForm
