import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderLinks() {
    //console.log(this.props.authenticated);
    if(this.props.authenticated){
      //Show a link to sign out
      return (
      <li className="nav-item">
          <Link to="/signout" className="nav-link">Sign Out</Link>
      </li>
      )
    }else{
      //Show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup" className="nav-link">Sign up</Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }

}

function mapStateToProps(state) {
   //console.log(state.auth);
   return{
     authenticated: state.auth.authenticated
   };
}

export default connect(mapStateToProps)(Header);
