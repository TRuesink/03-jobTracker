import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchActivities } from "../../actions";
import CreateActivity from "./CreateActivity";

class ActivityList extends React.Component {
  componentDidMount() {
    this.props.fetchActivities();
  }

  renderActivities() {
    return this.props.activities.map((act) => {
      return (
        <tr>
          <td style={{ paddingLeft: "0.7em" }}>{act.opportunity.name}</td>
          <td>{act.contact ? act.contact.name : ""}</td>
          <td>{act.description}</td>
          <td>
            {Math.floor(
              (new Date() - Date.parse(act.createdAt)) / (1000 * 60 * 60 * 24)
            )}{" "}
            days ago
          </td>
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
          <h3 style={{ marginBottom: "0" }}>Activites</h3>
          <CreateActivity />
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
                  Opportunity
                </th>
                <th className="two wide">Contact</th>
                <th className="nine wide">Description</th>
                <th className="two wide">Date</th>
              </tr>
            </thead>
            <tbody>{this.renderActivities()}</tbody>
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
    activities: Object.values(state.activities.data),
    inProgress: state.activities.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchActivities,
})(ActivityList);
