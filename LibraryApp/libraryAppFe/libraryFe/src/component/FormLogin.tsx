import { Button, Checkbox, Form, Input } from 'antd';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const onFinish = (values: any) => {
  // console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
};

function FormLogin() {
  const { handleLogin, handleChange } = useLogin();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="email"
              name="email"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                name="email"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                name="password"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleLogin}
                >
                  Submit
                </Button>
                <p color={'black'}>
                  Belum punya akun?{' '}
                  <Link
                    to="/register"
                    color={'blue.400'}
                  >
                    Register
                  </Link>
                </p>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default FormLogin;
