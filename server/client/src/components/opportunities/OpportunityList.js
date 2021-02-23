import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOpportunities, editOpportunity } from "../../actions";

import CreateOpportunity from "./CreateOpportunity";

class OpportunityList extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunities();
  }
  renderOpportunities() {
    return this.props.opportunities.map((opp) => {
      const colorClass = opp.active ? "positive" : "negative";
      const statusClass = this.props.inProgress ? "disabled" : "";
      return (
        <tr className={colorClass + " " + statusClass}>
          <td>
            <Link>{opp.name}</Link>
          </td>
          <td>{opp.stage}</td>
          <td>{"test"}</td>
          <td className="collapsing">
            {opp.active ? (
              <button
                className="ui button"
                onClick={() =>
                  this.props.editOpportunity(opp._id, { active: false })
                }
              >
                Deactivate
              </button>
            ) : (
              <button
                className="ui small button"
                onClick={() =>
                  this.props.editOpportunity(opp._id, { active: true })
                }
              >
                Activate
              </button>
            )}
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
      <>
        <div class={loaderClass}></div>
        <table class="ui compact selectable single line table">
          <thead class="full-width">
            <tr>
              <th>Name</th>
              <th>Stage</th>
              <th>Last Activity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderOpportunities()}</tbody>
          <tfoot class="full-width">
            <tr>
              <th></th>
              <th colspan="4">
                <CreateOpportunity />
              </th>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
    inProgress: state.opportunities.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
  editOpportunity,
})(OpportunityList);
