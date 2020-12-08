import React, { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../utils/auth";
function Login(props) {
  const { login } = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(LoginUser, {
    username: "",
    password: "",
  });
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result);
      login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      console.log(err);
    },
    variables: values,
  });

  function LoginUser() {
    loginUser();
  }

  const { username, password } = values;
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>

        <Form.Input
          label="Username"
          placeholder="username.."
          name="username"
          type="text"
          value={username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation register($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;
