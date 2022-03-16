import React from "react";
import MainViewIndex from "../views/main";
import PasswordChangeIndex from "../views/passwordChange";

const mainRoutes = {
  path: "/",
  element: <MainViewIndex />,
  children: [
    {
      path: "/",
      element: <p>home</p>,
    },
    {
      path: "cadastro",
      element: <p>Cadastro</p>,
    },
    {
      path: "login",
      element: <p>Login</p>,
    },
    {
      path: "mudar",
      element: <PasswordChangeIndex />,
    },
    {
      path: "*",
      element: <p>404</p>,
    },
  ],
};

export default mainRoutes;
