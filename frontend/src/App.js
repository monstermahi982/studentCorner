import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Particular from "./pages/Particular";
import { initialState, reducer } from "./useReducer";
import PrivateRouter from "./PrivateRouter";

export const userContext = React.createContext();

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/student/:id">
            <Particular />
          </Route>
          <PrivateRouter path="/student" component={Profile}></PrivateRouter>
          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
};

export default App;
