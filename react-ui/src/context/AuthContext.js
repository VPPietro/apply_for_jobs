import React, { createContext } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ auth, children }) {
  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
