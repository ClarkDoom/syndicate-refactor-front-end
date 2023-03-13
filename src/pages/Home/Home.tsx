
// types
import { User, Profile } from '../../types/models'

interface HomeProps {
  user: User | null;
}

const Home = (props: HomeProps): JSX.Element => {
  const { user } = props

  

  return (
    <div>
      {/* {profile.name} */}
      <h1 id="landing-page">Welcome to Syndicate.</h1>
      <h2 id="landing-page">Keeping up with TV content made easy and social.</h2>
      <h5 id="landing-page">See what others are up to on the Community tab.</h5>
      <h5 id="landing-page">
        Enter a show title to search and add shows to your lists.
      </h5>
      <h5 id="landing-page">Mark a show as "Seen It" to leave a review.</h5>
      <form id="landing-page">
        <input name="query" placeholder="enter show name" type="text" id="search-input" />
        <button id="inline-button" type="submit">Search</button>
      </form>
    </div>
  )
}

export default Home
