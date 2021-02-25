import React from "react";
import OpportunityPath from "./OpportunityPath";
import { connect } from "react-redux";
import { fetchOpportunity } from "../../actions";
import OpportunityHeader from "./OpportunityHeader";

class OpportunityDetail extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunity(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <OpportunityHeader opp={this.props.opportunity} />
        <OpportunityPath opp={this.props.opportunity} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    opportunity: state.opportunities.data[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchOpportunity })(
  OpportunityDetail
);
