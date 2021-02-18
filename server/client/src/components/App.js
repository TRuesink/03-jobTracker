import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from "./Header";
import Home from "./home/Home";
import OpportunityList from "./opportunities/OpportunityList";
import SideMenu from "./SideMenu";

import { connect } from "react-redux";
import { getMe } from "../actions";

class App extends React.Component {
  componentDidMount() {
    this.props.getMe();
  }
  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <div className="ui grid">
            <div className="four wide column">
              <SideMenu />
            </div>
            <div className="twelve wide column">
              <Route path="/home" exact component={Home} />
              <Route path="/opportunities" exact component={OpportunityList} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, { getMe })(App);
