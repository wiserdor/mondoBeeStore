import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Main from "./components/Main";
import AdminMain from "./components/admin/AdminMain";
import AdminLogin from "./components/admin/AdminLogin";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "typeface-roboto";

function App() {
  const [token, setToken] = useState(null);

  const getProtectedRoute = () => {
    if (!token) {
      return <Redirect exact to="/admin/login" />;
    }

    return (
      
        <AdminMain token={token} />
    );
  };
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/admin/main">
            {getProtectedRoute()}
        </Route>
        <Route exact path="/admin/login">
          <AdminLogin token={token} setToken={setToken} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
