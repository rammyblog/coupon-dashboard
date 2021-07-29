import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import checkAuth from "../../utils/checkAuth";
import { useEffect } from "react";
import { authLogin } from "../../store/auth/authActionCreator";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (checkAuth()) {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    if (auth.token) {
      // dispatch(getUserAction());
      history.push("/");
    }
  }, [auth.token, history, dispatch]);

  const onFinish = (values) => {
    dispatch(authLogin(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      // labelCol={{
      //   span: 8,
      // }}
      wrapperCol={{
        span: 16,
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
          loading={auth.loading}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
