import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  BarcodeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const Sidebar = ({ collapsed, index }) => {
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[index]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link className="text-white" to="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BarcodeOutlined />}>
            <Link className="text-white" to="/coupon">
              Coupon
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link className="text-white" to="#">
              Settings
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Sidebar;
