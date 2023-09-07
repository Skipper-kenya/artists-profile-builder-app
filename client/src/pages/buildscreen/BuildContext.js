import React, { createContext, useState } from "react";
export const BuildProvider = createContext(null);

const BuildContext = ({ children }) => {
  const [inputs, setInputs] = useState({
    fname: "",
    sname: "",
    country: "",
    genre: "",
    url: "",
    description: "",
  });

  const values = { inputs, setInputs };

  return (
    <BuildProvider.Provider value={values}>{children}</BuildProvider.Provider>
  );
};

export default BuildContext;
