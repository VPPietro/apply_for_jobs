import React from "react";
import ReactDOM from "react-dom";

// Third party
import { HashRouter } from "react-router-dom";

// Project imports
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// AWS imports
import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";


Amplify.configure(awsmobile);

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
