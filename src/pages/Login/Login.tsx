// npm modules
import { useState } from 'react'

// components
import LoginForm from '../../components/LoginForm/LoginForm'


import LoginStyles from "../Login/Login.module.css"

// types
interface LoginPageProps {
  handleAuthEvt: () => void;
}

const LoginPage = (props: LoginPageProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)

  return (
    <div className={LoginStyles.page}>
      <div className={LoginStyles.wrapper}>
        <h1>Log In</h1>
        <p>{message}</p>
        <LoginForm {...props} updateMessage={updateMessage} />
      </div>
    </div>
  )
}

export default LoginPage
