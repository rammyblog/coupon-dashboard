import React from "react";
import { Row, Col, InputNumber, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { Form, Input, Button, Switch } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DashboardHOC from "./DashboardHoc";

function CouponForm() {
  return (
    <>
      <Form
        name="user_details_form"
        className="login-form"
        // initialValues={user}
        // onFinish={onFinish}
        layout="vertical"  
        size="large"
        style={{ clear: "both" }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Coupon code"
              tooltip="If left empty, the server will generate a code for you"
              rules={[
                {
                  required: false,
                  // message: 'Please input full name!'
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="CODE123"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: false,
                  // message: 'Please input full name!'
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="30% off for all users"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name="percent_off"
              label="Percentage off"
              rules={[
                {
                  required: true,
                  message: "Please enter a value between 1-100",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value >= 1 && value <= 100) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Enter a value between 1-100")
                    );
                  },
                }),
              ]}
            >
              <InputNumber min={1} max={100} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Available" name="available">
              <Switch defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item label="Redeemable From" name="redeem_from">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Redeemable To" name="redeem_to">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            // loading={loading}
            htmlType="submit"
            className="mr-2"
            // disabled={loading}
          >
            Save
          </Button>
          <Button type="info" className="login-form-button">
            <Link to="/coupon">Back</Link>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default DashboardHOC(CouponForm, "2");