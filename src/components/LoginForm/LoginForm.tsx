// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// stylesheets
import * as authService from '../../services/authService'

// types
import { AuthFormProps } from '../../types/props'
import { LoginFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'


const LoginForm = (props: AuthFormProps): JSX.Element => {
  const { updateMessage, handleAuthEvt } = props
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
    }
  }

  const { email, password } = formData

  const isFormInvalid = (): boolean => {
    return !(email && password)
  }

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" ></label>
        <input
          type="text"
          id="email"
          value={formData.email}
          name="email"
          placeholder='email'
          onChange={handleChange}
        />
        <label htmlFor="password" ></label>
        <input
          type="password"
          id="password"
          value={formData.password}
          name="password"
          placeholder='password'
          onChange={handleChange}
        />
          <button disabled={isFormInvalid()} type="submit">
            Log In
          </button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
      </form>
    </div>
  )
}

export default LoginForm
