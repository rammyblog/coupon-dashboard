import React from "react";
import DashboardHOC from "./DashboardHoc";
import { Card, Col, Row, Typography } from "antd";
const { Title } = Typography;

const Home = () => {
  const CardObj = [
    {
      title: "Total Coupons",
      content: "8",
    },
    {
      title: "Total Active Coupons",
      content: "10",
    },
    {
      title: "Total Inactive Coupons",
      content: "8",
    },
  ];
  return (
    <div>
      <Title>Home</Title>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {CardObj.map((item, index) => (
            <Col xs={2} sm={4} md={6} lg={6} xl={8} key={index} span={8}>
              <Card title={item.title} bordered={true}>
                {item.content}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default DashboardHOC(Home, "1");
