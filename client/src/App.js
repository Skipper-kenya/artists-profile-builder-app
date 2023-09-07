import React, { useContext } from "react";
import "./index.css";
import GlobalContext from "./context/GlobalContext";
import AppController from "./AppController";

function App() {
  return (
    <GlobalContext>
      <AppController />
    </GlobalContext>
  );
}

export default App;
