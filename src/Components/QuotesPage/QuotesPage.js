import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import AverageRating from "../Layout/AverageRating";
import UserRating from "../Layout/UserRating";
import "./QuotesPage.css";
import axios from "axios";
import SwansonButtonPic from "../../Assets/SwansonButtonPic.jpg";

// material-UI
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class QuotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      quoteSize: "small",
      displayQuote: "",
      quoteRating: 0
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.getQuote = this.getQuote.bind(this);
  }

  componentDidMount() {
    this.getUserID();
  }

  getUserID() {
    axios
      .get("/api/test")
      .then(res => {
        console.log("res.data", res.data);
        this.setState({
          user_id: res.data.userid
        });
      })
      .catch(err => console.log(err));
  }

  onRadioChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getQuote() {
    axios
      .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes/60")
      .then(res => {
        // console.log(res.data);
        this.setState({
          displayQuote: res.data.find(x => {
            if (this.state.quoteSize === "small") {
              return x.toString().split(" ").length <= 4;
            }
            if (this.state.quoteSize === "medium") {
              return (
                x.toString().split(" ").length > 4 &&
                x.toString().split(" ").length < 13
              );
            }
            if (this.state.quoteSize === "large") {
              return x.toString().split(" ").length >= 13;
            }
          })
        });
      })
      .catch(err => console.log(err));
  }

  // .then get generated quote's average stars

  render() {
    console.log(this.state);

    let message = null;
    if (this.state.quoteSize === "small") {
      message = "Quotes with 4 words or less";
    }
    if (this.state.quoteSize === "medium") {
      message = "Quotes with 5 to 12 words";
    }
    if (this.state.quoteSize === "large") {
      message = "Quotes with 13 words or more";
    }

    return (
      <div>
        <div>
          <Navbar history={this.props.history} />
        </div>
        <div className="quotes_page">
          <section className="left_content">
            <h3>Quote Size:</h3>
            <div>
              <input
                defaultChecked
                type="radio"
                name="quoteSize"
                value="small"
                onChange={this.onRadioChange}
              />
              Small
              <input
                type="radio"
                name="quoteSize"
                value="medium"
                onChange={this.onRadioChange}
              />
              Medium
              <input
                type="radio"
                name="quoteSize"
                value="large"
                onChange={this.onRadioChange}
              />
              Large
            </div>
            <p>
              {" "}
              <strong>Note:</strong> {message}
            </p>
            <img
              src={SwansonButtonPic}
              alt="Ron Swanson Pic"
              height="260px"
              width="400px"
              onClick={this.getQuote}
            />
            <div>
              {/* <button onClick={this.getQuote}>Generate Quote!</button> */}
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                onClick={this.getQuote}
              >
                Generate Quote!
              </Button>
            </div>
          </section>

          <section className="right_content">
            <div className="quote">{this.state.displayQuote}</div>
            <AverageRating
              user_id={this.state.user_id}
              quote={this.state.displayQuote}
            />
            <UserRating
              user_id={this.state.user_id}
              quote={this.state.displayQuote}
            />
          </section>
        </div>
      </div>
    );
  }
}

QuotesPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuotesPage);
