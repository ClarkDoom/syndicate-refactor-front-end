
// types
import { User } from '../../types/models'

interface HomeProps {
  user: User | null;
}

const Home = (props: HomeProps): JSX.Element => {
  const { user } = props

  return (
    <main>
      <h1>hello, {user ? user.name : 'friend'}</h1>
    </main>
  )
}

export default Home
