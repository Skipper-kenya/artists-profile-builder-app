import React, { useContext, useState } from "react";
import Auth from "./Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalProvider } from "../../context/GlobalContext";

const Login = () => {
  const { setCookie } = useContext(GlobalProvider);

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      try {
        const response = await axios.post("https://artists-profile-builder-app.onrender.com/auth/login", {
          username,
          password,
        });

        const { token, userId, message, action, user_name } =
          await response.data;

        if (action === "logged-in") {
          setCookie("access_token", token);
          window.localStorage.setItem("userId", userId);
          window.localStorage.setItem("user_name", user_name);
          navigate("/");
        }
        alert(message);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Fill in all details.");
    }
  };

  return (
    <div className="auth-wrapper">
      <Auth
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
