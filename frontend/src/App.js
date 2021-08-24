import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import Particular from './pages/Particular'


const App = () => {
  return (
    <Router>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/:id">
          <Particular />
        </Route>
        <Route path="/">
          <Profile />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
