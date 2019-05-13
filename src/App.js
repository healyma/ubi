import React, { Component, Fragment } from "react";
import {  withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Nav, NavItem,  NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar"
import { LinkContainer } from "react-router-bootstrap";

import "./App.css";
import Routes from "./Routes";

class App extends Component {
constructor(props) {
  super(props);


    this.state = {
  isAuthenticated: false,
  isAuthenticating: true
};
}
async componentDidMount() {
  try {
    await Auth.currentSession();
    this.userHasAuthenticated(true);
  }
  catch(e) {
    if (e !== 'No current user') {
      alert(e);
    }
  }

  this.setState({ isAuthenticating: false });
}
userHasAuthenticated = authenticated => {
  this.setState({ isAuthenticated: authenticated });
}
handleLogout = async event => {
  await Auth.signOut();

  this.userHasAuthenticated(false);

  this.props.history.push("/login");
}
render() {
  const childProps = {
    isAuthenticated: this.state.isAuthenticated,
    userHasAuthenticated: this.userHasAuthenticated
  };

  return (
    !this.state.isAuthenticating &&
    <div className="App container">
    <Navbar bg="light" expand="lg">
  <Navbar.Brand ><LinkContainer to="/">
                    <Nav.Link>UbiDoBi</Nav.Link>
                  </LinkContainer></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    <Nav>
    {this.state.isAuthenticated
              ? <Fragment >
                  <NavDropdown title="My Ubi" id="basic-nav-dropdown" alignRight>
        <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">My Contacts</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Notifications &amp; Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Delete Account</NavDropdown.Item>
      </NavDropdown>
                  
                </Fragment>
              : <Fragment>
                  
                </Fragment>
            }
     
    </Nav>

  </Navbar.Collapse>
</Navbar>

      <Routes childProps={childProps} />
    </div>
  );
}


}

export default withRouter(App);

