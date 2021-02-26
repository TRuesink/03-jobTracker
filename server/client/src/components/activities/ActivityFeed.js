import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ActivityFeed extends React.Component {
  renderActivities() {
    return this.props.activities.map((act) => {
      return (
        <div key={act._id} className="event">
          <div className="content">
            <div className="summary">
              <Link to={`/opportunities/${act.opportunity._id}`}>
                {act.opportunity.name}
              </Link>{" "}
              - {act.description}
              <div className="date">
                {Math.floor(
                  (new Date() - Date.parse(act.createdAt)) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days ago
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="ui segments">
        <div className="ui secondary segment">Activity Feed</div>
        <div className="ui segment">
          <div className="ui feed">{this.renderActivities()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: Object.values(state.activities.data),
  };
};

export default connect(mapStateToProps)(ActivityFeed);
