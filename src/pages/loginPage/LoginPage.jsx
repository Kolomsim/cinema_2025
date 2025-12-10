import { Typography, Form, Input, Flex, Button } from "antd";
import "./LoginPage.css";
import { signUp } from "../../utils/requests";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginHandler = () => {
    const body = new FormData();
    body.append("login", form.getFieldValue("login"));
    body.append("password", form.getFieldValue("password"));
    signUp(body)
      .then((res) => {
        login(res.data.data.token, {
          name: res.data.data.name,
          role: res.data.data.role,
        });
        navigate("/about_me");
      })
      .catch((e) => console.warn(e));
  };
  return (
    <div id="login-page">
      <Flex className="login-page-container">
        <Typography.Title>Войдите в аккаунт</Typography.Title>
        <Form form={form} layout="vertical" className="login-form">
          <Form.Item name={"login"} label="Логин">
            <Input />
          </Form.Item>
          <Form.Item name={"password"} label="Пароль">
            <Input.Password />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={() => loginHandler()}>
          Войти
        </Button>
      </Flex>
    </div>
  );
};

export default LoginPage;
