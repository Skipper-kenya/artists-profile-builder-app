import React, { createContext, useState } from "react";

import { useCookies } from "react-cookie";

export const GlobalProvider = createContext(null);

const GlobalContext = ({ children }) => {
  const [cookie, setCookie] = useCookies(["access_token"]);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const values = { cookie, setCookie, isNavOpen, setIsNavOpen };

  return (
    <GlobalProvider.Provider value={values}>{children}</GlobalProvider.Provider>
  );
};

export default GlobalContext;
