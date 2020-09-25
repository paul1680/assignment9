import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../Image/Logo.png';
import './Top.css';
import { UserContext } from '../../App';

const Top = () => {
  const [loggedUser, setLoggedUser] = useContext(UserContext);
    return (

        <div className="naav">
              <Navbar>
  <Navbar.Brand href="/home"><img className="logo" src={Logo} alt=""/></Navbar.Brand>
    <Nav className="mx-auto">
    <Form inline>
      <FormControl type="text" placeholder="search your destination" className="mr-sm-2" />
    </Form>
      <Nav.Link href="#home"><h5>News</h5></Nav.Link>
      <Nav.Link href="#features"><h5>Destination</h5></Nav.Link>
      <Nav.Link href="#pricing"><h5>Blog</h5></Nav.Link>
      <Nav.Link href="#pricing"><h5>Contact</h5></Nav.Link>
      <Link to="/login"><Button variant="warning">Login</Button> </Link>
      <Nav.Link href="#pricing"><h5>{loggedUser.displayName}</h5></Nav.Link>
    </Nav>
  </Navbar>
  </div>
    );
};

export default Top;