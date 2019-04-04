import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
// import axios from "axios";

class UserRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1,
      RatingAllowed: true
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    // console.log("state:", this.state);
    // console.log("props:", this.props);

    const { rating } = this.state;

    // logic
    // if (userRating == true) {
    //   display NonEditable
    // } else {
    //   display Editable
    // }

    // onSubmitRating(){} // axios call to store user, quote, rating

    return (
      <div>
        <p>-----------------------------------</p>
        <h2>Vote for Awesomeness</h2>
        {/* Option A: */}
        <p> Display for User to edit </p>
        <p> Editable only if they have not rated the quote before. </p>
        <div>
          <h3>Rating from state: {rating}</h3>
          <StarRatingComponent
            name="rate1"
            starCount={10}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          {/* add a submit button  */}
          {/* Submit button changes the RatingAllowed to false */}
        </div>

        {/* Option B: */}
        <p> Display User's Rating Here </p>
        <p> Non-editable </p>
        <p> This is shown when RatingAllowed is false </p>
        <div>
          <h3>Rating from state: {rating}</h3>
          <StarRatingComponent
            name="rate2"
            editing={false}
            starCount={10}
            value={8}
          />
        </div>
      </div>
    );
  }
}

export default UserRating;
