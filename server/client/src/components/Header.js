import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="ui borderless large menu">
        <NavLink to="/home" className="item logo">
          Job Tracker
        </NavLink>
        <div className="right menu">
          <div className="item">
            <div className="ui primary button">Sign In With Google</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
