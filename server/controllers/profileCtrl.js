// Register button: Add User profile to db
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
            // console.log("req.session after: ", req.session);
            res.status(200).send(newUser);
          })
          .catch(err => res.status(500).send(err));
      } else {
        res.status(200).json("Username Already Exists!");
      }
    })
    .catch(console.log);
};

// Login button: get the User by username
const loginUser = (req, res) => {
  const db = req.app.get("db");

  db.swansonusers
    .find({ username: req.params.username })
    .then(user => {
      // console.log("user: ",user)
      if (user.length === 0) {
        // }).catch(console.log)
        res.status(200).json("Invalid Username!");
      } else {
        if (req.params.password == user[0].password) {
          req.session.userid = user[0].userid;
          // console.log("req.session after: ", req.session);
          res.status(200).json(user[0]);
        } else {
          res.status(200).json("Wrong Password!");
        }
      }
    })
    .catch(console.log);
};

module.exports = {
  addUser,
  loginUser
};
