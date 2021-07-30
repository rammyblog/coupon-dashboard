import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/auth/Login";
import Home from "./components/dashboard/Home";
import SiderLayout from "./components/dashboard/SiderLayout";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    {/* <PrivateRoute exact path="/profile/" component={Profile} /> */}
    <PrivateRoute exact path="/" component={SiderLayout} />
  </Switch>
);

export default BaseRouter;
