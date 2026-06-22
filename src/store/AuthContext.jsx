import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  email: '',
  isLoggedIn: false,
  login: (token, email) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
 
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email'));

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem('email', email);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem('email');
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};