import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import firebase from "../../firebaseConfig";
require("firebase/auth");

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const history = useHistory();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        console.log("history");
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        switch (error) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setError(error.message);
            break;
          case "auth/weak-password":
            setError(error.message);
            break;
          default:
            setError(error.message);
        }
      });
  };

  console.log(error);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        switch (error) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setError(error.message);
            break;
          case "auth/weak-password":
            setError(error.message);
            break;
          default:
            setError("Error");
            setError("Error");
        }
      });
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        label="Email"
        name="email"
        value={email}
        onChange={(e) => handleEmail(e)}
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        value={password}
        onChange={(e) => handlePassword(e)}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={(e) => handleSignIn(e)}
        >
          Sign In
        </Button>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={(e) => handleSignUp(e)}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
