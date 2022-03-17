import React from "react";
import MainViewIndex from "../views/main";
import PasswordGenerateIndex from "../views/passwordGenerate";
import PasswordViewIndex from "../views/passwordView";

const mainRoutes = {
  path: "/",
  element: <MainViewIndex />,
  children: [
    {
      path: "/",
      element: <p>home</p>,
    },
    {
      path: "mudar",
      element: <PasswordGenerateIndex />,
    },
    {
      path: "senha/:id",
      element: <PasswordViewIndex />,
    },
    {
      path: "*",
      element: <p>404</p>,
    },
  ],
};

export default mainRoutes;
