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

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

 

  return (
    <AuthContext.Provider 
    value={{
      token,
      email,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};