import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/auth/Login";
import Home from "./components/dashboard/Home";
import Coupon from "./components/dashboard/Coupon";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/coupon" component={Coupon} />
  </Switch>
);

export default BaseRouter;
