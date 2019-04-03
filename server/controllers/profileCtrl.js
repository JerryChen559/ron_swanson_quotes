// Add User profile to db
const addUser = (req, res) => {
  const db = req.app.get("db");

  db.swansonusers
    .find({ username: req.params.username })
    .then(user => {
      if (user.length === 0) {
        // if user does not already exist, create a new profile
        db.add_user([req.params.username, req.params.password])
          .then(newUser => {
            // console.log("creating new user", newUser);
            req.session.userid = newUser.userid;
            res.status(200).send(newUser);
          })
          .catch(err => res.status(500).send(err));
      } else {
        // console.log("req.session after: ", req.session);
        res.status(200).json("Username Already Exists!");
      }
    })
    .catch(console.log);
};

// get the User by username
const getUser = (req, res) => {
  const db = req.app.get("db");

  db.get_profile(req.params.username)
    .then(response => {
      req.session.user = response[0];
      console.log("get user:", response);
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

// get session onto user and pass front
// const sessionUser = (req, res) => {
//   if (req.session.user) {
//     res.status(200).json(req.session.user);
//   } else res.status(500);
// };

module.exports = {
  addUser
  // sessionUser,
  // getUserRating,
  // postUserRating
};
