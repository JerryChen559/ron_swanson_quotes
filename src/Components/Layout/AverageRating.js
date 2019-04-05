import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";

class AverageRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      average: 1
    };
  }

  componentDidMount = () => {
    this.getAverageRating();
  };

  getAverageRating() {
    axios
      .get(`/api/quotes/${this.props.quote}`)
      .then(res => {
        this.setState({
          average: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    // console.log("state:", this.state);
    // console.log("props:", this.props);

    // Display only when there is a quote.
    return this.props.quote ? (
      <div>
        <p>-----------------------------------</p>
        <div>
          <h2>Average Rating</h2>
          {/* <h2>Rating from state: {this.state.average}</h2> */}
          <StarRatingComponent
            name="rate2"
            editing={false} // user cannot change rating
            starCount={5}
            value={this.state.average}
          />
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default AverageRating;
