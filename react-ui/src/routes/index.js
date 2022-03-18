// Third party
import { useRoutes } from "react-router-dom";

// Project imports
import mainRoutes from "./MainRoutes";


const Routes = () => {
  const main = useRoutes([mainRoutes], "");

  return main;
};

export default Routes;
