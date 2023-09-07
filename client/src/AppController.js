import React, { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/homescreen/Home";
import Build from "./pages/buildscreen/Build";

import Favorites from "./pages/favorites-screen/Favorites";
import Register from "./pages/Authscreen/Register";
import Login from "./pages/Authscreen/Login";

import ToggleNav from "./components/navbar/ToggleNav";
import { GlobalProvider } from "./context/GlobalContext";

const AppController = () => {
  const { isNavOpen } = useContext(GlobalProvider);

  return (
    <div className="body-wrapper">
      <Router>
        <Navbar />
        {isNavOpen ? <ToggleNav /> : ""}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={<Build />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppController;
