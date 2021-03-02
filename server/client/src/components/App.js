import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from "./Header";
import Home from "./home/Home";
import OpportunityList from "./opportunities/OpportunityList";
import SideMenu from "./SideMenu";

import { connect } from "react-redux";
import { getMe } from "../actions";
import OpportunityDetail from "./opportunities/OpportunityDetail";
import ActivityList from "./activities/ActivityList";
import ContactList from "./contacts/ContactList";
import MeetingList from "./meetings/MeetingList";
import NoteList from "./notes/NoteList";
import ScriptList from "./scripts/ScriptList";
import requireAuth from "./requireAuth";

class App extends React.Component {
  componentDidMount() {
    this.props.getMe();
  }
  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <div style={{ margin: "1rem" }} className="ui stackable grid">
            <div className="three wide column">
              <Route path="/jobs" component={requireAuth(SideMenu)} />
            </div>
            <div className="thirteen wide column">
              <Switch>
                <Route path="/jobs/home" exact component={requireAuth(Home)} />
                <Route
                  path="/jobs/opportunities/:id"
                  exact
                  component={requireAuth(OpportunityDetail)}
                />
                <Route
                  path="/jobs/opportunities"
                  exact
                  component={requireAuth(OpportunityList)}
                />
                <Route
                  path="/jobs/activities"
                  exact
                  component={requireAuth(ActivityList)}
                />
                <Route
                  path="/jobs/contacts"
                  exact
                  component={requireAuth(ContactList)}
                />
                <Route
                  path="/jobs/meetings"
                  exact
                  component={requireAuth(MeetingList)}
                />
                <Route
                  path="/jobs/notes"
                  exact
                  component={requireAuth(NoteList)}
                />
                <Route
                  path="/jobs/scripts"
                  exact
                  component={requireAuth(ScriptList)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, { getMe })(App);
