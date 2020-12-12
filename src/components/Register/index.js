import React from "react";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { registerUserAPI } from "../../features/Auth/action";

const Register = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (e, name) => {
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = form;
    const res = await dispatch(registerUserAPI(email, password)).catch(
      (err) => err
    );
    if (res) {
      setForm({ email: "", password: "" });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-title">Register Page</p>
        <input
          value={form.email}
          className="input"
          placeholder="Email"
          type="text"
          onChange={(e) => handleChange(e, "email")}
        />
        <input
          value={form.password}
          className="input"
          placeholder="Password"
          type="password"
          onChange={(e) => handleChange(e, "password")}
        />
        <Button
          title="Register"
          onClick={handleSubmit}
          loading={auth.loading}
        />
      </div>
    </div>
  );
};

export default Register;
