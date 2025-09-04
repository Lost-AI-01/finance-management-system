import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // if already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-wrapper">
      {loading && <Spinner />}

      {/* Animated background bubbles */}
      <ul className="register-bubbles">
        <li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li>
      </ul>

      {/* Registration form */}
      <div className="register-container">
        <h1>Register</h1>
        <Form
          className="register-form"
          layout="vertical"
          onFinish={submitHandler}
        >
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <div className="form-footer">
            <Link to="/login">Already Registered? Login here!</Link>
            <button className="btn">Register</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
