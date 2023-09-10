import React, { useContext, useState } from "react";
import BuildInputs from "./BuildInputs";
import { Smiley, Warning } from "phosphor-react";
import { BuildProvider } from "./BuildContext";
import axios from "axios";
import { GlobalProvider } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Controller = () => {
  const navigate = useNavigate();
  const { cookie } = useContext(GlobalProvider);

  const [loading, setLoading] = useState();

  const { inputs, setInputs } = useContext(BuildProvider);
  const { fname, sname, genre, url, country, description } = inputs;

  const isInputFilled = () => {
    return (
      fname !== "" &&
      genre !== "" &&
      url !== "" &&
      country !== "" &&
      description !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isInputFilled()) {
      if (cookie.access_token) {
        setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/profiles`,
            {
              fname,
              sname,
              genre,
              url,
              country,
              description,
            }
          );

          const { message } = response.data;
          alert(message);
          setInputs({
            fname: "",
            sname: "",
            genre: "",
            url: "",
            country: "",
            description: "",
          });
          setLoading(false);
          navigate("/");
        } catch (error) {
          setLoading(false);
          console.error(error.message);
        }
      } else {
        alert("Login to continue.");
        navigate("/login");
      }
    } else {
      alert("Fill all the details.");
    }
  };

  return (
    <div className="build-wrapper">
      <h3>
        Build your Artist today
        <Smiley />
        <p>Make them feel Proud!</p>
      </h3>
      {!cookie.access_token ? (
        <p className="login-alert">
          <Warning />
          Login to build your Artist.
        </p>
      ) : (
        ""
      )}

      <BuildInputs handleSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default Controller;
