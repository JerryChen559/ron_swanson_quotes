require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");

const { SESSION_SECRET, CONNECTION_STRING, PORT } = process.env;

const port = PORT || 3001;

const {
  addUser,
  sessionUser,
  getUserRating,
  postUserRating
} = require("./controllers/profileCtrl");
const {
  getSmallQuote,
  getMediumQuote,
  getLargeQuote,
  getQuoteAvg,
  postRatedQuote
} = require("./controllers/quoteCtrl");

const app = express();
app.use(json());
app.use(cors());

// session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 1 // 1 week
    }
  })
);

// massive connection
massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);

    // dbInstance
    //   .postgres_create()
    //   .then(resonse => {
    //     console.log("Table Created");
    //   })
    //   .catch(e => console.log(e));
  })
  .catch(err => {
    console.log(err);
  });

// test session endpoint
app.get("/api/test", (req, res) => {
  res.status(200).json(req.session);
});

// user profile end points
app.post("/api/userprofile/:username/:password", addUser);
// app.get("/api/userprofile", sessionUser);
// app.get("/api/userprofile/:username", getUserRating);
// app.post("/api/userprofile", postUserRating);

// user quote end points
// app.get("/api/getSmallQuote", getSmallQuote);
// app.get("/api/getMediumQuote", getMediumQuote);
// app.get("/api/getLargeQuote", getLargeQuote);
// app.get("/api/getQuoteAvg", getQuoteAvg);

// log out of session
app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json("loggedout");
});

// Confirm server is running
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
