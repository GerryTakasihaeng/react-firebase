import React from "react";
// import "./styles.css";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import Dashboard from "./components/Dashborad";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Provider>
  );
}
