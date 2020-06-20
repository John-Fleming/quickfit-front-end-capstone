import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { authed } = this.props;

    if (authed) {
      return (
        <div className="MyNavbar">
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Workout App</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/"><i className="far fa-bookmark"></i></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/components/"><i className="fas fa-user-circle"></i></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/components/" onClick={this.logMeOut}>Logout</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    return '';
  }
}

export default MyNavbar;
