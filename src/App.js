import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>{routes}</BrowserRouter>
      </div>
    );
  }
}

export default App;
