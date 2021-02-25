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
            <div className="four wide column">
              <SideMenu />
            </div>
            <div className="twelve wide column">
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route
                  path="/opportunities/:id"
                  exact
                  component={OpportunityDetail}
                />
                <Route
                  path="/opportunities"
                  exact
                  component={OpportunityList}
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
