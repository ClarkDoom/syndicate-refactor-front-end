import { Link } from "react-router-dom";

const Profile = () => {
  return (
  <>
  <h1>Profile Page</h1>
  <Link to="/change-password">
    Change Password
  </Link>
  </>
  );
}

export default Profile;