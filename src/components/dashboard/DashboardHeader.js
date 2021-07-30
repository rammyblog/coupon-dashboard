import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./SiderLayout.css";
const { Header } = Layout;

const DashboardHeader = ({ collapsed, toggle}) => {
  return (
    <>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}
      </Header>
    </>
  );
};

export default DashboardHeader;
