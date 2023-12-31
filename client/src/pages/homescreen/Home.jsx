import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { MusicNotes, Quotes } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { GlobalProvider } from "../../context/GlobalContext";
import useGetUserDetails from "../../hooks/useGetUserDetails";
import axios from "axios";
import Profiles from "./Profiles";
import Loading from "../../components/Loading";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [profiles, setProfiles] = useState([]);
  const [profiles2, setProfiles2] = useState([]);

  const { cookie } = useContext(GlobalProvider);
  const [user_name] = useGetUserDetails();

  const [loading, setLoading] = useState();
  const [loadingSearch, setloadingSearch] = useState();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API}/profiles`
        );
        setProfiles(response.data);
        setProfiles2(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleSearchName = (e) => {
    setName(e.target.value);
    const { value } = e.target;
    const copy2 = profiles2?.slice();
    const profiles_copy = profiles?.slice();

    const filterNameProfiles = profiles_copy?.filter((profile) => {
      return profile.fname.toLowerCase().includes(value.toLowerCase());
    });

    if (value.length > 0 && filterNameProfiles.length > 0) {
      setProfiles(filterNameProfiles);
      setloadingSearch(false);
    } else if (value.length > 0 && filterNameProfiles.length === 0) {
      setloadingSearch(true);
    } else {
      setProfiles(copy2);
      setloadingSearch(false);
    }
  };
  //comp
  return (
    <div className="home-wrapper">
      <div className="home-top">
        <h3>
          Welcome {cookie.access_token ? `${user_name}` : ""} to rastaTech
        </h3>
        <p>
          Life is too short to live apart.
          <Quotes /> Join millions of users around the globe today.
          <MusicNotes />
        </p>
        <p>
          Build a profile for your favorite Artist today <br />
          <button onClick={() => navigate("/build")}>
            Build an Artist Profile
          </button>
        </p>
      </div>

      <div className="home-artists">
        <section className="artists-filter">
          <section className="inp">
            <input
              type="text"
              placeholder="Artist name..."
              value={name}
              onChange={handleSearchName}
            />
          </section>
        </section>

        <section className="artists-profile">
          <Profiles
            profiles={profiles}
            cookie={cookie}
            loading={loading}
            loadingSearch={loadingSearch}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
