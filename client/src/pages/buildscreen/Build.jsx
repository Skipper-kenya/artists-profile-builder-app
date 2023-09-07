import React, { useContext } from "react";
import "./build.css";

import BuildContext from "./BuildContext";

import Controller from "./Controller";
const Build = () => {
  return (
    <BuildContext>
      <Controller />
    </BuildContext>
  );
};

export default Build;
