// npm modules
import { useState } from 'react'

// components
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'

import styles from "./ChangePassword.module.css"

// types
interface ChangePasswordProps {
  handleAuthEvt: () => void;
}

const ChangePassword = (props: ChangePasswordProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)

  return (
    <div className={styles.page}>
      <h1>Change Password</h1>
      <p>{message}</p>
      <ChangePasswordForm {...props} updateMessage={updateMessage} />
    </div>
  )
}

export default ChangePassword
