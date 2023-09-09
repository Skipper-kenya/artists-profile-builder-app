import { Star } from "phosphor-react";
import React, { useEffect, useState } from "react";
import useGetUserDetails from "../../hooks/useGetUserDetails";
import axios from "axios";
import Loading from "../../components/Loading";

const Profiles = ({ profiles, cookie, loading }) => {
  const [savedProfiles, setSavedProfiles] = useState([]);

  const [user_name, userId] = useGetUserDetails();

  const handleSaveToFavorites = async (profileId) => {
    try {
      const response = await axios.put(
        "https://artists-profile-builder-app.onrender.com/profiles",
        {
          profileId,
          userId,
        }
      );

      const { updatedFavorites, message } = await response.data;

      const updatedCopy = updatedFavorites.slice();
      setSavedProfiles(updatedCopy);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchSavedProfile = async () => {
      if (cookie.access_token) {
        try {
          const response = await axios.get(
            `https://artists-profile-builder-app.onrender.com/profiles/ids/${userId}`
          );

          const profileCopy = response.data.slice();
          setSavedProfiles(profileCopy);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchSavedProfile();
  }, []);

  const isProfileSaved = (id) => savedProfiles.includes(id);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        profiles.map((profile, idx) => {
          return (
            <div className="profile" key={idx}>
              {cookie.access_token ? (
                <button
                  disabled={isProfileSaved(profile._id)}
                  className="saveBtn"
                  onClick={() => handleSaveToFavorites(profile._id)}
                >
                  {isProfileSaved(profile._id) ? "Saved" : " save"}

                  <Star weight="fill" />
                </button>
              ) : (
                ""
              )}

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
        })
      )}
    </>
  );
};

export default Profiles;
