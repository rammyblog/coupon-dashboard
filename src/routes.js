import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/auth/Login";
import Home from "./components/dashboard/Home";
import Coupon from "./components/dashboard/Coupon";
import CouponForm from "./components/dashboard/CouponForm";
import SingleCoupon from "./components/dashboard/SingleCoupon";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/coupon" component={Coupon} />
    <PrivateRoute exact path="/coupon/create" component={CouponForm} />
    <PrivateRoute exact path="/coupon/update/:code" component={CouponForm} />
    <PrivateRoute exact path="/coupon/:code" component={SingleCoupon} />
  </Switch>
);

export default BaseRouter;
