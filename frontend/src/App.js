import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const App = () => {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  )
}

export default App
