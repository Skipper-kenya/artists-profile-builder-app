import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import {
  Gear,
  Headlights,
  House,
  PencilCircle,
  SignIn,
  SignOut,
  StarHalf,
  X,
} from "phosphor-react";
import { useContext } from "react";
import { GlobalProvider } from "../../context/GlobalContext";

const ToggleNav = () => {
  const { isNavOpen, setIsNavOpen, setCookie, cookie } =
    useContext(GlobalProvider);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("user_name");
  };
  return (
    <div className="toggle-nav-wrapper">
      <div className="toggle-wrapper">
        <div className="top-nav-toggle">
          <div className="nav-label toggle">
            <h3>Rastaman Tech</h3>
          </div>

          <div className="closeNav">
            <p onClick={handleToggle}>
              <X size={30} weight="bold" />
            </p>
          </div>
        </div>
        <div className="toggle-body">
          <NavLink onClick={handleToggle} to={"/"}>
            <House />
            Home
          </NavLink>
          <NavLink onClick={handleToggle} to={"/build"}>
            <Gear />
            Build
          </NavLink>
          <NavLink onClick={handleToggle} to={"/favorites"}>
            <StarHalf />
            Favorites
          </NavLink>
          <NavLink onClick={handleToggle} to={"/faqs"}>
            <Headlights />
            Faqs
          </NavLink>

          {cookie.access_token ? (
            <>
              {" "}
              <NavLink onClick={handleLogout}>
                <SignOut />
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink onClick={handleToggle} to={"/register"}>
                <PencilCircle />
                Register
              </NavLink>
              <NavLink onClick={handleToggle} to={"/login"}>
                <SignIn />
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToggleNav;
