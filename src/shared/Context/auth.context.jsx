import React, { createContext, useState, useCallback, useEffect } from "react";

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

let logoutTimerId;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

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

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimerId = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimerId);
    }
  }, [token, logout, tokenExpirationDate]);

  const value = {
    isLoggedIn: !!token,
    token,
    login,
    logout,
    userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
