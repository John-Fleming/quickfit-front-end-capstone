import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  render() {
    const { authed } = this.props;

    if (authed) {
      return (
        <div className="MyNavbar">
          <Navbar color="light" light fixed="top">
            <NavLink tag={RRNavLink} to="/home" className="brand-header navbar-brand"><i className="fas fa-running"></i> QuickFit</NavLink>
              <Nav className="ml-auto flex-row" navbar>
                <NavItem className="mr-2">
                  <NavLink tag={RRNavLink} to="/favorites"><i className="far fa-bookmark"></i></NavLink>
                </NavItem>
                <NavItem className="ml-2">
                  <NavLink tag={RRNavLink} to="/profile"><i className="fas fa-user-circle"></i></NavLink>
                </NavItem>
              </Nav>
          </Navbar>
        </div>
      );
    }
    return '';
  }
}

export default MyNavbar;
