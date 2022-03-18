import React from "react";

// Project imports
import MainViewIndex from "../views/main";
import PasswordGenerateIndex from "../views/passwordGenerate";
import PasswordListIndex from "../views/passwordList";
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
      path: "gerar",
      element: <PasswordGenerateIndex />,
    },
    {
      path: "listar",
      element: <PasswordListIndex />,
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
