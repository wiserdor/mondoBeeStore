import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Main from "./components/Main";
import AdminMain from "./components/admin/AdminMain";
import AdminLogin from "./components/admin/AdminLogin";
import NotFound from "./components/NotFound";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "typeface-roboto";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Arimo",
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  const [token, setToken] = useState(null);

  const getProtectedRoute = () => {
    if (!token) {
      return <Redirect exact to="/admin/login" />;
    }

    return <AdminMain token={token} />;
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <Route exact path="/admin/main">
              {getProtectedRoute()}
            </Route>
            <Route exact path="/admin/login">
              <AdminLogin token={token} setToken={setToken} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
