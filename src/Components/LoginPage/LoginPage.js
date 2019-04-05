import React, { Component } from "react";
import LoginNavbar from "../Layout/LoginNavbar";
import "./LoginPage.css";
import axios from "axios";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.loginClick = this.loginClick.bind(this);
    this.registerClick = this.registerClick.bind(this);
  }

  inputHandler(key, val) {
    this.setState({ [key]: val });
  }

  loginClick() {
    axios
      .post(`/api/user/login/${this.state.username}/${this.state.password}`)
      .then(res => {
        if (typeof res.data === "string") {
          alert(res.data);
        } else {
          console.log(res.data);
          this.props.history.push("/quotes");
        }
      })
      .catch(err => console.log(err));
  }

  registerClick() {
    axios
      .post(`/api/user/register/${this.state.username}/${this.state.password}`)
      .then(res => {
        if (res.data === "Username Already Exists!") {
          alert(res.data);
        } else {
          if (res.data === "Username and Password are now registered!") {
            alert(res.data);
          }
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <LoginNavbar />
        <div className="login_page">
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.inputHandler("username", e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.inputHandler("password", e.target.value)}
            />
          </div>
          <div>
            <button onClick={this.loginClick}>Login</button>
            <button onClick={this.registerClick}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
