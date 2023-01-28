import React, { createContext, useState, useCallback, useEffect } from "react";

// creation of Auth Context
export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

let logoutTimerId;

// AuthProvider component
// reveives children parameter
// handles token, userId and tokenExpirationDate states
// returns AuthContext Provider component that wraps children parameters
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // login method
  // receives userId, token and expirationDate parameters
  // sets Token and userId state with received parameters
  // sets tokenExpirationDate state with expirationDate parameter or creates new expirationDate (1 hour)
  // stores userId, token and expirationDate in browser's localStorage
  const login = useCallback((userId, token, expirationDate) => {
    setToken(token);
    setUserId(userId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  // logout method
  // sets token, userId and tokenExpirationDate states back to null
  // removes userData item from browser's localStorage
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  // useEffect to calculate remaining token time and uses web Apis setTimeout and clearTimeout to handle token expiration time
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimerId = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimerId);
    }
  }, [token, logout, tokenExpirationDate]);

  // initializes Auth Context Provider value
  // allows access to loggedIn variable, token and userId states as well as login/logout methods
  const value = {
    isLoggedIn: !!token,
    token,
    login,
    logout,
    userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
