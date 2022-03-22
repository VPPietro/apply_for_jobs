import React, { useContext } from "react";

// Third party
import { Outlet, useNavigate } from "react-router-dom";

// Project imports
import { MainButton, SecondaryButton } from "../../components/headerButtons";
import { AuthContext } from "../../context/AuthContext";
import "./index.css";


function MainViewIndex() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <p>Pietro Paraventi Vanelli</p>
        <div className="App-buttons">
          <MainButton onClick={() => navigate("")}>Listar senhas</MainButton>
          <MainButton onClick={() => navigate("gerar")}>Gerar senha</MainButton>

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
