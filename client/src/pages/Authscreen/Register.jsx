import React, { useState } from "react";
import Auth from "./Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Password } from "phosphor-react";

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();

  const isInputFilled = () => {
    return (
      username !== "" &&
      phone !== "" &&
      password !== "" &&
      password2 !== "" &&
      phone !== "" &&
      dob !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isInputFilled()) {
      if (username.length >= 5 && password.length >= 6) {
        if (password === password2) {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_SERVER_API}/auth/register`,
              { username, password, phone, dob }
            );

            const { message } = response.data;
            alert(message);
            navigate("/login");
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Password did not match.");
        }
      } else {
        alert("check length of username or password.");
      }
    } else {
      alert("Fill in the all details");
    }
  };

  return (
    <div className="auth-wrapper">
      <p></p>
      <Auth
        logo={Password}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        password2={password2}
        setPassword2={setPassword2}
        handleSubmit={handleSubmit}
        phone={phone}
        setPhone={setPhone}
        dob={dob}
        setDob={setDob}
      />
    </div>
  );
};

export default Register;
