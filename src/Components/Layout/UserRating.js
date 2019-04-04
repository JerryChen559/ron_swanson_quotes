import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";

class UserRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1,
      userRating: 0,
      RatingAllowed: true
    };
  }

  componentDidMount = () => {
    this.getUserRating();
  };

  getUserRating() {
    axios
      .get(`/api/quotes/${this.props.user_id}/${this.props.quote}`)
      .then(res => {
        this.setState({
          userRating: res.data
        });
      })
      .catch(err => console.log(err));
  }

  onSubmitRating() {
    axios
      .post(
        `/api/quotes/${this.props.user_id}/${this.props.quote}/${
          this.state.rating
        }`
      )
      .then(res => {
        this.setState({
          userRating: res.data
        });
      })
      .catch(err => console.log(err));
  }

  // Only used for Toggle testing
  // onClickTestTrueToFalse() {
  //   this.setState({
  //     RatingAllowed: false
  //   });
  // }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    console.log("state:", this.state);
    console.log("props:", this.props);

    const { rating } = this.state;

    // Display only when there is a quote.
    return this.props.quote ? (
      // Has user rated this quote ? Yes, display userRating : No, let user rate.
      // Display either user's ability to rate or user's summary of rating
      this.state.userRating != 0 ? (
        <div>
          <p>-----------------------------------</p>
          <h2>Vote for Awesomeness</h2>

          {/* Option to Show user rating */}
          <p> Display User's Rating Here </p>
          <p> Non-editable </p>
          <p> This is shown when RatingAllowed is false </p>
          <div>
            <h3>Rating from state: {rating}</h3>
            <StarRatingComponent
              name="rate2"
              editing={false}
              starCount={5}
              value={this.state.userRating}
            />
          </div>
        </div>
      ) : (
        <div>
          <p>-----------------------------------</p>
          <h2>Vote for Awesomeness</h2>

          {/* Option to Rate */}
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          {/* Submit button  */}
          <button onClick={() => this.onSubmitRating()}>
            Rate this quote!
          </button>
        </div>
      )
    ) : (
      ""
    );
  }
}

export default UserRating;
