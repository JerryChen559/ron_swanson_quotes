import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SwansonFace from "../../Assets/SwansonFace.jpeg";

// material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    axios.get("/api/logout").then(res => {
      console.log(res.data);
      this.props.history.push("/");
    });
  }

  render() {
    // console.log("state:", this.state);
    // console.log("props:", this.props);

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img
              src={SwansonFace}
              height="50px"
              width="40px"
              alt="Pic of Mr Ron Swanson"
            />
            <Typography
              variant="h6"
              color="inherit"
              style={{ marginLeft: 20 }}
              className={classes.grow}
            >
              Ron Swanson's Words of Wisdom :D
            </Typography>
            <Button color="inherit" onClick={() => this.logout()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
