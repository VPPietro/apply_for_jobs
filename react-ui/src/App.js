import React from "react";

// Third party
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Project imports
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
