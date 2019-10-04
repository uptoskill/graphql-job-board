import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavBar extends Component {
  render() {
    const { loggedIn, onLogout } = this.props;
    if (loggedIn) {
      return (
        <nav className="navbar">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/jobs/new">Post Job</Link>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="navbar-item" onClick={onLogout}>Logout</a>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/login">Login</Link>
          </div>
        </nav>
      );
    }
  }
}
