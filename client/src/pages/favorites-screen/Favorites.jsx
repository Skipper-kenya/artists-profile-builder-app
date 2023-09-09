import React, { useContext, useEffect, useState } from "react";
import "./favorites.css";
import "../homescreen/home.css";
import axios from "axios";
import useGetUserDetails from "../../hooks/useGetUserDetails";
import { GlobalProvider } from "../../context/GlobalContext";

import deny from "./deny.png";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [profiles, setProfiles] = useState([]);

  const [_, userId] = useGetUserDetails();
  const { cookie } = useContext(GlobalProvider);

  useEffect(() => {
    const fetchSavedFavorites = async () => {
      if (cookie.access_token) {
        try {
          const response = await axios.get(
            `https://artists-profile-builder-app.onrender.com/profiles/allIds/${userId}`
          );

          const userSaved = response.data;
          const profileCopy = userSaved.slice();
          setProfiles(profileCopy);
        } catch (error) {
          console.error(error.message);
        }
      }
    };
    fetchSavedFavorites();
  }, []);

  return (
    <div className="favorites-wrapper">
      {cookie.access_token ? (
        <>
          {profiles?.map((profile, idx) => {
            return (
              <div className="profile" key={idx}>
                <section className="profile-top">
                  <div className="img">
                    <img src={profile.url} alt={profile.fname} />
                  </div>
                  <div className="prof-intro">
                    <h2>{profile.fname}</h2>
                    <p>{profile.country}</p>
                    <p>{profile.genre}</p>
                  </div>
                </section>
                <section className="profile-bottom">
                  <h5>{profile.description}</h5>
                </section>
              </div>
            );
          })}
        </>
      ) : (
        <div className="favorites-illustration">
          <h3>
            Login to access this page.<Link to={"/login"}>Login</Link>
          </h3>
          <img src={deny} alt="" />
        </div>
      )}
    </div>
  );
};

export default Favorites;
