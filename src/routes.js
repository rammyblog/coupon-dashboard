import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/auth/Login";
import Home from "./components/dashboard/Home";
import Coupon from "./components/dashboard/Coupon";
import CouponForm from "./components/dashboard/CouponForm";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/coupon" component={Coupon} />
    <PrivateRoute exact path="/coupon/create" component={CouponForm} />
  </Switch>
);

export default BaseRouter;
