import React, { useContext, useEffect, useState } from "react";
import "./favorites.css";
import "../homescreen/home.css";
import axios from "axios";
import { Smiley } from "phosphor-react";
import useGetUserDetails from "../../hooks/useGetUserDetails";
import { GlobalProvider } from "../../context/GlobalContext";

import deny from "./deny.png";
import nothing from "./nothing.png";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Favorites = () => {
  const [profiles, setProfiles] = useState([]);

  const [_, userId] = useGetUserDetails();
  const { cookie } = useContext(GlobalProvider);

  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchSavedFavorites = async () => {
      if (cookie.access_token) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_API}/profiles/allIds/${userId}`
          );

          const userSaved = response.data;
          const profileCopy = userSaved.slice();
          setProfiles(profileCopy);
          setLoading(false);
        } catch (error) {
          console.error(error.message);
          setLoading(false);
        }
      }
    };
    fetchSavedFavorites();
  }, []);

  return (
    <div className="favorites-wrapper">
      {cookie.access_token &&
        (loading ? (
          <Loading />
        ) : (
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
        ))}

      {cookie.access_token && profiles.length === 0 && !loading && (
        <div className="favorites-illustration">
          <h3>
            Saved profiles will appear here. <Link to={"/"}>home</Link>
          </h3>
          <img src={nothing} alt="Empty" />
        </div>
      )}

      {!cookie.access_token && (
        <>
          <div className="favorites-illustration">
            <h3>
              Login to access this page.<Link to={"/login"}>Login</Link>
            </h3>
            <img src={deny} alt="Access denied" />
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
