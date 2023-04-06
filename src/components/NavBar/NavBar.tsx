// npm modules
import { useState, useEffect } from 'react';

// npm modules
import { NavLink, useNavigate } from 'react-router-dom'

// types
import { User } from '../../types/models'

// services
import * as searchService from '../../services/searchService'

import NavBarStyles from "../NavBar/NavBar.module.css"

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  const navigate = useNavigate()

  const [searchField, setSearchField] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleSearch = async (evt: React.FormEvent) => {
    evt.preventDefault()
    try {
      const response = await searchService.searchShows(searchField)
      navigate('/search-results', { state: { results: response } })
    } catch (err) {
      console.log(err)
    }
  }
  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(evt.target.value)
  }

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  return (
    <div className={NavBarStyles.wrapper}>
      {(toggleMenu || screenWidth > 500) && (
        <div className={NavBarStyles.list}>
          {user ?
            <>
                <div className={NavBarStyles.homeLink}>
                  <NavLink to="/">
                    Syndicate
                  </NavLink>
                </div>
              <p className={NavBarStyles.items}>
                <NavLink to="/community">
                  Community
                </NavLink>
              </p>
              <p className={NavBarStyles.items}>
                <NavLink to="/lists">
                  Lists
                </NavLink>
              </p>
              <p className={NavBarStyles.items}>
                <NavLink to="/profile">
                  Profile
                </NavLink>
              </p>
              <form onSubmit={handleSearch}>
                <input type="search" name="query" placeholder="Enter show name" aria-label="Search" onChange={handleSearchChange} required/>
                <button type="submit">
                  Search
                </button>
              </form>
            </>
            :
            <>
              <p><NavLink to="/login">Log In</NavLink></p>
              <p><NavLink to="/signup">Sign Up</NavLink></p>
            </>
          }
        </div>
      )}
      <button onClick={toggleNav} className={NavBarStyles.navBtn}>
        <img src="/nav.png" alt="" />
      </button>
    </div>
  )
}

export default NavBar
