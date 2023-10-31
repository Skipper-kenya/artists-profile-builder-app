import React, { useContext } from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { DotsNine, User } from "phosphor-react";
import { GlobalProvider } from "../../context/GlobalContext";
import useGetUserDetails from "../../hooks/useGetUserDetails";
import { House } from "phosphor-react";

const Navbar = () => {
  const { cookie, setCookie, setIsNavOpen, isNavOpen } =
    useContext(GlobalProvider);

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const [user_name, userId] = useGetUserDetails();

  const handleLogout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("user_name");
  };

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-label">
        <h3>rastaTech</h3>
      </div>
      <p className="home-icon">
        <House onClick={handleHome} size={24} color="rgb(60, 165, 165)" />
      </p>
      <div className="toggleBtn">
        <p onClick={handleToggle}>
          <DotsNine size={30} weight="bold" />
        </p>
      </div>
      <div className="nav-links">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/build"}>Build</NavLink>
        <NavLink to={"/favorites"}>Favorites</NavLink>
      </div>
      <div className="nav-auth">
        <p>
          <User size={25} />

          {cookie.access_token ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to={"/login"}>login/register</NavLink>
            </>
          )}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
