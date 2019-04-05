import React, { Component } from "react";
import LoginNavbar from "../Layout/LoginNavbar";
import "./LoginPage.css";
import axios from "axios";

// material-UI
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

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
    // console.log(this.state);

    return (
      <div>
        <LoginNavbar />
        <div className="login_page">
          {/* Input Fields */}
          <div>
            <TextField
              id="outlined-email-input"
              label="Username"
              className={this.props.classes.textField}
              margin="normal"
              variant="outlined"
              type="text"
              value={this.state.username}
              onChange={e => this.inputHandler("username", e.target.value)}
            />
          </div>

          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              className={this.props.classes.textField}
              type="password"
              margin="normal"
              variant="outlined"
              value={this.state.password}
              onChange={e => this.inputHandler("password", e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div>
            <Button
              variant="contained"
              color="primary"
              className={this.props.classes.button}
              onClick={this.loginClick}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="default"
              className={this.props.classes.button}
              onClick={this.registerClick}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
