// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// types
import { AuthFormProps } from '../../types/props'
import { ChangePasswordFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const ChangePasswordForm = (props: AuthFormProps): JSX.Element => {
  const {updateMessage, handleAuthEvt} = props
  const navigate = useNavigate()

  const [formData, setFormData] = useState<ChangePasswordFormData>({
    oldPassword: '',
    newPassword: '',
    newPasswordConf: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await authService.changePassword(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
    }
  }

  const { oldPassword, newPassword, newPasswordConf } = formData

  const isFormInvalid = (): boolean => {
    return !(oldPassword && newPassword && newPassword === newPasswordConf)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div >
        <label htmlFor="password" >
          Current Password
        </label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          name="oldPassword"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="newPassword" >
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          name="newPassword"
          onChange={handleChange}
        />
      </div>
      <div >
        <label htmlFor="newPasswordConf" >
          Confirm New Password
        </label>
        <input
          type="password"
          id="newPasswordConf"
          value={newPasswordConf}
          name="newPasswordConf"
          onChange={handleChange}
        />
      </div>
      <div >
        <button disabled={isFormInvalid()}>
          Change Password
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default ChangePasswordForm
