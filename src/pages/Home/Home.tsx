import homeStyles from "./Home.module.css"
// types
import { User, Profile } from '../../types/models'

interface HomeProps {
  user: User | null;
  profile: Profile
}

const Home = (props: HomeProps): JSX.Element => {
  const { user, profile } = props

  return (
    <div className={homeStyles.page}>
      <h1>Welcome to Syndicate.</h1>
      <p>Keeping up with TV content made easy and social.</p>
      <p>See what others are up to on the Community tab.</p>
      <p>
        Enter a show title to search and add shows to your lists.
      </p>
      <p>Mark a show as "Seen It" to leave a review.</p>
      {/* <form id="landing-page">
        <input name="query" placeholder="enter show name" type="text" id="search-input" />
        <button id="inline-button" type="submit">Search</button>
      </form> */}
    </div>
  )
}

export default Home
