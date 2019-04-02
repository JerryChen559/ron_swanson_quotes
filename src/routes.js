import React from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./Components/LoginPage/LoginPage";
import QuotesPage from "./Components/QuotesPage/QuotesPage";

export default (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/quotes" component={QuotesPage} />
  </Switch>
);
