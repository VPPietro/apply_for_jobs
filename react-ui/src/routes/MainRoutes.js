import React from "react";
import MainViewIndex from "../views/main";
import PasswordChangeIndex from "../views/passwordChange";
import RegisterIndex from "../views/register";

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
      element: <RegisterIndex />,
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
