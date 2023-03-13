
// types
import { User } from '../../types/models'

interface HomeProps {
  user: User | null;
}

const Home = (props: HomeProps): JSX.Element => {
  const { user } = props

  return (
    <div>
      {/* profile image  */}
      <h1 id="landing-page">Welcome to Syndicate.</h1>
      <h2 id="landing-page">Keeping up with TV content made easy and social.</h2>
      {/* verify if question mark should be here */}
      {!user?.profile &&
        <>
          <h5 id="landing-page">
            If this is your first time using Syndicate, please enter a @username below:
          </h5>
          <form>
            <label htmlFor="username-input"></label>
            <input name="userName" placeholder="enter username" type="text" id="username-input" />
            {/* the below input was a hidden class, setup to not need that */}
            <input name="location" value="homePage" type="text" />
            <button type="submit">Submit</button>
          </form>
        </>
      }
    </div>
  )
}

export default Home
