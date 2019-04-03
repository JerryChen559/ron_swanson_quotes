import React, { Component } from "react";
import "./LoginPage.css";
// import axios from "axios";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.loginClick = this.login.bind(this);
    this.registerClick = this.register.bind(this);
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginClick() {}
  registerClick() {}

  render() {
    console.log(this.state);

    return (
      <div>
        <h1>Swanson's Words of Wisdom</h1>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
        </div>
        <div>
          <button onClick={this.loginClick}>Login</button>
          <button onClick={this.registerClick}>Register</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
