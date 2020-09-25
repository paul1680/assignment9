import React, { createContext, useState } from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Booking from './components/Booking/Booking';
import { location } from './components/fakeData/location';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Newuser from './components/Newuser/Newuser';
import Nomatch from './components/Nomatch/Nomatch';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Room from './components/Room/Room';
import Top from './components/Top/Top';

export const UserContext = createContext();


function App() {
  const [loggedUser, setLoggedUser] = useState({});
  return (
    <UserContext.Provider value={[loggedUser, setLoggedUser]}>
    <div className="App">

  <Router>
  <Top></Top>
    <Switch>
      <Route path = '/home'>
        <Home/>
        </Route>
        <Route path = '/booking/:id'>
        <Booking info={location}></Booking>
        </Route>
        <Route path = '/login'>
        <Login></Login>
        </Route>
        <Route path="/signup">
          <Newuser></Newuser>
        </Route>
        <PrivateRoute path="/room/:id">
        <Room  info={location}></Room>
        </PrivateRoute>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
      <Nomatch></Nomatch>  
      </Route>
    </Switch>
  </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
