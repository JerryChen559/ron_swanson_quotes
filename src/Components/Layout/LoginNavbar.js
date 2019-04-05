import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SwansonFace from "../../Assets/SwansonFace.jpeg";

// material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

class LoginNavbar extends Component {
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
            <img src={SwansonFace} height="50px" width="40px" />
            <Typography
              variant="h6"
              color="inherit"
              style={{ marginLeft: 20 }}
              className={classes.grow}
            >
              Ron Swanson Words of Wisdom :D
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

LoginNavbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginNavbar);
