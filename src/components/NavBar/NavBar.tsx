// npm modules
import { useState, useEffect } from 'react';

// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props

  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
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
    <nav>
      {(toggleMenu || screenWidth > 500) && (
        <div className="list">
          {user ?
            <>
              <p className="items" id="home-link">
                <NavLink to="/">
                  Home
                </NavLink>
              </p>
              <p className="items">
                <NavLink to="/profiles">
                  Profiles
                </NavLink>
              </p>
              <p className="items">
                <NavLink to="/change-password">
                  Change Password
                </NavLink>
              </p>
              <p className="items">
                <NavLink to="" onClick={handleLogout}>
                  LOG OUT
                </NavLink>
              </p>
            </>
            :
            <>
              <p><NavLink to="/login">Log In</NavLink></p>
              <p><NavLink to="/signup">Sign Up</NavLink></p>
            </>
          }
        </div>
      )}
      <button onClick={toggleNav} className="nav-btn">
        <img src="/nav.png" alt="" />
      </button>
    </nav>
  )
}

export default NavBar
