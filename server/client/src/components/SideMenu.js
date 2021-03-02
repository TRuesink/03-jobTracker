import React from "react";
import { NavLink } from "react-router-dom";

class SideMenu extends React.Component {
  render() {
    return (
      <div className="ui left fluid vertical menu">
        <NavLink to="/home" className="item">
          Home
        </NavLink>
        <NavLink to="/opportunities" className="item">
          Opportunities
        </NavLink>
        <NavLink to="/activities" className="item">
          Activities
        </NavLink>
        <NavLink to="/contacts" className="item">
          Contacts
        </NavLink>
        <NavLink to="/meetings" className="item">
          Meetings
        </NavLink>
        <NavLink to="/scripts" className="item">
          Scripts
        </NavLink>
        <NavLink to="/notes" className="item">
          Notes
        </NavLink>
      </div>
    );
  }
}

export default SideMenu;
