import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MainButton, SecondaryButton } from "../../components/headerButtons";
import { AuthContext } from "../../context/AuthContext";

import "./index.css";

function MainViewIndex() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log(auth.auth.user.username);

  return (
    <div className="App">
      <header className="App-header">
        <p>Pietro Paraventi Vanelli</p>
        <div className="App-buttons">
          <MainButton onClick={() => navigate("")}>Início</MainButton>
          <MainButton onClick={() => navigate("mudar")}>Gerar senha</MainButton>

          <SecondaryButton onClick={auth.auth.signOut}>
            Deslogar do usuário "{auth.auth.user.username}"
          </SecondaryButton>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default MainViewIndex;
