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
        initialValues={{ email: "fazliddin@gmail.com", password: "1212qwqw" }}
        onFinish={signInUser}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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
        <p>
          No account? Then <Link to="/auth/signup">Sign up</Link>
        </p>
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
