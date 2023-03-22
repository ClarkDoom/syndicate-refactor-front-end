// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import SearchResults from './pages/SearchResults/SearchResults'
import Community from './pages/Community/Community'
import Lists from './pages/Lists/Lists'
import CurrentlyWatching from './pages/CurrentlyWatching/CurrentlyWatching'
import SeenIt from './pages/SeenIt/SeenIt'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import TvShowResult from './pages/TvShowResult/TvShowResult'
import EpisodeList from './pages/EpisodeList/EpisodeList'
import Episode from './pages/Episode/Episode'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'


// stylesheets
import './App.css'

// types
import { User, Profile, Show } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(authService.getUser())

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  const [profile, setProfile] = useState<Profile>({
    name: "",
    userName: "",
    aboutMe: "",
    photo: "",
    id: 0,
    shows: []
  })

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile(user!.profile.id)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [user])


  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home profile={profile} user={user} />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/community" element={<Community />} />
        <Route path="/lists" element={<Lists profile={profile} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/tv-show-result" element={<TvShowResult profileId={profile.id} />} />
        <Route path="/episodes" element={<EpisodeList />} />
        <Route path="/episode" element={<Episode />} />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
