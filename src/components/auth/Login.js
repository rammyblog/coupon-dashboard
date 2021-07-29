import { Form, Input, Button, Row, Col, Typography, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import checkAuth from "../../utils/checkAuth";
import { useEffect } from "react";
import { authLogin } from "../../store/auth/authActionCreator";

const Login = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { token, loading, error, errResponse } = useSelector(
    (state) => state.auth
  );
  const history = useHistory();

  useEffect(() => {
    if (checkAuth()) {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    if (token) {
      // dispatch(getUserAction());
      history.push("/");
    }
  }, [token, history, dispatch]);

  useEffect(() => {
    if (error) {
      notification["error"]({
        message: "Login Failed",
        description: errResponse,
      });
    }
  }, [error, errResponse]);

  const onFinish = (values) => {
    dispatch(authLogin(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col span={24}>
            <Title level={3} style={{ textAlign: "center" }}>
              Login to admin dashboard
            </Title>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              initialValues={{
                email: "",
                password: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="email"
                name="email"
                type="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
