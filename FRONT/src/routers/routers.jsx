import { createHashRouter } from "react-router-dom";

// views
import LoginView from "../views/login/loginView";
import ManagerView from "../views/manager/managerView";
import AdmView from "../views/adm/adm";
import BartenderView from "../views/bartender/bartenderView";
import SelectProductsView from "../views/order/selectProducts";


const Router = createHashRouter([
  {
    path: "/",
    element: <LoginView />
  },
  {
    path: "/manager",
    element: <ManagerView/>,
  },
  {
    path: "/adm",
    element: <AdmView />,
  },
  {
    path: "/bartender",
    element: <BartenderView />,
  },
  {
    path: "/select-products",
    element: <SelectProductsView />,
  },

]);

export default Router;
