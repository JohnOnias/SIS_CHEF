import { createHashRouter } from "react-router-dom";

// views
import LoginView from "../views/login/loginView.jsx"
import EmployeerView from "../views/employeer/employeerView.jsx";




const Router = createHashRouter([
  {
    path: "/",
    element: <LoginView />
  },
  {
    path: "/employeer",
    element: <EmployeerView/>,
  }

]);

export default Router;
