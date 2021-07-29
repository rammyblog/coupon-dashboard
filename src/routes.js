import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/auth/Login";
import Home from "./components/dashboard/Home";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    {/* <PrivateRoute exact path="/profile/" component={Profile} /> */}
    <PrivateRoute exact path="/" component={Home} />
  </Switch>
);

export default BaseRouter;
