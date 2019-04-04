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
    axios.get().then();
  };

  render() {
    // console.log("state:", this.state);
    // console.log("props:", this.props);

    return (
      <div>
        <p>-----------------------------------</p>
        <div>
          <h2>Average Rating</h2>
          {/* <h2>Rating from state: {this.state.average}</h2> */}
          <StarRatingComponent
            name="rate2"
            editing={false} // user cannot change rating
            starCount={10}
            value={this.state.average}
          />
        </div>
      </div>
    );
  }
}

export default AverageRating;
