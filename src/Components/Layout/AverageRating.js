import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";

class AverageRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      average: null
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("prevState", prevState);

    // takes care of situation where user changes quote
    if (prevProps.quote !== this.props.quote) {
      return this.getAverageRating();
    }

    // this takes care of the situation where user submits a quote rating
    if (prevState.average !== this.state.average) {
      return this.getAverageRating();
    }
  };

  getAverageRating() {
    axios
      .get(`/api/quotes/${this.props.quote}`)
      .then(res => {
        console.log("allRatings", res.data);

        // this is to find the average of all the ratings.
        let mappedNumbers = res.data.map(el => {
          return el.quotestars;
        });
        let sumNumber = mappedNumbers.reduce((sum, element) => {
          return sum + element;
        }, 0);
        let avgNumber = sumNumber / res.data.length;

        this.setState({
          average: avgNumber
        });
      })
      .catch(err => {
        console.log(err);

        this.setState({
          average: null
        });
      });
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
