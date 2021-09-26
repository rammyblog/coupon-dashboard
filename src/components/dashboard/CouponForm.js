import React, { useEffect, useState } from 'react';
import { Row, Col, InputNumber, DatePicker, notification } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Switch } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import DashboardHOC from './DashboardHoc';
import moment from 'moment';
import {
  addCoupon,
  fetchSingleCoupons,
  editCoupon
} from '../../store/coupon/couponActionCreators';
import { useDispatch, useSelector } from 'react-redux';

function CouponForm({ match }) {
  const { loading, error, errResponse, message, singleCoupon, coupons } = useSelector(
    (state) => state.coupon
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();
  const updateID = match.params.id;
  const [editedSingleCoupon, setEditedSingleCoupon] = useState({});

  const onFinish = (values) => {
    values.redeem_from = values.redeem_from._d;
    values.redeem_to = values.redeem_to._d;
    if (values.available === undefined) {
      values.available = false;
    }
    if (!updateID) {
      dispatch(addCoupon(values));
    }else{
      dispatch(editCoupon(values, updateID));
    }
  };

  useEffect(() => {
    if(updateID){
      dispatch(fetchSingleCoupons(updateID));
    }
  }, [dispatch, updateID]);

  const onFinishFailed = ({ errorFields }) => {
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
      (message === 'Coupon has been added successfully' ||  message === 'Coupon has been edited')
    ) {
      notification['success']({
        message: 'Success',
        description: '',
      });
      const id = coupons[coupons.length - 1]._id
      history.push(`/coupon/${id}`);
    }
  }, [message, coupons, error, loading, history]);

  useEffect(() => {
    if (singleCoupon && Object.keys(singleCoupon).length > 0 && updateID) {
      setEditedSingleCoupon(singleCoupon);
      editedSingleCoupon.redeem_from = moment(
        singleCoupon.redeem_from
      )
      editedSingleCoupon.redeem_to = moment(
        singleCoupon.redeem_to
      )
      if(editedSingleCoupon &&  Object.keys(editedSingleCoupon).length > 0){

        form.resetFields();
      }
    }
  }, [form, singleCoupon, editedSingleCoupon,updateID]);
  
  
  if(loading){
    return<p>loading</p>
  }
  return (
    <>
      <Form
        name="user_details_form"
        className="login-form"
        initialValues={updateID && singleCoupon ? editedSingleCoupon : null}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
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
              <DatePicker format="YYYY-MM-DD"  />
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
