import { Button, Form, Input, notification } from "antd";
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
          width: "clamp(100px, 50vw, 400px)",
        }}
        // initialValues={{ name: "user_task", password: "user_task" }}
        onFinish={(data) => {
          if (data.password === "Oybek") {
            signInUser();
            return;
          }
          notification.error({message:"Password is incorrect!"})
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password  />
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
