import React from "react";
import DashboardHOC from "./DashboardHoc";

const Home = () => {
  return <div>Proceed by React Router</div>;
};

export default DashboardHOC(Home, "1");
