import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./index.css";

function MainViewIndex() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <p>Pietro Paraventi Vanelli</p>
        <div className="App-buttons">
          <button className="App-link" onClick={() => navigate("")}>
            Início
          </button>
          <button className="App-link" onClick={() => navigate("cadastro")}>
            Cadastro
          </button>
          <button className="App-link" onClick={() => navigate("login")}>
            Login
          </button>
          <button className="App-link" onClick={() => navigate("mudar")}>
            Trocar senha
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default MainViewIndex;
