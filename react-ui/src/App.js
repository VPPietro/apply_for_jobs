import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Routes from "./routes";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <Authenticator>
      {(auth) => (
        <AuthContextProvider auth={auth}>
          <Routes />
        </AuthContextProvider>
      )}
    </Authenticator>
  );
}

export default App;
