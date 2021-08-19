import React, { useEffect, useState } from 'react';
import { Row, Col, InputNumber, DatePicker, notification } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Switch } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import DashboardHOC from './DashboardHoc';
import { addCoupon } from '../../store/coupon/couponActionCreators';
import { useDispatch, useSelector } from 'react-redux';

function CouponForm() {
  const { loading, error, errResponse, message } = useSelector(
    (state) => state.coupon
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [code, setCode] = useState('');
  const onFinish = (values) => {
    values.redeem_from = values.redeem_from._d;
    values.redeem_to = values.redeem_to._d;
    if (values.available === undefined) {
      values.available = false;
    }
    setCode(values.code);
    dispatch(addCoupon(values));
  };

  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    notification['error']({
      message: errorFields[0].name[0],
      description: errorFields[0].errors[0],
    });
  };
  useEffect(() => {
    if (error) {
      notification['error']({
        message: 'Failed',
        description: errResponse,
      });
    }
  }, [error, errResponse]);

  useEffect(() => {
    if (
      !error &&
      !loading &&
      message === 'Coupon has been added successfully'
    ) {
      notification['success']({
        message: 'Success',
        description: 'Coupon has been added successfully',
      });
      history.push(`${code}`);
    }
  }, [message, code, error, loading, history]);
  return (
    <>
      <Form
        name="user_details_form"
        className="login-form"
        // initialValues={user}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size="large"
        style={{ clear: 'both' }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Coupon code"
              tooltip="If left empty, the server will generate a code for you"
              required
              rules={[
                {
                  required: true,
                  message: 'Enter coupon code',
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
                  min: 3,
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
                  message: 'Please enter a value between 1-100',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value >= 1 && value <= 100) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error('Enter a value between 1-100')
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
              <Switch defaultChecked={false} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              label="Redeemable From"
              name="redeem_from"
              required
              rules={[
                {
                  required: true,
                  message: 'Please enter a date!',
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Redeemable To"
              name="redeem_to"
              rules={[
                {
                  required: true,
                  message: 'Please enter a date!',
                },
              ]}
            >
              <DatePicker required format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="mr-2"
            disabled={loading}
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

export default DashboardHOC(CouponForm, '2');
