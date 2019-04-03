import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./QuotesPage.css";
import axios from "axios";

class QuotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteSize: "small",
      displayQuote: "",
      quoteRating: 0
    };
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  // componentDidMount() {
  // get user's profile

  // }

  onRadioChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getQuote() {
    if (this.state.quoteSize === "small") {
      axios
        .get("/api/getSmallQuote")
        .then(res => {
          // console.log(res.data)
          this.setState({
            displayQuote: res.data[0]
          });
        })
        .catch(err => console.log(err));
    }
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
          <button onClick={() => this.getQuote}>Generate Quote!</button>
        </div>
      </div>
    );
  }
}

export default QuotesPage;
