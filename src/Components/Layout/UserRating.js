import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";

// material-UI
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class UserRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1,
      userRating: 0
    };
  }

  // componentDidMount = () => {
  //   this.getUserRating();
  // };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("prevProps", prevProps);
    if (prevProps.quote !== this.props.quote) {
      return this.getUserRating();
    }
    if (prevState.userRating !== this.state.userRating) {
      return this.getUserRating();
    }
  };

  getUserRating() {
    axios
      .get(`/api/quotes/${this.props.user_id}/${this.props.quote}`)
      .then(res => {
        // console.log(res.data);
        this.setState({
          userRating: res.data[0].quotestars
        });
      })
      .catch(() => {
        this.setState({
          userRating: 0
        });
      });
  }

  onSubmitRating() {
    this.setState({
      userRating: 0
    });
    axios
      .post(
        `/api/quotes/${this.props.user_id}/${this.props.quote}/${
          this.state.rating
        }`
      )
      .then(res => {
        // console.log(res.data);
        this.setState({
          userRating: res.data[0].quotestars
        });
      })
      .catch(err => console.log(err));
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    // console.log("state:", this.state);
    // console.log("props:", this.props);

    // Display only when there is a quote.
    return this.props.quote ? (
      // Has user rated this quote ? Yes, display userRating : No, let user rate.
      // Display either user's ability to rate or user's summary of rating
      this.state.userRating !== 0 ? (
        <div>
          <p>__________________________________________</p>
          <h2>Vote for Awesomeness</h2>

          {/* Option: Show user's rating of quote */}
          <div>
            <h3>You have rated this quote. Woot woot!</h3>
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
          <p>__________________________________________</p>
          <h2>Vote for Awesomeness</h2>

          {/* Option: Open for user to rate quote */}
          <h3>You can rate this quote!</h3>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={this.state.rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          {/* Submit button  */}
          <div>
            <Button
              variant="contained"
              color="primary"
              className={this.props.classes.button}
              onClick={() => this.onSubmitRating()}
            >
              Submit my rating!
            </Button>
          </div>
        </div>
      )
    ) : (
      ""
    );
  }
}

UserRating.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserRating);
