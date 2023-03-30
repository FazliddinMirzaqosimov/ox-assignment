import { Button, Form, Input } from "antd";
import { useJWTAuthActions } from "auth/jwt-auth/JWTAuthAuthProvider";
import { Link } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";

function SignInPage() {
  const { signInUser } = useJWTAuthActions();

  function onFinishFailed(err: any) {
    console.log(err);
  }
  return (
    <AuthWrapper>
      <Form
        layout="vertical"
        name="basic"
        style={{
          width: "400px",
        }}
        initialValues={{ name: "fazliddin", password: "1212qwqw" }}
        onFinish={signInUser}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
}

export default SignInPage;
