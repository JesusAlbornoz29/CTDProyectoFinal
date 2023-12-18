import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  let userParse = {};
  let user = localStorage.getItem("userDto");
  if (user) {
    userParse = JSON.parse(user);
  }
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [isAdmin, setIsAdmin] = useState(userParse?.role == "ADMIN");
  const [username, setUsername] = useState("");

  const login = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setIsAdmin(userData.role == "ADMIN");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setIsAdmin(false);
  };

  const contextValue = {
    isLoggedIn,
    isAdmin,
    username,
    login,
    logout,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
