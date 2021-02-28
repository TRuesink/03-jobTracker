import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchContacts } from "../../actions";
import CreateContact from "./CreateContact";

class ContactList extends React.Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  renderContacts() {
    return this.props.contacts.map((contact) => {
      return (
        <tr>
          <td style={{ paddingLeft: "0.7em" }}>{contact.name}</td>
          <td>{contact.role}</td>
          <td>{contact.email}</td>
          <td>{contact.touches}</td>
          <td>{contact.opportunity.name}</td>
        </tr>
      );
    });
  }

  render() {
    const loaderClass = this.props.inProgress
      ? "ui active loader"
      : "ui disabled loader";
    return (
      <div className="ui segments">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="ui secondary segment"
        >
          <h3 style={{ marginBottom: "0" }}>Contacts</h3>
          <CreateContact />
        </div>

        <div
          style={{
            padding: "0",
          }}
          className="ui segment"
        >
          <div class={loaderClass}></div>
          <table class="ui compact very basic table">
            <thead class="full-width">
              <tr>
                <th style={{ paddingLeft: "0.7em" }} className="three wide">
                  Name
                </th>
                <th className="four wide">Role</th>
                <th className="four wide">Email</th>
                <th className="two wide">Touches</th>
                <th className="three wide">Opportunity</th>
              </tr>
            </thead>
            <tbody>{this.renderContacts()}</tbody>
            <tfoot class="full-width">
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: Object.values(state.contacts.data),
    inProgress: state.contacts.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchContacts,
})(ContactList);
