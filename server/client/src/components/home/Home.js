import React from "react";
import { connect } from "react-redux";
import {
  fetchOpportunities,
  fetchActivities,
  fetchContacts,
  fetchMeetings,
} from "../../actions";
import ActivityFeed from "../activities/ActivityFeed";
import UserStats from "./UserStats";

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunities();
    this.props.fetchActivities();
    this.props.fetchContacts();
    this.props.fetchMeetings();
  }
  render() {
    return (
      <div>
        <UserStats />
        <div className="ui stackable grid">
          <div className="ten wide column">
            <div>test</div>
          </div>
          <div className="six wide column">
            <div className="ui segment">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  fetchOpportunities,
  fetchActivities,
  fetchContacts,
  fetchMeetings,
})(Home);
