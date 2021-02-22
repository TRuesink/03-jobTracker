import React from "react";
import { NavLink } from "react-router-dom";

class SideMenu extends React.Component {
  render() {
    return (
      <div className="ui left fluid vertical menu">
        <NavLink to="/home" className="item">
          Home
          <div className="ui label">1</div>
        </NavLink>
        <NavLink to="/opportunities" className="item">
          Opportunities
          <div className="ui label">51</div>
        </NavLink>
        <NavLink to="/activities" className="item">
          Activities
          <div className="ui label">1</div>
        </NavLink>
        <NavLink to="/contacts" className="item">
          Contacts
          <div className="ui label">1</div>
        </NavLink>
        <NavLink to="/meetings" className="item">
          Meetings
          <div className="ui label">1</div>
        </NavLink>
        <NavLink to="/scripts" className="item">
          Scripts
          <div className="ui label">1</div>
        </NavLink>
        <NavLink to="/notes" className="item">
          Notes
          <div className="ui label">1</div>
        </NavLink>
      </div>
    );
  }
}

export default SideMenu;
