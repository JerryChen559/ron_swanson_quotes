// Log user's rating of quote
const postUserRating = (req, res) => {
  const db = req.app.get("db");

  db.add_user_rating([req.params.userid, req.params.quote, req.params.stars])
    .then(userRating => {
      console.log("userRating: ", userRating);
      res.status(200).json(userRating);
    })
    .catch(console.log);
};

// Get user's rating of a quote
const getUserRating = (req, res) => {
  const db = req.app.get("db");

  db.get_user_rating([req.params.userid, req.params.quote])
    .then(userRating => {
      console.log("userRating: ", userRating);
      res.status(200).json(userRating);
    })
    .catch(console.log);
};

// Get avergae rating of a quote
const getAvgRating = (req, res) => {
  const db = req.app.get("db");

  // db.swansonusers
  //   .find({ userid: req.params.userid })
  //   .then(res => {
  //     // console.log("res: ", res);
  //     res.status(200).json("User's rating saved!");
  //   })
  //   .catch(console.log);
};

module.exports = {
  postUserRating,
  getUserRating,
  getAvgRating
};
