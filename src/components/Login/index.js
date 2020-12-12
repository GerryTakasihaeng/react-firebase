import React from "react";
// import "./Login.scss";
import { loginUserAPI } from "../../features/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../Button";

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

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
    const res = await dispatch(loginUserAPI(email, password)).catch(
      (err) => err
    );
    if (res) {
      console.log("Login success", res);
      localStorage.setItem("userData", JSON.stringify(res));
      setForm({ email: "", password: "" });
      history.push("/");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-title">Login Page</p>
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
        <Button title="Login" onClick={handleSubmit} loading={auth.loading} />
      </div>
    </div>
  );
};

export default Login;
