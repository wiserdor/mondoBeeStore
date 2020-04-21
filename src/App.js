import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Main from "./components/Main";
import Admin from "./components/Admin";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "typeface-roboto";

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
      </Router>
    </div>
  );
}

export default App;
