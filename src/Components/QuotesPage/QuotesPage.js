import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import AverageRating from "../Layout/AverageRating";
import UserRating from "../Layout/UserRating";
import "./QuotesPage.css";
import axios from "axios";

class QuotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteSize: "small",
      displayQuote: [],
      quoteRating: 0
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.getQuote = this.getQuote.bind(this);
  }

  // componentDidMount() {
  // get user's profile
  // }

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
        <Navbar history={this.props.history} />
        <p>Quote Size:</p>
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
        <p>Note: {message}</p>
        <div>
          <button onClick={this.getQuote}>Generate Quote!</button>
        </div>
        <div>{this.state.displayQuote}</div>

        <AverageRating />
        <UserRating />
      </div>
    );
  }
}

export default QuotesPage;
